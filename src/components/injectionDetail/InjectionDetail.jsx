// import { IgrRadialGauge } from 'igniteui-react-gauges';
import { memo } from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import Badge from '../badge/Badge';
import './injectionDetail.css';
import { INJECTION_MACHINE_ID } from '../../utils/utils';
import ReportNavigationButton from '../reportNavigationButton/ReportNavigationButton';
import { useHistory } from 'react-router-dom';
// import { IgrRadialGauge } from 'igniteui-react-gauges';

function InjectionDetail({ injectionMoldingMachineConfiguration, monitorData }) {
	const history = useHistory();
	const subTitle = INJECTION_MACHINE_ID.find((item) => item.title === injectionMoldingMachineConfiguration.id)?.subTitle
		? INJECTION_MACHINE_ID.find((item) => item.title === injectionMoldingMachineConfiguration.id)?.subTitle
		: 'HaiTian';
	const symbolColor =
		monitorData?.isRunning === true
			? {
					whiteArea: 'white',
					blueArea: '#4237C1',
					border: 'black',
					shadow: '#363636',
					text: '#FF0000',
			  }
			: {
					whiteArea: '#C4C4C4',
					blueArea: '#C4C4C4',
					border: '#C4C4C4',
					shadow: '#C4C4C4',
					text: '#C4C4C4',
			  };
	const state =
		monitorData?.isRunning === true ? 'Đang chạy' : monitorData?.isRunning === false ? 'Tạm dừng' : 'Bảo trì';
	const stateClass =
		monitorData?.isRunning === true ? 'stateR' : monitorData?.isRunning === false ? 'stateS' : 'stateM';
	const badgeType =
		monitorData?.isRunning === true ? 'success' : monitorData?.isRunning === false ? 'danger' : 'primary';

	return (
		<div className={`injectionDetail__container ${stateClass}`}>
			<div className="row">
				<div className="col-2 col-md-2 col-sm-12">
					<div className="injectionDetail__number">{injectionMoldingMachineConfiguration.id}</div>
					<div className="injectionDetail__name">{subTitle}</div>
				</div>
				<div className="col-5 col-md-10 col-sm-12">
					<div className="injectionDetail__symbol">
						<svg width="100%" height="100%" viewBox="0 0 270 74" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.5 15.8769L8.56068 6.93481H67V51.7826H8.57903L0.5 41.6512V15.8769Z"
								fill={symbolColor.whiteArea}
								stroke={symbolColor.border}
							/>
							<rect x="67.5" y="6.43481" width="59.1618" height="45.8478" fill={symbolColor.blueArea} />
							<rect x="126.662" y="6.43481" width="8.33823" height="67.5652" fill={symbolColor.blueArea} />
							<path d="M79.4699 16.489H97.2792V42.2281H79.4699L73.0586 36.3578V21.682L79.4699 16.489Z" fill="white" />
							<rect x="101.25" y="16.489" width="20.6471" height="25.7391" fill="white" />
							<path
								d="M27 52.2827H126.662V74.0001H109.624V61.5327H95.3343V74.0001H74.2661V61.5327H61.0755V74.0001H43.4882V61.5327H35.7937L27 52.2827Z"
								fill="#C4C4C4"
							/>
							<path d="M135 18.0979H143.735V26.7446H190.985V34.3859H143.735V45.4457H135V18.0979Z" fill="#C4C4C4" />
							<path
								d="M152.074 55.2989H190.985V40.4185H246.574L252.133 48.2608V74H152.074V55.2989Z"
								fill={symbolColor.blueArea}
							/>
							<path
								d="M199.824 38.913V22.1126L207.088 14.1738H264.904L269.5 22.0536V33.794L264.966 38.913H199.824Z"
								fill={symbolColor.whiteArea}
								stroke={symbolColor.border}
							/>
							<path
								xmlns="http://www.w3.org/2000/svg"
								d="M60.2207 47.5535L59.985 49.1845L52.769 48.1149L52.97 46.7231L56.9114 43.5682C57.3095 43.2372 57.6285 42.9415 57.8684 42.6809C58.109 42.4154 58.2896 42.1732 58.41 41.9541C58.536 41.7309 58.6143 41.513 58.6451 41.3003C58.6912 40.9814 58.6775 40.7005 58.604 40.4576C58.5313 40.2099 58.4001 40.0078 58.2106 39.8513C58.0259 39.6956 57.7838 39.5956 57.4843 39.5512C57.1656 39.5039 56.8791 39.5404 56.6249 39.6607C56.3755 39.7817 56.1706 39.971 56.01 40.2286C55.8543 40.4868 55.7513 40.79 55.7011 41.1379L53.6072 40.8275C53.698 40.1993 53.9308 39.6464 54.3057 39.1689C54.6813 38.6865 55.1643 38.3311 55.7548 38.1027C56.3459 37.8695 57.0159 37.8084 57.7645 37.9194C58.5035 38.0289 59.1091 38.2421 59.5814 38.5589C60.0591 38.8716 60.396 39.272 60.5919 39.7601C60.7933 40.244 60.8493 40.7953 60.7599 41.4139C60.7097 41.7618 60.6049 42.0943 60.4456 42.4113C60.287 42.7235 60.0802 43.0284 59.825 43.3263C59.5754 43.62 59.2816 43.9121 58.9436 44.2026C58.6056 44.4931 58.2345 44.791 57.8302 45.0964L55.6998 46.8834L60.2207 47.5535Z"
								fill={symbolColor.text}
							/>
							<rect x="190.985" y="21.3152" width="8.33823" height="18.0978" fill={symbolColor.blueArea} />
							<path
								d="M183.838 0H205.28V13.9445L198.517 21.3152H192.25L183.838 13.9445V0Z"
								fill={symbolColor.blueArea}
							/>

							<rect x="185.029" y="3.61963" width="3.17645" height="2.81522" fill={symbolColor.whiteArea} />
							<path d="M135 48.261H190.787V55.5001H152.074V74.0001H135V48.261Z" fill="#C4C4C4" />
							<path d="M60.75 61.5327H67.5V68.9729H74.25V74.0001H60.75V61.5327Z" fill={symbolColor.shadow} />
							<path d="M94.5 61.5327H102.044V68.9729H109.588V74.0001H94.5V61.5327Z" fill={symbolColor.shadow} />
						</svg>
					</div>
					<div className="row" style={{ alignItems: 'center' }}>
						<div className="injectionDetail__progress">
							<div>
								<ProgressBar
									percent={
										isNaN((monitorData.counterShot / injectionMoldingMachineConfiguration.plannedQuantity) * 100)
											? 0
											: (
													(monitorData.counterShot / injectionMoldingMachineConfiguration.plannedQuantity) *
													100
											  ).toFixed(2)
									}
								/>
							</div>
							<span>
								Tiến độ: <span>{monitorData.counterShot + ' sản phẩm'}</span>
							</span>
						</div>
					</div>
				</div>

				<div className="col-5 col-md-12 col-sm-12 injectionDetail__table">
					<table>
						<tbody>
							<tr>
								<td>Trạng thái hoạt động</td>
								<td>
									<Badge type={badgeType} content={state} />
								</td>
							</tr>
							<tr>
								<td>Mã khuôn</td>
								<td>{injectionMoldingMachineConfiguration.moldId}</td>
							</tr>
							<tr>
								<td>Mã chi tiết ép</td>
								<td>{injectionMoldingMachineConfiguration.product.id}</td>
							</tr>
							<tr>
								<td>Tên chi tiết ép</td>
								<td>{injectionMoldingMachineConfiguration.product.name}</td>
							</tr>
							<tr>
								<td>Số lượng cần ép</td>
								<td>{injectionMoldingMachineConfiguration.plannedQuantity}</td>
							</tr>
							<tr>
								<td>Chu kỳ ép cài đặt (giây)</td>
								<td>{monitorData.setCycle}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="row flex-center mb-20">
				<div className="card col-12 injectionDetail__value">
					<div className="mt-10">
						{/* <IgrRadialGauge
							id="cycle"
							width="300px"
							height="300px"
							minimumValue={0}
							maximumValue={Math.floor(
								monitorData.setCycle + monitorData.setCycle / 10
							)}
							interval={Math.floor(
								(monitorData.setCycle + monitorData.setCycle / 10) / 6
							)}
							value={monitorData.cycleTime}
							backingOutline="#c4c4c4"
							scaleEndExtent={0.825}
							scaleStartExtent={0.775}
							minorTickStartExtent={0.7}
							minorTickEndExtent={0.75}
							tickStartExtent={0.675}
							tickEndExtent={0.75}
							labelExtent={0.6}
							labelInterval={Math.floor(
								(monitorData.setCycle + monitorData.setCycle / 10) / 6
							)}
							font="15px Verdana,Arial"
							backingOuterExtent={0.9}
							transitionDuration={500}
						/> */}
						<span>Chu kì ép: {monitorData.cycleTime.toFixed(2)}</span>
					</div>
					<div>
						{/* <IgrRadialGauge
							id="openTime"
							width="300px"
							height="300px"
							minimumValue={0}
							// maximumValue={Math.floor(
							// 	injectionMoldingMachineConfiguration.standardOpenTime +
							// 		injectionMoldingMachineConfiguration.standardOpenTime / 10
							// )}
							maximumValue={50}
							// interval={Math.floor(
							// 	(injectionMoldingMachineConfiguration.standardOpenTime +
							// 		injectionMoldingMachineConfiguration.standardOpenTime / 10) /
							// 		6
							// )}
							interval={5}
							value={monitorData.openTime}
							backingOutline="#c4c4c4"
							scaleEndExtent={0.825}
							scaleStartExtent={0.775}
							minorTickStartExtent={0.7}
							minorTickEndExtent={0.75}
							tickStartExtent={0.675}
							tickEndExtent={0.75}
							labelExtent={0.6}
							labelInterval={5}
							font="15px Verdana,Arial"
							backingOuterExtent={0.9}
							transitionDuration={500}
						/> */}
						<span>Thời gian mở cửa: {monitorData.openTime.toFixed(2)}</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-horizontal-center">
					<ReportNavigationButton history={history} path="/layout/report/main/injection" />
					<div className="mr-40"></div>
					<ReportNavigationButton history={history} path="/layout/report/oee">
						CHỈ SỐ OEE
					</ReportNavigationButton>
				</div>
			</div>
		</div>
	);
}

export default memo(InjectionDetail);
