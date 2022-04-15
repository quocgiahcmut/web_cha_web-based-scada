import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/badge/Badge';
import Table from '../components/table/Table';
import ToggleButtons from '../components/toggleButtons/ToggleButtons';
import StatusCard from '../components/statusCard/StatusCard';
import { ReactComponent as InjectionMoldingMachine } from '../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import { ReactComponent as PackingMachine } from '../assets/images/packingClassification/packingClassification.svg';
import QaQcTable from '../components/qaqcDashboardTable/QaqcDashboardTable';
import ProgressBar from '../components/progressBar/ProgressBar';
import { convertHMS } from '../utils/utils';
// import { IgrRadialGauge, IgrRadialGaugeRange, IgrRadialGaugeModule } from 'igniteui-react-gauges';

// IgrRadialGaugeModule.register();
//------------------------------------------
// const injectionOptions = {
// 	// responsive: true,
// 	plugins: {
// 		labels: {
// 			render: (args) => {
// 				return args.label;
// 			},
// 		},
// 		datalabels: {
// 			font: {
// 				weight: 'bold',
// 				size: 16,
// 			},
// 		},
// 		legend: {
// 			display: true,
// 			position: 'bottom',
// 		},
// 	},
// };

// const injectionData = {
// 	labels: ['Máy ép nhỏ đang chạy', 'Máy ép nhỏ đang dừng', 'Máy ép lớn đang chạy', 'Máy ép lớn đang dừng'],
// 	datasets: [
// 		{
// 			label: 'dataset1',
// 			data: [25, 50, 100, 75],
// 			backgroundColor: ['red', 'green', 'orange', 'blue'],
// 		},
// 	],
// };
//----------------------------------------------------
const qaqcButtonList = ['Độ bền', 'Độ bền CB', 'Chống thấm', 'Độ biến dạng'];
// const qaqcOptions = {
// 	responsive: true,
// 	maintainAspectRatio: false,
// 	plugins: {
// 		legend: {
// 			display: true,
// 			position: 'top',
// 		},
// 	},
// 	scales: {
// 		x: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 		y: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 	},
// };

// const qaqcData = {
// 	labels: ['17:51', '18:00', '18:30', '19:00'],
// 	datasets: [
// 		{
// 			label: 'Độ biến dạng',
// 			data: [10, 25, 50, 100],
// 			// fill: false,
// 			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
// 			backgroundColor: [
// 				'rgba(255, 99, 132, 0.2)',
// 				'rgba(54, 162, 235, 0.2)',
// 				'rgba(255, 206, 86, 0.2)',
// 				'rgba(75, 192, 192, 0.2)',
// 			],
// 			tension: 0.1,
// 		},
// 		{
// 			label: 'Độ bền',
// 			data: [0, 25, 70, 80],
// 			// fill: false,
// 			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
// 			backgroundColor: [
// 				'rgba(255, 99, 132, 0.2)',
// 				'rgba(54, 162, 235, 0.2)',
// 				'rgba(255, 206, 86, 0.2)',
// 				'rgba(75, 192, 192, 0.2)',
// 			],
// 			tension: 0.1,
// 		},
// 		{
// 			label: 'Độ bền CB',
// 			data: [50, 100, 120, 140],
// 			// fill: false,
// 			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
// 			backgroundColor: [
// 				'rgba(255, 99, 132, 0.2)',
// 				'rgba(54, 162, 235, 0.2)',
// 				'rgba(255, 206, 86, 0.2)',
// 				'rgba(75, 192, 192, 0.2)',
// 			],
// 			tension: 0.1,
// 		},
// 		{
// 			label: 'Chống thấm',
// 			data: [5, 7, 8, 9],
// 			// fill: false,
// 			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
// 			backgroundColor: [
// 				'rgba(255, 99, 132, 0.2)',
// 				'rgba(54, 162, 235, 0.2)',
// 				'rgba(255, 206, 86, 0.2)',
// 				'rgba(75, 192, 192, 0.2)',
// 			],
// 			tension: 0.1,
// 		},
// 	],
// };
//----------------------------------
const packingButtonList = ['Cụm 1', 'Cụm 2', 'Cụm 3', 'Cụm 4', 'Cụm 5', 'Cụm 6'];
// const packingOptions = {
// 	responsive: true,
// 	maintainAspectRatio: false,
// 	plugins: {
// 		legend: {
// 			display: true,
// 			position: 'top',
// 		},
// 	},
// 	scales: {
// 		x: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 		y: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 	},
// };

