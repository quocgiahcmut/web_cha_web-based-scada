import React from 'react';
import Chart from 'react-apexcharts';
import './reportInjectionChart.css';

const apexChartConfig = {
	options: {
		chart: {
			id: 'basic-area',
			toolbar: {
				show: true,
			},
		},
		colors: ['#2E93fA', '#66DA26', '#22EE99'],
		dataLabels: {
			enabled: true,
			enabledOnSeries: [0],
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		fill: {
			type: 'solid',
			colors: ['#2E93fA', '#66DA26', '#22EE99'],
			opacity: [1, 0.7, 1],
		},

		yaxis: [
			{
				title: {
					text: 'Chu kỳ ép',
					style: {
						color: '#2E93fA',
					},
				},
				min: 20,
				max: 50,
				labels: {
					style: {
						colors: '#2E93fA',
					},
				},
			},
			{
				title: {
					text: 'Chu kỳ ép cài đặt',
					style: {
						color: '#00000000',
					},
				},
				min: 20,
				max: 50,
				labels: {
					show: false,
					style: {
						colors: '#66DA26',
					},
				},
			},
			// {
			// 	opposite: true,
			// 	title: {
			// 		text: 'Thời gian cửa mở',
			// 		style: {
			// 			color: '#22EE99',
			// 		},
			// 	},
			// 	labels: {
			// 		show: false,
			// 		style: {
			// 			colors: '#22EE99',
			// 		},
			// 	},
			// 	min: -3,
			// 	max: 6,
			// },
		],
		tooltip: {
			enabled: true,
		},
		legend: {
			show: false,
		},
		noData: {
			text: 'Không có dữ liệu để hiển thị',
			align: 'center',
			verticalAlign: 'middle',
			offsetX: 0,
			offsetY: 0,
			style: {
				color: 'var(--main-color-red)',
				fontSize: '14px',
				fontFamily: 'Roboto',
			},
		},
	},
	series: [],
};
function ReportInjectionChart({ shift, series, categories, moldId }) {
	return (
		<>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>{shift}</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-12">
									<Chart
										type="line"
										options={{
											...apexChartConfig.options,
											xaxis: {
												categories: categories,
											},
										}}
										series={series}
										width="100%"
										height="500px"
									/>
								</div>
								<div className="col-12">
									<table id="mold-id-report__table">
										<thead>
											<tr>
												<th>Nhân viên đứng máy</th>
												<th>Mã khuôn</th>
												<th>Mã sản phẩm</th>
												<th>Tên sản phẩm</th>
												<th>Số lượng ép ra</th>
												<th>Chu kỳ ép cài đặt</th>
											</tr>
										</thead>
										<tbody>
											{moldId.map((moldId, index) => (
												<tr key={index}>
													<td>{moldId.employee}</td>
													<td>{moldId.moldId}</td>
													<td>{moldId.productId}</td>
													<td>{moldId.productName}</td>
													<td>{moldId.totalQuantity}</td>
													<td>{moldId.setCycle}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default React.memo(ReportInjectionChart);
