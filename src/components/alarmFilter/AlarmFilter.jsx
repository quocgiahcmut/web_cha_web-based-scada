import React from 'react';
import './alarmFilter.css';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../formControl/FormControl';
import { format } from 'date-fns';
const errorCodeRegExp = /^[0-9]*$/;

const validationSchema = Yup.object({
	dateStart: Yup.date().required('Không được bỏ trống'),
	dateEnd: Yup.date()
		.when('dateStart', (dateStart, schema) => {
			return dateStart ? schema.min(dateStart, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema;
		})
		.required('Không được bỏ trống'),
	error_code: Yup.string().matches(errorCodeRegExp, 'Mã lỗi không hợp lệ'),
	error_sector: Yup.array().min(1, 'Chọn ít nhất 1 khu vực'),
	priority: Yup.array(),
});
function AlarmFilter({ onSubmit }) {
	const initialDateStart = React.useMemo(() => {
		const today = new Date();
		const numberOfDaysToSubtract = 7;
		const date = today.setDate(today.getDate() - numberOfDaysToSubtract);
		return format(date, 'yyyy-MM-dd');
	}, []);

	const initialDateEnd = React.useMemo(() => {
		const today = new Date();
		const numberOfDaysToAdd = 1;
		const date = today.setDate(today.getDate() + numberOfDaysToAdd);
		return format(date, 'yyyy-MM-dd');
	}, []);

	const handleSubmit = (event) => {
		onSubmit(event);
	};

	const SECTOR_OPTIONS = React.useMemo(() => {
		return [
			{ value: 'qaqc', key: 'Phòng QA/QC thiết bị' },
			{ value: 'packing', key: 'Khu vực đóng gói' },
			{ value: 'injection', key: 'Khu vực máy ép' },
			{ value: 'assembly', key: 'Khu vực lắp ráp' },
		];
	}, []);
	const PRIORITY_OPTIONS = React.useMemo(() => {
		return [
			{
				key: 'Cao',
				value: 'high',
			},
			{
				key: 'Trung bình',
				value: 'middle',
			},
			{
				key: 'Thấp',
				value: 'low',
			},
		];
	}, []);

	return (
		<>
			<Formik
				initialValues={{
					dateStart: initialDateStart,
					dateEnd: initialDateEnd,
					error_code: '',
					error_sector: ['qaqc'],
					priority: ['high', 'middle', 'low'],
				}}
				initialTouched={{
					dateEnd: true,
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form id="alarm__filter">
					<FormikControl control="date" name="dateStart" label="Ngày bắt đầu" />
					<FormikControl control="date" name="dateEnd" label="Ngày kết thúc" />
					<FormikControl control="input" name="error_code" label="Mã lỗi" />
					<FormikControl control="checkbox" name="error_sector" label="Khu vực" options={SECTOR_OPTIONS} />
					<FormikControl control="checkbox" name="priority" label="Độ ưu tiên" options={PRIORITY_OPTIONS} />
					<button type="submit" className="customized-btn btn-primary">
						Tìm kiếm
					</button>
					<div className="alarm-error-msg__container">
						<ErrorMessage name="dateEnd" component="div" className="alarm-error-message" />
						<ErrorMessage name="error_code" component="div" className="alarm-error-message" />
						<ErrorMessage name="error_sector" component="div" className="alarm-error-message" />
						<ErrorMessage name="priority" component="div" className="alarm-error-message" />
					</div>
				</Form>
			</Formik>
		</>
	);
}

export default React.memo(AlarmFilter);
