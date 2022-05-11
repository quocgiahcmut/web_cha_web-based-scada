import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
function PlanTracking() {
	const match = useRouteMatch();
	return (
		<>
			<Switch>
				<Redirect exact from={`${match.url}`} to={`${match.url}/daily`} />
			</Switch>
		</>
	);
}

export default PlanTracking;
