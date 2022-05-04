import { format } from 'date-fns';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import './reportPackingFilter.css';
import * as Yup from 'yup';
import FormControl from '../formControl/FormControl';

const validationSchema = Yup.object({
	dateStart: Yup.date().required('Vui lòng chọn ngày'),
	fileName: Yup.string().required('Vui lòng nhập tên file'),
});
function ReportPackingFilter({ exportReport, onSubmit }) {
	const initialDateStart = () => {
		const today = new Date();
		return format(today, 'yyyy-MM-dd');
	};

	const handleSubmit = (event) => {
		onSubmit(event);
	};
	const initialValues = {
		dateStart: initialDateStart(),
		fileName: `Báo cáo đóng gói ${format(new Date(), 'MM/yyyy')}`,
	};

	return (
		<>
			<Formik
				initialTouched={{
					dateStart: true,
					fileName: true,
				}}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<>
							<div className="packing-report__container mb-20">
								<div className="row">
									<div className="col-12">
										<Form id="packing-report__filter">
											<FormControl label="Ngày bắt đầu" name="dateStart" control="date" />
											<button type="submit" className="btn btn-primary">
												Tìm kiếm
											</button>
										</Form>
									</div>
								</div>

								<div className="row">
									<div className="col-12">
										<div className="error-msg__container">
											<ErrorMessage name="dateStart" component="div" className="error-message" />
											<ErrorMessage name="fileName" component="div" className="error-message" />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Form id="packing-report__filter">
											<FormControl
												placeholder="Đặt tên sản phẩm trước khi xuất excel"
												label="Tên báo cáo"
												name="fileName"
												control="input"
											/>
											<button
												type="button"
												className={`btn btn-primary ${formik.values.fileName === '' ? 'btn-disabled' : ''}`}
												disabled={formik.values.fileName === '' ? true : false}
												onClick={() => exportReport(formik.values.dateStart, formik.values.fileName)}
											>
												Xuất excel
											</button>
										</Form>
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

export default ReportPackingFilter;
