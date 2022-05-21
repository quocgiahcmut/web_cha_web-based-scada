import { format } from 'date-fns';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMonthlyInjectionPlanTrackingData } from '../../../../redux/slice/PlanTrackingSlice';
import { injectionApi } from '../../../../api/axios/injectionReport';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import MonthlyProgressFilter from '../../../../components/monthlyProgressFilter/MonthlyProgressFilter';
import ProgressTable from '../../../../components/progressTable/ProgressTable';
function TrackingMonthlyInjection() {
	const dispatch = useDispatch();
	const { monthlyInjectionPlanTrackingData } = useSelector((state) => state.planTracking);
	const [loading, setLoading] = React.useState(false);
	const [hasNothing, setHasNothing] = React.useState(false);
	const [error, setError] = React.useState(null);
	const request = React.useCallback(
		async (startTime) => {
			setLoading(true);
			setError(null);
			try {
				const res = await injectionApi.getInjectionPlanTracking(startTime, format(Date.now(), 'yyyy-MM-dd'));
				if (res.data.items.length === 0) {
					setHasNothing(true);
				} else {
					setHasNothing(false);
				}
				const filteredData = res.data.items
					.reduce((acc, cur) => {
						acc.push({
							productId: cur.product.id,
							productName: cur.product.name,
							moldId: cur.product.mold.id,
							standardInjectionCycle: cur.product.mold.standardInjectionCycle,
							plannedQuantity: cur.totalQuantity + 100,
							actualQuantity: cur.totalQuantity,
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
					}, [])
					.map((item) => {
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
					});
				dispatch(setMonthlyInjectionPlanTrackingData(filteredData));
				setLoading(false);
				setError(null);
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
			) : hasNothing ? (
				<EmptyPlaceholder isError={true} msg="Không có dữ liệu trong ngày, vui lòng truy xuất lại" />
			) : monthlyInjectionPlanTrackingData ? (
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
							{JSON.stringify(monthlyInjectionPlanTrackingData, null, 2)}
						</code>
						<ProgressTable isMonthly={true} isPacking={false} rawData={monthlyInjectionPlanTrackingData} />
					</div>
				</div>
			) : null}
		</>
	);
}

export default TrackingMonthlyInjection;
