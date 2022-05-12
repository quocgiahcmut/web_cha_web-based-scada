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
import QaqcOverviewReportTable from '../qaqcOverviewReportTable/QaqcOverviewReportTable';
const validationSchema = Yup.object({
	dateStart: Yup.date(),
	dateEnd: Yup.date().when('dateStart', (dateStart, schema) => {
		return dateStart ? schema.min(dateStart, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema;
	}),
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
	overviewData,
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
				testType: 'rock-test',
		  }
		: { dateStart: initialDateStart(), dateEnd: initialDateEnd() };
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
			<Formik
				initialTouched={{
					dateEnd: true,
				}}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
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
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Form id="qaqc-report__filter">
											<button
												type="button"
												className={`btn btn-primary ${dataDisplay.length === 0 ? 'btn-disabled' : ''}`}
												disabled={dataDisplay.length === 0 ? true : false}
												onClick={() => exportReport(formik.values.testType)}
											>
												Xuất excel
											</button>
										</Form>
									</div>
									<div className="col-12">
										<ErrorMessage name="purpose" component="div" className="error-message" />
										<ErrorMessage name="note" component="div" className="error-message" />
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
											<>
												<QaqcOverviewReportTable overviewData={overviewData} />

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
											</>
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

export default React.memo(ReportQaqcFilter);