// const packingData = {
// 	labels: ['Cụm máy 1', 'Cụm máy 2', 'Cụm máy 3', 'Cụm máy 4', 'Cụm máy 5', 'Cụm máy 6'],
// 	datasets: [
// 		{
// 			label: 'Sản phẩm thực hiện',
// 			backgroundColor: 'blue',
// 			data: [3, 7, 1, 5, 1, 2],
// 		},
// 		{
// 			label: 'Giờ công',
// 			backgroundColor: 'red',
// 			data: [4, 3, 8, 1, 5, 6],
// 		},
// 	],
// };
// //-------------------------------------
// const warehouseOptions = {
// 	responsive: true,
// 	maintainAspectRatio: false,
// 	plugins: {
// 		legend: {
// 			display: false,
// 		},
// 	},
// 	scales: {
// 		x: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 		y: {
// 			grid: {
// 				display: false,
// 			},
// 		},
// 	},
// 	indexAxis: 'y',
// };
//-------------------------------------
const latestAlarmData = {
	body: [
		{
			title: 'lorem ipsum',
			priority: 'low',
		},

		{ title: 'lorem ipsum', priority: 'high' },
		{ title: 'lorem ipsum', priority: 'high' },
		{ title: 'lorem ipsum', priority: 'high' },
		{ title: 'lorem ipsum', priority: 'high' },
		{
			title: 'lorem ipsum',
			priority: 'low',
		},
		{ title: 'lorem ipsum', priority: 'middle' },
		{
			title: 'lorem ipsum',
			priority: 'low',
		},
		{ title: 'lorem ipsum', priority: 'high' },
	],
};

const alarmStatus = {
	low: 'success',
	middle: 'warning',
	high: 'danger',
};

const renderAlarmBody = (item, index) => {
	return (
		<tr key={index}>
			<td>{item.title}</td>
			<td>
				<Badge type={alarmStatus[item.priority]} content={item.priority} />
			</td>
		</tr>
	);
};

