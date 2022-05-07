import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReportInjectionChart from '../../../../components/reportInjectionChart/ReportInjectionChart';
import ReportInjectionFilter from '../../../../components/reportInjectionFilter/ReportInjectionFilter';
import { format } from 'date-fns';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
// import injectionReportData from '../../../../assets/JsonData/mock_injection_report.json';
import { injectionApi } from '../../../../api/axios/injectionReport';
import { resetInjectionReportData, setInjectionReportData } from '../../../../redux/slice/InjectionReportSlice';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
function ReportInjectionMoldingSector() {
	const dispatch = useDispatch();
	const injectionReportReducer = useSelector((state) => state.injectionReportData);
	const injectionReportData = injectionReportReducer.injectionReportData;
	const [hasNothing, setHasNothing] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	console.log(injectionReportData);
	const onSubmit = (value) => {
		dispatch(resetInjectionReportData());
		setIsLoading(true);
		injectionApi
			.getTemporaryInjectionReport(value.moldingMachineId, value.dateStart, value.dateEnd)
			.then((res) => {
				setIsLoading(false);
				console.log(res);
				if (res.data.items.length === 0) {
					setHasNothing(true);
				} else {
					res.data.items.forEach((item, index) => {
						dispatch(
							setInjectionReportData({
								MachineID: item.machine.id,
								Shift:
									item.shiftNumber === 0
										? `Ca 1 ngày ${format(new Date(item.date), 'dd/MM/yyyy')}`
										: `Ca 2 ngày ${format(new Date(item.date), 'dd/MM/yyyy')}`,
								MachineReport: item.shots.map((shot) => ({
									Timestamp: shot.timeStamp,
									ProductId: item.product.id,
									ProductName: item.product.name,
									CycleTime: shot.injectionTime / 1000,
									OpenTime: shot.openTime / 1000,
									Mode: item.product.mold.automatic === true ? 0 : 1,
									MoldID: item.product.moldId,
									SetCycle: item.product.mold.standardInjectionCycle / 1000,
									TotalQuantity: item.totalQuantity,
									Employee: item.employee.lastName + ' ' + item.employee.firstName,
								})),
							})
						);
					});
				}
			})
			.catch((err) => {
				setIsLoading(false);
				setError(`Có lỗi xảy ra, vui lòng thử lại\n${err}`);
			});
	};
	return (
		<>
			<ReportInjectionFilter onSubmit={onSubmit} />
			{isLoading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : injectionReportData?.length > 0 ? (
				injectionReportData?.map((item, index) => {
					return (
						<React.Fragment key={index}>
							<ReportInjectionChart
								moldId={
									// filter method dùng để remove những duplicate item trong mảng
									// The key here is that the findIndex() method returns the index of the first element, so if there is a second element that matches, it will never be found as well as added during the filter.
									// Bởi vì list bên dưới trả về các item là list nên cần phải gắn thêm [index] đằng sau mỗi list để lấy từng thông tin khuôn và setpoint khuôn của ca đó
									[
										...new Set(
											injectionReportData?.map((item) =>
												item.MachineReport.reduce((acc, cur) => {
													acc.push({
														productId: cur.ProductId,
														productName: cur.ProductName,
														employee: cur.Employee,
														moldId: cur.MoldID,
														setCycle: cur.SetCycle,
														totalQuantity: cur.TotalQuantity,
														shift: cur.Shift,
													});
													return acc;
												}, []).filter(
													(value, index, self) =>
														index === self.findIndex((t) => t.moldId === value.moldId && t.setCycle === value.setCycle)
												)
											)
										),
									][index]
								}
								shift={item.Shift}
								categories={item['MachineReport'].map((item) => {
									return format(new Date(item.Timestamp), 'HH:mm:ss');
								})}
								series={[
									{
										name: 'Chu kỳ ép',
										data: item['MachineReport'].map((item) => item.CycleTime.toFixed(2)),
									},
									{
										name: 'Chu kỳ ép cài đặt',
										data: item['MachineReport'].map((item) => item.SetCycle.toFixed(2)),
									},
									// {
									// 	name: 'Thời gian cửa mở',
									// 	data: item['MachineReport'].map((item) => item.OpenTime.toFixed(2)),
									// },
								]}
							/>
						</React.Fragment>
					);
				})
			) : hasNothing ? (
				<EmptyPlaceholder isError={true} msg="Không có dữ liệu, vui lòng chọn ngày bắt đầu và kết thúc khác" />
			) : (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			)}
		</>
	);
}

export default ReportInjectionMoldingSector;
