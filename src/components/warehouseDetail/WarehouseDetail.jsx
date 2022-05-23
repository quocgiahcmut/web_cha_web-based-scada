import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { warehouseApi } from '../../api/warehouse/warehouseApi';
import WarehouseTable from '../warehouseTable/WarehouseTable';
import './warehouseDetail.css';
import { Formik, Form, ErrorMessage } from 'formik';
import FormikControl from '../formControl/FormControl';
import { format } from 'date-fns';
import * as Yup from 'yup';

const validationSchema = Yup.object({
	startTime: Yup.date().required('Ngày bắt đầu không được bỏ trống'),
	endTime: Yup.date().when('startTime', (startTime, schema) =>
		startTime ? schema.min(startTime, 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc') : schema
	),
});
function WarehouseDetailFilter({ onSubmit, initialDateStart, initialDateEnd }) {
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
								endTime: initialDateEnd,
							}}
							initialTouched={{
								startTime: false,
								endTime: true,
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
												<FormikControl control="date" name="endTime" label="Đến ngày" />
												<button type="submit" className="customized-btn btn-primary">
													Tìm kiếm
												</button>
											</Form>
										</div>
										<div className="col-12">
											<ErrorMessage name="startTime" component="div" className="error-message" />
											<ErrorMessage name="endTime" component="div" className="error-message" />
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
	const [stockCardData, setStockCardData] = useState();
	const [locationData, setLocationData] = useState();

	const apexChartConfig = {
		options: {
			chart: {
				id: 'basic-area',
				toolbar: {
					show: false,
				},
			},
			xaxis: {
				categories: stockCardData && stockCardData.dateList,
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
				data: stockCardData && stockCardData.quantityList,
			},
		],
	};

	const handleStockCardData = (data) => {
		if (data.length > 0) {
			const quantityList = [];
			const dataList = [];

			const dateList = data.map((item) => {
				const date = format(new Date(item.date), 'dd/MM/yyyy');
				quantityList.push(item.afterQuantity);
				dataList.push({
					date,
					export: item.outputQuantity,
					import: item.inputQuantity,
					quantity: item.afterQuantity,
				});
				return date;
			});

			return { dateList, quantityList, dataList };
		}
	};

	const handleLocationData = (data) => {
		if (data.length > 0) {
			return data.map((item) => {
				const { shelfId, rowId, cellId, sliceId, levelId } = item.location;
				const location = `${shelfId}.${rowId}.${cellId}`;
				const slice = `${sliceId} - ${levelId}`;
				return { location, slice, quantity: item.actualQuantity };
			});
		}
	};

	const handleGetData = useCallback((id, dateStart, dateEnd) => {
		Promise.all([warehouseApi.getStockCardById(id, dateStart, dateEnd), warehouseApi.getLocationById(id)]).then(
			(response) => {
				const stockCardData = handleStockCardData(response[0]);
				const locationData = handleLocationData(response[1]);
				setStockCardData(stockCardData);
				setLocationData(locationData);
			}
		);
	}, []);

	const onSubmit = async (dateQuery) => {
		const { startTime, endTime } = dateQuery;
		handleGetData(id, startTime, endTime);
	};

	useEffect(() => {
		handleGetData(id, initialDateStart, initialDateEnd);
	}, [handleGetData, id, initialDateEnd, initialDateStart]);

	return (
		<>
			<div className="warehouseDetail__container">
				<div className="row">
					<div className="col-12">
						<WarehouseDetailFilter
							onSubmit={onSubmit}
							initialDateStart={initialDateStart}
							initialDateEnd={initialDateEnd}
						/>
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
									{stockCardData && (
										<WarehouseTable
											headers={[
												{ text: 'Thời gian', key: 'date' },
												{ text: 'Xuất kho', key: 'export' },
												{ text: 'Nhập kho', key: 'import' },
												{ text: 'Tồn kho', key: 'quantity' },
											]}
											body={stockCardData.dataList}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="col-4">
						<div className="card">
							<div className="card__body">
								<div className="warehouseDetail__values-table">
									{locationData && (
										<WarehouseTable
											headers={[
												{ text: 'Vị trí trong kho', key: 'location' },
												{ text: 'Vị trí trong kệ', key: 'slice' },
												{ text: 'Số lượng', key: 'quantity' },
											]}
											body={locationData}
										/>
									)}
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
