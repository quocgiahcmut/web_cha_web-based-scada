import React from 'react';
import * as Yup from 'yup';
import { Formik, ErrorMessage, Form } from 'formik';
import FormikControl from '../formControl/FormControl';
import { format } from 'date-fns';

const formikValidationSchema = Yup.object({
	date: Yup.date().required('Không được bỏ trống'),
});

function MonthlyProgressFilter({ onSubmit }) {
	const handleSubmit = (e) => {
		onSubmit(e.date.concat('-01'));
	};
	return (
		<>
			<Formik
				validationSchema={formikValidationSchema}
				initialValues={{
					date: format(Date.now(), 'yyyy-MM'),
				}}
				onSubmit={handleSubmit}
			>
				{(formik) => {
					return (
						<>
							<Form>
								<div className="row">
									<div className="col-11 col-md-12">
										<FormikControl control="month" name="date" label="Tháng truy xuất" placeholder="Tháng truy xuất" />
									</div>
									<div className="col-1 flex-horizontal-center">
										<button className="customized-btn btn-primary" type="submit">
											Truy xuất
										</button>
									</div>
									<div className="col-12">
										<ErrorMessage name="date" className="alarm-error-message" />
									</div>
								</div>
							</Form>
						</>
					);
				}}
			</Formik>
		</>
	);
}

export default MonthlyProgressFilter;
