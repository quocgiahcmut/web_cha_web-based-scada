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
import { injectionApi } from '../api/axios/injectionReport';
import { setOeeOverall } from '../redux/slice/OeeReportSlice';
import { format } from 'date-fns';
import { IgrRadialGauge, IgrRadialGaugeRange } from 'igniteui-react-gauges';
// import { IgrRadialGauge, IgrRadialGaugeRange, IgrRadialGaugeModule } from 'igniteui-react-gauges';

// IgrRadialGaugeModule.register();
const qaqcButtonList = ['Độ bền', 'Độ bền CB', 'Chống thấm', 'Độ biến dạng'];
const packingButtonList = ['Cụm 1', 'Cụm 2', 'Cụm 3', 'Cụm 4', 'Cụm 5', 'Cụm 6'];
const latestAlarmData = {
	body: [
		{
			title: 'Hoàn thành quy trình',
			priority: 'low',
		},

		{ title: 'Lỗi kẹt xi lanh 2', priority: 'high' },
		{ title: 'Mất kết nối trong ca', priority: 'high' },
		{ title: 'Xi lanh không đủ lực', priority: 'high' },
		{
			title: 'Hoàn thành quy trình',
			priority: 'low',
		},
		{ title: 'Máy trong chế độ tạm dừng', priority: 'middle' },
		{
			title: 'Hoàn thành quy trình',
			priority: 'low',
		},
		{ title: 'Lỗi kẹt xi lanh 2', priority: 'high' },
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

const Dashboard = () => {
	const [packingData] = React.useState({
		isRunning: true,
		completedProduct: 254,
		plannedQuantity: 500,
		errorProduct: 1,
		productId: 'PAS40-TCO03',
	});
	const [qaqcToggleButtonsIndex, setQaqcToggleButtonsIndex] = React.useState(0);
	const [isDeformation, setIsDeformation] = React.useState(false);
	const [qaqcTableHead, setQaqcTableHead] = React.useState([
		'Thời gian chờ nắp đóng',
		'Thời gian chờ nắp mở',
		'Số lần thực hiện',
	]);
	const [qaqcTableBody, setQaqcTableBody] = React.useState(['10.12', '100', '300']);
	const [packingToggleButtonsIndex, setPackingToggleButtonsIndex] = React.useState(0);
	const [numberOfInjectionStatus, setNumberOfInjectionStatus] = React.useState([0, 0, 0]);
	const onQaqcToggleButtonsIndexChange = (index) => {
		setQaqcToggleButtonsIndex(index);
	};
	const onPackingToggleButtonsIndexChange = (index) => {
		setPackingToggleButtonsIndex(index);
	};
	const dispatch = useDispatch();
	const { oeeOverall, initialOeeDateStart } = useSelector((state) => state.oeeReportData);
	const { runningMachines } = useSelector((state) => state.injectionMonitor);
	const onSubmit = React.useCallback(
		(value) => {
			injectionApi
				.getOeeStatistics(value)
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
		let preNumberOfInjectionStatus = runningMachines.reduce(
			(acc, cur) => {
				if (cur.isRunning === true) {
					acc[0] += 1;
				} else {
					acc[1] += 1;
				}
				return acc;
			},
			[0, 0, 0]
		);
		setNumberOfInjectionStatus(preNumberOfInjectionStatus);
	}, [runningMachines]);
	React.useEffect(() => {
		onSubmit(format(new Date(Date.now() - initialOeeDateStart * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
	}, [onSubmit, initialOeeDateStart]);
	React.useEffect(() => {
		switch (qaqcToggleButtonsIndex) {
			case 0:
				setQaqcTableHead(['Thời gian chờ nắp đóng', 'Thời gian chờ nắp mở', 'Số lần thực hiện']);
				setQaqcTableBody(['10.12', '100', '300']);
				setIsDeformation(false);
				// setIsWaterProof(false);
				break;
			case 1:
				setQaqcTableHead(['Thời gian dừng lên', 'Thời gian dừng xuống', 'Số lần thực hiện']);
				setQaqcTableBody(['10.12', '100', '300']);
				setIsDeformation(false);
				// setIsWaterProof(false);
				break;
			case 2:
				setQaqcTableHead(['Nhiệt độ cài đặt', 'Thời gian kiểm tra cài đặt']);
				setQaqcTableBody(['10.12', '100']);
				setIsDeformation(false);
				// setIsWaterProof(true);
				break;
			case 3:
				setQaqcTableHead([' ', 'Lực nén cài đặt', 'Thời gian giữ', 'Số lần cài đặt']);
				setQaqcTableBody([
					['Hệ 1', '10.12', '100', '300'],
					['Hệ 2', '10.12', '100', '300'],
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
									<IgrRadialGauge
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
										transitionDuration={500}
									>
										<IgrRadialGaugeRange name="range1" startValue={0} endValue={40} brush="red" />
										<IgrRadialGaugeRange name="range2" startValue={40} endValue={60} brush="yellow" />
										<IgrRadialGaugeRange name="range3" startValue={60} endValue={100} brush="green" />
									</IgrRadialGauge>
									<span>Tiến trình: 80%</span>
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
									<div className="row">
										<div className="col-2 flex-center">
											<div
												title={`${packingData.isRunning ? 'Máy đang vận hành' : 'Máy tạm dừng'}`}
												style={{
													backgroundColor: `${
														packingData.isRunning ? 'var(--main-color-green)' : 'var(--main-color-red)'
													}`,
												}}
												className="classification__state-type-container--detail--dashboard"
											>
												{packingData.isRunning ? 'R' : 'S'}
											</div>
										</div>
										<div className="col-10">
											<PackingMachine width="100%" height="150px" className="mb-15" />
										</div>
									</div>

									<table id="packing">
										<tbody>
											<tr>
												<td>Mã đơn hàng</td>
												<td></td>
												<td>{packingData.productId}</td>
											</tr>
											<tr>
												<td>Số lượng đóng gói</td>
												<td>
													<ProgressBar
														width="150px"
														height="15px"
														percent={(packingData.completedProduct / packingData.plannedQuantity) * 100}
													/>
												</td>
												<td>{packingData.completedProduct} sản phẩm</td>
											</tr>
											<tr>
												<td>Tầng suất đóng gói lỗi</td>
												<td></td>
												<td>
													<span className="text-bold">
														{isNaN((packingData.completedProduct + packingData.errorProduct) / packingData.errorProduct)
															? 0
															: (
																	(packingData.completedProduct + packingData.errorProduct) /
																	packingData.errorProduct
															  ).toFixed(2)}
													</span>
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
									<Link to="/layout/warning">
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
												count={`${numberOfInjectionStatus[0]}`}
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
												count={`${numberOfInjectionStatus[1]}`}
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
												count="0"
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
