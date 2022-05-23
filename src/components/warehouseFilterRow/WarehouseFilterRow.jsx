import { FormikProvider, useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormikControl from '../formControl/FormControl';
import { warehouseApi } from '../../api/warehouse/warehouseApi';
import { setData } from '../../redux/slice/WarehouseSlice';
import './warehouseFilterRow.css';

function WarehouseFilter({ filterId, filledRows, setFilledRows, idList }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [canClick, setCanClick] = useState(false);
	const warehouseData = useSelector((state) => state.warehouse);
	const [fieldData, setFieldData] = useState();

	const restoreData = useMemo(() => {
		const rowData = warehouseData[filterId];
		if (rowData) {
			return rowData;
		} else {
			return {};
		}
	}, [filterId, warehouseData]);

	const formik = useFormik({
		initialValues: {
			id: restoreData.id ?? '',
			name: restoreData.name ?? '',
			quantity: restoreData.quantity ?? '',
		},
	});
	const { values, handleChange, setFieldValue } = formik;
	const { id, name, quantity } = values;

	const showDetail = () => {
		history.push('/layout/warehouse/' + id);
	};

	useEffect(() => {
		//set empty value after delete all row
		if (filledRows[0] === 'deleted') {
			setFieldValue('id', '');
			setFieldValue('name', '');
			setFieldValue('quantity', '');
			setFieldData(null);
			setFilledRows([]);
		} else if (fieldData) {
			setFieldValue('name', fieldData.name);
			setFieldValue('quantity', fieldData.quantity);
			if (!filledRows.includes(filterId)) {
				setFilledRows([...filledRows, filterId]);
			}

			dispatch(
				setData({
					index: filterId,
					id,
					name,
					quantity,
				})
			);
		} else if (idList.length > 0 && id && !idList.includes(id)) {
			setFieldValue('name', 'Sản phẩm không tồn tại');
			setFieldValue('quantity', 'Không xác định');
			if (filledRows.includes(filterId)) {
				setFilledRows(filledRows.filter((rowId) => rowId !== filterId));
			}
		}
	}, [id, filledRows, dispatch, filterId, name, quantity, setFieldValue, setFilledRows, fieldData, idList]);

	useEffect(() => {
		if (id && idList.includes(id)) {
			setCanClick(true);
		} else {
			setCanClick(false);
		}
	}, [id, idList, setCanClick]);

	useEffect(() => {
		if (idList.includes(id)) {
			Promise.all([warehouseApi.getProductById(id), warehouseApi.getStockCardById(id)])
				.then((res) => {
					setFieldData({
						name: res[0].name,
						quantity: res[1][0].afterQuantity,
					});
				})
				.catch((error) => console.log(error));
		}
	}, [id, idList]);

	return (
		<FormikProvider value={formik}>
			<tr className="warehouseFilterRow__container">
				<td>
					<FormikControl control="input" name="id" value={id} onChange={handleChange} list={`list${filterId}`} />
					{idList && (
						<datalist id={`list${filterId}`}>
							{idList.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</datalist>
					)}
				</td>

				<td>
					<FormikControl name="name" control="input" value={name} disable />
				</td>

				<td>
					<FormikControl name="quantity" control="input" value={quantity} disable />
				</td>
				<td>
					<button onClick={showDetail} disabled={!canClick} className="customized-btn">
						Xem chi tiết
					</button>
				</td>
			</tr>
		</FormikProvider>
	);
}

export default WarehouseFilter;
