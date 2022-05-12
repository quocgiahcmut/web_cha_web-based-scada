import { format } from 'date-fns';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import './reportInjectionFilter.css';
import * as Yup from 'yup';
import FormControl from '../formControl/FormControl';
import { INJECTION_MACHINE_ID } from '../../utils/utils';

const validationSchema = Yup.object({
	dateStart: Yup.date().required('Vui lòng chọn ngày'),
	dateEnd: Yup.date()
		.when('dateStart', (dateStart, schema) => {
			return dateStart ? schema.min(dateStart, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema;
		})
		.required('Không được bỏ trống'),
	moldingMachineId: Yup.string().required('Vui lòng nhập mã máy'),
});
function ReportInjectionFilter({ onSubmit }) {
	const initialDateStart = () => {
		const today = new Date();
		return format(today, 'yyyy-MM-dd');
	};
	const initialDateEnd = () => {
		const today = new Date();
		const numberOfDaysToAdd = 1;
		const date = today.setDate(today.getDate() + numberOfDaysToAdd);
		return format(date, 'yyyy-MM-dd');
	};
	const handleSubmit = (event) => {
		onSubmit(event);
	};
	const initialValues = {
		dateStart: initialDateStart(),
		dateEnd: initialDateEnd(),
		moldingMachineId: `m4`,
	};
	const moldingMachineIdList = [];

	INJECTION_MACHINE_ID.forEach((item) => {
		moldingMachineIdList.push(
			item.isHaitian && {
				key: item.title,
				value: item.title.toLowerCase(),
			}
		);
	});

	return (
		<>
			<Formik
				initialTouched={{
					dateStart: true,
					dateEnd: true,
					moldingMachineId: true,
				}}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<>
							<div className="injection-report__container mb-20">
								<div className="row">
									<div className="col-12">
										<Form id="injection-report__filter">
											<FormControl label="Ngày bắt đầu" name="dateStart" control="date" />
											<FormControl label="Ngày kết thúc" name="dateEnd" control="date" />
											<FormControl
												label="Mã máy"
												name="moldingMachineId"
												control="select"
												options={moldingMachineIdList
													.filter((item) => item !== false)
													.sort((a, b) => {
														return ('' + b.attr).localeCompare(a.attr);
													})}
											/>
											<button type="submit" className="customized-btn btn-primary">
												Tìm kiếm
											</button>
										</Form>
									</div>
								</div>

								<div className="row">
									<div className="col-12">
										<div className="error-msg__container">
											<ErrorMessage name="dateEnd" component="div" className="error-message" />
											<ErrorMessage name="moldingMachineId" component="div" className="error-message" />
										</div>
									</div>
								</div>
							</div>
						</>
					);
				}}
			</Formik>
		</>
	);
}

export default React.memo(ReportInjectionFilter);
