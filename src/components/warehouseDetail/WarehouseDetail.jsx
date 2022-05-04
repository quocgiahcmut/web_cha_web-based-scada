import React from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';
import WarehouseTable from '../warehouseTable/WarehouseTable';
import './warehouseDetail.css';
import { Formik, Form, ErrorMessage } from 'formik';
import FormikControl from '../formControl/FormControl';
import { format } from 'date-fns';
import * as Yup from 'yup';
const validationSchema = Yup.object({
	startTime: Yup.date().required('Ngày bắt đầu không được bỏ trống'),
	stopTime: Yup.date().when('startTime', (startTime, schema) =>
		startTime ? schema.min(startTime, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema
	),
});
function WarehouseDetailFilter({ onSubmit }) {
	const initialDateStart = React.useMemo(() => {
		const today = new Date();
		const numberOfDaysToSubtract = Number(7);
		const date = today.setDate(today.getDate() - numberOfDaysToSubtract);
		return format(date, 'yyyy-MM-dd');
	}, []);

	const initialDateEnd = React.useMemo(() => {
		const today = new Date();
		const numberOfDaysToAdd = 1;
		const date = today.setDate(today.getDate() + numberOfDaysToAdd);
		return format(date, 'yyyy-MM-dd');
	}, []);
	const handleSubmit = (e) => {
		onSubmit(e);
	};
	return (
		<>
			<div className="card">
				<div className="card__header mb-15">
					<h3>Tìm kiếm theo ngày</h3>
				</div>
				<div className="card__body">
					<div className="row">
						<Formik
							initialValues={{
								startTime: initialDateStart,
								stopTime: initialDateEnd,
							}}
							initialTouched={{
								startTime: false,
								stopTime: true,
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ values, errors, touched, handleChange, handleBlur, ...formik }) => {
								return (
									<>
										<div className="col-12">
											<Form className="flex-right">
												<FormikControl control="date" name="startTime" label="Từ ngày" />
												<FormikControl control="date" name="stopTime" label="Đến ngày" />
												<button type="submit" className="btn btn-primary">
													Tìm kiếm
												</button>
											</Form>
										</div>
										<div className="col-12">
											<ErrorMessage name="startTime" component="div" className="error-message" />
											<ErrorMessage name="stopTime" component="div" className="error-message" />
										</div>
									</>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

function WarehouseDetail() {
	const { id } = useParams();
	const labels = ['12/02/2022', '13/02/2022', '14/02/2022', '15/02/2022', '16/02/2022', '17/02/2022', '18/02/2022'];

	const apexChartConfig = {
		options: {
			chart: {
				id: 'basic-area',
				toolbar: {
					show: false,
				},
			},
			xaxis: {
				categories: labels,
			},
			tooltip: {
				enabled: false,
			},
			legend: {
				show: false,
			},
		},
		series: [
			{
				name: 'quantity',
				data: labels.map(() => Math.floor(Math.random() * 300)),
			},
		],
	};
	const onSubmit = (e) => {
		console.log(e);
	};
	return (
		<>
			<div className="warehouseDetail__container">
				<div className="row">
					<div className="col-12">
						<WarehouseDetailFilter onSubmit={onSubmit} />
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card warehouseDetail__chart">
							<span>Biểu đồ cập nhật số lượng mã chi tiết {id}</span>
							<div>
								<Chart
									type="area"
									options={apexChartConfig.options}
									series={apexChartConfig.series}
									width="100%"
									height="100%"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row warehouseDetail__values">
					<div className="col-8">
						<div className="card">
							<div className="card__body">
								<div className="warehouseDetail__values-table">
									<WarehouseTable
										headers={[
											{ text: 'Thời gian', key: 'time' },
											{ text: 'Sự kiện', key: 'activity' },
											{ text: 'SL/KL', key: 'quantity' },
											{ text: 'Ghi chú', key: 'note' },
										]}
										body={[
											{
												time: '14/02/2022',
												activity: 'Nhập kho',
												quantity: '300',
												note: 'Không',
											},
											{
												time: '14/02/2022',
												activity: 'xuất kho',
												quantity: '200',
												note: 'Không',
											},
											{
												time: '14/02/2022',
												activity: 'Nhập kho',
												quantity: '500',
												note: 'Không',
											},
										]}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="col-4">
						<div className="card">
							<div className="card__body">
								<div className="warehouseDetail__values-table">
									<WarehouseTable
										headers={[
											{ text: 'Vị trí', key: 'location' },
											{ text: 'Số lượng', key: 'quantity' },
										]}
										body={[
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
											{ location: '2.2.1', quantity: '300' },
										]}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WarehouseDetail;
