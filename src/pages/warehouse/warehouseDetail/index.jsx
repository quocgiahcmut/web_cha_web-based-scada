import { useParams } from 'react-router-dom';
import WarehouseDetail from '../../../components/warehouseDetail/WarehouseDetail';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';

function WarehouseDetailPage() {
	const { id } = useParams();
	return (
		<>
			<CustomizedBreadcrumbs href="/layout/warehouse" sector="KHO VẬN" id={`MÃ CHI TIẾT ${id}`} />
			<WarehouseDetail />;
		</>
	);
}

export default WarehouseDetailPage;
