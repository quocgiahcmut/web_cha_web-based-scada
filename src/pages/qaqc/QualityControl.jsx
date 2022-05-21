import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { setDeformationMonitorData } from '../../redux/slice/QaQcMonitorSlice';
import { ReactComponent as StoppedForcedEndurance } from '../../assets/images/qaqc/forcedEndurance__stop.svg';
import { ReactComponent as RunForcedEndurance } from '../../assets/images/qaqc/forcedEndurance__run.svg';

import { ReactComponent as StoppedEndurance } from '../../assets/images/qaqc/endurance__stop.svg';
import { ReactComponent as RunEndurance } from '../../assets/images/qaqc/endurance__run.svg';

import { ReactComponent as StoppedWaterProof } from '../../assets/images/qaqc/waterProof__stop.svg';
import { ReactComponent as RunWaterProof } from '../../assets/images/qaqc/waterproof__run.svg';

import { ReactComponent as StoppedDeformation } from '../../assets/images/qaqc/deformation__stop.svg';
import { ReactComponent as RunDeformation } from '../../assets/images/qaqc/deformation__run.svg';

import QaqcMonitor from '../../components/qaqcmonitor/QaqcMonitor';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { toast, ToastContainer } from 'react-toastify';
import { getTagsData } from '../../utils/utils';
import CustomizedBreadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

