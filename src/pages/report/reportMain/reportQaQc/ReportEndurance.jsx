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
	setEnduranceReportDataDate,
} from '../../../../redux/slice/QaQcReportSlice';

function ReportEndurance() {
	const qaQcReportReducer = useSelector((state) => state.qaQcReportData);
	const enduranceReportData = qaQcReportReducer.enduranceReportData;
	const dateAssigned = qaQcReportReducer.enduranceReportDataDate;
	const dispatch = useDispatch();
	// const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const exportReport = (productName, dateStart, dateEnd, purpose, note) => {
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

		switch (purpose) {
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
				assignPurpose.richText[1].text = `Định kỳ □                           Bất thường □                           SP mới □                            Khác ☑      ${note}`;
				break;
			default:
				break;
		}

		sheet1.getCell('A9').value = assignPurpose;
		sheet1.getCell('A9').alignment = { vertical: 'middle', horizontal: 'left' };
		sheet1.getCell('D8').value = dateAssigned.startTime;
		sheet1.getCell('K8').value = dateAssigned.stopTime;
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
		saveExcelFile(workbook, `Phiếu kiểm tra đóng êm ${productName} ${format(new Date(), 'dd-MM-yyyy')}`);
	};

	const onSubmit = (values) => {
		dispatch(resetEnduranceReportData());
		setLoading(true);
		qaQcApi
			.getEnduranceReport(values.dateStart, values.dateEnd)
			.then((res) => {
				setLoading(false);
				if (res) {
					res[0].reliabilityTestSheets?.forEach((item) => {
						dispatch(
							setEnduranceReportData({
								sample: item.numberTesting,
								time: item.timeSmoothClosingLid,
								toilet_bumper: item.statusLidNotFall,
								no_oil_spill: item.statusLidNotLeak,
								first_result: item.statusLidResult,
								closing_time: item.timeSmoothClosingPlinth,
								no_drop_bumper: item.statusPlinthNotFall,
								no_spill: item.statusPlinthNotLeak,
								second_result: item.statusPlinthResult,
								total: item.totalError,
								note: item.note,
								employee: item.employee,
							})
						);
						dispatch(
							setEnduranceReportDataDate({
								startTime: format(new Date(res[0].startTime), 'dd/MM/yyyy'),
								stopTime: format(new Date(res[0].stopTime), 'dd/MM/yyyy'),
							})
						);
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				setError(err);
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
				<ReportQaqcTable reportData={enduranceReportData} reportHeaders={ENDURANCE_COLUMNS} />
			)}
		</>
	);
}

export default ReportEndurance;
