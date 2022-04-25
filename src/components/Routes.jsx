import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import QualityControlRoutes from '../pages/qaqc';
import InjectionMoldingMachinePage from '../pages/injectionMoldinMachine/injectionPage';
import InjectionDetail from '../pages/injectionMoldinMachine/injectionDetail';
import PackingPage from '../pages/packingClassifyingMachine/packingPage';
import PackingDetail from '../pages/packingClassifyingMachine/packingDetail';
import WarehouseOverview from '../pages/warehouse/warehouseOverview';
import WarehouseDetail from '../pages/warehouse/warehouseDetail';
import Alarm from '../pages/Alarm';
import Report from '../pages/report/Report';
import InjectionMap from '../pages/injectionMoldinMachine/injectionMap';
import InjectionMoldingMainPage from '../pages/injectionMoldinMachine/index';
import Test from '../test/Test';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/warehouse/:id" component={WarehouseDetail} />
			<Route path="/warehouse" component={WarehouseOverview} />
			<Route path="/qaqc" component={QualityControlRoutes} />
			<Route path="/packing" exact component={PackingPage} />
			<Route path="/packing/:id" component={PackingDetail} />
			<Route path="/injection" exact component={InjectionMoldingMainPage} />
			<Route exact path="/injection/map" component={InjectionMap} />
			<Route path="/injection/pages/:page" component={InjectionMoldingMachinePage} />
			<Route path="/injection/:id" component={InjectionDetail} />
			<Route path="/warning" component={Alarm} />
			<Route path="/report" component={Report} />
			<Route path="/test" component={Test} />
			<Route path="*" component={Error} />
		</Switch>
	);
};

export default Routes;
