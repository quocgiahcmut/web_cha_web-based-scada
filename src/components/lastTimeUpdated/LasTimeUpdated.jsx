import React from 'react';
import './lasTimeUpdated.css';

function TimeUpdated({ time }) {
	return (
		<>
			<div className="lastTimeUpdated__container">
				<span>Thời gian cập nhật: {time} ngày trở lại</span>
			</div>
		</>
	);
}

export default TimeUpdated;
