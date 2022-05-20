import React from 'react';
import OeeSearchBar from '../../../components/oeeSearchBar/OeeSearchBar';
import ReportOee from '../../../components/reportOee/ReportOee';
import { injectionApi } from '../../../api/axios/injectionReport';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ScrollToBottom } from '../../../utils/utils';
import EmptyPlaceHolder from '../../../components/emptyPlaceholder/EmptyPlaceholder';
import {
	setDetailLabels,
	pushAvailabilityDetailSeries,
	pushTotalQuantityDetailSeries,
	resetDetailSeries,
	setOeeOverall,
	pushScrapDetailSeries,
	setFirstTimeGoToPage,
	setTrend,
	setDiscrepancy,
	setDownTimeData,
	setLastTimeUpdated,
} from '../../../redux/slice/OeeReportSlice';
import { convertMiliseconds } from '../../../utils/utils';
import { format } from 'date-fns';
import LoadingComponent from '../../../components/loadingComponent/LoadingComponent';
let availabilityData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Thời gian khả dụng',
			borderColor: 'blue',
			backgroundColor: '#4397f7',
			data: [70, 60, 65, 40, 30, 70, 50],
		},
	],
};

let scrapData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Số lượng ép hỏng',
			borderColor: 'blue',
			backgroundColor: '#e48f36',
			data: [70, 60, 65, 40, 30, 70, 50],
		},
	],
};

let quantityData = {
	labels: ['27/03', '28/03', '29/03', '30/03', '31/03', '01/04', '02/04'],
	datasets: [
		{
			label: 'Tổng số lượng ép',
			borderColor: 'blue',
			backgroundColor: '#8f5db1',
			data: [700, 60, 650, 400, 300, 70, 50],
		},
	],
};

