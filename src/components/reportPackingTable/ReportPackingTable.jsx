import React from 'react';
import './reportPackingTable.css';
import { useFilters, usePagination, useFlexLayout, useTable, useSortBy } from 'react-table';

const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;
	return (
		<>
			<span>
				<input
					style={{
						width: '100%',
						border: 'none',
						padding: '10px 0',
						borderBottom: '1px solid #ddd',
						backgroundColor: 'transparent',
						color: 'var(--txt-white)',
						fontSize: '1rem',
						'::placeholder': {
							color: 'var(--txt-white)',
						},
					}}
					type="text"
					className="column-filter__input--packing"
					value={filterValue || ''}
					onChange={(e) => setFilter(e.target.value)}
					placeholder="Tìm kiếm ở đây"
				/>
			</span>
		</>
	);
};

function ReportPackingTable({ reportHeaders, reportData, ...rest }) {
	const columns = React.useMemo(() => reportHeaders, [reportHeaders]);
	const data = React.useMemo(() => reportData, [reportData]);

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
			initialState: {
				hiddenColumns: ['color'],
				pageSize: 20,
			},
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
			<div className="row" {...rest}>
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h4>Kết quả tìm kiếm</h4>
						</div>
						<div className="card__body">
							<div className="center-block fix-width scroll-inner">
								<table id="report-packing__table" {...getTableProps()}>
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
											prepareRow(row);
											return (
												<tr className={row.values['color']} {...row.getRowProps()}>
													{row.cells.map((cell) => {
														return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
													})}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>

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
									className={`pagination__button ${canPreviousPage ? `` : `disabled`}`}
									onClick={() => previousPage()}
								>
									Trang trước
								</button>
								<button className={`pagination__button ${canNextPage ? `` : `disabled`}`} onClick={() => nextPage()}>
									Trang sau
								</button>
								<button
									className={`pagination__button pagination__move-to-bottom ${canNextPage ? `` : `disabled`}`}
									onClick={() => gotoPage(pageCount - 1)}
								>
									{'>>'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ReportPackingTable;
