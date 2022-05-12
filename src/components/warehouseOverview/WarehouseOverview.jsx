import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAll } from '../../redux/slice/WarehouseSlice';
import WarehouseFilterRow from '../warehouseFilterRow/WarehouseFilterRow';
import './warehouseOverview.css';

function WarehouseOverview() {
	const dispatch = useDispatch();
	const [rows, setRows] = useState([0]);
	const [filledRows, setFilledRows] = useState([]);

	const mapData = {
		discharger: ['D1', 'D2', 'D3', 'D4'],
		lid: ['L1', 'L2', 'L3'],
	};

	const handleDeleteAllRow = () => {
		setRows([0]);
		setFilledRows(['deleted']);
		dispatch(removeAll());
	};

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
							mapData={mapData}
							filledRows={filledRows}
							setFilledRows={setFilledRows}
						/>
					))}
				</tbody>
			</table>
		</>
	);
}

export default WarehouseOverview;