function OeeIndex() {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const {
		oeeOverall,
		oeeTarget,
		totalQuantityDetailSeries,
		scrapDetailSeries,
		lastTimeUpdated,
		initialOeeDateStart,
		detailLabels,
		availabilityDetailSeries,
		downTimeData,
		firstTimeGoToPage,
		trend,
		discrepancy,
	} = useSelector((state) => state.oeeReportData);
	const onSubmit = React.useCallback(
		(value) => {
			setIsLoading(true);
			dispatch(resetDetailSeries());
			injectionApi
				.getOeeStatistics(value.dateStart, value.dateEnd ? value.dateEnd : undefined)
				.then((res) => {
					console.log(res.data);
					setIsLoading(false);
					dispatch(setLastTimeUpdated(convertMiliseconds(Date.now() - new Date(value.dateStart), 'd')));
					if (res.data.totalItems !== 0) {
						let totalWorkTime = 0;
						let totalPartsProducedTime = 0;
						let totalQualifiedProducedParts = 0;
						let totalProducedParts = 0;
						let availability = 0;
						let performance = 0;
						let quality = 0;
						let totalPauseTime = 0;
						let totalWorkTimePerDay = 0;
						let totalScrapPerDay = 0;
						let totalQuantityPerDay = 0;
						let pauseTimeProportion = 0;
						let referredDay = res.data.items[0].date.split('T')[0];
						res.data.items.forEach((item, index) => {
							totalWorkTime += item.workTime;
							totalPartsProducedTime += item.totalQuantity * item.standardInjectionCycle;
							totalQualifiedProducedParts += item.totalQuantity;
							totalProducedParts += item.numberOfShots * item.productsPerShot;
							totalPauseTime += item.pauseTime;
							if (item.date.split('T')[0] === referredDay) {
								totalWorkTimePerDay += item.workTime;
								totalScrapPerDay += item.numberOfShots * item.productsPerShot - item.totalQuantity;
								totalQuantityPerDay += item.totalQuantity;
							} else {
								dispatch(pushAvailabilityDetailSeries((totalWorkTimePerDay / (12 * 60 * 60 * 1000)).toFixed(4) * 100));
								dispatch(pushScrapDetailSeries(totalScrapPerDay));
								dispatch(pushTotalQuantityDetailSeries(totalQuantityPerDay));
								totalScrapPerDay = item.numberOfShots * item.productsPerShot - item.totalQuantity;
								totalWorkTimePerDay = item.workTime;
								totalQuantityPerDay = item.totalQuantity;
								referredDay = item.date.split('T')[0];
							}
							if (res.data.items.length === index + 1) {
								dispatch(pushAvailabilityDetailSeries((totalWorkTimePerDay / (12 * 60 * 60 * 1000)).toFixed(4) * 100));
								dispatch(pushScrapDetailSeries(totalScrapPerDay));
								dispatch(pushTotalQuantityDetailSeries(totalQuantityPerDay));
							}
						});
						dispatch(
							setDetailLabels(
								res.data.items
									.filter((value, index, self) => {
										return (
											index ===
											self.findIndex((t) => {
												return t.date.split('T')[0] === value.date.split('T')[0];
											})
										);
									})
									.map((value) => {
										return format(new Date(value.date), 'dd/MM');
									})
							)
						);
						availability = (totalWorkTime / (res.data.items.length * 12 * 60 * 60 * 1000)) * 100;
						performance =
							(totalPartsProducedTime / totalWorkTime) * 100 > 100
								? 100
								: (totalPartsProducedTime / totalWorkTime) * 100;
						quality = (totalQualifiedProducedParts / totalProducedParts) * 100;
						pauseTimeProportion = (totalPauseTime / (res.data.items.length * 12 * 60 * 60 * 1000)) * 100;
						dispatch(setDiscrepancy(((availability * quality * performance) / 10000 - oeeTarget).toFixed(1)));
						dispatch(setTrend((availability * quality * performance) / 10000 - oeeTarget > 0 ? 'up' : 'down'));
						dispatch(setOeeOverall([availability.toFixed(2), performance.toFixed(2), quality.toFixed(2)]));
						dispatch(setDownTimeData(pauseTimeProportion.toFixed(2)));
					} else {
						setError('Không tìm thấy dữ liệu');
					}
				})
				.catch((err) => {
					setIsLoading(false);
					setError('Có lỗi xảy ra, vui lòng thử lại\n' + err);
					console.error(err);
				});
		},
		[dispatch, oeeTarget]
	);

	React.useEffect(() => {
		if (firstTimeGoToPage) {
			dispatch(setFirstTimeGoToPage(false));
			onSubmit({
				dateStart: format(new Date(Date.now() - Number(initialOeeDateStart) * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
			});
		}
	}, [firstTimeGoToPage, dispatch, onSubmit, initialOeeDateStart]);
	React.useEffect(() => {
		availabilityData = {
			...availabilityData,
			labels: detailLabels,
			datasets: [{ ...availabilityData.datasets[0], data: availabilityDetailSeries }],
		};
		scrapData = {
			...scrapData,
			labels: detailLabels,
			datasets: [{ ...scrapData.datasets[0], data: scrapDetailSeries }],
		};
		quantityData = {
			...quantityData,
			labels: detailLabels,
			datasets: [{ ...quantityData.datasets[0], data: totalQuantityDetailSeries }],
		};
	}, [detailLabels, availabilityDetailSeries, scrapDetailSeries, totalQuantityDetailSeries]);
	return (
		<>
			<h2 className="page-header">CHỈ SỐ OEE</h2>
			<OeeSearchBar onSubmit={onSubmit} />
			{isLoading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceHolder isError={true} msg={error} />
			) : (
				<>
					<ScrollToBottom pathname={pathname} />
					<ReportOee
						availabilityData={availabilityData}
						scrapData={scrapData}
						quantityData={quantityData}
						oeeOverallData={oeeOverall}
						downtimeData={[downTimeData]}
						targetData={oeeTarget}
						trend={trend}
						discrepancy={Math.abs(discrepancy)}
						lastTimeUpdated={lastTimeUpdated}
					/>
				</>
			)}
		</>
	);
}

export default OeeIndex;
