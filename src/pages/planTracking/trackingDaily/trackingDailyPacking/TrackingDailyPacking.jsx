import { format } from 'date-fns';
import React from 'react';
import { packingApi } from '../../../../api/axios/packingReport';
import DailyProgressTable from '../../../../components/progressTable/ProgressTable';
import DailyProgressFilter from '../../../../components/dailyProgressFilter/DailyProgressFilter';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import { setDailyPackingPlanTrackingData } from '../../../../redux/slice/PlanTrackingSlice';
function TrackingDailyPacking() {
	const dispatch = useDispatch();
	const { dailyPackingPlanTrackingData } = useSelector((state) => state.planTracking);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const requestData = React.useCallback(
		async (startTime, stopTime) => {
			setLoading(true);
			packingApi
				.getPackingPlanTracking(startTime, stopTime)
				.then((res) => {
					setLoading(false);
					setError(null);
					const filteredData = res.data
						.reduce((acc, shift) => {
							acc.push({
								date: shift.date,
								employee: shift.employee.firstName + ' ' + shift.employee.lastName,
								employeeId: shift.employee.id,
								packingUnit: `Cụm máy ${shift.packingUnit.id}`,
								items: shift.items.map((item) => ({
									...item,
								})),
							});
							return acc;
						}, [])
						.reduce((acc, cur) => {
							cur.items.forEach((item) => {
								acc = [
									...acc,
									{
										date: cur.date,
										employee: cur.employee,
										employeeId: cur.employeeId,
										packingUnit: cur.packingUnit,
										productId: item.item.id,
										productName: item.item.name,
										plannedQuantity: item.plannedQuantity,
										actualQuantity: item.actualQuantity,
										note: item.note,
										priority:
											Math.floor((item.actualQuantity / item.plannedQuantity) * 100) >= 67
												? 'lightgreen'
												: Math.floor((item.actualQuantity / item.plannedQuantity) * 100) < 67 &&
												  Math.floor((item.actualQuantity / item.plannedQuantity) * 100) >= 33
												? 'lightyellow'
												: 'lightred',
									},
								];
							});
							return acc;
						}, []);
					dispatch(setDailyPackingPlanTrackingData(filteredData));
				})
				.catch((err) => {
					setLoading(false);
					setError(`Có lỗi xảy ra, vui lòng thử lại.\nLỗi: ${err}`);
				});
		},
		[dispatch]
	);
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
			) : dailyPackingPlanTrackingData ? (
				<div className="card">
					<div className="card__header">
						<h3>Kết quả tìm kiếm</h3>
					</div>
					<div className="card__body">
						<DailyProgressTable isPacking={true} rawData={dailyPackingPlanTrackingData} />
					</div>
				</div>
			) : null}
		</>
	);
}

export default TrackingDailyPacking;
