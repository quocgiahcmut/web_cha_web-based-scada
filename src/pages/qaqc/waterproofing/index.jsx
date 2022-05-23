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
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Auto } from '../../../assets/images/qaqc/auto.svg';
import { ReactComponent as Manual } from '../../../assets/images/qaqc/manual.svg';
// import { IgrRadialGauge, IgrRadialGaugeRange } from 'igniteui-react-gauges';
import { ReactComponent as Stop } from '../../../assets/images/qaqc/stop.svg';
import { ReactComponent as WaterProofMachine } from '../../../assets/images/qaqc/waterproof__run.svg';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale, Title, LineElement, PointElement);

const trendOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		datalabels: {
			display: false,
		},
		legend: {
			display: false,
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
		},
		y: {
			grid: {
				display: false,
			},
		},
	},
};

const trendData = {
	labels: ['17:51', '18:00', '18:30', '19:00', '20:09', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'],
	datasets: [
		{
			label: 'Nhiệt độ máy',
			data: [10, 25, 50, 75, 100, 110, 100, 90, 110, 100, 103, 102],
			fill: 'start',
			borderColor: 'rgba(54, 162, 235, 1)',
			backgroundColor: 'rgba(54, 162, 235,0.2)',
			tension: 0.4,
		},
		{
			label: 'Setpoint',
			data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
			fill: false,
			borderColor: '#ff5252',
			tension: 0.1,
		},
	],
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundImage: 'linear-gradient(var(--main-color), var(--second-color));',
		color: 'var(--txt-white)',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function createData(params, process) {
	return {
		params,
		process,
	};
}

function StyledPaper({ children }) {
	return <Paper elevation={6}>{children}</Paper>;
}
function WaterProofing() {
	const history = useHistory();
	const [machineState] = React.useState('stop');
	const [settings] = React.useState({
		temperature: 0,
		time: 0,
		testNumber: 0,
	});
	const [params] = React.useState({
		temperature: 0,
		time: 0,
		testNumber: 0,
	});
	const rows = [
		createData('Nhiệt độ cài đặt', settings.temperature),
		createData('Thời gian cài đặt', settings.time),
		createData('Bài test', settings.testNumber),
	];
	return (
		<>
			<CustomizedBreadcrumbs href="/layout/qaqc" sector="PHÒNG QA/QC THIẾT BỊ" id="MÁY KIẾM TRA CHỐNG THẤM NƯỚC" />
			<div className="row">
				<div className="col-3">
					<div className="card">
						<div className="card__body">
							<div className="row">
								<div className="col-12">
									<WaterProofMachine width="100%" height="350" />
								</div>
							</div>
							<div className="row flex-center">
								<div className="col-8">
									<span className="packingParamsTitle">Thời gian kiểm tra: {params.time}</span>
									<ProgressBar height="20px" percent={50} />
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
						<div className="card__body mb-15 flex-center">
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
				<div className="col-2">
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
				<div className="col-2">
					<div className="card full-height">
						<div className="card__header">
							<h3>Nhiệt độ giám sát</h3>
						</div>
						<div className="card__body flex-horizontal-space-evenly">
							{' '}
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
							</div>
						</div>
					</div>
				</div>
				<div className="col-12">
					<div
						className="card"
						style={{
							height: '550px',
						}}
					>
						<div className="card__header">
							<h3>Biểu đồ nhiệt độ</h3>
						</div>
						<div className="card__body height-90">
							<Line options={trendOptions} data={trendData} />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/layout/report/main/qaqc/water-proof" />
				</div>
			</div>
		</>
	);
}

export default WaterProofing;
