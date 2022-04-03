import React from 'react';
import { useHistory } from 'react-router-dom';
import { convertHMS, packingEmployees, packingState } from '../../utils/utils';
import Badge from '../badge/Badge';
import ProgressBar from '../progressBar/ProgressBar';
import ReportNavigationButton from '../reportNavigationButton/ReportNavigationButton';
import './packingDetail.css';

const mockPacking = {
	id: 'module1',
	state: 'finish',
	startTime: '2020-01-01T00:00:00.000Z',
	endTime: '2020-01-01T00:00:00.000Z',
	totalTime: '00:00:00',
};

function PackingDetail() {
	const history = useHistory();
	const [productState, setProductState] = React.useState('onWait');
	const [productStateText, setProductStateText] = React.useState('Đang chờ');
	React.useEffect(() => {
		switch (mockPacking.state) {
			case 'running':
				setProductState('onProcess');
				return;
			case 'waiting':
				setProductState('onWait');
				return;
			case 'finish':
				setProductState('onFinish');
				return;
			case 'cancel':
				setProductState('onCancel');
				return;
			case 'idle':
				setProductState('onIdle');
				return;
			default:
				setProductState('onWait');
				return;
		}
	}, [productState]);
	React.useEffect(() => {
		switch (productState) {
			case 'onWait':
				setProductStateText('Đang chờ');
				return;
			case 'onProcess':
				setProductStateText('Đang thực hiện');
				return;
			case 'onFinish':
				setProductStateText('Hoàn thành');
				return;
			case 'onCancel':
				setProductStateText('Đã hủy');
				return;
			case 'onIdle':
				setProductStateText('Tạm dừng');
				return;
			default:
				setProductStateText('Đang chờ');
				return;
		}
	}, [productState]);
	const isRunning = true;
	return (
		<>
			<div
				style={{
					borderColor: `${isRunning ? 'var(--main-color-green)' : 'var(--main-color-red)'}`,
				}}
				className="packingMachine__container"
			>
				<div className="row mb-30">
					<div className="col-2 flex-center">
						<div
							title={`${isRunning ? 'Máy đang vận hành' : 'Máy tạm dừng'}`}
							style={{
								backgroundColor: `${isRunning ? 'var(--main-color-green)' : 'var(--main-color-red)'}`,
							}}
							className="classification__state-type-container--detail"
						>
							{isRunning ? 'R' : 'S'}
						</div>
					</div>
					<div className="col-5">
						<>
							<div className="row">
								<div className="col-12">
									<svg width="100%" height="100%" viewBox="0 0 639 293" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_13_36)">
											<rect x="248.819" y="107" width="8.99339" height="29" fill="#C4C4C4" />
											<path d="M3 117H177.872V292H171.876V205.5H9.49523V292H3V117Z" fill="#6C6C6C" />
											<path d="M190.862 136H275.8V292H267.806V145H197.857V292H190.862V136Z" fill="#C4C4C4" />
											<rect x="197.857" y="145" width="69.9486" height="60" fill="#727272" />
											<path
												d="M202.853 118H232.332L261.81 136H202.853V118Z"
												fill={`${isRunning ? '#BB9B6B' : 'var(--main-color-gray)'}`}
											/>
											<line x1="184.866" y1="117.5" x2="244.822" y2="117.5" stroke="black" />
											<path d="M192.861 96H248.82V102H202.853V107H248.82V111H192.861V96Z" fill="#373737" />
											<line x1="248.819" y1="96.5" x2="288.79" y2="96.5" stroke="black" />
											<line x1="275.8" y1="98" x2="288.79" y2="98" stroke="#B7B7B7" strokeWidth="2" />
											<line x1="287.792" y1="98" x2="287.792" y2="111" stroke="#B7B7B7" strokeWidth="2" />
											<line x1="289.29" y1="96" x2="289.29" y2="136" stroke="black" />
											<path d="M288.79 135H404.705V292H398.709V143.5H294.786V292H288.79V135Z" fill="#C4C4C4" />
											<path
												d="M294.786 165.292H327.761V161.112H332.758V143H398.709V205H332.758V174.581H327.761V170.865H294.786V165.292Z"
												fill={`${isRunning ? '#46565B' : 'var(--main-color-gray)'}`}
											/>
											<line x1="294.786" y1="170.5" x2="327.761" y2="170.5" stroke="#30393C" />
											<line x1="316.77" y1="144" x2="332.758" y2="144" stroke="#30393C" strokeWidth="2" />
											<rect
												x="275.8"
												y="151"
												width="12.9904"
												height="33"
												fill={`${isRunning ? '#46565B' : 'var(--main-color-gray)'}`}
											/>
											<rect x="297.784" y="132" width="100.926" height="3" fill="#82735D" />
											<path
												d="M305.778 127H342.75V112.5H307.276V102H342.75V88.5H327.262V64H371.23L373.728 66.5V88.5H358.739V102L388.217 102.5V112.5H358.739V125H389.716V132.5H388.217V131.5H385.219V132.5H309.775V131.5H307.276V132.5H305.778V127Z"
												fill="#696969"
											/>
											<path d="M308.553 107L308.553 131" stroke="#686868" strokeWidth="2" />
											<path d="M308.553 105L308.553 110" stroke="#070707" strokeWidth="2" />
											<path d="M386.718 108L386.718 131" stroke="#686868" strokeWidth="2" />
											<path d="M386.496 106L386.496 111" stroke="#070707" strokeWidth="2" />
											<path d="M375.726 44L375.726 133" stroke="#686868" strokeWidth="4" />
											<path d="M325.763 44L325.763 133" stroke="#686868" strokeWidth="4" />
											<rect x="315.271" y="0.5" width="70.9472" height="55" fill="#C4C4C4" stroke="black" />
											<rect x="326.762" y="18" width="47.9648" height="33" fill="#1F1F1F" />
											<rect x="330.759" y="22" width="39.9706" height="25" fill="#6B6B6B" />
											<rect x="333.757" y="2" width="33.9751" height="14" fill="#272727" />
											<path
												d="M338.306 15.12C337.646 15.12 337.121 14.8975 336.731 14.4525C336.341 14.0025 336.146 13.4 336.146 12.645V11.355C336.146 10.925 336.218 10.52 336.363 10.14C336.513 9.755 336.721 9.435 336.986 9.18C336.751 8.945 336.566 8.65 336.431 8.295C336.301 7.935 336.236 7.555 336.236 7.155V6.225C336.236 5.5 336.421 4.925 336.791 4.5C337.166 4.07 337.671 3.855 338.306 3.855C338.941 3.855 339.443 4.0675 339.813 4.4925C340.188 4.9175 340.376 5.495 340.376 6.225V7.155C340.376 7.555 340.308 7.935 340.173 8.295C340.043 8.65 339.861 8.945 339.626 9.18C339.891 9.435 340.096 9.755 340.241 10.14C340.391 10.52 340.466 10.925 340.466 11.355V12.645C340.466 13.4 340.271 14.0025 339.881 14.4525C339.491 14.8975 338.966 15.12 338.306 15.12ZM338.306 13.635C338.501 13.635 338.633 13.5525 338.703 13.3875C338.778 13.2175 338.816 12.905 338.816 12.45V11.3325C338.816 10.8425 338.778 10.5075 338.703 10.3275C338.633 10.1425 338.501 10.05 338.306 10.05C338.111 10.05 337.978 10.14 337.908 10.32C337.838 10.495 337.803 10.8325 337.803 11.3325V12.45C337.803 12.9 337.838 13.21 337.908 13.38C337.983 13.55 338.116 13.635 338.306 13.635ZM338.306 8.46C338.426 8.46 338.521 8.415 338.591 8.325C338.661 8.235 338.711 8.0875 338.741 7.8825C338.771 7.6725 338.786 7.3925 338.786 7.0425V6.315C338.786 5.92 338.751 5.65 338.681 5.505C338.616 5.355 338.491 5.28 338.306 5.28C338.126 5.28 338.001 5.3525 337.931 5.4975C337.866 5.6425 337.833 5.915 337.833 6.315V7.0425C337.833 7.3975 337.848 7.68 337.878 7.89C337.908 8.095 337.956 8.2425 338.021 8.3325C338.091 8.4175 338.186 8.46 338.306 8.46ZM346.468 15.12C345.808 15.12 345.283 14.8975 344.893 14.4525C344.503 14.0025 344.308 13.4 344.308 12.645V11.355C344.308 10.925 344.38 10.52 344.525 10.14C344.675 9.755 344.883 9.435 345.148 9.18C344.913 8.945 344.728 8.65 344.593 8.295C344.463 7.935 344.398 7.555 344.398 7.155V6.225C344.398 5.5 344.583 4.925 344.953 4.5C345.328 4.07 345.833 3.855 346.468 3.855C347.103 3.855 347.605 4.0675 347.975 4.4925C348.35 4.9175 348.538 5.495 348.538 6.225V7.155C348.538 7.555 348.47 7.935 348.335 8.295C348.205 8.65 348.023 8.945 347.788 9.18C348.053 9.435 348.258 9.755 348.403 10.14C348.553 10.52 348.628 10.925 348.628 11.355V12.645C348.628 13.4 348.433 14.0025 348.043 14.4525C347.653 14.8975 347.128 15.12 346.468 15.12ZM346.468 13.635C346.663 13.635 346.795 13.5525 346.865 13.3875C346.94 13.2175 346.978 12.905 346.978 12.45V11.3325C346.978 10.8425 346.94 10.5075 346.865 10.3275C346.795 10.1425 346.663 10.05 346.468 10.05C346.273 10.05 346.14 10.14 346.07 10.32C346 10.495 345.965 10.8325 345.965 11.3325V12.45C345.965 12.9 346 13.21 346.07 13.38C346.145 13.55 346.278 13.635 346.468 13.635ZM346.468 8.46C346.588 8.46 346.683 8.415 346.753 8.325C346.823 8.235 346.873 8.0875 346.903 7.8825C346.933 7.6725 346.948 7.3925 346.948 7.0425V6.315C346.948 5.92 346.913 5.65 346.843 5.505C346.778 5.355 346.653 5.28 346.468 5.28C346.288 5.28 346.163 5.3525 346.093 5.4975C346.028 5.6425 345.995 5.915 345.995 6.315V7.0425C345.995 7.3975 346.01 7.68 346.04 7.89C346.07 8.095 346.118 8.2425 346.183 8.3325C346.253 8.4175 346.348 8.46 346.468 8.46ZM354.63 15.12C353.97 15.12 353.445 14.8975 353.055 14.4525C352.665 14.0025 352.47 13.4 352.47 12.645V11.355C352.47 10.925 352.542 10.52 352.687 10.14C352.837 9.755 353.045 9.435 353.31 9.18C353.075 8.945 352.89 8.65 352.755 8.295C352.625 7.935 352.56 7.555 352.56 7.155V6.225C352.56 5.5 352.745 4.925 353.115 4.5C353.49 4.07 353.995 3.855 354.63 3.855C355.265 3.855 355.767 4.0675 356.137 4.4925C356.512 4.9175 356.7 5.495 356.7 6.225V7.155C356.7 7.555 356.632 7.935 356.497 8.295C356.367 8.65 356.185 8.945 355.95 9.18C356.215 9.435 356.42 9.755 356.565 10.14C356.715 10.52 356.79 10.925 356.79 11.355V12.645C356.79 13.4 356.595 14.0025 356.205 14.4525C355.815 14.8975 355.29 15.12 354.63 15.12ZM354.63 13.635C354.825 13.635 354.957 13.5525 355.027 13.3875C355.102 13.2175 355.14 12.905 355.14 12.45V11.3325C355.14 10.8425 355.102 10.5075 355.027 10.3275C354.957 10.1425 354.825 10.05 354.63 10.05C354.435 10.05 354.302 10.14 354.232 10.32C354.162 10.495 354.127 10.8325 354.127 11.3325V12.45C354.127 12.9 354.162 13.21 354.232 13.38C354.307 13.55 354.44 13.635 354.63 13.635ZM354.63 8.46C354.75 8.46 354.845 8.415 354.915 8.325C354.985 8.235 355.035 8.0875 355.065 7.8825C355.095 7.6725 355.11 7.3925 355.11 7.0425V6.315C355.11 5.92 355.075 5.65 355.005 5.505C354.94 5.355 354.815 5.28 354.63 5.28C354.45 5.28 354.325 5.3525 354.255 5.4975C354.19 5.6425 354.157 5.915 354.157 6.315V7.0425C354.157 7.3975 354.172 7.68 354.202 7.89C354.232 8.095 354.28 8.2425 354.345 8.3325C354.415 8.4175 354.51 8.46 354.63 8.46ZM362.792 15.12C362.132 15.12 361.607 14.8975 361.217 14.4525C360.827 14.0025 360.632 13.4 360.632 12.645V11.355C360.632 10.925 360.704 10.52 360.849 10.14C360.999 9.755 361.207 9.435 361.472 9.18C361.237 8.945 361.052 8.65 360.917 8.295C360.787 7.935 360.722 7.555 360.722 7.155V6.225C360.722 5.5 360.907 4.925 361.277 4.5C361.652 4.07 362.157 3.855 362.792 3.855C363.427 3.855 363.929 4.0675 364.299 4.4925C364.674 4.9175 364.862 5.495 364.862 6.225V7.155C364.862 7.555 364.794 7.935 364.659 8.295C364.529 8.65 364.347 8.945 364.112 9.18C364.377 9.435 364.582 9.755 364.727 10.14C364.877 10.52 364.952 10.925 364.952 11.355V12.645C364.952 13.4 364.757 14.0025 364.367 14.4525C363.977 14.8975 363.452 15.12 362.792 15.12ZM362.792 13.635C362.987 13.635 363.119 13.5525 363.189 13.3875C363.264 13.2175 363.302 12.905 363.302 12.45V11.3325C363.302 10.8425 363.264 10.5075 363.189 10.3275C363.119 10.1425 362.987 10.05 362.792 10.05C362.597 10.05 362.464 10.14 362.394 10.32C362.324 10.495 362.289 10.8325 362.289 11.3325V12.45C362.289 12.9 362.324 13.21 362.394 13.38C362.469 13.55 362.602 13.635 362.792 13.635ZM362.792 8.46C362.912 8.46 363.007 8.415 363.077 8.325C363.147 8.235 363.197 8.0875 363.227 7.8825C363.257 7.6725 363.272 7.3925 363.272 7.0425V6.315C363.272 5.92 363.237 5.65 363.167 5.505C363.102 5.355 362.977 5.28 362.792 5.28C362.612 5.28 362.487 5.3525 362.417 5.4975C362.352 5.6425 362.319 5.915 362.319 6.315V7.0425C362.319 7.3975 362.334 7.68 362.364 7.89C362.394 8.095 362.442 8.2425 362.507 8.3325C362.577 8.4175 362.672 8.46 362.792 8.46Z"
												fill={`${isRunning ? '#FF0000' : '#000'}`}
											/>
											<path
												d="M383.47 9C383.47 10.519 382.24 11.75 380.723 11.75C379.205 11.75 377.975 10.519 377.975 9C377.975 7.48104 379.205 6.25 380.723 6.25C382.24 6.25 383.47 7.48104 383.47 9Z"
												fill="#C57B26"
												stroke="black"
												strokeWidth="0.5"
											/>
											<path
												d="M383.47 24C383.47 25.519 382.24 26.75 380.723 26.75C379.205 26.75 377.975 25.519 377.975 24C377.975 22.481 379.205 21.25 380.723 21.25C382.24 21.25 383.47 22.481 383.47 24Z"
												fill={`${isRunning ? '#31BE00' : 'var(--main-color-gray)'}`}
												stroke="black"
												strokeWidth="0.5"
											/>
											<path
												d="M383.47 35C383.47 36.519 382.24 37.75 380.723 37.75C379.205 37.75 377.975 36.519 377.975 35C377.975 33.481 379.205 32.25 380.723 32.25C382.24 32.25 383.47 33.481 383.47 35Z"
												fill={`${isRunning ? '#31BE00' : 'var(--main-color-gray)'}`}
												stroke="black"
												strokeWidth="0.5"
											/>
											<path
												d="M383.47 46C383.47 47.519 382.24 48.75 380.723 48.75C379.205 48.75 377.975 47.519 377.975 46C377.975 44.481 379.205 43.25 380.723 43.25C382.24 43.25 383.47 44.481 383.47 46Z"
												fill={`${isRunning ? '#31BE00' : 'var(--main-color-gray)'}`}
												stroke="black"
												strokeWidth="0.5"
											/>
											<path
												d="M408.702 147H497.637L472.655 109.5L478.651 105.5L514.125 158.5L577.078 115.5H602.56V292H596.564V128H577.078L514.125 171V292H508.629V165L501.634 153H414.198V292H408.702V147Z"
												fill="#5A5A5A"
											/>
											<rect
												width="151.924"
												height="75.9825"
												transform="matrix(-0.827736 0.561117 -0.560553 -0.828119 641 74.9226)"
												fill={`${isRunning ? '#31BE00' : 'var(--main-color-gray)'}`}
											/>
											<rect
												width="34.9821"
												height="10.9975"
												rx="3"
												transform="matrix(0.833699 -0.552219 0.551655 0.834072 527.615 77.3179)"
												fill="white"
											/>
											<path d="M515.624 120.701L605.756 61.0001" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M517.999 125.968L608.131 66.2667" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M520.996 130.968L611.129 71.2667" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M523.994 135.968L614.127 76.2667" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M526.992 140.968L617.124 81.2667" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<rect
												x="292.787"
												y="300"
												width="94.9303"
												height="76"
												transform="rotate(180 292.787 300)"
												fill={`${isRunning ? '#31BE00' : 'var(--main-color-gray)'}`}
											/>
											<rect x="232.831" y="235" width="21.9839" height="11" rx="3" fill="white" />
											<path d="M220.838 265.304H265.805" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M220.838 272.304H265.805" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M220.838 279.304H265.805" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M220.838 286.304H265.805" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<rect
												x="472.655"
												y="147"
												width="63.953"
												height="36"
												transform="rotate(180 472.655 147)"
												fill="#838383"
											/>
											<rect x="432.264" y="116.211" width="14.8102" height="5.21053" rx="2.60526" fill="white" />
											<path d="M424.184 130.565H454.478" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M424.184 133.881H454.478" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M424.184 137.197H454.478" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
											<path d="M424.184 140.512H454.478" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
										</g>
										<defs>
											<clipPath id="clip0_13_36">
												<rect width="639" height="293" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
						</>
					</div>
					<div className="col-5 flex-space-evenly">
						<div
							style={{
								flexGrow: 1,
							}}
							className="row full-width"
						>
							<div className="col-12 flex-justify-center">
								<span className="packing__employee-name">Nhân viên thực hiện: {packingEmployees[0]}</span>
							</div>
							<div className="col-12 flex-justify-center">
								<span className="packingParamsTitle">Giờ làm việc thực: {convertHMS(21161)}</span>
								<ProgressBar height="38px" percent={50} />
							</div>
							<div className="col-12 flex-justify-center">
								<span className="packingParamsTitle">Tiến độ sản phẩm hiện tại: 250 sản phẩm</span>
								<ProgressBar height="38px" percent={50} />
							</div>
						</div>
					</div>
				</div>
				<div className="row flex-center">
					<div className="col-12">
						<div className="card">
							<div className="card__body">
								<table id="packingDetail">
									<tbody>
										<tr>
											<td>Tên công việc</td>
											<td>AbXX9181</td>
											<td>AbXX9181</td>
											<td>AbXX9181</td>
										</tr>
										<tr>
											<td>Số lượng yêu cầu</td>
											<td>500</td>
											<td>500</td>
											<td>500</td>
										</tr>
										<tr>
											<td>Số lượng thực hiện</td>
											<td>500</td>
											<td>500</td>
											<td>0</td>
										</tr>
										<tr>
											<td>Ghi chú</td>
											<td>Không</td>
											<td>Không</td>
											<td>Không</td>
										</tr>
										<tr>
											<td>Tầng suất lỗi</td>
											<td>130.12 sản phẩm / 1 lỗi</td>
											<td>130.12 sản phẩm / 1 lỗi</td>
											<td>130.12 sản phẩm / 1 lỗi</td>
										</tr>
										<tr>
											<td>Thời gian thực hiện</td>
											<td>2 tiếng 15 phút</td>
											<td>2 tiếng 15 phút</td>
											<td>2 Chưa thực hiện</td>
										</tr>
										<tr>
											<td>Trạng thái</td>
											<td>
												<Badge type={packingState[productState]} content={productStateText} />
											</td>
											<td>
												<Badge type={packingState[productState]} content={productStateText} />
											</td>
											<td>
												<Badge type={packingState[productState]} content={productStateText} />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-center mb-10">
					<ReportNavigationButton history={history} path="/report/main/packing" />
				</div>
			</div>
		</>
	);
}

export default PackingDetail;
