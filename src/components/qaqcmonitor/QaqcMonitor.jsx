import React from 'react';
import PropTypes from 'prop-types';

import './qaqcmonitor.css';

QaqcMonitor.propTypes = {
	paramsTitle: PropTypes.array,
	params: PropTypes.array,
	led: PropTypes.object,
	children: PropTypes.element.isRequired,
	isWaterProof: PropTypes.bool,
	isDeformation: PropTypes.bool,
};

function QaqcMonitor(props) {
	const { paramsTitle, params, children, led, isDeformation, isWaterProof } = props;
	const [ledState, setLedState] = React.useState({
		isRunning: 'false',
		isAlarm: 'false',
		mode: null,
	});
	React.useEffect(() => {
		setLedState(led);
	}, [led]);

	return (
		<>
			<div className="row">
				<div className={`${isWaterProof ? `col-6` : `col-6`} flex-space-evenly`}>
					<div className="row full-width">
						<div
							style={{
								flexGrow: 2,
							}}
							className={`${isDeformation ? `col-4 deformation` : `col-6`} flex-left params__title`}
						>
							{paramsTitle.map((item, index) => (
								<p key={index}>{item}</p>
							))}
						</div>
						<div className={isDeformation ? 'col-3' : 'col-4'}>
							{isDeformation && (
								<>
									<div>
										<p className="card__params-title">Hệ 1</p>
									</div>
								</>
							)}
							{params[0].map((item, index) => (
								<div
									style={{
										flexGrow: 1,
									}}
									key={index}
									className="card__params-container"
								>
									<p>{item}</p>
								</div>
							))}
						</div>
						{isDeformation && (
							<>
								<div className="col-3">
									{isDeformation && (
										<>
											<div>
												<p className="card__params-title">Hệ 2</p>
											</div>
										</>
									)}
									{params[1].map((item, index) => (
										<div
											style={{
												flexGrow: 1,
											}}
											key={index}
											className="card__params-container"
										>
											<p>{item}</p>
										</div>
									))}
								</div>
							</>
						)}
					</div>
					<hr className="divider middle" />
					<div className="row full-width">
						{isDeformation ? (
							<>
								<div className="col-4 flex-space-between">
									<div className="body__led-box">
										<div
											style={{
												width: '30px',
												height: '30px',
												backgroundColor:
													ledState.mode === true
														? '#6e3300'
														: ledState.mode !== false && ledState.mode !== true
														? '#a5a5a5'
														: '#0d00ff',
											}}
											className="body__led"
										></div>
										<div
											style={{
												fontSize: '1rem',
											}}
											className="body__led-title"
										>
											Chế độ
										</div>
									</div>
								</div>
								<div className="col-4 flex-space-between">
									<div className="body__led-box">
										<div
											style={{
												width: '30px',
												height: '30px',
												backgroundColor: ledState.isRunning === true ? '#02692e' : '#a5a5a5',
											}}
											className="body__led"
										></div>
										<div
											style={{
												fontSize: '1rem',
											}}
											className="body__led-title"
										>
											đang chạy
										</div>
									</div>
								</div>
								<div className="col-4">
									<div className="body__led-box">
										<div
											style={{
												width: '30px',
												height: '30px',
												backgroundColor: ledState.isAlarm === true ? 'red' : '#a5a5a5',
											}}
											className="body__led"
										></div>
										<div
											style={{
												fontSize: '1rem',
											}}
											className="body__led-title"
										>
											cảnh báo
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="col-6 flex-space-between">
									<div className="body__led-box">
										<div
											style={{
												backgroundColor: ledState.isRunning === true ? '#02692e' : '#a5a5a5',
											}}
											className="body__led"
										></div>
										<div className="body__led-title">đang chạy</div>
									</div>
								</div>
								<div className="col-6">
									<div className="body__led-box">
										<div
											style={{
												backgroundColor: ledState.isAlarm === true ? 'red' : '#a5a5a5',
											}}
											className="body__led"
										></div>
										<div className="body__led-title">cảnh báo</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className={`${isWaterProof ? `col-6` : `col-6`} flex-center`}>{children}</div>
			</div>
		</>
	);
}

export default QaqcMonitor;
