import React from 'react';
import { useParams } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import PackingDetailComponent from '../../../components/packingDetail/PackingDetail';

function PackingDetail() {
	const { id } = useParams();
	return (
		<>
			<CustomizedBreadcrumbs href="/layout/packing" sector="KHU KIỂM TRA ĐÓNG GÓI" id={`CỤM MÁY ${id.split('module')[1]}`} />
			<PackingDetailComponent />
		</>
	);
}

export default PackingDetail;
