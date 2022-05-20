import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InjectionDetailComponent from '../../../components/injectionDetail/InjectionDetail';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import { injectionApi } from '../../../api/axios/injectionReport';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { getInjectionMachineStatus, getTagsData } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setPerInjectionMConfigData, setPerInjectionMonitorData } from '../../../redux/slice/InjectionMonitorSlice';
function InjectionDetail() {
	const dispatch = useDispatch();
	const { perInjectionMonitorData, perInjectionMConfigData } = useSelector((state) => state.injectionMonitor);
	const { id } = useParams();
	const { state } = useLocation();
	const [connection, setConnection] = useState(null);
	const [map, setMap] = useState(false);
	useEffect(() => {
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
			})
			.catch((err) => {
				console.error(err);
			});
		return () => {
			connect.stop();
		};
	}, []);
	useEffect(() => {
		dispatch(
			setPerInjectionMConfigData({
				id: id,
				plannedQuantity: 1,
				cycle: 0,
				standardOpenTime: 0,
				product: {
					id: '',
					name: '',
				},
				moldId: '',
				wattage: '',
			})
		);
	}, [dispatch, id]);
	useEffect(() => {
		let idSetInterval;
		if (connection) {
			idSetInterval = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'imm',
					[id.toLowerCase()],
					[[`${id}.CycleTime`, `${id}.OpenTime`, `${id}.CounterShot`, `${id}.SetCycle`, `${id}.MachineStatus`]]
				);
				dispatch(
					setPerInjectionMonitorData({
						isRunning: getInjectionMachineStatus(rawData.deviceQueryResults[0].tagQueryResults[4].value),
						cycleTime: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						openTime: rawData.deviceQueryResults[0].tagQueryResults[1].value,
						counterShot: rawData.deviceQueryResults[0].tagQueryResults[2].value,
						setCycle: rawData.deviceQueryResults[0].tagQueryResults[3].value,
					})
				);
			}, 1500);
		}
		return () => {
			clearInterval(idSetInterval);
		};
	}, [connection, dispatch, id]);
	useEffect(() => {
		if (state !== undefined) {
			state.map === true ? setMap(true) : setMap(false);
		} else {
			setMap(false);
		}
	}, [state]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await injectionApi.getPreShiftsByMachine(id);
			return result.data.items.map((item) => {
				return {
					id: item.machine.id,
					name: item.machine.model,
					plannedQuantity: Math.floor(item.cavity * ((12 * 60 * 60) / item.injectionCycle)),
					product: {
						id: item.product.id,
						name: item.product.name,
					},
					standardOpenTime: Number(item.product.mold.standardOpenTime.toFixed(0)),
					moldId: item.product.mold.id,
					cycle: Number(item.injectionCycle.toFixed(0)),
					wattage: item.machine.machineType === 0 ? 'Large' : 'Small',
				};
			});
		};
		fetchData().then((data) => {
			dispatch(setPerInjectionMConfigData(data[0]));
		});
	}, [id, dispatch]);
	return (
		<>
			<Breadcrumbs
				href={`${!map ? '/layout/injection/pages/1' : '/layout/injection/map'}`}
				sector="KHU MÁY ÉP"
				id={id}
			/>
			{perInjectionMConfigData && (
				<InjectionDetailComponent
					injectionMoldingMachineConfiguration={perInjectionMConfigData}
					monitorData={perInjectionMonitorData}
				/>
			)}
		</>
	);
}

export default InjectionDetail;
