import React from 'react';

import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

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
import Settings from '../pages/Settings';
import PlanTracking from '../pages/planTracking/PlanTracking';
import TrackingMonthly from '../pages/planTracking/trackingMonthly/TrackingMonthly';
import TrackingDaily from '../pages/planTracking/trackingDaily/TrackingDaily';
import PrivateRoute from '../utils/protectedRoute';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/Error';
import AssemblyMachinePage from '../pages/assemblyMachine/AssemblyMachinePage';
const Routes = () => {
	const { url } = useRouteMatch();
	return (
		<Switch>
			<Redirect exact from={url} to={`${url}/dashboard`} />
			<PrivateRoute exact path={`${url}/dashboard`} component={Dashboard} />
			<Route path={`${url}/plan-tracking`} exact component={PlanTracking} />
			<Route path={`${url}/plan-tracking/monthly`} component={TrackingMonthly} />
			<Route path={`${url}/plan-tracking/daily`} component={TrackingDaily} />
			<Route path={`${url}/warehouse/:id`} component={WarehouseDetail} />
			<Route path={`${url}/warehouse/`} component={WarehouseOverview} />
			<Route path={`${url}/qaqc`} component={QualityControlRoutes} />
			<Route path={`${url}/assembly`} component={AssemblyMachinePage} />
			<Route path={`${url}/packing`} exact component={PackingPage} />
			<Route path={`${url}/packing/:id`} component={PackingDetail} />
			<Route path={`${url}/injection`} exact component={InjectionMoldingMainPage} />
			<Route exact path={`${url}/injection/map`} component={InjectionMap} />
			<Route path={`${url}/injection/pages/:page`} component={InjectionMoldingMachinePage} />
			<Route path={`${url}/injection/:id`} component={InjectionDetail} />
			<Route path={`${url}/warning`} component={Alarm} />
			<Route path={`${url}/report`} component={Report} />
			<Route path={`${url}/settings`} component={Settings} />
			<Route path={`${url}/test`} component={Test} />
			<Route>
				<ErrorPage component={true} />
			</Route>
		</Switch>
	);
};

export default Routes;
