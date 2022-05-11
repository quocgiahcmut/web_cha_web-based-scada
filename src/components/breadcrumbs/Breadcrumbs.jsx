import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import './breadcrumbs.css';

function CustomizedBreadcrumbs({ id, sector, href }) {
	return (
		<>
			<Breadcrumbs
				sx={{
					'& .MuiBreadcrumbs-ol': {
						'& .MuiBreadcrumbs-li': {
							'& .MuiTypography-root': {
								display: 'block',
								fontSize: '1.5em',
								marginBlockStart: '0.83em',
								marginBlockEnd: '0.83em',
								marginInlineStart: '0px',
								marginInlineEnd: '0px',
								fontWeight: 'bold',
								textTransform: 'capitalize',
							},
							'& .MuiLink-root': {
								marginBottom: '15px',
								textTransform: 'capitalize',
							},
							'& .MuiBreadcrumbs-separator': {
								fontSize: '1.5rem',
							},
						},
					},
				}}
				aria-label="breadcrumb"
			>
				<Link className="customized-breadcrumbs__link" to="/layout/dashboard">
					TRANG CHỦ
				</Link>
				{sector && href ? (
					<Link className="customized-breadcrumbs__link" to={href}>
						{sector}
					</Link>
				) : null}
				<Typography color="text.primary">{id}</Typography>
			</Breadcrumbs>
		</>
	);
}

export default CustomizedBreadcrumbs;
