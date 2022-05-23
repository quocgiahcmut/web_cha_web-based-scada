import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import React from 'react';
import AssemblyCluster from '../../components/assemblyCluster/AssemblyCluster';
import { getTagsData } from '../../utils/utils';
import { assemblyApi } from '../../api/axios/assemblyReport';
// import preshift_assembly from '../../assets/JsonData/preshift_assembly.json';
function AssemblyMachinePage() {
	const [connection, setConnection] = React.useState(null);
	const [monitorData, setMonitorData] = React.useState([
		{
			currentValue: 0,
			isRunning: false,
		},
		{
			currentValue: 0,
			isRunning: false,
		},
		{
			currentValue: 0,
			isRunning: false,
		},
		{
			currentValue: 0,
			isRunning: false,
		},
		{
			currentValue: 0,
			isRunning: false,
		},
		{
			currentValue: 0,
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
					'as',
					['lr1', 'lr2', 'lr3', 'lr4', 'lr5', 'lr6'],
					[
						['LR1.CurrentValue', 'LR1.MachineStatus'],
						['LR2.CurrentValue', 'LR2.MachineStatus'],
						['LR3.CurrentValue', 'LR3.MachineStatus'],
						['LR4.CurrentValue', 'LR4.MachineStatus'],
						['LR5.CurrentValue', 'LR5.MachineStatus'],
						['LR6.CurrentValue', 'LR6.MachineStatus'],
					]
				);
				setMonitorData([
					{
						currentValue: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[0].tagQueryResults[1].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[1].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[1].tagQueryResults[1].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[2].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[2].tagQueryResults[1].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[3].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[3].tagQueryResults[1].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[4].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[4].tagQueryResults[1].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[5].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[5].tagQueryResults[1].value === 0 ? true : false,
					},
				]);
			}, 2000);
		}
		return (_) => clearInterval(id);
	}, [connection]);
	React.useEffect(() => {
		let filteredData = [];
		assemblyApi
			.getAllPreShifts()
			.then((res) => {
				res.data.items.forEach((item) => {
					filteredData.push({
						id: `Cụm lắp ráp ${item.assemblyUnitId.split('LR')[0]}`,
						setpoint: item.items[0].plannedQuantity,
						product: {
							id: item.items[0].item,
							name: item.items[0].item,
						},
					});
				});
				setData(filteredData);
			})
			.catch((err) => {});
	}, []);
	return (
		<>
			<div className="row">
				{Array.from({ length: 5 }, (item, index) => (
					<AssemblyCluster
						currentValue={monitorData[index].currentValue}
						isRunning={monitorData[index].currentValue}
						key={index}
						index={index}
						data={data[index]}
					/>
				))}
			</div>
			<pre
				style={{
					display: `${process.env.NODE_ENV === 'development' ? 'none' : ''}`,
				}}
			>
				<code>{JSON.stringify(monitorData)}</code>
			</pre>
		</>
	);
}

export default AssemblyMachinePage;
