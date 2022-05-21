import { format } from 'date-fns';
import React from 'react';
import ProgressBar from '../components/progressBar/ProgressBar';
function convertHMS(value) {
	const sec = parseInt(value, 10); // convert value to number if it's string
	let hours = Math.floor(sec / 3600); // get hours
	let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
	let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
	// add 0 if value < 10; Example: 2 => 02
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return hours + ' tiếng ' + minutes + ' phút'; // Return is HH : MM : SS
}

const packingEmployees = ['Nguyễn Hữu Tâm', 'Trần Hải Văn', 'Danh Khả', 'Nguyễn Thanh Định'];

const packingState = {
	onProcess: 'primary',
	onFinish: 'success',
	onIdle: 'warning',
	onCancel: 'danger',
	onWait: 'wait',
};

const REPORT_MENU_LIST = [
	{
		title: 'Phòng QA/QC thiết bị',
		url: '/layout/report/main/qaqc',
	},
	{
		title: 'Khu vực đóng gói',
		url: '/layout/report/main/packing',
	},
	{
		title: 'Khu vực máy ép',
		url: '/layout/report/main/injection',
	},
];

const MONITOR_INJECTION_LIST = [
	{
		title: 'BẢNG',
		url: '/layout/report/injection/pages/1',
	},
	{
		title: 'BẢN ĐỒ',
		url: '/layout/report/injection/map',
	},
];

const QA_QC_REPORT_MENU_LIST = [
	{
		title: 'MKT Độ bền NBC',
		url: '/layout/report/main/qaqc/endurance',
	},
	{
		title: 'MKT Độ bền cưỡng bức NBC',
		url: '/layout/report/main/qaqc/forced-endurance',
	},
	{
		title: 'MKT Độ biến dạng NBC',
		url: '/layout/report/main/qaqc/deformation',
	},
	{
		title: 'MKT Chống thấm NBC',
		url: '/layout/report/main/qaqc/water-proof',
	},
];
const PLAN_TRACKING_MENU_LIST = [
	{
		title: 'LỊCH TRÌNH ĐÓNG GÓI',
		url: '/layout/plan-tracking/daily/packing',
	},
	{
		title: 'LỊCH TRÌNH MÁY ÉP',
		url: '/layout/plan-tracking/daily/injection',
	},
];
const MONTHLY_PLAN_TRACKING_MENU_LIST = [
	{
		title: 'KHSX ĐÓNG GÓI',
		url: '/layout/plan-tracking/monthly/packing',
	},
	{
		title: 'KHSX MÁY ÉP',
		url: '/layout/plan-tracking/monthly/injection',
	},
];

