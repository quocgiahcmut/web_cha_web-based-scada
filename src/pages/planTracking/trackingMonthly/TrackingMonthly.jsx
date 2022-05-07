import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import Navbar from '../../../components/navBar/NavBar';
import { MONTHLY_PLAN_TRACKING_MENU_LIST } from '../../../utils/utils';
import TrackingMonthlyInjection from './trackingMonthlyInjection/TrackingMonthlyInjection';
import TrackingMonthlyPacking from './trackingMonthlyPacking/TrackingMonthlyPacking';

function TrackingMonthly() {
	const match = useRouteMatch();
	return (
		<>
			<CustomizedBreadcrumbs id="BÁO CÁO TIẾN ĐỘ THEO THÁNG" />
			<Navbar menuList={MONTHLY_PLAN_TRACKING_MENU_LIST} />
			<Switch>
				<Redirect exact from={match.url} to={`${match.url}/packing`} />
				<Route path={`${match.url}/packing`} component={TrackingMonthlyPacking} />
				<Route path={`${match.url}/injection`} component={TrackingMonthlyInjection} />
			</Switch>
		</>
	);
}

export default TrackingMonthly;
