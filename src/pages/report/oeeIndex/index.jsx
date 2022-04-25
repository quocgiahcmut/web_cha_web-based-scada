import React from 'react';
import OeeSearchBar from '../../../components/oeeSearchBar/OeeSearchBar';
import ReportOee from '../../../components/reportOee/ReportOee';

const availabilityData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Thời gian khả dụng',
			borderColor: 'blue',
			backgroundColor: '#4397f7',
			data: [70, 60, 65, 40, 30, 70, 50],
		},
	],
};

const scrapData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Thời gian khả dụng',
			borderColor: 'blue',
			backgroundColor: '#e48f36',
			data: [70, 60, 65, 40, 30, 70, 50],
		},
	],
};

const quantityData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Thời gian khả dụng',
			borderColor: 'blue',
			backgroundColor: '#8f5db1',
			data: [700, 60, 650, 400, 300, 70, 50],
		},
	],
};

function OeeIndex() {
	const [lastTimeUpdated] = React.useState('7');
	const [oeeOverallData] = React.useState([55, 67, 83]);
	const [downtimeData] = React.useState([
		{
			detail: 'Thời gian nghỉ',
			percent: 80,
			trend: 'up',
		},
		{
			detail: 'Máy tắt do lỗi',
			percent: 65,
			trend: 'down',
		},
		{
			detail: 'Không sử dụng',
			percent: 40,
			trend: 'up',
		},
		{
			detail: 'Không sử dụng',
			percent: 0,
			trend: 'up',
		},
	]);

	const [oeeData] = React.useState({
		target: {
			value: '50',
			trend: 'down',
			discrepancy: '1.2%',
		},
		availability: {
			value: '80',
			trend: 'up',
		},
		performance: {
			value: '65',
			trend: 'down',
		},
		quality: {
			value: '40',
			trend: 'up',
		},
	});

	const onSubmit = (value) => {
		console.log(value);
	};

	return (
		<>
			<h2 className="page-header">CHỈ SỐ OEE</h2>
			<OeeSearchBar onSubmit={onSubmit} />
			<ReportOee
				availabilityData={availabilityData}
				scrapData={scrapData}
				quantityData={quantityData}
				oeeOverallData={oeeOverallData}
				downtimeData={downtimeData}
				oeeData={oeeData}
				lastTimeUpdated={lastTimeUpdated}
			/>
		</>
	);
}

export default OeeIndex;
