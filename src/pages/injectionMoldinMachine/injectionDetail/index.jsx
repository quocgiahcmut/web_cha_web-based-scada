import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InjectionDetailComponent from '../../../components/injectionDetail/InjectionDetail';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import { injectionApi } from '../../../api/axios/injectionReport';
// import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
function InjectionDetail() {
	const { id } = useParams();
	const { state } = useLocation();
	// const [connection, setConnection] = useState(null);
	const [map, setMap] = useState(false);
	const [injectionMoldingMachineConfiguration, setInjectionMoldingMachineConfiguration] = useState({
		id: id,
		plannedQuantity: 200,
		cycle: 12,
		standardOpenTime: 5,
		product: {
			id: 'CS3004-TO1',
			name: 'Nắp đế bàn cầu hơi HA-40 kem nhạt TO1 (SS124#UB1)',
		},
		moldId: 'NX35',
		wattage: 'Small',
	});
	const [monitorData, setMonitorData] = useState({
		isRunning: true,
		cycleTime: 7,
		openTime: 3,
		counterShot: 0,
	});
	const [progress, setProgress] = useState(0);
	// useEffect(() => {
	// 	const connect = new HubConnectionBuilder()
	// 		.withUrl(`http://192.168.1.80:8085/websockethub`, {
	// 			skipNegotiation: true,
	// 			transport: HttpTransportType.WebSockets,
	// 		})
	// 		.withAutomaticReconnect()
	// 		.build();
	// 	connect
	// 		.start()
	// 		.then(() => {
	// 			setConnection(connect);
	// 			connect.on('ReceiveData', (data) => {
	// 				console.log('data', data);
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// 	setConnection(connect);
	// 	return () => {
	// 		connect.stop();
	// 	};
	// }, []);
	// useEffect(() => {
	// 	console.log(connection.state);
	// 	if (connection && connection.state) {
	// 		// Query Real time data here
	// 	}
	// }, [connection]);
	useEffect(() => {
		if (state !== undefined) {
			state.map === true ? setMap(true) : setMap(false);
		} else {
			setMap(false);
		}
	}, [state]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await injectionApi.getTemporaryPreShiftsByMachine(id);
			return result.data.items.map((item) => {
				return {
					number: item.machine.id,
					name: item.machine.model,
					plannedQuantity: item.cavity * ((12 * 60 * 60 * 1000) / item.injectionCycle),
					productId: item.product.id,
					standardOpenTime: (item.product.mold.standardOpenTime / 1000).toFixed(0),
					productName: item.product.name,
					moldId: item.product.mold.id,
					cycle: (item.injectionCycle / 1000).toFixed(0),
					wattage: item.machine.machineType === 0 ? 'Large' : 'Small',
				};
			});
		};
		fetchData().then((data) => {
			setInjectionMoldingMachineConfiguration(data[0]);
		});
	}, [id]);

	return (
		<>
			<Breadcrumbs
				href={`${!map ? '/layout/injection/pages/1' : '/layout/injection/map'}`}
				sector="KHU MÁY ÉP"
				id={id}
			/>
			{injectionMoldingMachineConfiguration && (
				<InjectionDetailComponent
					injectionMoldingMachineConfiguration={injectionMoldingMachineConfiguration}
					monitorData={monitorData}
					progress={progress}
				/>
			)}
		</>
	);
}

export default InjectionDetail;
