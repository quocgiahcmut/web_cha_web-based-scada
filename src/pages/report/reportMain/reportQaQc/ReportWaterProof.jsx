import React from 'react';
import ReportQaqcFilter from '../../../../components/reportQaqcFilter/ReportQaqcFilter';
import { createExcelFile, drawBorder, drawDottedBorder, saveExcelFile } from '../../../../utils/excel';
import convention from '../../../../assets/JsonData/report_qaqc_water-proof.json';
import waterProofData from '../../../../assets/JsonData/mock_water-proof_report.json';
import { format } from 'date-fns';
import ReportQaqcTable from '../../../../components/reportQaqcTable/ReportQaqcTable';
import { WATER_PROOF_COLUMNS } from '../../../../utils/utils';
import { qaQcApi } from '../../../../api/axios/qaqcReport';
import { useDispatch, useSelector } from 'react-redux';
import {
	setWaterProofOverviewData,
	setWaterProofReportData,
	setWaterProofReportDataDate,
} from '../../../../redux/slice/QaQcReportSlice';
import QaqcOverviewReportTable from '../../../../components/qaqcOverviewReportTable/QaqcOverviewReportTable';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
function ReportWaterProof() {
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();
	const { waterProofReportData, waterProofOverviewData, waterProofReportDataDate } = useSelector(
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
		sheet1.getRow(8).height = 20;
		sheet1.getRow(6).height = 20;
		sheet1.getRow(10).height = 40;
		sheet1.getColumn(14).width = 40;
		sheet1.getRow(9).height = 40;
		sheet1.getRow(11).height = 20;
		sheet1.getRow(26).height = 95;
		sheet1.getRow(12).height = 30;
		sheet1.getRow(13).height = 30;
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

		switch (waterProofOverviewData.purpose) {
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
				assignPurpose.richText[1].text = `Định kỳ □                           Bất thường □                           SP mới □                            Khác ☑      ${waterProofOverviewData.note}`;
				break;
			default:
				break;
		}
		sheet1.getCell('D6').value = waterProofOverviewData.productName;
		sheet1.getCell('M6').value = waterProofOverviewData.productId;
		sheet1.getCell('A9').value = assignPurpose;
		sheet1.getCell('A9').alignment = { vertical: 'middle', horizontal: 'left' };
		sheet1.getCell('D8').value = waterProofReportDataDate.startTime;
		sheet1.getCell('K8').value = waterProofReportDataDate.stopTime;
		// [...Array(5).keys()].forEach((item, index) => {
		// 	const row = sheet1.getRow(index + 16);
		// 	row.values = [(index + 1) * 5000];
		// 	row.font = { name: 'Times New Roman', size: 11 };
		// 	row.height = 20;
		// });
		waterProofData?.forEach((item, index) => {
			const row = sheet1.getRow(index + 14);
			row.height = 30;
			row.alignment = { vertical: 'middle', horizontal: 'center' };
			row.values = [
				item.id,
				item.temperature,
				'',
				item.time,
				'',
				'',
				item.result,
				'',
				'',
				item.total,
				item.note,
				'',
				'',
				item.employee,
			];
			row.font = { name: 'Times New Roman', size: 11 };
		});
		//merge cells
		for (let i = 14; i <= 18; i++) {
			sheet1.mergeCells(`K${i}:M${i}`);
		}
		sheet1.getColumn(14).width = 40;
		//set border
		for (let i = 14; i <= 18; i++) {
			sheet1.mergeCells(`B${i}:C${i}`);
			sheet1.mergeCells(`D${i}:F${i}`);
			sheet1.mergeCells(`G${i}:I${i}`);
		}
		for (let r = 14; r <= 18; r++) {
			for (let c = 1; c <= 14; c++) {
				drawBorder(sheet1, r, c, 'left', 'right', 'top', 'bottom');
			}
		}

		for (let c = 1; c <= 14; c++) {
			drawBorder(sheet1, 20, c, 'top');
		}
		for (let r = 20; r <= 23; r++) {
			drawBorder(sheet1, r, 14, 'right');
		}
		for (let r = 20; r <= 23; r++) {
			drawBorder(sheet1, r, 14, 'right');
		}
		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 21, c, 'top', 'bottom');
		}

		for (let c = 3; c <= 14; c++) {
			drawDottedBorder(sheet1, 22, c, 'bottom');
		}
		drawBorder(sheet1, 20, 14, 'top', 'right');

		//save file to pc
		saveExcelFile(
			workbook,
			`Phiếu kiểm tra đóng chống thấm nước ${waterProofOverviewData.productName} ${format(new Date(), 'dd-MM-yyyy')}`
		);
	}, [waterProofOverviewData, waterProofReportDataDate]);
	const onSubmit = React.useCallback(
		(values) => {
			setLoading(true);
			let filteredData = [];
			qaQcApi
				.getWaterProofReport(values.dateStart, values.dateEnd)
				.then((res) => {
					setLoading(false);
					res.data.items.forEach((item, index) => {
						filteredData.push({
							id: index + 1,
							temperature: item.temperature,
							time: item.time,
							result: item.passed ? 'Oke' : 'Lỗi',
							total: item.numberOfError,
							note: item.note,
							employee: item.tester.lastName + ' ' + item.tester.firstName,
						});
					});
					dispatch(setWaterProofReportData(filteredData));
					dispatch(
						setWaterProofReportDataDate({
							startTime: format(new Date(res.data.items[0].startDate), 'dd/MM/yyyy'),
							stopTime: format(new Date(res.data.items[0].endDate), 'dd/MM/yyyy'),
						})
					);
					dispatch(
						setWaterProofOverviewData({
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
				})
				.catch((err) => {
					setLoading(false);
					console.error(err);
					setError(err);
				});
		},
		[dispatch]
	);
	return (
		<>
			<ReportQaqcFilter dataDisplay={[]} onSubmit={onSubmit} exportReport={exportReport} />
			{loading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : waterProofReportData.length <= 0 ? (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			) : (
				<>
					<QaqcOverviewReportTable overviewData={waterProofOverviewData} />
					<ReportQaqcTable reportData={waterProofReportData} reportHeaders={WATER_PROOF_COLUMNS} />
					{/* <ReportEndurance reportData={enduranceOverviewData} reportHeaders={QAQC_OVERVIEW_COLUMNS} /> */}
					{/* <code>{JSON.stringify(enduranceReportData, null, 2)}</code> */}
				</>
			)}
		</>
	);
}

export default ReportWaterProof;
