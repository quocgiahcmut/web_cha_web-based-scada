import exceljs from 'exceljs';
import { saveAs } from 'file-saver';
import logoImg from '../assets/images/logo.jpg';

const createExcelFile = (data, fontSize = 10) => {
	const workbook = new exceljs.Workbook();
	workbook.creator = 'Web-based SCADA';
	workbook.views = [
		{
			x: 0,
			y: 0,
			width: 10000,
			height: 20000,
			firstSheet: 0,
			activeTab: 1,
			visibility: 'visible',
		},
	];

	workbook.addImage({
		base64: logoImg,
		extension: 'jpeg',
	});

	const sheet1 = workbook.addWorksheet('sheet1');
	sheet1.state = 'visible';

	data.cellValues.forEach((cellValue) => {
		sheet1.getCell(cellValue.cell).value = cellValue.text;
		if (cellValue.font) {
			sheet1.getCell(cellValue.cell).font = cellValue.font;
		}
	});

	data.cellMergers.forEach((blockAdr) => sheet1.mergeCells(blockAdr));

	for (let r = 1; r <= 100; r++) {
		for (let c = 1; c <= 50; c++) {
			const cell = sheet1.getCell(r, c);
			cell.alignment = {
				vertical: 'middle',
				horizontal: 'center',
				wrapText: true,
			};
			cell.style.font = {
				...cell.style.font,
				name: 'Times New Roman',
				size: cell.style.font?.size ? cell.style.font.size : fontSize,
			};
		}
	}

	return workbook;
};

const saveExcelFile = async (workbook, fileName = 'excel-file') => {
	const sheet1 = workbook.getWorksheet('sheet1');
	sheet1.eachRow((row) =>
		row.eachCell(
			(cell) =>
				(cell.style.border = cell.style.border
					? cell.style.border
					: {
							top: { style: 'thin' },
							bottom: { style: 'thin' },
							left: { style: 'thin' },
							right: { style: 'thin' },
					  })
		)
	);
	try {
		const buffer = await workbook.xlsx.writeBuffer();
		const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		const fileExtension = '.xlsx';
		const blob = new Blob([buffer], { type: fileType });
		saveAs(blob, fileName + fileExtension);
	} catch (error) {
		alert(error);
	}
};

const bgBrush = (sheet, r, c, color) =>
	(sheet.getCell(r, c).fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: color },
	});

const drawBorder = (sheet, r, c, ...borders) => {
	if (borders.length === 0) {
		sheet.getCell(r, c).border = {
			top: { style: 'thin' },
			bottom: { style: 'thin' },
			left: { style: 'thin' },
			right: { style: 'thin' },
		};
	} else {
		const borderStyle = {};
		borders.map((edge) => Object.defineProperty(borderStyle, edge, { value: { style: 'thin' } }));
		sheet.getCell(r, c).border = borderStyle;
	}
};

const drawDottedBorder = (sheet, r, c, ...borders) => {
	if (borders.length === 0) {
		sheet.getCell(r, c).border = {
			top: { style: 'dotted' },
			bottom: { style: 'dotted' },
			left: { style: 'dotted' },
			right: { style: 'dotted' },
		};
	} else {
		const borderStyle = {};
		borders.map((edge) => Object.defineProperty(borderStyle, edge, { value: { style: 'dotted' } }));
		sheet.getCell(r, c).border = borderStyle;
	}
};

export { createExcelFile, saveExcelFile, bgBrush, drawBorder, drawDottedBorder };
