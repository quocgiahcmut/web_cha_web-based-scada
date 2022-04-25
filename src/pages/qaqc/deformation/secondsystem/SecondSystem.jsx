import {
	createTheme,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	ThemeProvider,
} from '@mui/material';
import React from 'react';
import { ReactComponent as Auto } from '../../../../assets/images/qaqc/auto.svg';
import { ReactComponent as Manual } from '../../../../assets/images/qaqc/manual.svg';
import { ReactComponent as Stop } from '../../../../assets/images/qaqc/stop.svg';
import ProgressBar from '../../../../components/progressBar/ProgressBar';
import ReportNavigationButton from '../../../../components/reportNavigationButton/ReportNavigationButton';
import { useHistory } from 'react-router-dom';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import { getTagsData } from '../../../../utils/utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundImage: 'linear-gradient(var(--main-color), var(--second-color));',
		color: 'var(--txt-white)',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

// var velocityChartOptions = {
// 	options: {
// 		chart: {
// 			height: 300,
// 			type: 'radialBar',
// 			offsetY: -10,
// 		},
// 		plotOptions: {
// 			radialBar: {
// 				startAngle: -135,
// 				endAngle: 135,
// 				dataLabels: {
// 					name: {
// 						fontSize: '14px',
// 						color: undefined,
// 						offsetY: 60,
// 					},
// 					value: {
// 						offsetY: 30,
// 						fontSize: '14px',
// 						color: 'var(--txt-color)',
// 						fontWeight: 'bold',
// 						formatter: function (val) {
// 							return val + 's';
// 						},
// 					},
// 				},
// 			},
// 		},
// 		fill: {
// 			type: 'gradient',
// 			gradient: {
// 				shade: 'dark',
// 				shadeIntensity: 0.15,
// 				inverseColors: false,
// 				opacityFrom: 1,
// 				opacityTo: 1,
// 				stops: [0, 50, 65, 91],
// 			},
// 		},
// 		stroke: {
// 			dashArray: 4,
// 		},
// 		labels: ['Thời gian giữ'],
// 	},
// };

function createData(params, process) {
	return {
		params,
		process,
	};
}

function StyledPaper({ children }) {
	return <Paper elevation={6}>{children}</Paper>;
}

