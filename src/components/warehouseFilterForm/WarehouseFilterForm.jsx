import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import WarehouseFilterRow from '../warehouseFilterRow/WarehouseFilterRow';
import _ from 'lodash';
import './warehouseFilterForm.css';
const fakeData = {
	discharger: [
		{
			name: 'Bộ xả 1',
			id: 'M1',
		},
		{
			name: 'Bộ xả 2',
			id: 'M2',
		},
		{
			name: 'Bộ xả 3',
			id: 'M3',
		},
	],
	lid: [
		{
			name: 'nắp 1',
			id: 'L1',
		},
		{
			name: 'nắp 2',
			id: 'L2',
		},
		{
			name: 'nắp 3',
			id: 'L3',
		},
	],
};
function WarehouseFilterForm() {
	const [filterRows, setFilterRows] = useState([1]);
	const [filterValues, setFilterValue] = useState({ row1: {} });
	const [searchDisabled, setSearchDisabled] = useState(true);
	const [filterValuesLength, setFilterValueLength] = useState(_.size(filterValues) && 1);

	const idList = useMemo(() => {
		const list = {};
		for (let type in fakeData) {
			list[type] = [];
			fakeData[type].forEach((item) => list[type].push(item.id));
		}
		return list;
	}, []);

	useEffect(() => {
		setFilterValueLength(_.size(filterValues));
	}, [filterValues]);

	useEffect(() => {
		const newFilterValue = {};
		filterRows.slice(filterValuesLength).forEach((row) => {
			newFilterValue[`row${row}`] = undefined;
		});
		setFilterValue((prev) => {
			return {
				...prev,
				...newFilterValue,
			};
		});
	}, [filterRows, filterValuesLength]);

	useEffect(() => {
		let isValid = false;
		for (let row in filterValues) {
			if (filterValues[row] && (filterValues[row]?.id !== '' || filterValues[row]?.name !== '')) {
				isValid = false;
			} else {
				isValid = true;
				break;
			}
		}
		setSearchDisabled(isValid);
	}, [filterValues]);

	const addFilterRow = () => {
		setFilterRows((prev) => [...prev, filterRows[filterRows.length - 1] + 1]);
	};

	const deleteFilterRow = (filterId) => {
		setFilterRows(filterRows.filter((item) => item !== filterId));
		setFilterValue((prev) => {
			const newFilterValue = { ...prev };
			delete newFilterValue[`row${filterId}`];
			return newFilterValue;
		});
	};

	const search = () => {
		console.log(filterValues);
	};

	const validationSchema = Yup.object({
		id: Yup.string()
			.required('Mã sản phẩm không được bỏ trống')
			.when('type', (type, schema) => (type ? schema.oneOf(idList[type], 'Sản phẩm không tồn tại') : schema)),
		name: Yup.string().required('Tên sản phẩm không được bỏ trống'),
	});
	return (
		<>
			{filterRows.map((rowId) => (
				<tr key={rowId}>
					<Formik
						validationSchema={validationSchema}
						initialValues={{
							type: 'discharger',
							id: '',
							name: '',
							// fromDate: fromDateDefault,
							// toDate: toDateDefault,
						}}
					>
						<WarehouseFilterRow
							filterId={rowId}
							deleteFilterRow={filterRows.length > 1 && deleteFilterRow}
							filterValues={filterValues}
							setFilterValue={setFilterValue}
							data={fakeData}
							setSearchDisabled={setSearchDisabled}
						/>
					</Formik>
				</tr>
			))}
		</>
	);
}

export default WarehouseFilterForm;
