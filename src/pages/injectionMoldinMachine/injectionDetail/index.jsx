import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InjectionDetailComponent from '../../../components/injectionDetail/InjectionDetail';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';

function InjectionDetail() {
	const { state } = useLocation();
	const [map, setMap] = useState(false);
	useEffect(() => {
		if (state !== undefined) {
			state.map === true ? setMap(true) : setMap(false);
		} else {
			setMap(false);
		}
	}, [state]);
	const [injectionMoldingMachineData] = useState({
		number: 'M1',
		name: 'axB12',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		operatingTime: '1 tiếng 15 phút',
		wattage: 'small',
	});
	const { id } = useParams();
	const [value, setValue] = useState();

	useEffect(() => {
		const id = setTimeout(() => setValue(injectionMoldingMachineData), 0);

		return () => clearTimeout(id);
	}, [injectionMoldingMachineData]);

	return (
		<>
			<Breadcrumbs href={`${!map ? '/injection/pages/1' : '/injection/map'}`} sector="KHU MÁY ÉP" id={id} />
			{value && <InjectionDetailComponent injectionMoldingMachineData={value} />}
		</>
	);
}

export default InjectionDetail;
