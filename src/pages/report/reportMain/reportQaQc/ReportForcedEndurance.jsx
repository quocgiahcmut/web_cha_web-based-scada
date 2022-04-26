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
} from '../../../../redux/slice/QaQcReportSlice';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';

function ReportForcedEndurance() {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const dispatch = useDispatch();
	const forcedEnduranceReportReducer = useSelector((state) => state.qaQcReportData);
	const forcedEnduranceReportData = forcedEnduranceReportReducer.forcedEnduranceReportData;
	const forcedEnduranceReportDataDate = forcedEnduranceReportReducer.forcedEnduranceReportDataDate;
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
		saveExcelFile(workbook, `Phiếu kiểm tra đóng cưỡng bức ${productName} ${format(new Date(), 'dd-MM-yyyy')}`);
	};
	const onSubmit = (values) => {
		dispatch(resetForcedEnduranceReportData());
		setLoading(true);
		qaQcApi
			.getForcedEnduranceReport(values.dateStart, values.dateEnd)
			.then((res) => {
				setLoading(false);
				if (res) {
					res[0].deformationTestSheets?.forEach((item) => {
						dispatch(
							setForcedEnduranceReportData({
								sample: item.numberTesting,
								time: item.timeSmoothClosingLid,
								toilet_bumper: item.statusLidNotBreak,
								no_oil_spill: item.statusLidNotLeak,
								first_result: item.statusLidResult,
								closing_time: item.timeSmoothClosingPlinth,
								no_drop_bumper: item.statusPlinthNotBreak,
								no_spill: item.statusPlinthNotLeak,
								second_result: item.statusPlinthResult,
								total: item.totalError,
								note: item.note,
								employee: item.employee,
							})
						);
						dispatch(
							setForcedEnduranceReportDataDate({
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
			<ReportQaqcFilter dataDisplay={forcedEnduranceReportData} onSubmit={onSubmit} exportReport={exportReport} />
			{loading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : forcedEnduranceReportData.length <= 0 ? (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			) : (
				<ReportQaqcTable reportData={forcedEnduranceReportData} reportHeaders={FORCED_ENDURANCE_COLUMNS} />
			)}
		</>
	);
}

export default ReportForcedEndurance;
