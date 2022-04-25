import { format } from 'date-fns';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import './reportQaqcFilter.css';
import * as Yup from 'yup';
import FormControl from '../formControl/FormControl';
import ReportQaqcTable from '../reportQaqcTable/ReportQaqcTable';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import EmptyPlaceholder from '../emptyPlaceholder/EmptyPlaceholder';
import { useDispatch } from 'react-redux';
import { resetDeformationReportData } from '../../redux/slice/QaQcReportSlice';

const validationSchema = Yup.object({
	dateStart: Yup.date(),
	dateEnd: Yup.date().when('dateStart', (dateStart, schema) => {
		return dateStart ? schema.min(dateStart, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema;
	}),
	purpose: Yup.string(),
	note: Yup.string().when('purpose', (purpose, schema) => {
		return purpose === 'other' ? schema.required('Ghi chú không được bỏ trống') : schema;
	}),
	productName: Yup.string(),
});
// component = { ReportQaqcTable };
// reportData = { enduranceData };
// reportHeaders = { ENDURANCE_COLUMNS };
function ReportQaqcFilter({
	reportData,
	reportHeaders,
	deformation,
	exportReport,
	onSubmit,
	dataDisplay,
	loading,
	error,
}) {
	const dispatch = useDispatch();
	const initialDateStart = () => {
		const today = new Date();
		const numberOfDaysToSubtract = 7;
		const date = today.setDate(today.getDate() - numberOfDaysToSubtract);
		return format(date, 'yyyy-MM-dd');
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
	const initialValues = deformation
		? {
				dateStart: initialDateStart(),
				dateEnd: initialDateEnd(),
				purpose: 'period',
				note: '',
				productName: '',
				testType: 'rock-test',
		  }
		: { dateStart: initialDateStart(), dateEnd: initialDateEnd(), purpose: 'period', note: '', productName: '' };

	const PURPOSE_OPTIONS = [
		{ value: 'period', key: 'Định kỳ' },
		{ value: 'anomaly', key: 'Bất thường' },
		{ value: 'newProduct', key: 'Sản phẩm mới' },
		{ value: 'other', key: 'Khác' },
	];
	const TEST_TYPE_OPTIONS = [
		{ value: 'rock-test', key: 'Rock test' },
		{ value: 'bending', key: 'Lực uốn' },
		{ value: 'static-load', key: 'Chịu tải tĩnh' },
	];
	const handleResetChange = () => {
		dispatch(resetDeformationReportData());
	};
	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<>
							<div className="qaqc-report__container mb-20">
								<div className="row">
									<div className="col-12">
										<Form onChange={handleResetChange} id="qaqc-report__filter">
											{deformation ? (
												<FormControl
													label="Bài kiểm tra"
													name="testType"
													control="select"
													options={TEST_TYPE_OPTIONS}
												/>
											) : null}
											<FormControl label="Ngày bắt đầu" name="dateStart" control="date" />
											<FormControl label="Ngày kết thúc" name="dateEnd" control="date" />
											<button type="submit" className="btn btn-primary">
												Tìm kiếm
											</button>
										</Form>
									</div>
								</div>

								<div className="row">
									<div className="col-12">
										<div className="error-msg__container">
											<ErrorMessage name="dateEnd" component="div" className="error-message" />
											<ErrorMessage name="purpose" component="div" className="error-message" />
											<ErrorMessage name="note" component="div" className="error-message" />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Form id="qaqc-report__filter">
											<FormControl
												placeholder="Đặt tên sản phẩm trước khi xuất excel"
												label="Tên sản phẩm"
												name="productName"
												control="input"
											/>
											<FormControl label="Mục đích" name="purpose" control="select" options={PURPOSE_OPTIONS} />
											<FormControl
												label="Ghi chú"
												name="note"
												control="input"
												disable={formik.values.purpose === 'other' ? false : true}
											/>
											<button
												type="button"
												className={`btn btn-primary ${
													formik.values.productName === '' ||
													(formik.values.purpose === 'other' && formik.values.note === '') ||
													dataDisplay.length === 0
														? 'btn-disabled'
														: ''
												}`}
												disabled={
													formik.values.productName === '' ||
													(formik.values.purpose === 'other' && formik.values.note === '') ||
													dataDisplay.length === 0
														? true
														: false
												}
												onClick={() =>
													exportReport(
														formik.values.productName,
														format(new Date(formik.values.dateStart), 'dd/MM/yyyy'),
														format(new Date(formik.values.dateEnd), 'dd/MM/yyyy'),
														formik.values.purpose,
														formik.values.note,
														formik.values.testType
													)
												}
											>
												Xuất excel
											</button>
										</Form>
									</div>
								</div>
							</div>
							{deformation ? (
								<div className="row">
									<div className="col-12">
										{loading ? (
											<LoadingComponent />
										) : error ? (
											<EmptyPlaceholder isError={true} msg={error} />
										) : reportData.length <= 0 ? (
											<EmptyPlaceholder msg="Nhấn nút tìm kiếm để xem báo cáo" />
										) : (
											<ReportQaqcTable
												reportData={reportData}
												reportHeaders={
													formik.values.testType === 'rock-test'
														? reportHeaders.rockTest
														: formik.values.testType === 'bending'
														? reportHeaders.bending
														: reportHeaders.staticLoad
												}
											/>
										)}
									</div>
								</div>
							) : null}
						</>
					);
				}}
			</Formik>
		</>
	);
}

export default ReportQaqcFilter;
