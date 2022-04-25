import { Button } from '@mui/material';
import React from 'react';

function ReportNavigationButton({ children, history, path }) {
	const onClick = () => {
		history.push(path);
	};
	return (
		<>
			<Button
				type="button"
				sx={{
					backgroundColor: 'var(--main-color)',
				}}
				onClick={onClick}
				variant="contained"
			>
				{children ? children : 'BÁO CÁO'}
			</Button>
		</>
	);
}

export default ReportNavigationButton;
