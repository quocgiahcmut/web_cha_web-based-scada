import React from 'react';
import { useFlexLayout, useTable } from 'react-table';
import './progressTable.css';
import {
	INJECTION_PLAN_TRACKING_COLUMNS,
	PACKING_PLAN_TRACKING_COLUMNS,
	INJECTION_MONTHLY_PLAN_TRACKING_COLUMNS,
	PACKING_MONTHLY_PLAN_TRACKING_COLUMNS,
} from '../../utils/utils';

function ProgressTable({ rawData, isPacking, isMonthly }) {
	const data = React.useMemo(() => rawData, [rawData]);
	const columns = React.useMemo(() => {
		if (isPacking && !isMonthly) {
			return PACKING_PLAN_TRACKING_COLUMNS;
		} else if (!isPacking && isMonthly) {
			return INJECTION_MONTHLY_PLAN_TRACKING_COLUMNS;
		} else if (!isPacking && !isMonthly) {
			return INJECTION_PLAN_TRACKING_COLUMNS;
		} else {
			return PACKING_MONTHLY_PLAN_TRACKING_COLUMNS;
		}
	}, [isPacking, isMonthly]);
	const defaultColumn = React.useMemo(() => {
		return {
			minWidth: 30, // minWidth is only used as a limit for resizing
			width: 150, // width is used for both the flex-basis and flex-grow
			maxWidth: 200, // maxWidth is only used as a limit for resizing
		};
	}, []);
	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: {
				hiddenColumns: ['priority'],
			},
			defaultColumn,
		},
		useFlexLayout
	);
	const { getTableBodyProps, headerGroups, getTableProps, rows, prepareRow } = tableInstance;
	return (
		<>
			<table id="daily-injection-plan-tracking-table" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => {
								return <th {...column.getHeaderProps()}>{column.render('Header')}</th>;
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);

						return (
							<tr className={row.values.priority} {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default ProgressTable;
