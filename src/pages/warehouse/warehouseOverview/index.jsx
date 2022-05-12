import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import WarehouseOverview from '../../../components/warehouseOverview/WarehouseOverview';

import { useEffect } from 'react';
import { warehouseApi } from '../../../api/axios/warehouseApi';

function WarehouseOverviewPage() {
	// useEffect(
	// 	(async () => {
	// 		try {
	// 			const res = await warehouseApi.getAllItem();
	// 			console.log(res);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})(),
	// 	[]
	// );

	return (
		<>
			<CustomizedBreadcrumbs id="KHO VẬN" />
			<div className="roww">
				<div className="col-12">
					<div className="card">
						<div className="card__body">
							<WarehouseOverview />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WarehouseOverviewPage;