function QualityControl() {
	const [forcedEndurance] = React.useState('forcedEndurance__stop');
	const [endurance] = React.useState('endurance__stop');
	const [waterProof] = React.useState('waterProof__stop');

	const [connection, setConnection] = React.useState(false);
	const [connectionState, setConnectionState] = React.useState('disconnected');
	const [error, setError] = React.useState(null);
	const [errorPriority, setErrorPriority] = React.useState(null);
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const qaqcMonitorReducer = useSelector((state) => state.qaQcMonitorData);
	const deformationMonitorData = qaqcMonitorReducer.deformationMonitorData;
	const [deformation, setDeformation] = React.useState(
		deformationMonitorData.isRunning ? 'deformation__run' : 'deformation__stop'
	);
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
				setConnectionState('connected');
			})
			.catch((err) => {
				console.error(err);
			});
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
		if (connection && connectionState === 'connected') {
			id = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'qaqclab',
					['plc'],
					[
						[
							'Sp Force Cyliner 3',
							'Sp No Press 3',
							'Sp Time Hold 3',
							'Sp Force Cylinder 12',
							'Sp No Press 12',
							'Sp Time Hold 12',
							'Mode App',
							'Green App',
							'Red App',
							'Error App',
							'Error Code',
						],
					]
				);
				dispatch(
					setDeformationMonitorData({
						numb1: rawData.deviceQueryResults[0].tagQueryResults[4].value,
						numb2: rawData.deviceQueryResults[0].tagQueryResults[1].value,
						force1: rawData.deviceQueryResults[0].tagQueryResults[3].value,
						force2: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						time1: rawData.deviceQueryResults[0].tagQueryResults[5].value,
						time2: rawData.deviceQueryResults[0].tagQueryResults[2].value,
						mode: rawData.deviceQueryResults[0].tagQueryResults[6].value,
						isRunning: rawData.deviceQueryResults[0].tagQueryResults[7].value,
						isAlarm: rawData.deviceQueryResults[0].tagQueryResults[8].value,
					})
				);
				setDeformation(deformationMonitorData.isRunning ? 'deformation__run' : 'deformation__stop');
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
		return () => {
			clearInterval(id);
		};
	}, [connection, connectionState, dispatch, deformationMonitorData]);
	React.useEffect(() => {
		if (error && errorPriority) {
			notify(error, errorPriority);
		}
	}, [error, errorPriority]);
	return (
		<>
			<CustomizedBreadcrumbs id="PHÒNG QA/QC THIẾT BỊ" />
			<div className="row">
				<div className="col-5 col-md-12">
					<div className="card full-height">
						<div className="card__header">
							<h3>Kiểm tra độ bền cưỡng bức</h3>
						</div>
						<div className="card__body">
							<QaqcMonitor
								paramsTitle={[
									'Thời gian dừng lên',
									'Thời gian dừng xuống',
									'Số lần đóng nắp cài đặt',
									'Số lần đóng nắp hiện tại',
								]}
								params={[['0', '0', '0', '0']]}
								led={{
									isRunning: false,
									isAlarm: false,
								}}
								isDeformation={false}
							>
								{forcedEndurance && forcedEndurance === 'forcedEndurance__stop' ? (
									<StoppedForcedEndurance width="70%" height="350" />
								) : (
									<RunForcedEndurance width="70%" height="350" />
								)}
							</QaqcMonitor>
						</div>
						<div className="card__footer">
							<Link to={`${match.url}/m3`}>Xem thêm</Link>
						</div>
					</div>
				</div>
				<div className="col-7 col-md-12">
					<div className="card full-height">
						<div className="card__header">
							<h3>Kiểm tra độ biến dạng</h3>
						</div>
						<div className="card__body">
							<QaqcMonitor
								paramsTitle={['1', 'Lực nén cài đặt', 'Thời gian giữ', 'Số lần cài đặt']}
								params={[
									[deformationMonitorData.force1, deformationMonitorData.time1, deformationMonitorData.numb1],
									[deformationMonitorData.force2, deformationMonitorData.time2, deformationMonitorData.numb2],
								]}
								led={{
									mode: deformationMonitorData.mode,
									isRunning: deformationMonitorData.isRunning,
									isAlarm: deformationMonitorData.isAlarm,
								}}
								isDeformation={true}
							>
								{deformation && deformation === 'deformation__stop' ? (
									<StoppedDeformation width="100%" height="350" />
								) : (
									<RunDeformation width="100%" height="350" />
								)}
							</QaqcMonitor>
						</div>
						<div className="card__footer">
							<Link to={`${match.url}/m1`}>Xem thêm</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-md-12">
					<div className="card full-height">
						<div className="card__header">
							<h3>Kiểm tra độ bền êm</h3>
						</div>
						<div className="card__body">
							<QaqcMonitor
								paramsTitle={[
									'Thời gian chờ nắp đóng',
									'Thời gian chờ nắp mở',
									'Số lần đóng nắp cài đặt',
									'Số lần đóng nắp hiện tại',
								]}
								params={[['0', '0', '0', '0']]}
								led={{
									isRunning: false,
									isAlarm: false,
								}}
								isDeformation={false}
							>
								{endurance && endurance === 'endurance__stop' ? (
									<StoppedEndurance width="70%" height="350" />
								) : (
									<RunEndurance width="70%" height="350" />
								)}
							</QaqcMonitor>
						</div>
						<div className="card__footer">
							<Link to={`${match.url}/m2`}>Xem thêm</Link>
						</div>
					</div>
				</div>
				<div className="col-6 col-md-12">
					<div className="card full-height">
						<div className="card__header">
							<h3>Kiểm tra chống thấm</h3>
						</div>
						<div className="card__body">
							<QaqcMonitor
								paramsTitle={[
									'Nhiệt độ cài đặt',
									'Nhiệt độ thực',
									'Thời gian kiểm tra cài đặt',
									'Thời gian kiểm tra thực',
								]}
								params={[['0', '0', '0', '0']]}
								led={{
									isRunning: false,
									isAlarm: false,
								}}
								isWaterProof={true}
								isDeformation={false}
							>
								{waterProof && waterProof === 'waterProof__stop' ? (
									<StoppedWaterProof width="100%" height="350" />
								) : (
									<RunWaterProof width="100%" height="350" />
								)}
							</QaqcMonitor>
						</div>
						<div className="card__footer">
							<Link to={`${match.url}/m4`}>Xem thêm</Link>
						</div>
					</div>
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

export default QualityControl;
