import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReportQaqcFilter from '../../../../components/reportQaqcFilter/ReportQaqcFilter';
import { createExcelFile, drawBorder, drawDottedBorder, saveExcelFile } from '../../../../utils/excel';
import staticLoadConvention from '../../../../assets/JsonData/report_qaqc_static-load.json';
import bendingConvention from '../../../../assets/JsonData/report_qaqc_bending.json';
import rockTestConvention from '../../../../assets/JsonData/report_qaqc_rock-test.json';
import { format } from 'date-fns';
import {
	STATIC_LOAD_DEFORMATION_COLUMNS,
	ROCK_TEST_DEFORMATION_COLUMNS,
	BENDING_DEFORMATION_COLUMNS,
} from '../../../../utils/utils';
import { qaQcApi } from '../../../../api/axios/qaqcReport';
import {
	resetDeformationReportData,
	setDeformationReportData,
	setDeformationReportDataDate,
	setDeformationOverviewData,
} from '../../../../redux/slice/QaQcReportSlice';

function ReportDeformation() {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const dispatch = useDispatch();
	const { deformationOverviewData, deformationReportData, deformationReportDataDate } = useSelector(
		(state) => state.qaQcReportData
	);
	const exportReport = (testType) => {
		const workbook = createExcelFile(
			testType === 'static-load'
				? staticLoadConvention
				: testType === 'bending'
				? bendingConvention
				: rockTestConvention,
			11
		);
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

		switch (testType) {
			case 'static-load':
				sheet1.getRow(12).height = 30;
				sheet1.getRow(13).height = 30;
				break;
			case 'bending':
				sheet1.getRow(12).height = 30;
				sheet1.getRow(12).height = 30;
				break;
			case 'rock-test':
				sheet1.getRow(12).height = 30;
				sheet1.getRow(12).height = 30;
				break;
			default:
				break;
		}
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

		switch (deformationOverviewData.purpose) {
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
				assignPurpose.richText[1].text = `Định kỳ □                           Bất thường □                           SP mới □                            Khác ☑      ${deformationOverviewData.testNote}`;
				break;
			default:
				break;
		}
		sheet1.getCell('D6').value = deformationOverviewData.productName;
		sheet1.getCell('M6').value = deformationOverviewData.productId;
		sheet1.getCell('A9').value = assignPurpose;
		sheet1.getCell('A9').alignment = { vertical: 'middle', horizontal: 'left' };
		sheet1.getCell('D8').value = deformationReportDataDate.startTime;
		sheet1.getCell('K8').value = deformationReportDataDate.stopTime;
		switch (testType) {
			case 'static-load':
				deformationReportData?.forEach((item, index) => {
					const row = sheet1.getRow(index + 14);
					row.height = 30;
					row.alignment = { vertical: 'middle', horizontal: 'center' };
					row.values = [item.id, item.result, '', '', '', '', '', '', '', item.total, item.note, '', '', item.employee];
					row.font = { name: 'Times New Roman', size: 11 };
				});
				break;
			case 'bending':
				deformationReportData?.forEach((item, index) => {
					const row = sheet1.getRow(index + 14);
					row.height = 30;
					row.alignment = { vertical: 'middle', horizontal: 'center' };
					row.values = [
						item.id,
						item.weight,
						'',
						item.number_of_test,
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
				break;
			case 'rock-test':
				deformationReportData?.forEach((item, index) => {
					const row = sheet1.getRow(index + 14);
					row.height = 30;
					row.alignment = { vertical: 'middle', horizontal: 'center' };
					row.values = [
						item.id,
						item.weight,
						'',
						item.number_of_test,
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
				break;
			default:
				[...Array(5).keys()].forEach((item, index) => {
					const row = sheet1.getRow(index + 14);
					row.height = 30;
					row.alignment = { vertical: 'middle', horizontal: 'center' };
					row.values = [index + 1];
					row.font = { name: 'Times New Roman', size: 11 };
				});
				break;
		}

		//merge cells
		for (let i = 14; i <= 18; i++) {
			sheet1.mergeCells(`K${i}:M${i}`);
		}
		switch (testType) {
			case 'static-load':
				for (let i = 14; i <= 18; i++) {
					sheet1.mergeCells(`B${i}:I${i}`);
				}
				break;
			case 'bending':
				for (let i = 14; i <= 18; i++) {
					sheet1.mergeCells(`B${i}:C${i}`);
					sheet1.mergeCells(`D${i}:F${i}`);
					sheet1.mergeCells(`G${i}:I${i}`);
				}
				break;
			case 'rock-test':
				for (let i = 14; i <= 18; i++) {
					sheet1.mergeCells(`B${i}:C${i}`);
					sheet1.mergeCells(`D${i}:F${i}`);
					sheet1.mergeCells(`G${i}:I${i}`);
				}
				break;
			default:
				break;
		}
		//set border
		for (let r = 14; r <= 18; r++) {
			for (let c = 1; c <= 14; c++) {
				drawBorder(sheet1, r, c, 'left', 'right', 'bottom');
			}
		}

		for (let c = 1; c <= 14; c++) {
			drawBorder(sheet1, 20, c, 'top');
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
			`${
				testType === 'rock-test'
					? 'Phiếu kiểm tra rock test'
					: testType === 'bending'
					? 'Phiếu kiểm tra lực uốn'
					: 'Phiếu kiểm tra chịu tải tĩnh'
			} ${deformationOverviewData.productName} ${format(new Date(), 'dd-MM-yyyy')}`
		);
	};
	const onSubmit = (values) => {
		dispatch(resetDeformationReportData());
		setLoading(true);
		const filteredData = [];

		switch (values.testType) {
			case 'static-load':
				qaQcApi
					.getStaticLoadReport('2020-01-01', '2023-01-01')
					.then((res) => {
						console.log(res.data.items[0]);
						setLoading(false);
						if (res.data.items.length > 0) {
							res.data.items[0].samples?.forEach((item, index) => {
								filteredData.push({
									id: index + 1,
									result: item.status,
									total: item.numberOfErrors,
									note: item.note,
									employee: res.data.items[0].tester.lastName + ' ' + res.data.items[0].tester.firstName,
								});
							});
							dispatch(
								setDeformationReportDataDate({
									startTime: format(new Date(res.data.items[0].startDate), 'dd/MM/yyyy'),
									stopTime: format(new Date(res.data.items[0].endDate), 'dd/MM/yyyy'),
								})
							);
							dispatch(
								setDeformationOverviewData({
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
							dispatch(setDeformationReportData(filteredData));
						} else {
							setError('Không có dữ liệu trong ngày, vui lòng thử lại');
						}
					})
					.catch((err) => {
						setLoading(false);
						setError(`Có lỗi xảy ra, vui lòng thử lại: \n ${err}`);
					});
				break;
			case 'bending':
				qaQcApi
					.getCurlingForceReport('2020-01-01', '2023-01-01')
					.then((res) => {
						console.log(res.data.items[0]);
						setLoading(false);
						if (res.data.items.length > 0) {
							res.data.items[0].samples?.forEach((item, index) => {
								filteredData.push({
									id: index + 1,
									weight: (item.load / 1000).toFixed(2),
									number_of_test: (item.duration / 1000).toFixed(2),
									result: item.deformationDegree,
									total: item.numberOfError,
									note: item.note,
									employee: res.data.items[0].tester.lastName + ' ' + res.data.items[0].tester.firstName,
								});
							});
							dispatch(setDeformationReportData(filteredData));
							dispatch(
								setDeformationOverviewData({
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
								setDeformationReportDataDate({
									startTime: format(new Date(res.data.items[0].startDate), 'dd/MM/yyyy'),
									stopTime: format(new Date(res.data.items[0].endDate), 'dd/MM/yyyy'),
								})
							);
						} else {
							setError('Không có dữ liệu trong ngày, vui lòng thử lại');
						}
					})
					.catch((err) => {
						setLoading(false);
						setError(`Có lỗi xảy ra, vui lòng thử lại: \n ${err}`);
					});

				break;
			case 'rock-test':
				qaQcApi
					.getRockTestReport('2020-01-01', '2023-01-01')
					.then((res) => {
						setLoading(false);
						if (res.data.items.length > 0) {
							res.data.items[0].samples?.forEach((item, index) => {
								filteredData.push({
									id: index + 1,
									weight: (item.load / 1000).toFixed(2),
									number_of_test: item.testedTimes,
									result: item.passed === true ? 'Oke' : 'Lỗi',
									total: item.numberOfErrors,
									note: item.note,
									employee: res.data.items[0].tester.lastName + ' ' + res.data.items[0].tester.firstName,
								});
							});
							dispatch(setDeformationReportData(filteredData));
							dispatch(
								setDeformationOverviewData({
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
								setDeformationReportDataDate({
									startTime: format(new Date(res.data.items[0].startDate), 'dd/MM/yyyy'),
									stopTime: format(new Date(res.data.items[0].endDate), 'dd/MM/yyyy'),
								})
							);
						} else {
							setError('Không có dữ liệu trong ngày, vui lòng thử lại');
						}
					})
					.catch((err) => {
						setLoading(false);
						setError(`Có lỗi xảy ra, vui lòng thử lại: \n ${err}`);
					});
				break;
			default:
				break;
		}
	};
	return (
		<>
			<ReportQaqcFilter
				deformation={true}
				onSubmit={onSubmit}
				exportReport={exportReport}
				overviewData={deformationOverviewData}
				reportData={deformationReportData}
				reportHeaders={{
					staticLoad: STATIC_LOAD_DEFORMATION_COLUMNS,
					rockTest: ROCK_TEST_DEFORMATION_COLUMNS,
					bending: BENDING_DEFORMATION_COLUMNS,
				}}
				loading={loading}
				error={error}
				dataDisplay={deformationReportData}
			/>
		</>
	);
}

export default ReportDeformation;
