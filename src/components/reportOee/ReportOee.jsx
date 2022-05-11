import React from 'react';
import TimeUpdated from '../lastTimeUpdated/LasTimeUpdated';
import OeeDowntime from '../oeeDowntime/OeeDowntime';
import './reportOee.css';
import OeeDisplay from '../oeeDisplay/OeeDisplay';
import OeeOverall from '../oeeOverall/OeeOverall';
import OeeBarChart from '../oeeBarChart/OeeBarChart';

function ReportOee({
	availabilityData,
	targetData,
	trend,
	discrepancy,
	scrapData,
	quantityData,
	downtimeData,
	oeeOverallData,
	lastTimeUpdated,
}) {
	return (
		<>
			<div className="row">
				<div className="col-4">
					<div className="card full-height">
						<div className="card__header mb-15">
							<h3>Thời gian chết</h3>
							<TimeUpdated time={lastTimeUpdated} />
						</div>
						<div className="card__body height-80 flex-center">
							<OeeDowntime downtimeData={downtimeData} />
						</div>
					</div>
				</div>
				<div className="col-5">
					<div className="card full-height">
						<div className="card__header">
							<h3>Tính khả dụng</h3>
							<TimeUpdated time={lastTimeUpdated} />
						</div>
						<div className="card__body">
							<OeeBarChart data={availabilityData} type="availability" />
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="card full-height">
						<div className="card__header">
							<h3>OEE</h3>
							<TimeUpdated time={lastTimeUpdated} />
						</div>
						<div className="card__body height-80 flex-center">
							<div className="row full-width">
								<div className="col-12">
									<OeeOverall oeeOverallData={oeeOverallData} />
								</div>
								<div className="col-12 flex-center">
									<OeeDisplay
										trend={trend}
										discrepancy={discrepancy}
										oeeOverallData={oeeOverallData}
										targetData={targetData}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<div className="card">
						<div className="card__header">
							<h3>Phế liệu (Scrap)</h3>
							<TimeUpdated time={lastTimeUpdated} />
						</div>
						<div className="card__body">
							<OeeBarChart data={scrapData} type="scrap" />
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="card">
						<div className="card__header">
							<h3>Số lượng</h3>
							<TimeUpdated time={lastTimeUpdated} />
						</div>
						<div className="card__body">
							<OeeBarChart data={quantityData} type="quantity" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default React.memo(ReportOee);
