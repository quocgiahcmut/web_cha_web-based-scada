import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/badge/Badge';
import Table from '../components/table/Table';
import ToggleButtons from '../components/toggleButtons/ToggleButtons';
import StatusCard from '../components/statusCard/StatusCard';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as InjectionMoldingMachine } from '../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import { ReactComponent as PackingMachine } from '../assets/images/packingClassification/packingClassification.svg';
import QaQcTable from '../components/qaqcDashboardTable/QaqcDashboardTable';
import ProgressBar from '../components/progressBar/ProgressBar';
import ViewMoreButton from '../components/viewMoreButton/ViewMoreButton';
import { convertHMS } from '../utils/utils';
import { injectionApi } from '../api/axios/injectionReport';
import { setOeeOverall } from '../redux/slice/OeeReportSlice';
import { format } from 'date-fns';

// import { IgrRadialGauge, IgrRadialGaugeRange, IgrRadialGaugeModule } from 'igniteui-react-gauges';

// IgrRadialGaugeModule.register();
const qaqcButtonList = ['Độ bền', 'Độ bền CB', 'Chống thấm', 'Độ biến dạng'];
const packingButtonList = ['Cụm 1', 'Cụm 2', 'Cụm 3', 'Cụm 4', 'Cụm 5', 'Cụm 6'];
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
		productId: 'EE20202102',
	});
	const [qaqcToggleButtonsIndex, setQaqcToggleButtonsIndex] = React.useState(0);
	const [isDeformation, setIsDeformation] = React.useState(false);
	const [qaqcTableHead, setQaqcTableHead] = React.useState([
		'Thời gian chờ nắp đóng',
		'Thời gian chờ nắp mở',
		'Số lần thực hiện',
	]);
	const [qaqcTableBody, setQaqcTableBody] = React.useState(['1', '2', '3']);
	const [packingToggleButtonsIndex, setPackingToggleButtonsIndex] = React.useState(0);
	const onQaqcToggleButtonsIndexChange = (index) => {
		setQaqcToggleButtonsIndex(index);
	};
	const onPackingToggleButtonsIndexChange = (index) => {
		setPackingToggleButtonsIndex(index);
	};
	const dispatch = useDispatch();
	const { oeeOverall, initialOeeDateStart } = useSelector((state) => state.oeeReportData);
	const onSubmit = React.useCallback(
		(value) => {
			injectionApi
				.getTemporaryOeeStatistics(value)
				.then((res) => {
					let totalWorkTime = 0;
					let totalPartsProducedTime = 0;
					let totalQualifiedProducedParts = 0;
					let totalProducedParts = 0;
					let availability = 0;
					let performance = 0;
					let quality = 0;
					res.data.items.forEach((item, index) => {
						totalWorkTime += item.workTime;
						totalPartsProducedTime += item.totalQuantity * item.standardInjectionCycle;
						totalQualifiedProducedParts += item.totalQuantity;
						totalProducedParts += item.numberOfShots * item.productsPerShot;
					});
					availability = (totalWorkTime / (res.data.items.length * 12 * 60 * 60 * 1000)) * 100;
					performance =
						(totalPartsProducedTime / totalWorkTime) * 100 > 100 ? 100 : (totalPartsProducedTime / totalWorkTime) * 100;
					quality = (totalQualifiedProducedParts / totalProducedParts) * 100;
					dispatch(setOeeOverall([availability.toFixed(2), performance.toFixed(2), quality.toFixed(2)]));
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[dispatch]
	);

	React.useEffect(() => {
		onSubmit(format(new Date(Date.now() - initialOeeDateStart * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
	}, [onSubmit, initialOeeDateStart]);
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
			<h2 className="page-header">DASHBOARD</h2>
			<div className="row">
				<div className="col-5">
					<div className="card full-height">
						<div className="card__header">
							<div className="row">
								<div className="col-10 flex-horizontal-center">
									<h3>PHÒNG QA/QC THIẾT BỊ</h3>
								</div>
								<div className="col-2 flex-left">
									<ViewMoreButton link="/layout/qaqc" />
								</div>
							</div>
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
							<div className="row">
								<div className="col-9 flex-horizontal-center">
									<h3>KHU VỰC ĐÓNG GÓI</h3>
								</div>
								<div className="col-3 flex-left">
									<ViewMoreButton link="/layout/packing" />
								</div>
							</div>
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
												<td>Mã Sản phẩm</td>
												<td></td>
												<td>
													<span className="text-bold">{packingData.productId}</span>
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
							<div className="row">
								<div className="col-9 flex-horizontal-center">
									<h3>KHU VỰC MÁY ÉP</h3>
								</div>
								<div className="col-3 flex-left">
									<ViewMoreButton link="/layout/injection/pages/1" />
								</div>
							</div>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-3">
									<div className="row">
										<div className="col-12">
											<StatusCard
												padding="none"
												height="87px"
												tooltip="Máy đang chạy"
												color="#3ace3a"
												icon="bx bx-check-circle"
												title="Máy đang chạy"
												count="27"
											/>
										</div>
										<div className="col-12">
											<StatusCard
												padding="none"
												height="87px"
												tooltip="Máy đang dừng"
												color="#ffa82e"
												icon="bx bx-loader-circle"
												title="Máy đang dừng"
												count="27"
											/>
										</div>
										<div className="col-12">
											<StatusCard
												padding="none"
												height="87px"
												tooltip="Máy không hoạt động"
												color="#ff4e4e"
												icon="bx bx-power-off"
												title="Máy không hoạt động"
												count="27"
											/>
										</div>
									</div>
								</div>
								<div className="col-9 flex-center">
									<InjectionMoldingMachine width="100%" height="200px" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-4">
					<div className="card full-height">
						<div className="card__header">
							<h3>
								CHỈ TIÊU OEE
								<span
									style={{
										fontSize: '0.9rem',
										fontWeight: 'normal',
										fontStyle: 'italic',
										marginLeft: '5px',
										textTransform: 'none',
									}}
								>
									30 ngày qua
								</span>
							</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-6">
									<Link to="/layout/report/oee">
										<StatusCard
											hover={true}
											tooltip="Availability"
											color="#3ace3a"
											icon="bx bx-timer"
											title="Mức độ hữu dụng"
											count={`${Math.floor(oeeOverall[0])}%`}
										/>
									</Link>
								</div>
								<div className="col-6">
									<Link to="/layout/report/oee">
										<StatusCard
											hover={true}
											tooltip="Performance"
											color="#7c5eb8"
											icon="bx bx-cog"
											title="Hiệu suất"
											count={`${Math.floor(oeeOverall[1])}%`}
										/>
									</Link>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<Link to="/layout/report/oee">
										<StatusCard
											hover={true}
											tooltip="Quality"
											color="#ffa82e"
											icon="bx bx-search-alt"
											title="Chất lượng"
											count={`${Math.floor(oeeOverall[2])}%`}
										/>
									</Link>
								</div>
								<div className="col-6">
									<Link to="/layout/report/oee">
										<StatusCard
											hover={true}
											tooltip="OEE index"
											color="#ff4e4e "
											icon="bx bx-target-lock"
											title="Chỉ số OEE"
											count={`${(
												oeeOverall.reduce((acc, cur) => {
													return acc * cur;
												}, 1) / 10000
											).toFixed(0)}%`}
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
