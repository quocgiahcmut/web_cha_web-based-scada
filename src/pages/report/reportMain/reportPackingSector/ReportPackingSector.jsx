import { format } from 'date-fns';
import React from 'react';
import data from '../../../../assets/JsonData/report_packing_employee-assessment.json';
import { bgBrush, createExcelFile, drawBorder, saveExcelFile } from '../../../../utils/excel';
import { PACKING_COLUMNS, PACKING_EMPLOYEE_COLUMNS } from '../../../../utils/utils';
import ReportPackingFilter from '../../../../components/reportPackingFilter/ReportPackingFilter';
import ReportPackingTable from '../../../../components/reportPackingTable/ReportPackingTable';
import mocking_packing_report_employee from '../../../../assets/JsonData/mock_packing_report_employee-assessment.json';
import { packingApi } from '../../../../api/axios/packingReport';
const randomColor = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9'];

function ReportPackingSector() {
	const [packingReportData, setPackingReportData] = React.useState([]);
	const [packingEmployeeReportData, setPackingEmployeeReportData] = React.useState([]);
	React.useEffect(() => {
		let filteredData = [];
		(async () => {
			const res = await packingApi.getTemporaryPackingPlanTracking();
			console.log(res.data);
			filteredData = res.data.reduce((acc, cur) => {
				if (acc.find((item) => item.date === cur.date)) {
					cur.items.forEach((item) => {
						acc
							.find((item) => item.date === cur.date)
							.items.push({
								productCode: item.item.id,
								productName: item.item.name,
								unit: item.unitOfMeasurement === 0 ? 'Cái' : 'Bộ',
								quantity: item.actualQuantity,
								note: item.note,
								employee: cur.employee.lastName + ' ' + cur.employee.firstName,
								time: (cur.workingTime / 1000).toFixed(2),
							});
					});
				} else {
					acc.push({
						date: cur.date,
						items: cur.items.map((item) => {
							return {
								productCode: item.item.id,
								productName: item.item.name,
								unit: item.unitOfMeasurement === 0 ? 'Cái' : 'Bộ',
								quantity: item.actualQuantity,
								note: item.note,
								employee: cur.employee.lastName + ' ' + cur.employee.firstName,
								time: (cur.workingTime / 1000).toFixed(2),
							};
						}),
					});
				}
				return acc;
			}, []);
			filteredData.forEach((reportList, index1) => {
				reportList.items.forEach((report, index2) => {
					setPackingReportData((prevState) => [
						...prevState,
						{
							id: index2 + 1,
							color: randomColor[index1 % 9],
							date: reportList.date,
							productCode: report.productCode,
							productName: report.productName,
							unit: report.unit,
							quantity: report.quantity,
							employee: report.employee,
							time: report.time,
							note: report.note,
						},
					]);
				});
			});
		})();
		mocking_packing_report_employee.forEach((reportList, index1) => {
			setPackingEmployeeReportData((prevState) => [
				...prevState,
				{
					id: reportList.id,
					employeeId: reportList.employeeId,
					employee: reportList.employee,
					department: reportList.department,
					workTime: reportList.workTime,
					restTime: reportList.workRest,
					violation: reportList.violation,
					note: reportList.note,
				},
			]);
		});
	}, []);
	const exportReport = React.useCallback(
		(dateSearch, fileName) => {
			const workbook = createExcelFile(data);
			const sheet1 = workbook.getWorksheet('sheet1');

			sheet1.addImage(0, {
				tl: { row: 0.2, col: 0.5 },
				br: { row: 3.8, col: 1.5 },
			});

			sheet1.getColumn('B').width = 22;
			sheet1.getColumn('Q').width = 4;
			sheet1.getRow(6).height = 26;
			sheet1.getRow(8).height = 40;

			for (let c = 1; c <= 20; c++) {
				bgBrush(sheet1, 8, c, 'e7e6e6');
			}

			sheet1.getCell('C7').alignment = {
				horizontal: 'left',
			};
			sheet1.getCell('M6').value = format(new Date(dateSearch), 'dd/MM/yyyy');
			sheet1.getCell('M6').alignment = {
				horizontal: 'center',
				vertical: 'middle',
			};
			let rowIndex1 = 9;
			packingReportData.forEach((item, index) => {
				let dateComparison = item.date;
				sheet1.getRow(rowIndex1).values = [
					item.id,
					item.date,
					item.productCode,
					'',
					item.productName,
					'',
					'',
					'',
					'',
					'',
					item.unit,
					item.quantity,
					item.result,
					item.equipment,
					item.maintenanceResult,
					item.employee,
					'',
					item.time,
					item.note,
				];
				sheet1.getRow(rowIndex1).font = {
					size: 9,
					name: 'Times New Roman',
				};
				sheet1.mergeCells(rowIndex1, 3, rowIndex1, 4);
				sheet1.mergeCells(rowIndex1, 5, rowIndex1, 10);
				sheet1.mergeCells(rowIndex1, 16, rowIndex1, 17);
				sheet1.mergeCells(rowIndex1, 19, rowIndex1, 20);
				rowIndex1++;
				if (index + 1 !== packingReportData.length) {
					if (dateComparison !== packingReportData[index + 1].date) {
						dateComparison = packingReportData[index + 1].date;
						sheet1.mergeCells(rowIndex1, 3, rowIndex1, 4);
						sheet1.mergeCells(rowIndex1, 5, rowIndex1, 10);
						sheet1.mergeCells(rowIndex1, 16, rowIndex1, 17);
						sheet1.mergeCells(rowIndex1, 19, rowIndex1, 20);
						rowIndex1++;
					}
				}
			});
			///-----------------------------------------------
			for (let r = 9; r < rowIndex1; r++) {
				for (let c = 1; c <= 20; c++) {
					drawBorder(sheet1, r, c);
				}
			}

			sheet1.getCell(rowIndex1, 1).value = {
				richText: [{ text: '2.Báo cáo tình hình nhân sự nhóm', font: { bold: true, name: 'Times New Roman' } }],
			};
			sheet1.mergeCells(rowIndex1, 1, rowIndex1, 20);
			sheet1.getRow(rowIndex1 + 1).values = [
				'Stt',
				'',
				'Mã nhân viên',
				'',
				'Tên nhân viên',
				'',
				'',
				'',
				'Bộ phận',
				'',
				'Giờ làm việc KH',
				'',
				'Số giờ nghỉ',
				'',
				'Các vi phạm/nhắc nhở',
				'',
				'',
				'',
				'Ghi chú',
			];
			sheet1.getRow(rowIndex1 + 1).font = {
				name: 'Times New Roman',
			};
			for (let c = 1; c <= 20; c++) {
				bgBrush(sheet1, rowIndex1 + 1, c, 'e7e6e6');
			}

			let rowIndex2 = rowIndex1 + 2;
			///------------------------------------------------------
			packingEmployeeReportData.forEach((item, index) => {
				sheet1.getRow(rowIndex2).values = [
					index + 1,
					'',
					item.employeeId,
					'',
					item.employee,
					'',
					'',
					'',
					item.department,
					'',
					item.workTime,
					'',
					item.restTime,
					'',
					item.violation,
					'',
					'',
					'',
					item.note,
				];
				sheet1.getRow(rowIndex2).font = {
					size: 9,
					name: 'Times New Roman',
				};
				rowIndex2++;
			});
			///-----------------------------------------------------

			for (let r = rowIndex1 + 1; r < rowIndex2; r++) {
				sheet1.mergeCells(r, 3, r, 4);
				sheet1.mergeCells(r, 5, r, 8);
				sheet1.mergeCells(r, 9, r, 10);
				sheet1.mergeCells(r, 11, r, 12);
				sheet1.mergeCells(r, 13, r, 14);
				sheet1.mergeCells(r, 15, r, 18);
				sheet1.mergeCells(r, 19, r, 20);
			}

			for (let r = rowIndex1 + 1; r < rowIndex2; r++) {
				for (let c = 1; c <= 20; c++) {
					drawBorder(sheet1, r, c, 'top', 'bottom');
					if (c === 2 || c === 3 || c === 5 || c === 9 || c === 11 || c === 13 || c === 15 || c === 19) {
						drawBorder(sheet1, r, c);
					}
					if (c === 20) {
						drawBorder(sheet1, r, c, 'top', 'bottom', 'right');
					}
				}
			}

			sheet1.getCell(rowIndex1, 1).alignment = {
				horizontal: 'left',
			};

			sheet1.getRow(rowIndex2).values = [
				'Báo cáo khác',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'Lập báo cáo',
				'',
				'Xem xét',
				'',
				'Duyệt',
				's',
				'Thống kê',
			];
			sheet1.getRow(rowIndex2).font = {
				name: 'Times New Roman',
			};
			sheet1.mergeCells(rowIndex2, 1, rowIndex2 + 5, 12);
			sheet1.getCell(rowIndex2, 1).font = { bold: true };
			sheet1.getCell(rowIndex2, 1).alignment = {
				horizontal: 'left',
				vertical: 'top',
			};

			for (let c = 13; c <= 20; c++) {
				if (c % 2 === 1) {
					sheet1.mergeCells(rowIndex2, c, rowIndex2, c + 1);
					sheet1.mergeCells(rowIndex2 + 1, c, rowIndex2 + 4, c + 1);
					sheet1.mergeCells(rowIndex2 + 5, c, rowIndex2 + 5, c + 1);
				}
			}
			for (let r = 6; r <= rowIndex2 + 5; r++) {
				for (let c = 1; c <= 20; c++) {
					drawBorder(sheet1, r, c);
				}
			}
			saveExcelFile(workbook, `${fileName}`);
		},
		[packingEmployeeReportData, packingReportData]
	);
	const onSubmit = React.useCallback((value) => {
		console.log(value);
	}, []);
	return (
		<>
			<ReportPackingFilter exportReport={exportReport} onSubmit={onSubmit} />
			<ReportPackingTable
				style={{
					display: 'none',
				}}
				reportData={packingEmployeeReportData}
				reportHeaders={PACKING_EMPLOYEE_COLUMNS}
			/>
			<ReportPackingTable reportData={packingReportData} reportHeaders={PACKING_COLUMNS} />
		</>
	);
}

export default ReportPackingSector;
