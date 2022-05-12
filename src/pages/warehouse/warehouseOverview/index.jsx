import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import WarehouseOverview from '../../../components/warehouseOverview/WarehouseOverview';

import { useEffect, useState } from 'react';
import { warehouseApi } from '../../../api/warehouse/warehouseApi';

function WarehouseOverviewPage() {
	const [idList, setIdList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await warehouseApi.getAllItem();
				setIdList(res.map((item) => item.itemId));
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<>
			<CustomizedBreadcrumbs id="KHO VẬN" />
			<div className="roww">
				<div className="col-12">
					<div className="card">
						<div className="card__body">
							<WarehouseOverview idList={idList} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WarehouseOverviewPage;
