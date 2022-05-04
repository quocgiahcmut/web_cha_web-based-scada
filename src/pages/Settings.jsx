import { Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setOeeTarget, setInitialOeeDateStart } from '../redux/slice/OeeReportSlice';
import React from 'react';
import FormikControl from '../components/formControl/FormControl';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CustomizedBreadcrumbs from '../components/breadcrumbs/Breadcrumbs';
const oeeTargetValidationSchema = Yup.object({
	oeeTarget: Yup.number()
		.typeError('Phải là con số')
		.lessThan(101)
		.moreThan(0)
		.required('Vui lòng nhập mục tiêu OEE phù hợp'),
});

const initialOeeDateStartValidationSchema = Yup.object({
	initialOeeDateStart: Yup.number().typeError('Phải là con số').required('Vui lòng nhập ngày phù hợp'),
});

function Settings() {
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const { oeeTarget, initialOeeDateStart } = useSelector((state) => state.oeeReportData);
	const handleOeeTargetSubmit = (value) => {
		setOpen(true);
		dispatch(setOeeTarget(value.oeeTarget));
	};
	const handleInitialOeeDateStartSubmit = (value) => {
		setOpen(true);
		dispatch(setInitialOeeDateStart(value.initialOeeDateStart));
	};
	const handleClose = () => {
		setOpen(false);
	};
	const initialValues = {
		oeeTarget: oeeTarget,
		initialOeeDateStart: initialOeeDateStart,
	};
	return (
		<>
			<CustomizedBreadcrumbs id="CÀI ĐẶT" />
			<div className="card">
				<div className="card__header">
					<h3>Trang cài đặt</h3>
				</div>
				<div className="card__body">
					<div className="row">
						<div className="col-12">
							<Formik
								validationSchema={oeeTargetValidationSchema}
								initialValues={initialValues}
								onSubmit={handleOeeTargetSubmit}
							>
								{(formik) => {
									return (
										<>
											{' '}
											<Form
												style={{
													display: 'flex',
													justifyContent: 'flex-start',
													alignItems: 'center',
												}}
												id="oee-target-setting"
											>
												<FormikControl
													placeholder="Đặt ra mục tiêu OEE trước khi gửi đi"
													label="Mục tiêu hàm OEE"
													name="oeeTarget"
													control="input"
												/>
												<button
													type="submit"
													className={`btn btn-primary ${formik.values.oeeTarget === '' ? 'btn-disabled' : ''}`}
													disabled={formik.values.oeeTarget === '' ? true : false}
												>
													Lưu lại
												</button>
											</Form>
											<ErrorMessage name="oeeTarget" component="div" className="error-message" />
										</>
									);
								}}
							</Formik>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Formik
								validationSchema={initialOeeDateStartValidationSchema}
								initialValues={initialValues}
								onSubmit={handleInitialOeeDateStartSubmit}
							>
								{(formik) => {
									return (
										<>
											{' '}
											<Form
												style={{
													display: 'flex',
													justifyContent: 'flex-start',
													alignItems: 'center',
												}}
												id="oee-target-setting"
											>
												<FormikControl
													placeholder="Nhập ngày khởi tạo để tính toán OEE tự động"
													label="Ngày khởi tạo tính toán OEE"
													name="initialOeeDateStart"
													control="input"
												/>
												<button
													type="submit"
													className={`btn btn-primary ${
														formik.values.initialOeeDateStart === '' ? 'btn-disabled' : ''
													}`}
													disabled={formik.values.initialOeeDateStart === '' ? true : false}
												>
													Lưu lại
												</button>
											</Form>
											<ErrorMessage name="initialOeeDateStart" component="div" className="error-message" />
										</>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Thông báo'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Lưu lại thành công</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Đồng ý
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Settings;