//-------------------------------------
const workingHoursSetPoint = 28800;
const Dashboard = () => {
	// const themeReducer = useSelector((state) => state.theme.mode);
	const [packingData] = React.useState({
		isRunning: false,
		progress: 10,
		progressSetPoint: 500,
		workingHours: 7212,
		errorProducts: 5,
		fixedProducts: 5,
	});
	const [qaqcToggleButtonsIndex, setQaqcToggleButtonsIndex] = React.useState(0);
	const [isDeformation, setIsDeformation] = React.useState(false);
	const [qaqcTableHead, setQaqcTableHead] = React.useState([
		'Thời gian chờ nắp đóng',
		'Thời gian chờ nắp mở',
		'Số lần thực hiện',
	]);
	// const [isWaterProof, setIsWaterProof] = React.useState(false);
	const [qaqcTableBody, setQaqcTableBody] = React.useState(['1', '2', '3']);
	const [packingToggleButtonsIndex, setPackingToggleButtonsIndex] = React.useState(0);
	const onQaqcToggleButtonsIndexChange = (index) => {
		setQaqcToggleButtonsIndex(index);
	};
	const onPackingToggleButtonsIndexChange = (index) => {
		setPackingToggleButtonsIndex(index);
	};
	React.useEffect(() => {
		switch (qaqcToggleButtonsIndex) {
			case 0:
				setQaqcTableHead(['Thời gian chờ nắp đóng', 'Thời gian chờ nắp mở', 'Số lần thực hiện']);
				setQaqcTableBody(['1', '2', '3']);
				setIsDeformation(false);
				// setIsWaterProof(false);
				break;
			case 1:
				setQaqcTableHead(['Thời gian dừng lên', 'Thời gian dừng xuống', 'Số lần thực hiện']);
				setQaqcTableBody(['1', '2', '3']);
				setIsDeformation(false);
				// setIsWaterProof(false);
				break;
			case 2:
				setQaqcTableHead(['Nhiệt độ cài đặt', 'Thời gian kiểm tra cài đặt']);
				setQaqcTableBody(['1', '2']);
				setIsDeformation(false);
				// setIsWaterProof(true);
				break;
			case 3:
				setQaqcTableHead([' ', 'Lực nén cài đặt', 'Thời gian giữ', 'Số lần cài đặt']);
				setQaqcTableBody([
					['Hệ 1', '1', '2', '3'],
					['Hệ 2', '1', '2', '3'],
				]);
				setIsDeformation(true);
				// setIsWaterProof(false);
				break;
			default:
				break;
		}
	}, [qaqcToggleButtonsIndex]);
	return (
		<div>
			<h2 className="page-header">Dashboard</h2>
			<div className="row">
				<div className="col-5">
					<div className="card full-height">
						<div className="card__header">
							<h3>PHÒNG QA/QC THIẾT BỊ</h3>
						</div>
						<div className="card__body height-80">
							<div className="row">
								<div className="col-12 flex-right">
									<ToggleButtons
										active={qaqcToggleButtonsIndex}
										onClick={onQaqcToggleButtonsIndexChange}
										titles={qaqcButtonList}
									/>
								</div>
							</div>
							<div className="row full-height">
								<div className="col-8 full-height flex-center">
									<QaQcTable isDeformation={isDeformation} body={qaqcTableBody} header={qaqcTableHead} />
								</div>
								<div className="col-4 full-height flex-center">
									{/* <IgrRadialGauge
										width="100%"
										height="180px"
										minimumValue={0}
										maximumValue={100}
										scaleBrush="#c6c6c6"
										scaleStartExtent={0.3}
										scaleEndExtent={0.575}
										value={70}
										interval={10}
										tickStartExtent={0.45}
										tickEndExtent={0.575}
										tickStrokeThickness={2}
										tickBrush="Black"
										minorTickCount={4}
										minorTickEndExtent={0.5}
										minorTickStartExtent={0.575}
										fontBrush="Black"
										backingShape="Fitted"
										backingBrush="#ededed"
										backingStrokeThickness={5}
									>
										<IgrRadialGaugeRange name="range1" startValue={0} endValue={40} brush="red" />
										<IgrRadialGaugeRange name="range2" startValue={40} endValue={60} brush="yellow" />
										<IgrRadialGaugeRange name="range3" startValue={60} endValue={100} brush="green" />
									</IgrRadialGauge> */}
									<span>Tiến trình: Data go here</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className="card full-height">
						<div className="card__header">
							<h3>KHU ĐÓNG GÓI</h3>
						</div>
						<div className="card__body height-80">
							<div className="row">
								<div className="col-12 flex-right">
									<ToggleButtons
										active={packingToggleButtonsIndex}
										onClick={onPackingToggleButtonsIndexChange}
										titles={packingButtonList}
									/>
								</div>
							</div>
							<div className="row full-height">
								<div className="col-12 full-height flex-center">
									<PackingMachine width="100%" height="150px" className="mb-15" />
									<table id="packing">
										<tbody>
											<tr>
												<td>Số lượng đóng gói</td>
												<td>
													<ProgressBar
														width="150px"
														height="15px"
														percent={(packingData.progress / packingData.progressSetPoint) * 100}
													/>
												</td>
												<td>{packingData.progress} sản phẩm</td>
											</tr>
											<tr>
												<td>Giờ làm việc</td>
												<td>
													<ProgressBar
														width="150px"
														height="15px"
														percent={(packingData.workingHours / workingHoursSetPoint) * 100}
													/>
												</td>

												<td>{convertHMS(packingData.workingHours)}</td>
											</tr>
											<tr>
												<td>Tổng lỗi</td>
												<td></td>
												<td>
													lỗi: {packingData.errorProducts}; sửa: {packingData.fixedProducts}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="card height-400">
						<div className="card__header">
							<h3>CẢNH BÁO</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-12">
									<Link to="/warning">
										<Table
											headData={latestAlarmData.head}
											bodyData={latestAlarmData.body.slice(0, 6)}
											renderBody={renderAlarmBody}
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-8">
					<div className="card full-height">
						<div className="card__header">
							<h3>KHU MÁY ÉP</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-12 flex-center">
									<InjectionMoldingMachine width="100%" height="200px" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className="card full-height">
						<div className="card__header">
							<h3>CHỈ TIÊU OEE</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-6">
									<Link to="/report/oee">
										<StatusCard
											tooltip="Availability"
											color="#3ace3a"
											icon="bx bx-timer"
											title="Mức độ hữu dụng"
											count="50%"
										/>
									</Link>
								</div>
								<div className="col-6">
									<Link to="/report/oee">
										<StatusCard tooltip="Performance" color="#7c5eb8" icon="bx bx-cog" title="Hiệu suất" count="50%" />
									</Link>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<Link to="/report/oee">
										<StatusCard
											tooltip="Quality"
											color="#ffa82e"
											icon="bx bx-search-alt"
											title="Chất lượng"
											count="50%"
										/>
									</Link>
								</div>
								<div className="col-6">
									<Link to="/report/oee">
										<StatusCard
											tooltip="OEE index"
											color="#ff4e4e "
											icon="bx bx-target-lock"
											title="Chỉ số OEE"
											count="50%"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
