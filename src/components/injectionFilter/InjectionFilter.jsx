import { useEffect, useState } from 'react';
import './injectionFilter.css';

function InjectionFilter({ handleCheckBtn, wattageFilter, stateFilter }) {
	const [showWattageFilter, setShowWattageFilter] = useState(false);
	const [showStateFilter, setShowStateFilter] = useState(false);
	useEffect(() => {
		const closePopUp = () => {
			setShowWattageFilter(false);
			setShowStateFilter(false);
		};
		document.addEventListener('click', closePopUp);

		return () => document.removeEventListener('click', closePopUp);
	}, []);

	return (
		<div className="row col-2 injectionMoldingMachinePage__filter">
			<span
				className={`col-4 ${wattageFilter.length > 0 && 'isFiltered'}`}
				onClick={(e) => {
					e.stopPropagation();
					setShowWattageFilter(!showWattageFilter);
				}}
			>
				Công suất
			</span>
			<div className={`injectionMoldingMachinePage__filter-wattage ${showWattageFilter ? 'show' : 'hide'}`}>
				<button
					type="button"
					onClick={(e) => handleCheckBtn(e, 'wattage', 'small')}
					className={`injectionMoldingMachinePage__filter-btn ${wattageFilter.includes('small') && 'btnActive'}`}
				>
					<i className="bx bx-check"></i>
					<span>Máy nhỏ</span>
				</button>
				<button
					type="button"
					onClick={(e) => handleCheckBtn(e, 'wattage', 'large')}
					className={`injectionMoldingMachinePage__filter-btn ${wattageFilter.includes('large') && 'btnActive'}`}
				>
					<i className="bx bx-check"></i>
					<span>Máy lớn</span>
				</button>
			</div>
			<span
				className={`col-4 ${stateFilter.length > 0 && 'isFiltered'}`}
				onClick={(e) => {
					setShowStateFilter(!showStateFilter);
					e.stopPropagation();
				}}
			>
				Trạng thái
			</span>
			<div className={`injectionMoldingMachinePage__filter-state ${showStateFilter ? 'show' : 'hide'}`}>
				<button
					type="button"
					onClick={(e) => handleCheckBtn(e, 'isRunning', true)}
					className={`injectionMoldingMachinePage__filter-btn ${stateFilter.includes(true) && 'btnActive'}`}
				>
					<i className="bx bx-play"></i>
					<span>Đang chạy</span>
				</button>
				<button
					type="button"
					onClick={(e) => handleCheckBtn(e, 'isRunning', false)}
					className={`injectionMoldingMachinePage__filter-btn ${stateFilter.includes(false) && 'btnActive'}`}
				>
					<i className="bx bx-stop"></i>
					<span>Tạm dừng</span>
				</button>
			</div>
		</div>
	);
}

export default InjectionFilter;
