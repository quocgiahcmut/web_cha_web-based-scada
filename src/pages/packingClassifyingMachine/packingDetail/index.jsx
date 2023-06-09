import React from 'react';
import { useParams } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import PackingDetailComponent from '../../../components/packingDetail/PackingDetail';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { getTagsData } from '../../../utils/utils';
import { packingApi } from '../../../api/axios/packingReport';
function PackingDetail() {
	const { id } = useParams();
	const [data, setData] = React.useState({
		id: id.split('module')[1],
		setpoint: 0,
		note: '',
		product: {
			id: null,
			name: null,
		},
	});
	const [connection, setConnection] = React.useState(null);
	const [monitorData, setMonitorData] = React.useState({
		errorProduct: 0,
		completedProduct: 0,
		machineStatus: false,
	});
	const [employee, setEmployee] = React.useState('N/A');
	React.useEffect(() => {
		packingApi
			.getPreShiftByPackingUnit(`DG${id.split('module')[1]}`)
			.then((res) => {
				setData({
					id: id.split('module')[1],
					setpoint: res.data.items[0].items[0].plannedQuantity,
					note: '',
					product: {
						id: res.data.items[0].items[0].item,
						name: res.data.items[0].items[0].item,
					},
				});
				setEmployee(res.data.items[0].employee.firstName + ' ' + res.data.items[0].employee.lastName);
			})
			.catch((err) => {});
	}, [id]);
	React.useEffect(() => {
		const connect = new HubConnectionBuilder()
			.withUrl(`http://10.84.70.80:8085/websockethub`, {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();
		connect
			.start()
			.then(() => {
				setConnection(connect);
				console.log('initialize');
				connect.on('ReceiveData', (data) => {
					console.log('data 2', data);
				});
			})
			.catch((err) => {
				console.error(err);
			});
		return () => {
			connect.stop();
		};
	}, [id]);
	React.useEffect(() => {
		let intervalId;
		if (connection) {
			intervalId = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'ps',
					[`dg${id.split('module')[1]}`],
					[
						[
							`DG${id.split('module')[1]}.CompletedProduct`,
							`DG${id.split('module')[1]}.ErrorProduct`,
							`DG${id.split('module')[1]}.MachineStatus`,
						],
					]
				);
				setMonitorData({
					errorProduct: rawData.deviceQueryResults[0].tagQueryResults[1].value,
					completedProduct: rawData.deviceQueryResults[0].tagQueryResults[0].value,
					machineStatus: rawData.deviceQueryResults[0].tagQueryResults[2].value === 0 ? true : false,
				});
			}, 1000);
		}
		return (_) => clearInterval(intervalId);
	}, [connection, id]);
	return (
		<>
			<CustomizedBreadcrumbs
				href="/layout/packing"
				sector="KHU KIỂM TRA ĐÓNG GÓI"
				id={`CỤM MÁY ${id.split('module')[1]}`}
			/>
			<PackingDetailComponent
				employee={employee}
				data={data}
				errorProduct={monitorData.errorProduct}
				completedProduct={monitorData.completedProduct}
				isRunning={monitorData.machineStatus}
			/>
		</>
	);
}

export default PackingDetail;
