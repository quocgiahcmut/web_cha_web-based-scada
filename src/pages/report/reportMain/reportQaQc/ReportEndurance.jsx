import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import convention from '../../../../assets/JsonData/report_qaqc_endurance.json';
import ReportQaqcFilter from '../../../../components/reportQaqcFilter/ReportQaqcFilter';
import ReportQaqcTable from '../../../../components/reportQaqcTable/ReportQaqcTable';
import { createExcelFile, drawBorder, drawDottedBorder, saveExcelFile } from '../../../../utils/excel';
import { ENDURANCE_COLUMNS } from '../../../../utils/utils';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import { qaQcApi } from '../../../../api/axios/qaqcReport';
import {
	resetEnduranceReportData,
	setEnduranceReportData,
	setEnduranceOverviewData,
	setEnduranceReportDataDate,
} from '../../../../redux/slice/QaQcReportSlice';
import QaqcOverviewReportTable from '../../../../components/qaqcOverviewReportTable/QaqcOverviewReportTable';

function ReportEndurance() {
	const { enduranceOverviewData, enduranceReportData, enduranceReportDataDate } = useSelector(
		(state) => state.qaQcReportData
	);
	const dispatch = useDispatch();
	// const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const exportReport = () => {
		const workbook = createExcelFile(convention, 11);
		const sheet1 = workbook.getWorksheet('sheet1');

		sheet1.addImage(0, {
			tl: { row: 0.3, col: 0.2 },
			br: { row: 3.7, col: 1.7 },
		});

		//set width, height of row/column
		sheet1.getRow(5).height = 10;
		sheet1.getRow(7).height = 10;
		sheet1.getRow(11).height = 10;
		sheet1.getRow(9).height = 40;
		sheet1.getRow(10).height = 40;
		sheet1.getRow(43).height = 95;
		sheet1.getColumn(14).width = 40;
		//add text value
		const assignPurpose = {
			richText: [
				{
					text: 'Mục đích kiểm tra:                   ',
					font: {
						bold: true,
						name: 'Times New Roman',
					},
				},
				{
					text: 'Định kỳ □                           Bất thường □                           SP mới □                            Khác □',
					font: {
						name: 'Times New Roman',
					},
				},
			],
		};
		switch (enduranceOverviewData.purpose) {
			case 'period':
				assignPurpose.richText[1].text =
					'Định kỳ ☑                           Bất thường □                           SP mới □                            Khác □';
				break;
			case 'anomaly':
				assignPurpose.richText[1].text =
					'Định kỳ □                           Bất thường ☑                           SP mới □                            Khác □';
				break;
			case 'newProduct':
				assignPurpose.richText[1].text =
					'Định kỳ □                           Bất thường □                           SP mới ☑                            Khác □';
				break;
			case 'other':
				assignPurpose.richText[1].text = `Định kỳ □                           Bất thường □                           SP mới □                            Khác ☑      ${enduranceOverviewData.testNote}`;
				break;
			default:
				break;
		}
		sheet1.getCell('D6').value = enduranceOverviewData.productName;
		sheet1.getCell('M6').value = enduranceOverviewData.productId;
		sheet1.getCell('A9').value = assignPurpose;
		sheet1.getCell('A9').alignment = { vertical: 'middle', horizontal: 'left' };
		sheet1.getCell('D8').value = enduranceReportDataDate.startTime;
		sheet1.getCell('K8').value = enduranceReportDataDate.stopTime;
		[...Array(20).keys()].forEach((item, index) => {
			const row = sheet1.getRow(index + 16);
			row.values = [(index + 1) * 5000];
			row.font = { name: 'Times New Roman', size: 11 };
		});
		enduranceReportData.forEach((item, index) => {
			const row = sheet1.getRow(index + 16);
			row.alignment = { vertical: 'middle', horizontal: 'center' };
			row.values = [
				item.sample,
				item.time,
				item.toilet_bumper,
				item.no_oil_spill,
				item.first_result,
				item.closing_time,
				item.no_drop_bumper,
				item.no_spill,
				item.second_result,
				item.total,
				item.note,
				'',
				'',
				item.employee,
			];
			row.font = { name: 'Times New Roman', size: 11 };
		});
		//merge cells
		for (let i = 15; i <= 35; i++) {
			sheet1.mergeCells(`K${i}:M${i}`);
		}
		//set border
		for (let r = 15; r <= 35; r++) {
			for (let c = 1; c <= 14; c++) {
				drawBorder(sheet1, r, c, 'left', 'right');
				if (r === 35) {
					drawBorder(sheet1, r, c, 'left', 'right', 'bottom');
				}
			}
		}

		for (let c = 1; c <= 14; c++) {
			drawBorder(sheet1, 37, c, 'top');
		}

		for (let r = 37; r <= 40; r++) {
			drawBorder(sheet1, r, 14, 'right');
		}
		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 38, c, 'top', 'bottom');
		}

		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 39, c, 'bottom');
		}
		drawBorder(sheet1, 37, 14, 'top', 'right');

		//save file to pc
		saveExcelFile(
			workbook,
			`Phiếu kiểm tra đóng êm ${enduranceOverviewData.productName} ${format(new Date(), 'dd-MM-yyyy')}`
		);
	};

	const onSubmit = (values) => {
		dispatch(resetEnduranceReportData());
		setLoading(true);
		qaQcApi
			.getEnduranceReport(values.dateStart, values.dateEnd)
			.then((res) => {
				console.log(res.data.items);
				const filteredData = [];
				setLoading(false);
				if (res.data.items.length > 0) {
					res.data.items[0].samples.forEach((item) => {
						filteredData.push({
							sample: item.sampleNumber,
							time: (item.seatLidResult.fallTime / 1000).toFixed(2),
							toilet_bumper: item.seatLidResult.isBumperIntact === true ? 'oke' : 'lỗi',
							no_oil_spill: item.seatLidResult.isUnleaked === true ? 'oke' : 'lỗi',
							first_result: item.seatLidResult.passed === true ? 'oke' : 'lỗi',
							closing_time: (item.seatRingResult.fallTime / 1000).toFixed(2),
							no_drop_bumper: item.seatRingResult.isBumperIntact === true ? 'oke' : 'lỗi',
							no_spill: item.seatRingResult.isUnleaked === true ? 'oke' : 'lỗi',
							second_result: item.seatRingResult.passed === true ? 'oke' : 'lỗi',
							total: item.sampleNumber,
							note: item.note,
							employee: res.data.items[0].tester.lastName + ' ' + res.data.items[0].tester.firstName,
						});
					});
					dispatch(setEnduranceReportData(filteredData));
					dispatch(
						setEnduranceOverviewData({
							purpose:
								res.data.items[0].testPurpose === 0
									? 'period'
									: res.data.items[0].testPurpose === 1
									? 'anomaly'
									: res.data.items[0].testPurpose === 2
									? 'newProduct'
									: 'other',
							testNote: res.data.items[0].note,
							productId: res.data.items[0].product.id,
							productName: res.data.items[0].product.name,
						})
					);
					dispatch(
						setEnduranceReportDataDate({
							startTime: format(new Date(res.data.items[0].startDate), 'dd/MM/yyyy'),
							stopTime: format(new Date(res.data.items[0].endDate), 'dd/MM/yyyy'),
						})
					);
				} else {
					setLoading(false);
					setError(`Không có dữ liệu trong ngày, vui lòng chọn ngày khác`);
				}
			})
			.catch((err) => {
				setLoading(false);
				setError(`Có lỗi xảy ra, vui lòng thử lại\n${err}`);
			});
	};

	return (
		<>
			<ReportQaqcFilter onSubmit={onSubmit} dataDisplay={enduranceReportData} exportReport={exportReport} />
			{loading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : enduranceReportData.length <= 0 ? (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			) : (
				<>
					<QaqcOverviewReportTable overviewData={enduranceOverviewData} />
					<ReportQaqcTable reportData={enduranceReportData} reportHeaders={ENDURANCE_COLUMNS} />
					{/* <ReportEndurance reportData={enduranceOverviewData} reportHeaders={QAQC_OVERVIEW_COLUMNS} /> */}
					{/* <code>{JSON.stringify(enduranceReportData, null, 2)}</code> */}
				</>
			)}
		</>
	);
}

export default ReportEndurance;
