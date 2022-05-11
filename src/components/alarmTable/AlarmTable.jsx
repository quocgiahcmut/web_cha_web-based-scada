import React from 'react';
import { useFilters, usePagination, useFlexLayout, useSortBy, useTable } from 'react-table';
import { COLUMNS } from '../../utils/utils';
import { ColumnFilter } from '../columnFilter/ColumnFilter';
import './alarmTable.css';

function AlarmTable({ alarmData }) {
	const columns = React.useMemo(() => COLUMNS, []);
	const data = React.useMemo(() => alarmData, [alarmData]);

	const defaultColumn = React.useMemo(() => {
		return {
			Filter: ColumnFilter,
			minWidth: 30, // minWidth is only used as a limit for resizing
			width: 150, // width is used for both the flex-basis and flex-grow
			maxWidth: 200, // maxWidth is only used as a limit for resizing
		};
	}, []);

	const tableInstance = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useFilters,
		useSortBy,
		usePagination,
		useFlexLayout
	);
	const {
		getTableProps,
		getTableBodyProps,
		page,
		canNextPage,
		canPreviousPage,
		nextPage,
		previousPage,
		pageOptions,
		state,
		headerGroups,
		gotoPage,
		pageCount,
		prepareRow,
	} = tableInstance;

	const { pageIndex } = state;
	return (
		<>
			<table className="alarm-table" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => {
								return (
									<th {...column.getHeaderProps(column.getSortByToggleProps({ title: undefined }))}>
										{column.render('Header')}
										<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
										<div>{column.canFilter ? column.render('Filter') : null}</div>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						// Prepare the row for display
						prepareRow(row);
						return (
							// Apply the row props
							<tr className={row.values['priority']} {...row.getRowProps()}>
								{
									// Loop over the rows cells
									row.cells.map((cell) => {
										// Apply the cell props
										return (
											<td {...cell.getCellProps()}>
												{
													// Render the cell contents
													cell.render('Cell')
												}
											</td>
										);
									})
								}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="pagination__container">
				<span>
					Trang <strong>{pageIndex + 1} </strong>
					<span> của </span>
					<strong>{pageOptions.length} </strong>
				</span>{' '}
				<button
					type="button"
					className={` pagination__button pagination__move-to-top ${canPreviousPage ? `` : `disabled`}`}
					onClick={() => gotoPage(0)}
				>
					{'<<'}
				</button>{' '}
				<button
					type="button"
					className={`pagination__button ${canPreviousPage ? `` : `disabled`}`}
					onClick={() => previousPage()}
				>
					Trang trước
				</button>
				<button
					type="button"
					className={`pagination__button ${canNextPage ? `` : `disabled`}`}
					onClick={() => nextPage()}
				>
					Trang sau
				</button>
				<button
					type="button"
					className={`pagination__button pagination__move-to-bottom ${canNextPage ? `` : `disabled`}`}
					onClick={() => gotoPage(pageCount - 1)}
				>
					{'>>'}
				</button>
			</div>
		</>
	);
}

export default React.memo(AlarmTable);
