import React from 'react';
import DailyProgressTable from '../../../../components/dailyInjectionProgressTable/DailyInjectionProgressTable';
import DailyProgressFilter from '../../../../components/dailyProgressFilter/DailyProgressFilter';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import { injectionApi } from '../../../../api/axios/injectionReport';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import { format } from 'date-fns';
function TrackingDailyInjection() {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [data, setData] = React.useState([]);
	const requestData = React.useCallback(async (startTime, stopTime) => {
		setLoading(true);
		injectionApi
			.getTemporaryInjectionPlanTracking()
			.then((res) => {
				setLoading(false);
				setError(null);
				setData(
					res.data.map((item) => {
						return {
							...item,
							priority:
								Math.floor((item.actualQuantity / item.plannedQuantity) * 100) >= 67
									? 'lightgreen'
									: Math.floor((item.actualQuantity / item.plannedQuantity) * 100) < 67 &&
									  Math.floor((item.actualQuantity / item.plannedQuantity) * 100) >= 33
									? 'lightyellow'
									: 'lightred',
						};
					})
				);
			})
			.catch((err) => {
				setLoading(false);
				setError(`Có lỗi xảy ra, vui lòng thử lại.\nLỗi: ${err}`);
			});
	}, []);
	const onSubmit = (e) => {
		requestData(e.date, e.date);
	};
	React.useEffect(() => {
		requestData(format(Date.now(), 'yyyy-MM-dd'), format(Date.now(), 'yyyy-MM-dd'));
	}, [requestData]);
	return (
		<>
			<div className="row mt-20">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>Bộ lọc</h3>
						</div>
						<div className="card__body">
							<div className="row">
								<div className="col-12">
									<DailyProgressFilter onSubmit={onSubmit} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{loading ? (
				<LoadingComponent className="" />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : data ? (
				<div className="card">
					<div className="card__header">
						<h3>Kết quả tìm kiếm</h3>
					</div>
					<div className="card__body">
						<DailyProgressTable rawData={data} />
					</div>
				</div>
			) : null}
		</>
	);
}

export default TrackingDailyInjection;
