import React from 'react';
import './oeeDisplay.css';

function OeeDisplay({ targetData, oeeOverallData, trend, discrepancy }) {
	return (
		<>
			<div className="row full-width">
				<div className="col-3 oee-display__horizontal-divider flex-center">
					<span className="oee-display__header">Mục tiêu</span>
					<span className="oee-display__value">
						{targetData}%
						{trend === 'up' ? (
							<span className="oee-display__trend oee-display__trend--up">
								<span className="oee-display__trend-detail">
									({discrepancy}
									<i className="bx bxs-up-arrow" />)
								</span>
							</span>
						) : trend === 'down' ? (
							<span className="oee-display__trend oee-display__trend--down">
								<span className="oee-display__trend-detail">
									({discrepancy}
									<i className="bx bxs-down-arrow" />)
								</span>
							</span>
						) : null}
					</span>
				</div>
				<div className="col-3 flex-left">
					<span className="oee-display__header oee-display__header--availability">Khả dụng</span>
					<span className="oee-display__value oee-display__value--availability">{Math.floor(oeeOverallData[0])}%</span>
				</div>
				<div className="col-3 flex-left">
					<span className="oee-display__header oee-display__header--performance">Hiệu suất</span>
					<span className="oee-display__value oee-display__value--performance">{Math.floor(oeeOverallData[1])}%</span>
				</div>
				<div className="col-3 flex-left">
					<span className="oee-display__header oee-display__header--quality">Chất lượng</span>
					<span className="oee-display__value oee-display__value--quality">{Math.floor(oeeOverallData[2])}%</span>
				</div>
			</div>
		</>
	);
}

export default OeeDisplay;
