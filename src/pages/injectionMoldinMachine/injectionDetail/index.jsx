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
		number: '',
		name: '',
		plannedQuantity: 1,
		cycle: 12000,
		standardOpenTime: 12000,
		productId: '',
		productName: '',
		moldId: '',
		wattage: 'Small',
	});
	const [realTimeData] = useState({
		state: 'S',
		cycleTime: 12,
		openTime: 12,
		counterShot: 0,
	});
	const [progress] = useState(0);
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
			// 		{
			// 	number: 'M1',
			// 	name: 'axB12',
			// 	percent: 30,
			// 	state: 'R',
			// 	cycle: '30 giây',
			// 	openDoorTime: '7 giây',
			// 	operatingTime: '1 tiếng 15 phút',
			// 	wattage: 'small',
			// }
			return result.data.items.map((item) => {
				return {
					number: item.machine.id,
					name: item.machine.model,
					plannedQuantity: item.cavity * ((12 * 60 * 60 * 1000) / item.injectionCycle),
					productId: item.product.id,
					standardOpenTime: item.product.mold.standardOpenTime / 1000,
					productName: item.product.name,
					moldId: item.product.mold.id,
					cycle: item.injectionCycle / 1000,
					wattage: item.machine.machineType === 0 ? 'Large' : 'Small',
				};
			});
		};
		fetchData().then((data) => {
			console.log(data);
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
					realTimeData={realTimeData}
					progress={progress}
				/>
			)}
		</>
	);
}

export default InjectionDetail;
