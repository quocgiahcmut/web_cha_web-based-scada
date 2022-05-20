import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import React from 'react';
import AssemblyCluster from '../../components/assemblyCluster/AssemblyCluster';
import { getTagsData } from '../../utils/utils';
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
		const id = setTimeout(() => {
			setData([
				{ id: 1, setpoint: 556, product: { id: 'SP19-HA3', name: 'Phụ kiện bàn cầu hơi HA-15 TO1' } },
				{ id: 2, setpoint: 647, product: { id: 'SP09-TO1', name: 'Phụ kiện bàn cầu hơi HA-15 TO1' } },
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
			]);
		}, 1500);
		const id2 = setInterval(() => {
			setMonitorData([
				{
					currentValue: Math.floor(Math.random() * 200),
					isRunning: false,
				},
				{
					currentValue: Math.floor(Math.random() * 200),
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
		}, 2000);
		return () => {
			connect.stop();
			clearTimeout(id);
			clearInterval(id2);
		};
	}, []);
	React.useEffect(() => {
		let id;
		if (connection) {
			id = setInterval(async () => {
				const rawData = await getTagsData(connection, 'as', ['lr1'], [['LR1.CurrentValue', 'LR1.MachineStatus']]);
				setMonitorData([
					{
						currentValue: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[0].tagQueryResults[0].value === 0 ? true : false,
					},
					{
						currentValue: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						isRunning: rawData.deviceQueryResults[0].tagQueryResults[0].value === 0 ? true : false,
					},
				]);
			}, 1000);
		}
		return (_) => clearInterval(id);
	}, [connection]);
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