function SecondSystem() {
	let history = useHistory();
	const [connection, setConnection] = React.useState(null);
	const [state, setState] = React.useState('disconnected');
	const [error, setError] = React.useState(null);
	const [errorPriority, setErrorPriority] = React.useState(null);
	const [machineState, setMachineState] = React.useState('stop');
	const [settings, setSettings] = React.useState({
		force: 0,
		numbs: 0,
		time: 0,
	});
	const [params, setParams] = React.useState({
		force: 0,
		numbs: 0,
		time: 0,
	});
	const rows = [
		createData('Lực nhấn', settings.force),
		createData('Số lần nhấn', settings.numbs),
		createData('Thời gian giữ', settings.time),
	];
	React.useEffect(() => {
		const connect = new HubConnectionBuilder()
			.withUrl(`http://192.168.1.80:8085/websockethub`, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();
		connect
			.start()
			.then(() => {
				setConnection(connect);
				setState('connected');
				connect.on('ReceiveData', (data) => {
					console.log('data 2', data);
				});
			})
			.catch((err) => {
				alert(err);
			});
		setConnection(connect);
		return () => {
			connect.stop();
		};
	}, []);
	const notify = (error, errorPriority) => {
		switch (errorPriority) {
			case 'low':
				return toast.success(error, {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				});
			case 'middle':
				return toast.warn(error, {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				});
			case 'high':
				return toast.error(error, {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				});
			default:
				return;
		}
	};
	React.useEffect(() => {
		let id;
		if (connection && state === 'connected') {
			id = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'qaqclab',
					['plc'],
					[
						'Sp Force Cyliner 3',
						'Sp No Press 3',
						'Sp Time Hold 3',
						'Pv Force Cylinder 3',
						'Pv No Press 3',
						'Pv Time Hold 3',
						'Mode App',
						'Green App',
						'Red App',
						'Error App',
						'Error Code',
					]
				);
				setSettings({
					numbs: rawData.deviceQueryResults[0].tagQueryResults[1].value,
					force: rawData.deviceQueryResults[0].tagQueryResults[0].value,
					time: rawData.deviceQueryResults[0].tagQueryResults[2].value,
				});
				console.log(rawData.deviceQueryResults[0]);
				setParams({
					numbs: rawData.deviceQueryResults[0].tagQueryResults[4].value,
					force: rawData.deviceQueryResults[0].tagQueryResults[3].value,
					time: rawData.deviceQueryResults[0].tagQueryResults[5].value,
				});
				setMachineState(
					rawData.deviceQueryResults[0].tagQueryResults[7].value &&
						rawData.deviceQueryResults[0].tagQueryResults[6].value
						? 'manual'
						: rawData.deviceQueryResults[0].tagQueryResults[7].value &&
						  rawData.deviceQueryResults[0].tagQueryResults[6].value === false
						? 'auto'
						: 'stop'
				);
				switch (rawData.deviceQueryResults[0].tagQueryResults[10].value) {
					case 0:
						break;
					case 100:
						setError('Hoàn thành chương trình');
						setErrorPriority('low');
						break;
					case 500:
						setError('Cài đặt lực, thời gian giữ, số lần nhấn và sai số');
						setErrorPriority('high');
						break;
					case 501:
						setError('Lực cài đặt hệ 1 quá lớn (>2000)');
						setErrorPriority('high');
						break;
					case 502:
						setError('Lực cài đặt hệ 2 quá lớn (>2000)');
						setErrorPriority('high');
						break;
					case 503:
						setError('Hệ thống chưa sẵn sàng');
						setErrorPriority('high');
						break;
					case 504:
						setError('Lỗi xi lanh 1 chưa tới vị trí đặt lực');
						setErrorPriority('high');
						break;
					case 505:
						setError('Lỗi xi lanh 1 chưa về vị trí ban đầu');
						setErrorPriority('high');
						break;
					case 506:
						setError('Lỗi xi lanh 2 chưa tới vị trí đặt lực');
						setErrorPriority('high');
						break;
					case 507:
						setError('Lỗi xi lanh 2 chưa về vị trí ban đầu');
						setErrorPriority('high');
						break;
					case 508:
						setError('Lỗi xi lanh 3 chưa tới vị trí đặt lực');
						setErrorPriority('high');
						break;
					case 509:
						setError('Lỗi xi lanh 3 chưa về vị trí ban đầu');
						setErrorPriority('high');
						break;
					case 510:
						setError('Dừng hệ thống khẩn cấp');
						setErrorPriority('high');
						break;
					case 600:
						setError('Xi lanh 1 quá lực');
						setErrorPriority('middle');
						break;
					case 601:
						setError('Xi lanh 2 quá lực');
						setErrorPriority('middle');
						break;
					case 602:
						setError('Xi lanh 3 quá lực');
						setErrorPriority('middle');
						break;
					case 603:
						setError('Xi lanh 1 không đủ lực');
						setErrorPriority('middle');
						break;
					case 604:
						setError('Xi lanh 2 không đủ lực');
						setErrorPriority('middle');
						break;
					case 605:
						setError('Xi lanh 3 không đủ lực');
						setErrorPriority('middle');
						break;
					default:
						setError('Đang test');
						setErrorPriority('low');
						break;
				}
			}, 1000);
		}
		return () => clearInterval(id);
	}, [connection, state]);
	React.useEffect(() => {
		if (error && errorPriority) {
			notify(error, errorPriority);
		}
	}, [error, errorPriority]);
	return (
		<>
			<div className="row">
				<div className="col-4">
					<div className="card full-height">
						<div className="card-body">
							<div className="row">
								<div className="col-12">
									<svg width="100%" height="300" viewBox="0 0 438 360" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_55_342)">
											<rect x="0.5" y="63.5" width="437" height="127" fill="#C4C4C4" stroke="#393939" />
											<rect x="14.5" y="78.5" width="409" height="112" fill="#FAFAFB" stroke="#393939" />
											<rect y="191" width="438" height="128" fill="#4237C1" />
											<rect x="20" y="210" width="395" height="109" fill="#FAFAFB" />
											<rect x="18" y="282" width="397" height="21" fill="#4237C1" />
											<rect
												x="213.5"
												y="201.5"
												width="169"
												height="91"
												rx="5.5"
												fill="#C4C4C4"
												stroke="#393939"
												strokeWidth="3"
											/>
											<rect x="383" y="238" width="3" height="26" rx="1.5" fill="#393939" />
											<rect x="211" y="238" width="3" height="26" rx="1.5" fill="#393939" />
											<rect
												x="283"
												y="218"
												width="8"
												height="29"
												rx="4"
												transform="rotate(-90 283 218)"
												fill="#C4C4C4"
											/>
											<rect
												x="294"
												y="216"
												width="4"
												height="15"
												rx="2"
												transform="rotate(-90 294 216)"
												fill="#888888"
											/>
											<circle cx="289" cy="214" r="2" transform="rotate(-90 289 214)" fill="#888888" />
											<rect x="281.5" y="0.5" width="156" height="62" fill="#C4C4C4" stroke="#393939" />
											<rect x="292" y="11" width="58" height="40" fill="#1F1F1F" />
											<rect x="297" y="16" width="48" height="30" fill="#6B6B6B" />
											<path
												d="M403 20H413V28C413 30.7614 410.761 33 408 33V33C405.239 33 403 30.7614 403 28V20Z"
												fill="#E2E2E2"
											/>
											<path
												d="M403 5H413V13C413 15.7614 410.761 18 408 18V18C405.239 18 403 15.7614 403 13V5Z"
												fill="#E2E2E2"
											/>
											<path
												d="M387 5H397V13C397 15.7614 394.761 18 392 18V18C389.239 18 387 15.7614 387 13V5Z"
												fill="#E2E2E2"
											/>
											<path
												d="M387 20H397V28C397 30.7614 394.761 33 392 33V33C389.239 33 387 30.7614 387 28V20Z"
												fill="#E2E2E2"
											/>
											<path
												d="M371 20H381V28C381 30.7614 378.761 33 376 33V33C373.239 33 371 30.7614 371 28V20Z"
												fill="#E2E2E2"
											/>
											<path
												d="M371 38H381V46C381 48.7614 378.761 51 376 51V51C373.239 51 371 48.7614 371 46V38Z"
												fill="#E2E2E2"
											/>
											<path
												d="M387 38H397V46C397 48.7614 394.761 51 392 51V51C389.239 51 387 48.7614 387 46V38Z"
												fill="#E2E2E2"
											/>
											<path
												d="M403 38H413V46C413 48.7614 410.761 51 408 51V51C405.239 51 403 48.7614 403 46V38Z"
												fill="#E2E2E2"
											/>
											<circle cx="376" cy="29" r="4.5" fill="#31BE00" stroke="#FAFAFB" />
											<circle cx="376" cy="46" r="4.5" fill="#31BE00" stroke="#FAFAFB" />
											<circle cx="392" cy="46" r="4.5" fill="#31BE00" stroke="#FAFAFB" />
											<circle cx="408" cy="46" r="4.5" fill="#31BE00" stroke="#FAFAFB" />
											<circle cx="408" cy="29" r="4.5" fill="#C57B26" stroke="#FAFAFB" />
											<circle cx="408" cy="29" r="4.5" fill="#C57B26" stroke="#FAFAFB" />
											<circle cx="392" cy="29" r="4.5" fill="#C52626" stroke="#FAFAFB" />
											<circle cx="392" cy="13" r="4.5" fill="#31BE00" stroke="black" />
											<circle cx="408" cy="13" r="4.5" fill="#C52626" stroke="black" />
											<path
												d="M418 20H428V28C428 30.7614 425.761 33 423 33V33C420.239 33 418 30.7614 418 28V20Z"
												fill="#E2E2E2"
											/>
											<path
												d="M418 38H428V46C428 48.7614 425.761 51 423 51V51C420.239 51 418 48.7614 418 46V38Z"
												fill="#E2E2E2"
											/>
											<circle cx="423" cy="47" r="5.75" fill="#C52626" stroke="#FF5656" strokeWidth="0.5" />
											<circle cx="423" cy="28" r="4.5" fill="black" stroke="#FAFAFB" />
											<rect x="422" y="23" width="2" height="6" rx="1" fill="#FAFAFB" />
											<rect x="210.5" y="78.5" width="19" height="112" fill="#C4C4C4" stroke="black" />
											<rect y="143" width="76" height="14" fill="#4237C1" />
											<rect x="154" y="143" width="76" height="14" fill="#4237C1" />
											<rect x="230" y="157" width="195" height="9" fill="#484848" />
											<rect x="259" y="151" width="125" height="6" fill="#4237C1" />
											<rect x="38" y="184" width="150" height="7" fill="#C4C4C4" />
											<rect x="253" y="184" width="153" height="7" fill="#ff4545" />
											<rect x="25" y="78" width="42" height="3" fill="#4237C1" />
											<rect x="38" y="81" width="16" height="5" fill="#484848" />
											<rect x="44" y="86" width="5" height="3" fill="#C4C4C4" />
											<rect x="45" y="157" width="3" height="3" fill="#C4C4C4" />
											<rect x="38" y="89" width="17" height="8" fill="#4237C1" />
											<path d="M41 97H52V143H41V97Z" fill="#C4C4C4" />
											<rect x="39" y="160" width="15" height="10" fill="#C4C4C4" />
											<rect x="158" y="78" width="42" height="3" fill="#4237C1" />
											<rect x="171" y="81" width="16" height="5" fill="#484848" />
											<rect x="177" y="86" width="5" height="3" fill="#C4C4C4" />
											<rect x="178" y="157" width="3" height="3" fill="#C4C4C4" />
											<rect x="171" y="89" width="17" height="8" fill="#4237C1" />
											<path d="M174 97H185V143H174V97Z" fill="#C4C4C4" />
											<rect x="172" y="160" width="15" height="10" fill="#C4C4C4" />
											<rect x="300" y="77" width="42" height="3" fill="#4237C1" />
											<rect x="313" y="80" width="16" height="5" fill="#484848" />
											<rect x="319" y="85" width="5" height="3" fill="#ff4545" />
											<rect x="320" y="145" width="3" height="6" fill="#ff4545" />
											<rect x="313" y="88" width="17" height="8" fill="#4237C1" />
											<path d="M316 96H327V145H316V96Z" fill="#ff4545" />
										</g>
										<defs>
											<clipPath id="clip0_55_342">
												<rect width="438" height="360" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
							<div className="row flex-center">
								<div className="col-8">
									<span className="packingParamsTitle">Tiến độ thực hiện: {params.numbs}</span>
									<ProgressBar height="20px" percent={Math.floor((params.numbs / settings.numbs) * 100)} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-5">
					<div className="card full-height">
						<div className="card__header mb-20">
							<h3>Thông số cài đặt</h3>
						</div>
						<div className="card__body mb-15">
							<ThemeProvider
								theme={createTheme({
									palette: { mode: 'light' },
								})}
							>
								<TableContainer component={StyledPaper}>
									<Table sx={{ minWidth: 600 }} aria-label="customized table">
										<TableHead>
											<TableRow>
												<StyledTableCell align="left">Thông số của máy</StyledTableCell>
												<StyledTableCell align="left">Xi lanh 3</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody
											sx={{
												'& .MuiTableRow-root:hover': {
													'& .MuiTableCell-root': {
														color: 'white',
														backgroundColor: 'var(--second-color-blue)',
													},
												},
											}}
										>
											{rows.map((row) => (
												<TableRow key={row.params}>
													<StyledTableCell align="left">{row.params}</StyledTableCell>
													<StyledTableCell align="left">{row.process}</StyledTableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</ThemeProvider>
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="card full-height">
						<div className="card__header mb-15">
							<h3>Trạng thái máy</h3>
						</div>
						<div className="card__body flex-center">
							{machineState === 'stop' ? (
								<Stop width="100%" height="250" />
							) : machineState === 'manual' ? (
								<Manual width="100%" height="250" />
							) : (
								<Auto width="100%" height="250" />
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>Thông số giám sát</h3>
						</div>
						<div className="card__body flex-horizontal-space-evenly">
							<div
								className="flex-space-evenly"
								style={{
									flexGrow: 1,
									flexBasis: '300px',
								}}
							>
								{/* <IgrRadialGauge
									width="100%"
									height="300px"
									minimumValue={0}
									maximumValue={settings.force}
									scaleBrush="#c6c6c6"
									scaleStartExtent={0.3}
									scaleEndExtent={0.575}
									value={params.force}
									interval={10}
									tickStartExtent={0.45}
									tickEndExtent={0.575}
									tickStrokeThickness={2}
									tickBrush="Black"
									labelInterval={Math.floor(settings.force / 6)}
									interval={Math.floor(settings.force / 6)}
									minorTickCount={10}
									minorTickEndExtent={0.5}
									minorTickStartExtent={0.575}
									fontBrush="Black"
									backingShape="Fitted"
									backingBrush="#ededed"
								>
									<IgrRadialGaugeRange name="range1" startValue={0} endValue={Math.floor(settings.force/3)} brush="red" />
									<IgrRadialGaugeRange name="range2" startValue={Math.floor(settings.force/3)} endValue={Math.floor((settings.force/3)*2)} brush="yellow" />
									<IgrRadialGaugeRange name="range3" startValue={Math.floor((settings.force/3)*2)} endValue={settings.force} brush="green" />
								</IgrRadialGauge> */}
								<h4>Lực nhấn</h4>
							</div>
							<div
								className="flex-space-evenly"
								style={{
									flexGrow: 1,
									flexBasis: '300px',
								}}
							>
								{/* <IgrRadialGauge
									width="100%"
									height="300px"
									minimumValue={0}
									maximumValue={settings.time}
									scaleBrush="#c6c6c6"
									scaleStartExtent={0.3}
									scaleEndExtent={0.575}
									value={params.time}
									interval={10}
									tickStartExtent={0.45}
									tickEndExtent={0.575}
									tickStrokeThickness={2}
									tickBrush="Black"
									labelInterval={Math.floor(settings.time / 6)}
									interval={Math.floor(settings.time / 6)}
									minorTickCount={10}
									minorTickEndExtent={0.5}
									minorTickStartExtent={0.575}
									fontBrush="Black"
									backingShape="Fitted"
									backingBrush="#ededed"
								>
									<IgrRadialGaugeRange name="range1" startValue={0} endValue={Math.floor((settings.time/3))} brush="red" />
									<IgrRadialGaugeRange name="range2" startValue={Math.floor((settings.time/3))} endValue={Math.floor((settings.time/3)*2)} brush="yellow" />
									<IgrRadialGaugeRange name="range3" startValue={Math.floor((settings.time/3)*2)} endValue={settings.time} brush="green" />
								</IgrRadialGauge> */}
								<h4>Thời gian giữ</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/report/main/qaqc/deformation" />
				</div>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				theme="colored"
				rtl={false}
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default SecondSystem;
