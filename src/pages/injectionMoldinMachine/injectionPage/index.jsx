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
const rawData = [
	{
		name: 'AXb15',
		number: 'M1',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M2',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M3',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M4',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M5',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M6',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'm7',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'm8',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M24',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M25',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M30',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M36',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M24',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M25',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M30',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M36',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M24',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M25',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M30',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M36',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M1',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M2',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M3',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'M4',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M5',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M6',
		percent: 50,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'm7',
		percent: 78,
		state: 'S',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'large',
	},
	{
		name: 'AXb12',
		number: 'm8',
		percent: 15,
		state: 'M',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
	{
		name: 'AXb12',
		number: 'M24',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	},
];

function InjectionMoldingMachinePage() {
	const param = useParams();
	const history = useHistory();
	// save data after call API
	const pageSize = React.useMemo(() => (window.screen.width >= 1280 ? 12 : window.screen.width >= 500 ? 6 : 100), []);

	const [resData, setResData] = useState();
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
				setWattageFilter([...wattageFilter, payload]);
			}
		} else {
			if (stateFilter.includes(payload)) {
				setStateFilter(stateFilter.filter((item) => item !== payload));
			} else {
				setStateFilter([...stateFilter, payload]);
			}
		}
	};
	// {
	// 	name: 'AXb12',
	// 	number: 'M4',
	// 	percent: 15,
	// 	state: 'M',
	// 	cycle: '30 giây',
	// 	openDoorTime: '7 giây',
	// 	productId: 'EE2003',
	// 	wattage: 'small',
	// }
	useEffect(() => {
		const fetchData = async () => {
			const res = await injectionApi.getTemporaryAllPreShifts();
			console.log(res.data.items);
			return res.data.items.map((item) => {
				return {
					name: item,
				};
			});
		};
		fetchData();
		setResData(rawData);
	}, []);

	useEffect(() => {
		history.push(`/injection/pages/${page}`);
	}, [page, history]);

	useEffect(() => {
		const quantityPrepare = { M: 0, R: 0, S: 0 };
		resData?.forEach((item) => {
			if (item.state === 'M') quantityPrepare.M++;
			else if (item.state === 'R') quantityPrepare.R++;
			else quantityPrepare.S++;
		});
		setQuantity(quantityPrepare);
	}, [resData]);

	useEffect(() => {
		let wattageFilterData, stateFilterData;
		if (wattageFilter.length !== 0) {
			wattageFilterData = resData.filter((item) => wattageFilter.includes(item.wattage));
			setFilterData(wattageFilterData);
		}
		if (stateFilter.length !== 0) {
			stateFilterData = resData.filter((item) => stateFilter.includes(item.state));
			setFilterData(stateFilterData);
		}
		if (wattageFilterData && stateFilterData) {
			setFilterData(wattageFilterData.filter((item) => stateFilterData.includes(item)));
		}
		if (!(wattageFilterData || stateFilterData)) {
			setFilterData(resData);
		}
		history.push('/injection/pages/1');
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
					<ReportNavigationButton history={history} path="/injection/map">
						DẠNG BẢN ĐỒ
					</ReportNavigationButton>
				</div>
			</div>
			<div className="row">
				<div className="col-12 flex-center">
					<ReportNavigationButton history={history} path="/report/main/injection" />
				</div>
			</div>
		</div>
	);
}

export default InjectionMoldingMachinePage;
