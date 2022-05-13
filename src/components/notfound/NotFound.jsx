import React from 'react';
import { ReactComponent as NotFoundImage } from '../../assets/images/notfound.svg';
import { Button } from '@mui/material';

import './notfound.css';
import { Link } from 'react-router-dom';

function NotFound({ component }) {
	return (
		<div
			style={{
				height: `${component ? '80vh' : '100vh'}`,
			}}
			className="notfound__container"
		>
			<h1>Có lỗi xảy ra</h1>
			<span className="notfound__text"> Rất tiếc! Chúng tôi không tìm thấy trang bạn yêu cầu</span>
			<br />
			<NotFoundImage width="90%" />
			<Link to="/">
				<Button type="button" variant="contained">
					Nhấn vào đây để quay về trang chủ
				</Button>
			</Link>
		</div>
	);
}

export default NotFound;
