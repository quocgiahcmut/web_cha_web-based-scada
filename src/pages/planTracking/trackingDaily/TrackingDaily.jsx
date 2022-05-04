import React from 'react';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import Navbar from '../../../components/navBar/NavBar';
import { PLAN_TRACKING_MENU_LIST } from '../../../utils/utils';
import TrackingDailyInjection from './trackingDailyInjection/TrackingDailyInjection';
import TrackingDailyPacking from './trackingDailyPacking/TrackingDailyPacking';

function TrackingDaily() {
	const match = useRouteMatch();
	return (
		<>
			<CustomizedBreadcrumbs id="BÁO CÁO TIẾN ĐỘ" />
			<Navbar menuList={PLAN_TRACKING_MENU_LIST} />
			<Switch>
				<Redirect exact from={match.url} to={`${match.url}/packing`} />
				<Route path={`${match.url}/packing`} component={TrackingDailyPacking} />
				<Route path={`${match.url}/injection`} component={TrackingDailyInjection} />
			</Switch>
		</>
	);
}

export default TrackingDaily;
