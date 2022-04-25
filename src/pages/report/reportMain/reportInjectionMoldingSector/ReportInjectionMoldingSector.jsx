import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReportInjectionChart from '../../../../components/reportInjectionChart/ReportInjectionChart';
import ReportInjectionFilter from '../../../../components/reportInjectionFilter/ReportInjectionFilter';
import { format } from 'date-fns';
import LoadingComponent from '../../../../components/loadingComponent/LoadingComponent';
import { injectionApi } from '../../../../api/axios/injectionReport';
import { resetInjectionReportData, setInjectionReportData } from '../../../../redux/slice/InjectionReportSlice';
import EmptyPlaceholder from '../../../../components/emptyPlaceholder/EmptyPlaceholder';
function ReportInjectionMoldingSector() {
	const dispatch = useDispatch();
	const injectionReportReducer = useSelector((state) => state.injectionReportData);
	const injectionReportData = injectionReportReducer.injectionReportData;
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const onSubmit = (value) => {
		dispatch(resetInjectionReportData());
		setIsLoading(true);
		injectionApi
			.getTemporaryInjectionReport(value.moldingMachineId, value.dateStart, value.dateEnd)
			.then((res) => {
				setIsLoading(false);
				res.items.forEach((item, index) => {
					dispatch(
						setInjectionReportData({
							MachineID: item.machine.id,
							MachineReport: item.shots.map((shot) => ({
								Timestamp: shot.timeStamp,
								CycleTime: shot.injectionTime / 1000,
								OpenTime: shot.openTime / 1000,
								Mode: item.product.mold.automatic === true ? 0 : 1,
								MoldID: item.product.moldId,
								SetCycle: item.product.mold.standardInjectionCycle / 1000,
							})),
						})
					);
				});
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<>
			<ReportInjectionFilter onSubmit={onSubmit} />
			{isLoading ? (
				<LoadingComponent />
			) : error ? (
				<EmptyPlaceholder isError={true} msg={error} />
			) : injectionReportData ? (
				<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
			) : (
				injectionReportData?.length > 0 &&
				injectionReportData?.map((item, index) => {
					return (
						<React.Fragment key={index}>
							<ReportInjectionChart
								moldId={
									[
										...new Set(
											injectionReportData?.data.map((item) =>
												item.MachineReport.reduce((acc, cur) => {
													acc.push({
														moldId: cur.MoldID,
														setCycle: cur.SetCycle,
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
								shift={`ca ${index + 1}`}
								categories={item['MachineReport'].map((item) => {
									return format(new Date(item.Timestamp), 'HH:mm:ss');
								})}
								series={[
									{
										name: 'Chu kỳ ép',
										data: item['MachineReport'].map((item) => item.CycleTime),
									},
									{
										name: 'Chu kỳ ép cài đặt',
										data: item['MachineReport'].map((item) => item.SetCycle),
									},
									{
										name: 'Thời gian cửa mở',
										data: item['MachineReport'].map((item) => item.OpenTime),
									},
								]}
							/>
						</React.Fragment>
					);
				})
			)}
		</>
	);
}

export default ReportInjectionMoldingSector;

// [
//   {
//     "MachineID": "M24",
//     "MachineReport": [
//       {
//         "Timestamp": "2022-03-08T02:33:42Z",
//         "CycleTime": 35.53,
//         "OpenTime": 4,
//         "Mode": 0,
//         "CounterShot": 2,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2022-03-27T00:56:48Z",
//         "CycleTime": 31.43,
//         "OpenTime": 4.49,
//         "Mode": 0,
//         "CounterShot": 3,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-04-20T19:20:42Z",
//         "CycleTime": 30.1,
//         "OpenTime": 4.3,
//         "Mode": 0,
//         "CounterShot": 4,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2022-01-04T13:22:31Z",
//         "CycleTime": 36.89,
//         "OpenTime": 4.68,
//         "Mode": 0,
//         "CounterShot": 5,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-11-08T22:46:12Z",
//         "CycleTime": 32.87,
//         "OpenTime": 4.13,
//         "Mode": 0,
//         "CounterShot": 6,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2022-03-07T23:08:56Z",
//         "CycleTime": 31.88,
//         "OpenTime": 4.31,
//         "Mode": 0,
//         "CounterShot": 7,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-06-08T11:08:29Z",
//         "CycleTime": 39.87,
//         "OpenTime": 4.59,
//         "Mode": 0,
//         "CounterShot": 8,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-05-18T10:42:14Z",
//         "CycleTime": 36.73,
//         "OpenTime": 4.52,
//         "Mode": 0,
//         "CounterShot": 9,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-05-02T04:49:58Z",
//         "CycleTime": 37.84,
//         "OpenTime": 4.07,
//         "Mode": 0,
//         "CounterShot": 10,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-10-07T22:18:23Z",
//         "CycleTime": 39.28,
//         "OpenTime": 4.5,
//         "Mode": 0,
//         "CounterShot": 11,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-09-20T12:44:26Z",
//         "CycleTime": 33.76,
//         "OpenTime": 4.43,
//         "Mode": 0,
//         "CounterShot": 12,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-11-26T06:14:00Z",
//         "CycleTime": 35.33,
//         "OpenTime": 4.67,
//         "Mode": 0,
//         "CounterShot": 13,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },
//       {
//         "Timestamp": "2021-05-13T22:57:40Z",
//         "CycleTime": 32.88,
//         "OpenTime": 4.02,
//         "Mode": 0,
//         "CounterShot": 14,
//         "MoldID": "NX35",
//         "SetCycle": 35
//       },

// {
//     "items": [
//         {
//             "date": "2022-04-16T04:21:25.88",
//             "id": 11,
//             "shiftNumber": 0,
//             "employee": {
//                 "id": "ltdat",
//                 "firstName": "Dat",
//                 "lastName": "Le"
//             },
//             "machine": {
//                 "id": "a2",
//                 "machineType": 1,
//                 "model": "HaiTian"
//             },
//             "product": {
//                 "id": "tcp-bxv-01",
//                 "name": "bo xa co vua loai 1",
//                 "mold": {
//                     "id": "a1",
//                     "standardInjectionCycle": 1222,
//                     "standardOpenTime": 1223,
//                     "injectionCycleTolerance": 1221,
//                     "openTimeTolerance": 1331,
//                     "automatic": true,
//                     "productsPerShot": 12
//                 },
//                 "moldId": "a1",
//                 "unit": 1,
//                 "piecesPerKilogram": 22
//             },
//             "totalQuantity": 110,
//             "startTime": "2022-04-16T04:21:25.88",
//             "stopTime": "2022-04-16T19:21:25.88",
//             "workTime": 22120,
//             "pauseTime": 110,
//             "note": "string",
//             "shots": [
//                 {
//                     "timeStamp": "2022-04-16T04:21:25.88",
//                     "injectionTime": 1110,
//                     "openTime": 110.5
//                 },
//                 {
//                     "timeStamp": "2022-04-16T05:21:25.88",
//                     "injectionTime": 1110,
//                     "openTime": 120.5
//                 }
//             ]
//         },
//         {
//             "date": "2022-04-15T04:21:25.88",
//             "id": 13,
//             "shiftNumber": 0,
//             "employee": {
//                 "id": "ltdat",
//                 "firstName": "Dat",
//                 "lastName": "Le"
//             },
//             "machine": {
//                 "id": "a2",
//                 "machineType": 1,
//                 "model": "HaiTian"
//             },
//             "product": {
//                 "id": "tcp-bxv-01",
//                 "name": "bo xa co vua loai 1",
//                 "mold": {
//                     "id": "a1",
//                     "standardInjectionCycle": 1222,
//                     "standardOpenTime": 1223,
//                     "injectionCycleTolerance": 1221,
//                     "openTimeTolerance": 1331,
//                     "automatic": true,
//                     "productsPerShot": 12
//                 },
//                 "moldId": "a1",
//                 "unit": 1,
//                 "piecesPerKilogram": 22
//             },
//             "totalQuantity": 1120,
//             "startTime": "2022-04-15T04:21:25.88",
//             "stopTime": "2022-04-15T19:21:25.88",
//             "workTime": 22120,
//             "pauseTime": 110,
//             "note": "string",
//             "shots": [
//                 {
//                     "timeStamp": "2022-04-15T04:21:25.88",
//                     "injectionTime": 1110,
//                     "openTime": 110.5
//                 },
//                 {
//                     "timeStamp": "2022-04-15T05:21:25.88",
//                     "injectionTime": 1110,
//                     "openTime": 120.5
//                 }
//             ]
//         }
//     ],
//     "totalItems": 2
// }
