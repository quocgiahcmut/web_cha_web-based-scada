import React from 'react';
import ReportQaqcFilter from '../../../../components/reportQaqcFilter/ReportQaqcFilter';
import { createExcelFile, drawBorder, drawDottedBorder, saveExcelFile } from '../../../../utils/excel';
import { useDispatch, useSelector } from 'react-redux';
import convention from '../../../../assets/JsonData/report_qaqc_forced-endurance.json';
import { format } from 'date-fns';
import ReportQaqcTable from '../../../../components/reportQaqcTable/ReportQaqcTable';
import { FORCED_ENDURANCE_COLUMNS } from '../../../../utils/utils';
import { qaQcApi } from '../../../../api/axios/qaqcReport';
import {
	resetForcedEnduranceReportData,
	setForcedEnduranceReportData,
	setForcedEnduranceReportDataDate,
	setForcedEnduranceOverviewData,
} from '../../../../redux/slice/QaQcReportSlice';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import QaqcOverviewReportTable from '../../../../components/qaqcOverviewReportTable/QaqcOverviewReportTable';

function ReportForcedEndurance() {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const dispatch = useDispatch();
	const { forcedEnduranceOverviewData, forcedEnduranceReportData, forcedEnduranceReportDataDate } = useSelector(
		(state) => state.qaQcReportData
	);
	const exportReport = React.useCallback(() => {
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
		sheet1.getRow(8).height = 20;
		sheet1.getRow(6).height = 20;
		sheet1.getRow(10).height = 40;
		sheet1.getRow(30).height = 95;
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

		switch (forcedEnduranceOverviewData.purpose) {
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
				assignPurpose.richText[1].text = `Định kỳ □                           Bất thường □                           SP mới □                            Khác ☑      ${forcedEnduranceOverviewData.testNote}`;
				break;
			default:
				break;
		}

		sheet1.getCell('A9').value = assignPurpose;
		sheet1.getCell('A9').alignment = { vertical: 'middle', horizontal: 'left' };
		sheet1.getCell('D8').value = forcedEnduranceReportDataDate.startTime;
		sheet1.getCell('K8').value = forcedEnduranceReportDataDate.stopTime;
		[...Array(6).keys()].forEach((item, index) => {
			const row = sheet1.getRow(index + 16);
			row.values = [(index + 1) * 5000];
			row.font = { name: 'Times New Roman', size: 11 };
			row.height = 20;
		});
		forcedEnduranceReportData.forEach((item, index) => {
			const row = sheet1.getRow(index + 16);
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
		for (let i = 15; i <= 21; i++) {
			sheet1.mergeCells(`K${i}:M${i}`);
		}
		sheet1.getColumn(14).width = 40;
		//set border
		for (let r = 15; r <= 21; r++) {
			for (let c = 1; c <= 14; c++) {
				drawBorder(sheet1, r, c, 'left', 'right', 'top', 'bottom');
			}
		}

		for (let c = 1; c <= 14; c++) {
			drawBorder(sheet1, 24, c, 'top');
		}
		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 25, c, 'top', 'bottom');
		}

		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 26, c, 'bottom');
		}
		for (let r = 24; r <= 27; r++) {
			drawBorder(sheet1, r, 14, 'right');
		}

		drawBorder(sheet1, 24, 14, 'top', 'right');

		//save file to pc
		saveExcelFile(
			workbook,
			`Phiếu kiểm tra đóng cưỡng bức ${forcedEnduranceOverviewData.productName} ${format(new Date(), 'dd-MM-yyyy')}`
		);
	}, [forcedEnduranceOverviewData, forcedEnduranceReportData, forcedEnduranceReportDataDate]);
	const onSubmit = React.useCallback(
		(values) => {
			dispatch(resetForcedEnduranceReportData());
			setLoading(true);
			qaQcApi
				.getForcedEnduranceReport(values.dateStart, values.dateEnd)
				.then((res) => {
					setLoading(false);
					const filteredData = [];
					if (res.data.items.length > 0) {
						res.data.items[0].samples?.forEach((item) => {
							filteredData.push({
								sample: item.sampleNumber,
								time: (item.result.fallTime / 1000).toFixed(2),
								toilet_bumper: item.result.isIntact === true ? 'Oke' : 'Lỗi',
								no_oil_spill: item.result.isUnleaked === true ? 'Oke' : 'Lỗi',
								first_result: item.result.passed === true ? 'Oke' : 'Lỗi',
								closing_time: (item.result.fallTime / 1000).toFixed(2),
								no_drop_bumper: item.result.isIntact === true ? 'Oke' : 'Lỗi',
								no_spill: item.result.isUnleaked === true ? 'Oke' : 'Lỗi',
								second_result: item.result.passed === true ? 'Oke' : 'Lỗi',
								total: item.sampleNumber,
								note: item.note,
								employee: item.tester.lastName + ' ' + item.tester.firstName,
							});
						});
						dispatch(setForcedEnduranceReportData(filteredData));
						dispatch(
							setForcedEnduranceOverviewData({
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
							setForcedEnduranceReportDataDate({
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
		},
		[dispatch]
	);
	return (
		<>
			<ReportQaqcFilter dataDisplay={forcedEnduranceReportData} onSubmit={onSubmit} exportReport={exportReport} />
			{loading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : forcedEnduranceReportData.length <= 0 ? (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			) : (
				<>
					<QaqcOverviewReportTable overviewData={forcedEnduranceOverviewData} />
					<ReportQaqcTable reportData={forcedEnduranceReportData} reportHeaders={FORCED_ENDURANCE_COLUMNS} />
				</>
			)}
		</>
	);
}

export default ReportForcedEndurance;
