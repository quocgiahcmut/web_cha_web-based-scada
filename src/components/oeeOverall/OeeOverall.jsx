import React from 'react';
import Chart from 'react-apexcharts';

const oeeOptions = {
	series: [55, 67, 83],
	options: {
		plotOptions: {
			radialBar: {
				dataLabels: {
					show: true,
					name: {
						fontSize: '20px',
					},
					value: {
						fontSize: '30px',
						fontWeight: 'bold',
						formatter: function (val) {
							return val + '%';
						},
					},
					total: {
						show: true,
						fontSize: '20px',
						color: '#000',
						label: 'Total',
						formatter: function (w) {
							const oee = w.globals.seriesTotals.reduce((acc, curr) => acc * curr) / (100 * 100);
							// By default this function returns the average of all series.dd The below is just an example to show the use of custom formatter function
							return oee.toFixed(1) + '%';
						},
					},
				},
			},
		},
		labels: ['Availability', 'Performance', 'Quality'],
	},
};

function OeeOverall({ oeeOverallData }) {
	return (
		<>
			<Chart type="radialBar" height="300" series={oeeOverallData} options={oeeOptions.options} />
		</>
	);
}

export default OeeOverall;
