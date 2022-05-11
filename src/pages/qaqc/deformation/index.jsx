import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import FirstSystem from './firstsystem/FirstSystem';
import SecondSystem from './secondsystem/SecondSystem';
function Deformation() {
	const history = useHistory();
	const match = useRouteMatch();
	const [alignment, setAlignment] = React.useState('system1');
	const handleAlignment = (event, newAlignment) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
			history.push(`${match.url}/${newAlignment}`);
		}
	};

	return (
		<>
			<CustomizedBreadcrumbs href="/layout/qaqc" sector="PHÒNG QA/QC THIẾT BỊ" id="MÁY KIẾM TRA ĐỘ BIẾN DẠNG" />
			<ToggleButtonGroup
				fullWidth={true}
				value={alignment}
				exclusive
				onChange={handleAlignment}
				aria-label="text alignment"
				sx={{
					'& .MuiButtonBase-root': {
						marginBottom: '10px',
					},
					'& .MuiButtonBase-root.Mui-selected': {
						backgroundColor: 'var(--main-color)',
						color: 'var(--txt-white)',
					},
					'& .MuiButtonBase-root.Mui-selected:hover': {
						backgroundColor: 'var(--main-color)',
						color: 'var(--txt-white)',
					},
				}}
			>
				<ToggleButton value="system1" aria-label="left aligned">
					HỆ KIỂM TRA 1
				</ToggleButton>
				<ToggleButton value="system2" aria-label="right aligned">
					HỆ KIỂM TRA 2
				</ToggleButton>
			</ToggleButtonGroup>
			{/* <ScrollToBottom /> */}
			<Switch>
				<Redirect exact from={match.url} to={`${match.url}/system1`} />
				<Route path={`${match.url}/system1`} component={FirstSystem} />
				<Route path={`${match.url}/system2`} component={SecondSystem} />
			</Switch>
		</>
	);
}

export default Deformation;
