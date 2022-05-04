import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
function PlanTracking() {
	return (
		<>
			<Switch>
				<Redirect exact from="/plan-tracking" to="/plan-tracking/daily" />
			</Switch>
		</>
	);
}

export default PlanTracking;
