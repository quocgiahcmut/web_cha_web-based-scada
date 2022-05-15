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
// import { IgrRadialGauge, IgrRadialGaugeRange } from 'igniteui-react-gauges';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Auto } from '../../../assets/images/qaqc/auto.svg';
import { ReactComponent as EnduranceMachine } from '../../../assets/images/qaqc/endurance__run.svg';
import { ReactComponent as Manual } from '../../../assets/images/qaqc/manual.svg';
import { ReactComponent as Stop } from '../../../assets/images/qaqc/stop.svg';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundImage: 'linear-gradient(var(--main-color), var(--second-color));',
		color: 'var(--txt-white)',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

var velocityChartOptions = {
	options: {
		chart: {
			height: 300,
			type: 'radialBar',
			offsetY: -10,
		},
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 135,
				dataLabels: {
					name: {
						fontSize: '14px',
						color: undefined,
						offsetY: 60,
					},
					value: {
						offsetY: 30,
						fontSize: '14px',
						color: 'var(--txt-color)',
						fontWeight: 'bold',
						formatter: function (val) {
							return val + 's';
						},
					},
				},
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'dark',
				shadeIntensity: 0.15,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 65, 91],
			},
		},
		stroke: {
			dashArray: 4,
		},
		labels: ['Thời gian giữ'],
	},
};

function createData(params, process) {
	return {
		params,
		process,
	};
}

function StyledPaper({ children }) {
	return <Paper elevation={6}>{children}</Paper>;
}
function Endurance() {
	let history = useHistory();
	const [machineState] = React.useState('stop');
	const [settings] = React.useState({
		waitedClosedTime: 0,
		waitedOpenTime: 0,
		numbs: 0,
		testNumber: 0,
	});
	const [params] = React.useState({
		waitedClosedTime: 0,
		waitedOpenTime: 0,
		droppedTime: 0,
		openedTime: 0,
		numbs: 0,
		testNumber: 0,
	});
	const rows = [
		createData('Thời gian chờ nắp đóng', settings.waitedClosedTime),
		createData('Thời gian chờ nắp mở', settings.waitedOpenTime),
		createData('Số lần thực hiện', settings.numbs),
		createData('Bài test', settings.testNumber),
	];
	// Bài test
	// Thời gian đóng nắp SP
	// Thời gian mở nắp SP
	// Số lần đóng nắp SP
	return (
		<>
			<CustomizedBreadcrumbs href="/layout/qaqc" sector="PHÒNG QA/QC THIẾT BỊ" id="MÁY KIẾM TRA ĐỘ BỀN ĐÓNG ÊM" />
			<div className="row">
				<div className="col-3">
					<div className="card">
						<div className="card__body">
							<div className="row">
								<div className="col-12">
									<EnduranceMachine width="100%" height="350" />
								</div>
							</div>
							<div className="row flex-center">
								<div className="col-8">
									<span className="packingParamsTitle">Tiến độ thực hiện: {params.numbs}</span>
									<ProgressBar height="20px" percent={50} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-6">
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
												<StyledTableCell align="left">Giá trị</StyledTableCell>
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
									transitionDuration={500}
								>
									<IgrRadialGaugeRange name="range1" startValue={0} endValue={40} brush="red" />
									<IgrRadialGaugeRange name="range2" startValue={40} endValue={60} brush="yellow" />
									<IgrRadialGaugeRange name="range3" startValue={60} endValue={100} brush="green" />
								</IgrRadialGauge> */}
								<h4>Thời gian chờ nắp đóng</h4>
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
									transitionDuration={500}
								>
									<IgrRadialGaugeRange name="range1" startValue={0} endValue={40} brush="red" />
									<IgrRadialGaugeRange name="range2" startValue={40} endValue={60} brush="yellow" />
									<IgrRadialGaugeRange name="range3" startValue={60} endValue={100} brush="green" />
								</IgrRadialGauge> */}
								<h4>Thời gian chờ nắp mở</h4>
							</div>
							<div
								className="flex-space-evenly"
								style={{
									flexGrow: 1,
									flexBasis: '300px',
								}}
							>
								<Chart
									options={{
										...velocityChartOptions.options,
										theme: { mode: 'light' },
									}}
									series={[50]}
									type="radialBar"
									height="350px"
								/>
								<h4>Thời gian rơi êm</h4>
							</div>
							<div
								className="flex-space-evenly"
								style={{
									flexGrow: 1,
									flexBasis: '300px',
								}}
							>
								<Chart
									options={{
										...velocityChartOptions.options,
										theme: { mode: 'light' },
									}}
									series={[50]}
									type="radialBar"
									height="350px"
								/>
								<h4>Thời gian mở nắp</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/layout/report/main/qaqc/endurance" />
				</div>
			</div>
		</>
	);
}

export default Endurance;
