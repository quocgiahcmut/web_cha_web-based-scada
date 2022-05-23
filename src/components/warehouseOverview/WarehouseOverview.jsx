import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll as removeAllWarehouseData } from '../../redux/slice/WarehouseSlice';
import WarehouseFilterRow from '../warehouseFilterRow/WarehouseFilterRow';
import './warehouseOverview.css';

function WarehouseOverview({ idList }) {
	const dispatch = useDispatch();
	const warehouseData = useSelector((state) => state.warehouse);
	//if no data on global state return 1 row, else return n row in this data
	const [rows, setRows] = useState(() => {
		if (warehouseData.length === 0) {
			return [0];
		} else {
			return [...Array(warehouseData.length + 1).keys()];
		}
	});
	const [filledRows, setFilledRows] = useState([]);

	const handleDeleteAllRow = () => {
		setRows([0]);
		setFilledRows(['deleted']);
		dispatch(removeAllWarehouseData());
	};

	//increase when a row is filled
	useEffect(() => {
		if (filledRows.length === rows.length && filledRows[0] !== 'deleted') {
			setRows((prev) => [...prev, rows[rows.length - 1] + 1]);
		}
	}, [filledRows, rows]);

	return (
		<>
			<table className="warehouseOverview">
				<thead>
					<tr className="heading-1">
						<td>Tìm kiếm</td>
						<td>Kết quả</td>
						<td></td>
						<td></td>
					</tr>
					<tr className="heading-2">
						<td>Mã sản phẩm</td>
						<td>Tên sản phẩm</td>
						<td>Số lượng</td>
						<td>
							<button onClick={handleDeleteAllRow} className="btn-deleteAll">
								Xóa tất cả
							</button>
						</td>
					</tr>
				</thead>

				<tbody>
					{rows.map((rows) => (
						<WarehouseFilterRow
							key={rows}
							filterId={rows}
							filledRows={filledRows}
							setFilledRows={setFilledRows}
							idList={idList}
						/>
					))}
				</tbody>
			</table>
		</>
	);
}

export default WarehouseOverview;
