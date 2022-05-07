import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import WarehouseOverview from '../../../components/warehouseOverview/WarehouseOverview';

function WarehouseOverviewPage() {
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