const ENDURANCE_COLUMNS = [
	{
		Header: 'Số lần thử',
		accessor: 'sample',
	},
	{
		Header: 'Thời gian nắp đóng êm',
		accessor: 'time',
	},
	{
		Header: 'Chân nắp không rơi ra',
		accessor: 'toilet_bumper',
	},
	{
		Header: 'Không rò rỉ dầu',
		accessor: 'no_oil_spill',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'first_result',
	},
	{
		Header: 'Thời gian đế đóng êm',
		accessor: 'closing_time',
	},
	{
		Header: 'Chân đế không rơi',
		accessor: 'no_drop_bumper',
	},
	{
		Header: 'Không rò rỉ',
		accessor: 'no_spill',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'second_result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const STATIC_LOAD_DEFORMATION_COLUMNS = [
	{
		Header: 'Mẫu số',
		accessor: 'id',
	},
	{
		Header: 'Kết quả kiểm tra chịu tải tĩnh trong 3 phút',
		accessor: 'result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const BENDING_DEFORMATION_COLUMNS = [
	{
		Header: 'Mẫu số',
		accessor: 'id',
	},
	{
		Header: 'Tải trọng',
		accessor: 'weight',
	},
	{
		Header: 'Thời gian',
		accessor: 'number_of_test',
	},
	{
		Header: 'Độ cong vênh',
		accessor: 'result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Nhận xét',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const ROCK_TEST_DEFORMATION_COLUMNS = [
	{
		Header: 'Mẫu số',
		accessor: 'id',
	},
	{
		Header: 'Tải trọng',
		accessor: 'weight',
	},
	{
		Header: 'Số lần thử nghiệm',
		accessor: 'number_of_test',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const FORCED_ENDURANCE_COLUMNS = [
	{
		Header: 'Số lần thử',
		accessor: 'sample',
	},
	{
		Header: 'Thời gian nắp đóng êm',
		accessor: 'time',
	},
	{
		Header: 'Chân nắp không nứt vỡ',
		accessor: 'toilet_bumper',
	},
	{
		Header: 'Không rò rỉ dầu',
		accessor: 'no_oil_spill',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'first_result',
	},
	{
		Header: 'Thời gian đế đóng êm',
		accessor: 'closing_time',
	},
	{
		Header: 'Chân đế không nứt vỡ',
		accessor: 'no_drop_bumper',
	},
	{
		Header: 'Không rò rỉ',
		accessor: 'no_spill',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'second_result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const COLUMNS = [
	{
		Header: 'Thời gian',
		Footer: 'Thời gian',
		width: 80,
		accessor: 'date',
		Cell: ({ value }) => {
			return format(new Date(value), 'dd-MM-yyyy HH:mm:ss');
		},
		disableSortBy: true,
	},
	{
		Header: 'Mã lỗi',
		Footer: 'Mã lỗi',
		width: 40,
		accessor: 'error_code',
		disableSortBy: true,
	},
	{
		Header: 'Khu vực',
		Footer: 'Khu vực',
		width: 100,
		accessor: 'error_sector',
		disableSortBy: true,
	},
	{
		Header: 'Chi tiết',
		Footer: 'Chi tiết',
		width: 200,
		accessor: 'error_msg',
		disableSortBy: true,
	},
	{
		Header: 'Mức độ ưu tiên',
		Footer: 'Mức độ ưu tiên',
		width: 30,
		accessor: 'priority',
		Cell: ({ value }) => {
			switch (value) {
				case 'low':
					return 'Thấp';
				case 'middle':
					return 'Trung bình';
				case 'high':
					return 'Cao';
				default:
					break;
			}
		},
		disableFilters: true,
	},
];

const PACKING_COLUMNS = [
	{
		Header: 'STT',
		accessor: 'id',
		width: 60,
		disableSortBy: true,
		disableFilters: true,
	},
	{
		Header: 'Ngày',
		accessor: 'date',
		width: 120,
		disableFilters: true,
	},
	{
		Header: 'Mã công việc',
		accessor: 'productCode',
		disableSortBy: true,
	},
	{
		Header: 'Tên công việc',
		accessor: 'productName',
		width: 400,
		disableSortBy: true,
	},
	{
		Header: 'Đvt',
		accessor: 'unit',
		width: 60,
		disableFilters: true,
	},
	{
		Header: 'Số lượng',
		accessor: 'quantity',
		width: 80,
		disableSortBy: true,
	},
	{
		Header: 'Người thực hiện',
		accessor: 'employee',
		width: 80,
		disableSortBy: true,
	},
	{
		Header: 'Thời gian thực hiện',
		accessor: 'time',
		width: 120,
		disableFilters: true,
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
		width: 200,
		disableSortBy: true,
	},
	{
		Header: 'Màu',
		accessor: 'color',
		show: false,
	},
];

const WATER_PROOF_COLUMNS = [
	{
		Header: 'Mẫu số',
		accessor: 'id',
	},
	{
		Header: 'Nhiệt độ máy',
		accessor: 'temperature',
	},
	{
		Header: 'Thời gian',
		accessor: 'time',
	},
	{
		Header: 'Kết quả đánh giá',
		accessor: 'result',
	},
	{
		Header: 'Tổng lỗi',
		accessor: 'total',
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên KT',
		accessor: 'employee',
	},
];

const PACKING_EMPLOYEE_COLUMNS = [
	{
		Header: 'STT',
		accessor: 'id',
		width: 60,
		disableFilters: true,
		disableSortBy: true,
	},
	{
		Header: 'Mã nhân viên',
		accessor: 'employeeId',
		width: 100,
		disableSortBy: true,
	},
	{
		Header: 'Tên nhân viên',
		accessor: 'employee',
		disableSortBy: true,
	},
	{
		Header: 'Bộ phận',
		accessor: 'department',
		disableSortBy: true,
	},
	{
		Header: 'Giờ làm việc KH',
		accessor: 'workTime',
		disableFilters: true,
	},
	{
		Header: 'Số giờ nghỉ',
		accessor: 'restTime',
		disableFilters: true,
	},
	{
		Header: 'Các vi phạm/nhắc nhở',
		accessor: 'violation',
		disableFilters: true,
	},
	{
		Header: 'Ghi chú',
		accessor: 'note',
		disableSortBy: true,
	},
];

const INJECTION_MACHINE_ID = [
	{
		title: 'M28',
		isHaitian: true,
		subTitle: 'SM150',
		url: '/layout/injection/m28',
	},
	{
		title: 'M26',
		isHaitian: true,
		subTitle: 'MA90',
		url: '/layout/injection/m26',
	},
	{
		title: 'M24',
		isHaitian: true,
		subTitle: 'MA120',
		url: '/layout/injection/m24',
	},
	{
		title: 'M22',
		isHaitian: true,
		subTitle: 'MA90',
		url: '/layout/injection/m22',
	},
	{
		title: 'M20',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m20',
	},
	{
		title: 'M18',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m18',
	},
	{
		title: 'M16',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m16',
	},
	{
		title: 'M14',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m14',
	},
	{
		title: 'M12',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m12',
	},
	{
		title: 'M10',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m10',
	},
	{
		title: 'M8',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m8',
	},
	{
		title: 'M6',
		isHaitian: true,
		subTitle: 'MA120',
		url: '/layout/injection/m6',
	},
	{
		title: 'M4',
		isHaitian: true,
		subTitle: 'ZE90',
		url: '/layout/injection/m4',
	},
	{
		title: 'M2',
		isHaitian: true,
		subTitle: 'TMC\n200ES',
		url: '/layout/injection/m2',
	},
	{
		title: 'M27',
		isHaitian: true,
		subTitle: 'TMC\n250ES',
		url: '/layout/injection/m27',
	},
	{
		title: 'M25',
		isHaitian: true,
		subTitle: 'MA90',
		url: '/layout/injection/m25',
	},
	{
		title: 'M23',
		isHaitian: true,
		subTitle: 'MA120',
		url: '/layout/injection/m23',
	},
	{
		title: 'M21',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m21',
	},
	{
		title: 'M19',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m19',
	},
	{
		title: 'M17',
		isHaitian: true,
		subTitle: 'MA160',
		url: '/layout/injection/m17',
	},
	{
		title: 'M15',
		isHaitian: true,
		subTitle: 'MA250',
		url: '/layout/injection/m15',
	},
	{
		title: 'M13',
		isHaitian: true,
		subTitle: 'MA250',
		url: '/layout/injection/m13',
	},
	{
		title: 'M11',
		isHaitian: true,
		subTitle: 'MA250',
		url: '/layout/injection/m11',
	},
	{
		title: 'M9',
		isHaitian: true,
		subTitle: 'MA250',
		url: '/layout/injection/m9',
	},
	{
		title: 'M7',
		isHaitian: true,
		subTitle: 'MA250',
		url: '/layout/injection/m7',
	},
	{
		title: 'M5',
		subTitle: 'MA120',
		isHaitian: true,
		url: '/layout/injection/m5',
	},
	{
		title: 'M3',
		isHaitian: true,
		subTitle: 'ZE90',
		url: '/layout/injection/m3',
	},
	{
		title: 'M1',
		isHaitian: true,
		subTitle: 'CLF\n125T',
		url: '/layout/injection/m1',
	},
	{
		title: 'L6',
		isHaitian: true,
		subTitle: 'CLF 800T',
		url: '/layout/injection/l6',
	},
	{
		title: 'L7',
		isHaitian: true,
		subTitle: 'JM 600-C',
		url: '/layout/injection/l7',
	},
	{
		title: 'L8',
		isHaitian: true,
		subTitle: 'HC 800',
		url: '/layout/injection/l8',
	},
	{
		title: 'L9',
		isHaitian: true,
		subTitle: 'JSW 850EII',
		url: '/layout/injection/l9',
	},
	{
		title: 'L10',
		isHaitian: true,
		subTitle: 'JSW J850E-C5',
		url: '/layout/injection/l10',
	},
	{
		title: 'L11',
		isHaitian: true,
		subTitle: 'JSW 850EII',
		url: '/layout/injection/l11',
	},
	{
		title: 'L12',
		isHaitian: true,
		subTitle: 'MAII 700',
		url: '/layout/injection/l12',
	},
	{
		title: 'L5',
		isHaitian: true,
		subTitle: 'MAIII 1000',
		url: '/layout/injection/l5',
	},
	{
		title: 'L4',
		isHaitian: true,
		subTitle: 'MAII 800',
		url: '/layout/injection/l4',
	},
	{
		title: 'L3',
		isHaitian: true,
		subTitle: 'MAII 1000',
		url: '/layout/injection/l3',
	},
	{
		title: 'L2',
		isHaitian: true,
		subTitle: 'MAIII 1000',
		url: '/layout/injection/l2',
	},
	{
		title: 'L1',
		isHaitian: true,
		subTitle: 'MAII 800',
		url: '/layout/injection/l1',
	},
];

const INJECTION_MACHINE_LAYOUT = [
	[
		{
			title: 'M28',
			isHaitian: true,
			subTitle: 'SM150',
			url: '/layout/injection/m28',
		},
		{
			title: 'M26',
			isHaitian: true,
			subTitle: 'MA90',
			url: '/layout/injection/m26',
		},
		{
			title: 'M24',
			isHaitian: true,
			subTitle: 'MA120',
			url: '/layout/injection/m24',
		},
		{
			title: 'M22',
			isHaitian: true,
			subTitle: 'MA90',
			url: '/layout/injection/m22',
		},
		{
			title: 'M20',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m20',
		},
		{
			title: 'M18',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m18',
		},
		{
			title: 'M16',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m16',
		},
		{
			title: 'M14',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m14',
		},
		{
			title: 'M12',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m12',
		},
		{
			title: 'M10',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m10',
		},
		{
			title: 'M8',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m8',
		},
		{
			title: 'M6',
			isHaitian: true,
			subTitle: 'MA120',
			url: '/layout/injection/m6',
		},
		{
			title: 'M4',
			isHaitian: true,
			subTitle: 'ZE90',
			url: '/layout/injection/m4',
		},
		{
			title: 'M2',
			isHaitian: true,
			subTitle: 'TMC\n200ES',
			url: '/layout/injection/m2',
		},
	],
	[
		{
			title: 'M27',
			isHaitian: true,
			subTitle: 'TMC\n250ES',
			url: '/layout/injection/m27',
		},
		{
			title: 'M25',
			isHaitian: true,
			subTitle: 'MA90',
			url: '/layout/injection/m25',
		},
		{
			title: 'M23',
			isHaitian: true,
			subTitle: 'MA120',
			url: '/layout/injection/m23',
		},
		{
			title: 'M21',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m21',
		},
		{
			title: 'M19',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m19',
		},
		{
			title: 'M17',
			isHaitian: true,
			subTitle: 'MA160',
			url: '/layout/injection/m17',
		},
		{
			title: 'M15',
			isHaitian: true,
			subTitle: 'MA250',
			url: '/layout/injection/m15',
		},
		{
			title: 'M13',
			isHaitian: true,
			subTitle: 'MA250',
			url: '/layout/injection/m13',
		},
		{
			title: 'M11',
			isHaitian: true,
			subTitle: 'MA250',
			url: '/layout/injection/m11',
		},
		{
			title: 'M9',
			isHaitian: true,
			subTitle: 'MA250',
			url: '/layout/injection/m9',
		},
		{
			title: 'M7',
			isHaitian: true,
			subTitle: 'MA250',
			url: '/layout/injection/m7',
		},
		{
			title: 'M5',
			subTitle: 'MA120',
			isHaitian: true,
			url: '/layout/injection/m5',
		},
		{
			title: 'M3',
			isHaitian: true,
			subTitle: 'ZE90',
			url: '/layout/injection/m3',
		},
		{
			title: 'M1',
			isHaitian: true,
			subTitle: 'CLF\n125T',
			url: '/layout/injection/m1',
		},
	],
	[
		[
			{
				title: 'L6',
				isHaitian: true,
				subTitle: 'CLF 800T',
				url: '/layout/injection/l6',
			},
			{
				title: 'L7',
				isHaitian: true,
				subTitle: 'JM 600-C',
				url: '/layout/injection/l7',
			},
			{
				title: 'L8',
				isHaitian: true,
				subTitle: 'HC 800',
				url: '/layout/injection/l8',
			},
			{
				title: 'L9',
				isHaitian: true,
				subTitle: 'JSW 850EII',
				url: '/layout/injection/l9',
			},
			{
				title: 'L10',
				isHaitian: true,
				subTitle: 'JSW J850E-C5',
				url: '/layout/injection/l10',
			},
			{
				title: 'L11',
				isHaitian: true,
				subTitle: 'JSW 850EII',
				url: '/layout/injection/l11',
			},
			{
				title: 'L12',
				isHaitian: true,
				subTitle: 'MAII 700',
				url: '/layout/injection/l12',
			},
		],
		[
			{
				title: 'L5',
				isHaitian: true,
				subTitle: 'MAIII 1000',
				url: '/layout/injection/l5',
			},
			{
				title: 'L4',
				isHaitian: true,
				subTitle: 'MAII 800',
				url: '/layout/injection/l4',
			},
			{
				title: 'L3',
				isHaitian: true,
				subTitle: 'MAII 1000',
				url: '/layout/injection/l3',
			},
			{
				title: 'L2',
				isHaitian: true,
				subTitle: 'MAIII 1000',
				url: '/layout/injection/l2',
			},
			{
				title: 'L1',
				isHaitian: true,
				subTitle: 'MAII 800',
				url: '/layout/injection/l1',
			},
		],
	],
];

function convertDate(value) {
	const date = new Date(value);
	return date.toLocaleDateString();
}

async function getTagsData(connection, eonNodeId, deviceQueries, tagNames) {
	const nodeQuery = {
		EonNodeId: eonNodeId,
		DeviceQueries: deviceQueries.map((deviceQuery, index) => {
			return {
				DeviceId: deviceQuery,
				TagNames: tagNames[index],
			};
		}),
	};
	var result = await connection.invoke('GetListTags', nodeQuery);
	return result;
}
function convertMiliseconds(miliseconds, format) {
	var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

	total_seconds = parseInt(Math.floor(miliseconds / 1000));
	total_minutes = parseInt(Math.floor(total_seconds / 60));
	total_hours = parseInt(Math.floor(total_minutes / 60));
	days = parseInt(Math.floor(total_hours / 24));

	seconds = parseInt(total_seconds % 60);
	minutes = parseInt(total_minutes % 60);
	hours = parseInt(total_hours % 24);

	switch (format) {
		case 's':
			return total_seconds;
		case 'm':
			return total_minutes;
		case 'h':
			return total_hours;
		case 'd':
			return days;
		default:
			return { d: days, h: hours, m: minutes, s: seconds };
	}
}

function ScrollToBottom({ pathname }) {
	React.useEffect(() => {
		window.scrollTo({
			top: 225,
			behavior: 'smooth',
		});
	}, [pathname]);

	return null;
}

const PACKING_PLAN_TRACKING_COLUMNS = [
	{
		Header: 'Ngày',
		accessor: 'date',
		Cell: ({
			cell: {
				row: {
					original: { date },
				},
			},
		}) => {
			return <span>{format(new Date(date), 'dd/MM/yyyy')}</span>;
		},
	},
	{
		Header: 'Nhân viên đứng máy',
		accessor: 'employee',
	},
	{
		Header: 'Mã nhân viên',
		accessor: 'employeeId',
	},
	{
		Header: 'Cụm máy',
		accessor: 'packingUnit',
	},
	{
		Header: 'Mã sản phẩm',
		accessor: 'productId',
	},
	{
		Header: 'Tên sản phẩm',
		accessor: 'productName',
	},
	{
		Header: 'Lịch trình đóng gói',
		accessor: 'plannedQuantity',
	},
	{
		Header: 'Thực hiện',
		accessor: 'actualQuantity',
	},
	{
		Header: 'Giải trình',
		accessor: 'note',
	},
	{
		Header: 'Tiến độ',
		accessor: 'progress',
		Cell: ({
			cell: {
				row: {
					original: { plannedQuantity, actualQuantity },
				},
			},
		}) => {
			return <ProgressBar height={15} width={140} percent={((actualQuantity / plannedQuantity) * 100).toFixed(2)} />;
		},
	},
	{
		Header: 'Priority',
		accessor: 'priority',
		show: false,
	},
];

const INJECTION_MONTHLY_PLAN_TRACKING_COLUMNS = [
	{
		Header: 'Mã chi tiết',
		accessor: 'productId',
	},
	{
		Header: 'Tên chi tiết',
		accessor: 'productName',
	},
	{
		Header: 'Mã khuôn',
		accessor: 'moldId',
	},
	{
		Header: 'Chu kỳ ép tiêu chuẩn',
		accessor: 'standardInjectionCycle',
	},
	{
		Header: 'Số lượng đặt ra',
		accessor: 'plannedQuantity',
	},
	{
		Header: 'Số lượng thực hiện',
		accessor: 'actualQuantity',
	},
	{
		Header: 'Tiến độ',
		accessor: 'progress',
		Cell: ({
			cell: {
				row: {
					original: { plannedQuantity, actualQuantity },
				},
			},
		}) => {
			return <ProgressBar height={15} width={170} percent={((actualQuantity / plannedQuantity) * 100).toFixed(2)} />;
		},
	},
	{
		Header: 'Priority',
		accessor: 'priority',
	},
];

const PACKING_MONTHLY_PLAN_TRACKING_COLUMNS = [
	{
		Header: 'Mã sản phẩm',
		accessor: 'productId',
	},
	{
		Header: 'Tên sản phẩm',
		accessor: 'productName',
	},
	{
		Header: 'Số lượng cài đặt',
		accessor: 'plannedQuantity',
	},
	{
		Header: 'Số lượng đóng gói thực',
		accessor: 'actualQuantity',
	},
	{
		Header: 'Tiến độ',
		accessor: 'progress',
		Cell: ({
			cell: {
				row: {
					original: { plannedQuantity, actualQuantity },
				},
			},
		}) => {
			return <ProgressBar height={15} width={300} percent={((actualQuantity / plannedQuantity) * 100).toFixed(2)} />;
		},
	},
	{
		Header: 'Priority',
		accessor: 'priority',
	},
];

const INJECTION_PLAN_TRACKING_COLUMNS = [
	{
		Header: 'Ngày',
		accessor: 'date',
		Cell: ({
			cell: {
				row: {
					original: { date },
				},
			},
		}) => {
			return <span>{format(new Date(date), 'dd/MM/yyyy')}</span>;
		},
	},
	{
		Header: 'Ca làm',
		accessor: 'eShift',
		width: 100,
		Cell: ({
			cell: {
				row: {
					original: { eShift },
				},
			},
		}) => {
			switch (eShift) {
				case 0:
					return <span>Ca 1</span>;
				case 1:
					return <span>Ca 2</span>;
				default:
					return <div></div>;
			}
		},
	},
	{
		Header: 'Mã sản phẩm',
		accessor: 'productId',
	},
	{
		Header: 'Tên sản phẩm',
		accessor: 'productName',
	},
	{
		Header: 'Lịch trình ép máy',
		accessor: 'plannedQuantity',
	},
	{
		Header: 'Thực hiện',
		accessor: 'actualQuantity',
	},
	{
		Header: 'Giải trình',
		accessor: 'note',
	},
	{
		Header: 'Nhân viên đứng máy',
		accessor: 'employee',
	},
	{
		Header: 'Tiến độ',
		accessor: 'progress',
		Cell: ({
			cell: {
				row: {
					original: { plannedQuantity, actualQuantity },
				},
			},
		}) => {
			return <ProgressBar height={15} width={170} percent={((actualQuantity / plannedQuantity) * 100).toFixed(2)} />;
		},
	},
	{
		Header: 'Priority',
		accessor: 'priority',
		show: false,
	},
];

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
	accessToken: 'access_token',
};
const LOCALSTORAGE_VALUES = {
	accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
};
const getAccessToken = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const queryParams = {
		[LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
	};
	// const hasError = urlParams.get('error');
	// If there is a valid access token in localStorage, use that
	if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
		return LOCALSTORAGE_VALUES.accessToken;
	}
	// If there is a token in the URL query params, user is logging in for the first time
	if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
		// Store the query params in localStorage
		for (const property in queryParams) {
			window.localStorage.setItem(property, queryParams[property]);
		}
		// Set timestamp
		window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
		// Return access token from query params
		return queryParams[LOCALSTORAGE_KEYS.accessToken];
	}

	// We should never get here!
	return false;
};
const getInjectionMachineStatus = (id) => {
	switch (id) {
		case 0:
			return true;
		case 1:
			return false;
		case 2:
			return false;
		case 3:
			return true;
		case 4:
			return true;
		case 5:
			return false;
		default:
			return false;
	}
};
export const accessToken = getAccessToken();

export {
	packingState,
	ScrollToBottom,
	packingEmployees,
	QA_QC_REPORT_MENU_LIST,
	convertHMS,
	COLUMNS,
	convertMiliseconds,
	getTagsData,
	convertDate,
	getInjectionMachineStatus,
	REPORT_MENU_LIST,
	ENDURANCE_COLUMNS,
	FORCED_ENDURANCE_COLUMNS,
	STATIC_LOAD_DEFORMATION_COLUMNS,
	ROCK_TEST_DEFORMATION_COLUMNS,
	BENDING_DEFORMATION_COLUMNS,
	WATER_PROOF_COLUMNS,
	PACKING_COLUMNS,
	PACKING_EMPLOYEE_COLUMNS,
	MONITOR_INJECTION_LIST,
	INJECTION_MACHINE_LAYOUT,
	INJECTION_MACHINE_ID,
	PLAN_TRACKING_MENU_LIST,
	INJECTION_PLAN_TRACKING_COLUMNS,
	PACKING_PLAN_TRACKING_COLUMNS,
	MONTHLY_PLAN_TRACKING_MENU_LIST,
	INJECTION_MONTHLY_PLAN_TRACKING_COLUMNS,
	PACKING_MONTHLY_PLAN_TRACKING_COLUMNS,
};
