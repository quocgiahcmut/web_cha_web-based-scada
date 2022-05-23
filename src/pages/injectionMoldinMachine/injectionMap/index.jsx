import React from 'react';
import './injectionMap.css';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as VerticalMachine } from '../../../assets/images/injectionMoldingMachine/vertical_injection_machine.svg';
import { ReactComponent as HorizontalMachine } from '../../../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';
import { getInjectionMachineStatus, INJECTION_MACHINE_LAYOUT } from '../../../utils/utils';
import InjectionMoldingMachine from '../../../components/injectionMoldingMachine/InjectionMoldingMachine';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { getTagsData } from '../../../utils/utils';
import { injectionApi } from '../../../api/axios/injectionReport';
import { useDispatch, useSelector } from 'react-redux';
import { setRunningMachines } from '../../../redux/slice/InjectionMonitorSlice';
function InjectionMachine({ connect, isRunning, item, direction }) {
	const [hoverData, setHoverData] = React.useState({
		title: '',
	});
	const [monitorData, setMonitorData] = React.useState({
		isRunning: false,
		cycleTime: 0,
		counterShot: 0,
		openTime: 0,
		setCycle: 0,
	});
	const [configData, setConfigData] = React.useState({
		id: hoverData.title,
		plannedQuantity: 0,
		cycle: 0,
		standardOpenTime: 0,
		product: {
			id: '',
			name: '',
		},
		moldId: '',
		wattage: '',
	});
	const [resData, setResData] = React.useState({
		id: hoverData.title,
		plannedQuantity: 0,
		cycle: 0,
		standardOpenTime: 0,
		product: {
			id: '',
			name: '',
		},
		moldId: '',
		wattage: '',
		isRunning: false,
		cycleTime: 0,
		counterShot: 0,
		openTime: 0,
	});
	React.useEffect(() => {
		if (hoverData.title === 'L6' || hoverData.title === 'L10') {
			injectionApi
				.getPreShiftsByMachine(hoverData.title)
				.then((res) => {
					setConfigData({
						id: res.data.items[0].machine.id,
						plannedQuantity: Math.floor(res.data.items[0].cavity * ((12 * 60 * 60) / res.data.items[0].injectionCycle)),
						cycle: res.data.items[0].injectionCycle.toFixed(0),
						standardOpenTime: res.data.items[0].product.mold.standardOpenTime.toFixed(0),
						product: {
							id: res.data.items[0].product.id,
							name: res.data.items[0].product.name,
						},
						moldId: res.data.items[0].product.mold.id,
						wattage: res.data.items[0].machine.machineType === 0 ? 'Large' : 'Small',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [hoverData, connect, item.title]);
	React.useEffect(() => {
		let id;
		if (hoverData.title === 'L6' || hoverData.title === 'L10') {
			id = setInterval(async () => {
				const rawData = await getTagsData(
					connect,
					'imm',
					[hoverData?.title],
					[
						[
							`${hoverData?.title}.CycleTime`,
							`${hoverData?.title}.CounterShot`,
							`${hoverData?.title}.OpenTime`,
							`${hoverData?.title}.MachineStatus`,
							`${hoverData?.title}.SetCycle`,
						],
					]
				);
				console.log('rawData', rawData);
				setMonitorData({
					isRunning: getInjectionMachineStatus(rawData.deviceQueryResults[0].tagQueryResults[3].value),
					cycleTime: rawData.deviceQueryResults[0].tagQueryResults[0].value,
					counterShot: rawData.deviceQueryResults[0].tagQueryResults[1].value,
					openTime: rawData.deviceQueryResults[0].tagQueryResults[2].value,
					setCycle: rawData.deviceQueryResults[0].tagQueryResults[4].value,
				});
			}, 1500);
		}
		return () => {
			clearInterval(id);
		};
	}, [connect, hoverData, item.title]);
	React.useEffect(() => {
		setConfigData((prev) => {
			return {
				...prev,
				id: hoverData.title,
			};
		});
	}, [hoverData]);
	React.useEffect(() => {
		setResData({
			...monitorData,
			...configData,
		});
	}, [configData, monitorData]);
	return (
		<React.Fragment>
			{item.isHaitian ? (
				<Tippy
					className="injection-map__map-item-modal"
					content={<InjectionMoldingMachine injectionMoldingMachineData={resData} />}
					maxWidth={470}
				>
					<Link
						onMouseEnter={() => {
							setHoverData(item);
						}}
						className={`injection-map__map-item-inner ${isRunning ? 'injection-map__map-item-inner--running' : ''}`}
						to={{
							pathname: item.url,
							state: {
								map: true,
							},
						}}
					>
						<div className="injection-map__map-item-title">{item.title}</div>
						{item.subTitle.includes('\n') ? (
							<div className="injection-map__map-item-sub-title">
								{item.subTitle.split('\n').map((subTitle, index) => {
									return (
										<React.Fragment key={index}>
											{subTitle}
											{index !== item.subTitle.split('\n').length - 1 ? <br /> : null}
										</React.Fragment>
									);
								})}
							</div>
						) : (
							<div className="injection-map__map-item-sub-title">{item.subTitle}</div>
						)}
						<div className="injection-map__machine-container">
							{direction === 'vectical' ? (
								<VerticalMachine height="100px" width="100%" />
							) : (
								<HorizontalMachine height="100px" width="100%" />
							)}
						</div>
					</Link>
				</Tippy>
			) : (
				<Tippy
					className="injection-map__map-item-modal"
					content={<InjectionMoldingMachine injectionMoldingMachineData={resData} />}
					maxWidth={470}
				>
					<div className="injection-map__map-item-inner injection-map__map-item-inner--none-haitian">
						<div className="injection-map__map-item-title">{item.title}</div>
						{item.subTitle.includes('\n') ? (
							<div className="injection-map__map-item-sub-title">
								{item.subTitle.split('\n').map((subTitle, index) => {
									return (
										<React.Fragment key={index}>
											{subTitle}
											{index !== item.subTitle.split('\n').length - 1 ? <br /> : null}
										</React.Fragment>
									);
								})}
							</div>
						) : (
							<div className="injection-map__map-item-sub-title">{item.subTitle}</div>
						)}
						<div className="injection-map__machine-container">
							{direction === 'vectical' ? (
								<VerticalMachine height="100px" width="100%" />
							) : (
								<HorizontalMachine height="100px" width="100%" />
							)}
						</div>
					</div>
				</Tippy>
			)}
		</React.Fragment>
	);
}

function InjectionMap() {
	const dispatch = useDispatch();
	const { runningMachines } = useSelector((state) => state.injectionMonitor);
	const [connection, setConnection] = React.useState(null);
	React.useEffect(() => {
		const connection = new HubConnectionBuilder()
			.withUrl('http://10.84.70.80:8085/websockethub', {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();
		connection.start().then(() => {
			console.log('connected');
			setConnection(connection);
		});
		return () => {
			connection.stop();
		};
	}, []);
	React.useEffect(() => {
		let idInterval;
		if (connection) {
			idInterval = setInterval(async () => {
				const rawData = await getTagsData(connection, 'imm', ['l10'], [['L10.MachineStatus']]);
				dispatch(setRunningMachines(rawData));
				// (prev) => {
				// 	return prev.map((item) => {
				// 		if (item.id === rawData.deviceQueryResults[0].tagQueryResults[0].tagName.split('.')[0]) {
				// 			item.isRunning = getInjectionMachineStatus(rawData.deviceQueryResults[0].tagQueryResults[0].value);
				// 		}
				// 		return item;
				// 	});
				// }
			}, 1500);
		}
		return () => {
			clearInterval(idInterval);
		};
	}, [connection, dispatch]);
	const history = useHistory();
	return (
		<>
			<Breadcrumbs id="KHU VỰC MÁY ÉP" />
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>KHU VỰC MÁY ÉP</h3>
						</div>
						<div className="card__body">
							<div className="injection-map__container">
								<div className="injection-map__map">
									<div className="injection-map__map-first-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[0].map((item, index) => {
												return (
													<InjectionMachine
														connect={connection}
														isRunning={runningMachines.find((card) => card.id === item.title).isRunning}
														item={item}
														key={index}
														direction="vectical"
													/>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-second-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[1].map((item, index) => {
												return (
													<InjectionMachine
														connect={connection}
														isRunning={runningMachines.find((card) => card.id === item.title).isRunning}
														item={item}
														key={index}
														direction="vectical"
													/>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-third-row">
										<div className="injection-map__map-first-column">
											{INJECTION_MACHINE_LAYOUT[2][0].map((item, index) => {
												return (
													<InjectionMachine
														connect={connection}
														isRunning={runningMachines.find((card) => card.id === item.title).isRunning}
														item={item}
														key={index}
														direction="horizontal"
													/>
												);
											})}
										</div>
										<div className="injection-map__map-second-column">
											{INJECTION_MACHINE_LAYOUT[2][1].map((item, index) => {
												return (
													<InjectionMachine
														connect={connection}
														isRunning={runningMachines.find((card) => card.id === item.title).isRunning}
														item={item}
														key={index}
														direction="horizontal"
													/>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card__footer">
							<div className="row mb-10">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/layout/injection/pages/1">
										DẠNG BẢNG
									</ReportNavigationButton>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/layout/report/main/injection" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default InjectionMap;
