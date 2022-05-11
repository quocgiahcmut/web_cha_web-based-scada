import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

function InjectionMoldingMainPage() {
	const match = useRouteMatch();
	return (
		<>
			<Switch>
				<Redirect exact from={`${match.url}`} to={`${match.url}/pages/1`} />
			</Switch>
		</>
	);
}

export default InjectionMoldingMainPage;
