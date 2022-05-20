import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import InjectionFilter from '../../../components/injectionFilter/InjectionFilter';
import InjectionMoldingMachine from '../../../components/injectionMoldingMachine/InjectionMoldingMachine';
import InjectionStateNote from '../../../components/injectionStateNote/InjectionStateNote';
import './injectionMoldingMachinePage.css';
// import { MONITOR_INJECTION_LIST } from '../../../utils/utils';
// import Navbar from '../../../components/navBar/NavBar';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import { injectionApi } from '../../../api/axios/injectionReport';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { getInjectionMachineStatus, getTagsData } from '../../../utils/utils';

function InjectionMoldingMachinePage() {
	const param = useParams();
	const history = useHistory();
	const pageSize = React.useMemo(() => (window.screen.width >= 1280 ? 12 : window.screen.width >= 500 ? 6 : 100), []);
	const [connection, setConnection] = useState(null);
	const [configData, setConfigData] = useState([
		{
			name: 'CLF 800T',
			id: 'L6',
			wattage: 'Large',
			plannedQuantity: 200,
			moldId: '',
			product: {
				id: '',
				name: '',
			},
		},
		{
			name: 'JM 600-C',
			id: 'L7',
			wattage: 'Large',
			plannedQuantity: 0,
			moldId: '',
			product: {
				id: '',
				name: '',
			},
		},
		{
			name: 'HC 800',
			id: 'L8',
			wattage: 'Large',
			plannedQuantity: 0,
			moldId: '',
			product: {
				id: '',
				name: '',
			},
		},
		{
			name: 'JSW J850E-C5',
			id: 'L10',
			wattage: 'Large',
			plannedQuantity: 0,
			moldId: '',
			product: {
				id: '',
				name: '',
			},
		},
	]);
	const [resData, setResData] = useState();
	const [monitorData, setMonitorData] = useState([
		{
			isRunning: false,
			cycleTime: 0,
			counterShot: 0,
			openTime: 0,
			setCycle: 0,
		},
		{
			isRunning: false,
			cycleTime: 0,
			counterShot: 0,
			openTime: 0,
			setCycle: 0,
		},
		{
			isRunning: false,
			cycleTime: 0,
			counterShot: 0,
			openTime: 0,
			setCycle: 0,
		},
		{
			isRunning: false,
			cycleTime: 0,
			counterShot: 0,
			openTime: 0,
			setCycle: 0,
		},
	]);
	// id trang hiện tại => dùng để thực hiện render dữ liệu theo trang
	const [page, setPage] = useState(+param.page);
	// số trang cần hiển thị
	const [pages, setPages] = useState();
	// số lượng trạng thái máy trên trang cần đưa vào state note
	const [quantity, setQuantity] = useState({});
	const [wattageFilter, setWattageFilter] = useState([]);
	const [stateFilter, setStateFilter] = useState([]);
	// kết quả filter cuối cùng
	const [filterData, setFilterData] = useState();
	// dữ liệu hiển thị theo trang lấy từ filterData
	const [pageData, setPageData] = useState();
	const handleCheckBtn = (e, state, payload) => {
		e.stopPropagation();
		if (state === 'wattage') {
			if (wattageFilter.includes(payload)) {
				setWattageFilter(wattageFilter.filter((item) => item !== payload));
			} else {
				setWattageFilter((prev) => [...prev, payload]);
			}
		} else {
			if (stateFilter.includes(payload)) {
				setStateFilter(stateFilter.filter((item) => item !== payload));
			} else {
				setStateFilter((prev) => [...prev, payload]);
			}
		}
	};
	useEffect(() => {
		const connection = new HubConnectionBuilder()
			.withUrl('http://10.84.70.80:8085/websockethub', {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();
		connection.start().then(() => {
			console.log('connected');
			setConnection(connection);
		});
		return () => {
			connection.stop();
		};
	}, []);
	useEffect(() => {
		let idInterval;
		if (connection) {
			idInterval = setInterval(async () => {
				const rawData = await getTagsData(
					connection,
					'imm',
					['l10'],
					[['L10.CycleTime', 'L10.CounterShot', 'L10.OpenTime', 'L10.MachineStatus', 'L10.SetCycle']]
				);
				setMonitorData((prev) => [
					{
						isRunning: false,
						cycleTime: 0,
						counterShot: 0,
						openTime: 0,
						setCycle: 0,
					},
					{
						isRunning: false,
						cycleTime: 0,
						counterShot: 0,
						openTime: 0,
						setCycle: 0,
					},
					{
						isRunning: false,
						cycleTime: 0,
						counterShot: 0,
						openTime: 0,
						setCycle: 0,
					},
					{
						isRunning: getInjectionMachineStatus(rawData.deviceQueryResults[0].tagQueryResults[3].value),
						cycleTime: rawData.deviceQueryResults[0].tagQueryResults[0].value,
						openTime: rawData.deviceQueryResults[0].tagQueryResults[2].value,
						counterShot: rawData.deviceQueryResults[0].tagQueryResults[1].value,
						setCycle: rawData.deviceQueryResults[0].tagQueryResults[4].value,
					},
				]);
			}, 1500);
		}
		return () => {
			clearInterval(idInterval);
		};
	}, [connection]);
	useEffect(() => {
		setResData(
			configData.map((item, index) => {
				return {
					...item,
					...monitorData[index],
				};
			})
		);
	}, [monitorData, configData]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await injectionApi.getPreShiftsByMachine('L10');
			return res.data.items.map((item) => {
				return {
					id: item.machine.id,
					name: item.machine.model,
					plannedQuantity: Math.floor(item.cavity * ((12 * 60 * 60) / item.injectionCycle)),
					product: {
						id: item.product.id,
						name: item.product.name,
					},
					standardOpenTime: Number(item.product.mold.standardOpenTime.toFixed(0)),
					moldId: item.product.mold.id,
					cycle: Number(item.injectionCycle.toFixed(0)),
					wattage: item.machine.machineType === 0 ? 'Large' : 'Small',
				};
			});
		};
		fetchData().then((res) => {
			setConfigData((prev) => {
				return prev.map((item) => {
					if (item.id === res[0].id) {
						item = res[0];
					}
					return item;
				});
			});
		});
	}, []);

	useEffect(() => {
		history.push(`/layout/injection/pages/${page}`);
	}, [page, history]);

	useEffect(() => {
		const quantityPrepare = { R: 0, S: 0 };
		monitorData?.forEach((item) => {
			if (item.isRunning === true) quantityPrepare.R++;
			else if (item.isRunning === false) quantityPrepare.S++;
			else quantityPrepare.M++;
		});
		setQuantity(quantityPrepare);
	}, [monitorData]);
	useEffect(() => {
		let wattageFilterData, stateFilterData;
		if (wattageFilter.length !== 0) {
			wattageFilterData = resData.filter((item) => wattageFilter.includes(item.wattage));
			setFilterData(wattageFilterData);
		}
		if (stateFilter.length !== 0) {
			stateFilterData = resData.filter((item) => stateFilter.includes(item.isRunning));
			setFilterData(stateFilterData);
		}
		if (wattageFilterData && stateFilterData) {
			setFilterData(wattageFilterData.filter((item) => stateFilterData.includes(item)));
		}
		if (!(wattageFilterData || stateFilterData)) {
			setFilterData(resData);
		}
		history.push('/layout/injection/pages/1');
		setPage(1);
	}, [wattageFilter, stateFilter, resData, history]);

	useEffect(() => {
		if (filterData) {
			// pages array: mảng chứa số trang cần hiển thị, 1 dạng preparation trước khi đưa vô setPages
			let pagesArr = [];
			// vòng lặp chia trang, trả về state page 1 list các trang
			// + 1 là gì...
			for (let i = 1; i <= filterData.length / pageSize + 1; i++) {
				pagesArr.push(i);
			}
			setPages(pagesArr);
		}
	}, [filterData, pageSize]);

	useEffect(() => {
		if (filterData) {
			setPageData(
				// phép tính nhân với (page - 1) là lấy dữ liệu bắt đầu
				// và nhân vơi page để lấy dữ liệu kết thúc của trang đó
				filterData.filter((item, index) => index >= pageSize * (page - 1) && index < pageSize * page && item)
			);
		}
	}, [page, filterData, pageSize]);
	return (
		<div className="injectionMoldingMachinePage__container">
			<CustomizedBreadcrumbs id="KHU MÁY ÉP" />
			<div className="row injectionMoldingMachinePage__control">
				<>
					<div className="col-8 col-md-8 col-sm-2"></div>
					<InjectionStateNote quantity={quantity} />

					<InjectionFilter handleCheckBtn={handleCheckBtn} wattageFilter={wattageFilter} stateFilter={stateFilter} />
				</>
			</div>
			<div className="col-sm-12 col-md-12 injectionMoldingMachinePage__pageIndex">
				{pages &&
					pages.map((pageIndex) => (
						<div
							key={pageIndex}
							className={`injectionMoldingMachinePage__pageIndex-part ${pageIndex === page && 'pageIndexActive'}`}
						></div>
					))}
			</div>
			{page > 1 && (
				<div onClick={() => setPage(page - 1)} className="injectionMoldingMachinePage__navigate previousPage">
					<i className="bx bxs-chevron-left"></i>
				</div>
			)}

			{filterData && page <= filterData.length / pageSize && (
				<div onClick={() => setPage(page + 1)} className="injectionMoldingMachinePage__navigate nextPage">
					<i className="bx bxs-chevron-right"></i>
				</div>
			)}

			<div className="row injectionMoldingMachines__container mb-20">
				{pageData && pageData.length > 0 ? (
					pageData.map((item, index) => <InjectionMoldingMachine injectionMoldingMachineData={item} key={index} />)
				) : (
					<p>Không tồn tại kết quả nào</p>
				)}
			</div>
			<div className="row mb-10">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/layout/injection/map">
						DẠNG BẢN ĐỒ
					</ReportNavigationButton>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/layout/report/main/injection" />
				</div>
			</div>
		</div>
	);
}

export default InjectionMoldingMachinePage;
