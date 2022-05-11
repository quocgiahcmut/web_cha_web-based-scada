import { format } from 'date-fns';
import React from 'react';
import { setMonthlyPackingPlanTrackingData } from '../../../../redux/slice/PlanTrackingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { packingApi } from '../../../../api/axios/packingReport';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import MonthlyProgressFilter from '../../../../components/monthlyProgressFilter/MonthlyProgressFilter';
import ProgressTable from '../../../../components/progressTable/ProgressTable';

function TrackingMonthlyPacking() {
	const dispatch = useDispatch();
	const { monthlyPackingPlanTrackingData } = useSelector((state) => state.planTracking);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const request = React.useCallback(
		async (startTime) => {
			setLoading(true);
			setError(null);
			try {
				const res = await packingApi.getTemporaryPackingPlanTracking(startTime, format(Date.now(), 'yyyy-MM-dd'));
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
					}, [])
					.reduce((acc, cur) => {
						if (acc.find((item) => item.productId === cur.productId)) {
							acc.find((item) => item.productId === cur.productId).actualQuantity += cur.actualQuantity;
							acc.find((item) => item.productId === cur.productId).plannedQuantity += cur.plannedQuantity;
						} else {
							acc.push(cur);
						}
						return acc;
					}, []);
				setLoading(false);
				setError(null);
				dispatch(setMonthlyPackingPlanTrackingData(filteredData));
			} catch (err) {
				setLoading(false);
				setError(`Có lỗi xảy ra, vui lòng thử lại:\n${err}`);
			}
		},
		[setLoading, setError, dispatch]
	);
	React.useEffect(() => {
		request(format(Date.now(), 'yyyy-MM').concat('-01'));
	}, [request]);
	const onSubmit = (e) => {
		request(e);
	};
	return (
		<>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>Bộ lọc</h3>
						</div>
						<div className="card__body">
							<MonthlyProgressFilter onSubmit={onSubmit} />
						</div>
					</div>
				</div>
			</div>
			{loading ? (
				<LoadingComponent className="" />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : monthlyPackingPlanTrackingData ? (
				<div className="card">
					<div className="card__header">
						<h3>Kết quả tìm kiếm</h3>
					</div>
					<div className="card__body">
						<code
							style={{
								display: 'none',
							}}
						>
							{JSON.stringify(monthlyPackingPlanTrackingData, null, 2)}
						</code>
						<ProgressTable isMonthly={true} isPacking={true} rawData={monthlyPackingPlanTrackingData} />
					</div>
				</div>
			) : null}
		</>
	);
}

export default TrackingMonthlyPacking;
