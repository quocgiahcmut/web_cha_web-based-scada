import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import PackingMachine from '../../../components/packingMachine/PackingMachine';
import { getTagsData } from '../../../utils/utils';
import { packingApi } from '../../../api/axios/packingReport';
// import preshift_packing from '../../../assets/JsonData/preshift_packing.json';
function PackingPage() {
	const [connection, setConnection] = React.useState(null);
	const [monitorData, setMonitorData] = React.useState([
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
		{
			errorProduct: 0,
			completedProduct: 0,
			isRunning: false,
		},
	]);
	const [data, setData] = React.useState([
		{
			id: 1,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
		{
			id: 2,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
		{
			id: 3,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
		{
			id: 4,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
		{
			id: 5,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
		{
			id: 6,
			setpoint: 0,
			product: {
				id: null,
				name: null,
			},
		},
	]);
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
	}, []);
	React.useEffect(() => {
		let id;
		if (connection) {
			id = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'ps',
					['dg1', 'dg2', 'dg3', 'dg4', 'dg5', 'dg6'],
					[
						['DG1.CompletedProduct', 'DG1.ErrorProduct', 'DG1.MachineStatus'],
						['DG2.CompletedProduct', 'DG2.ErrorProduct', 'DG2.MachineStatus'],
						['DG3.CompletedProduct', 'DG3.ErrorProduct', 'DG3.MachineStatus'],
						['DG4.CompletedProduct', 'DG4.ErrorProduct', 'DG4.MachineStatus'],
						['DG5.CompletedProduct', 'DG5.ErrorProduct', 'DG5.MachineStatus'],
						['DG6.CompletedProduct', 'DG6.ErrorProduct', 'DG6.MachineStatus'],
					]
				);
				setMonitorData([
					{
						errorProduct: rawData.deviceQueryResults[0].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[0].tagQueryResults[2].value === 0 ? true : false,
					},
					{
						errorProduct: rawData.deviceQueryResults[1].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[1].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[1].tagQueryResults[2].value === 0 ? true : false,
					},
					{
						errorProduct: rawData.deviceQueryResults[2].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[2].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[2].tagQueryResults[2].value === 0 ? true : false,
					},
					{
						errorProduct: rawData.deviceQueryResults[3].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[3].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[3].tagQueryResults[2].value === 0 ? true : false,
					},
					{
						errorProduct: rawData.deviceQueryResults[4].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[4].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[4].tagQueryResults[2].value === 0 ? true : false,
					},
					{
						errorProduct: rawData.deviceQueryResults[5].tagQueryResults[1].value,
						completedProduct: rawData.deviceQueryResults[5].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[5].tagQueryResults[2].value === 0 ? true : false,
					},
				]);
			}, 1000);
		}
		return (_) => clearInterval(id);
	}, [connection]);
	React.useEffect(() => {
		packingApi
			.getAllPreShifts()
			.then((res) => {
				let filteredData = [];
				res.data.items.forEach((item) => {
					filteredData.push({
						id: `Cụm máy ${item.packingUnitId.split('DG')[0]}`,
						setpoint: item.items[0].plannedQuantity,
						product: {
							id: item.items[0].item,
							name: item.items[0].item,
						},
					});
					setData(filteredData);
				});
			})
			.catch((err) => {});
	}, []);
	const history = useHistory();
	const handleShowDetail = (item) => history.push(`/layout/packing/${item}`);
	return (
		<>
			<CustomizedBreadcrumbs id="KHU KIỂM TRA ĐÓNG GÓI" />
			<div className="row">
				{data.map((item, index) => (
					<div key={index} className="col-4 col-md-6 col-sm-12">
						<div onClick={() => handleShowDetail(`module${item.id}`)} className="dashboard card">
							<div className="card__header">
								<h3>Cụm máy {item.id}</h3>
							</div>
							<div className="card__body">
								<PackingMachine monitorData={monitorData[index]} data={data[index]} />
							</div>
						</div>
					</div>
				))}
			</div>
			<pre
				style={{
					display: 'none',
				}}
			>
				<code>{JSON.stringify(monitorData, null, 2)}</code>
			</pre>
		</>
	);
}

export default PackingPage;
