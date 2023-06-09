import React from 'react';

import './table.css';

function Table(props) {
	return (
		<div>
			<div className="table-wrapper">
				<table>
					{props.headData && props.renderHead ? (
						<thead>
							<tr>{props.headData.map((item, index) => props.renderHead(item, index))}</tr>
						</thead>
					) : null}
					{props.bodyData && props.renderBody ? (
						<tbody className="basic-table">{props.bodyData.map((item, index) => props.renderBody(item, index))}</tbody>
					) : null}
				</table>
			</div>
		</div>
	);
}

export default Table;
