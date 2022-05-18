import React from 'react';
import './injectionMap.css';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as VerticalMachine } from '../../../assets/images/injectionMoldingMachine/vertical_injection_machine.svg';
import { ReactComponent as HorizontalMachine } from '../../../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';
import { INJECTION_MACHINE_LAYOUT } from '../../../utils/utils';
import InjectionMoldingMachine from '../../../components/injectionMoldingMachine/InjectionMoldingMachine';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function InjectionMachine({ item, direction }) {
	const [hoverData, setHoverData] = React.useState(null);
	const [monitorData, setMonitorData] = React.useState({
		isRunning: true,
		cycleTime: 10,
		counterShot: 10,
		openTime: 10,
	});
	const [configData, setConfigData] = React.useState({
		id: hoverData,
		plannedQuantity: 0,
		cycle: 0,
		standardOpenTime: 0,
		product: {
			id: '',
			name: '',
		},
		moldId: '',
		wattage: '',
		isRunning: false,
		cycleTime: 0,
		counterShot: 0,
		openTime: 0,
	});
	const [resData, setResData] = React.useState({
		id: hoverData,
		plannedQuantity: 200,
		cycle: 12,
		standardOpenTime: 5,
		product: {
			id: 'CS3004-TO1',
			name: 'Nắp đế bàn cầu hơi HA-40 kem nhạt TO1 (SS124#UB1)',
		},
		moldId: 'NX35',
		wattage: 'Small',
	});
	//fake data
	React.useEffect(() => {
		setConfigData({
			id: hoverData,
			plannedQuantity: 200,
			cycle: 12,
			standardOpenTime: 5,
			product: {
				id: 'CS3004-TO1',
				name: 'Nắp đế bàn cầu hơi HA-40 kem nhạt TO1 (SS124#UB1)',
			},
			moldId: 'NX35',
			wattage: 'Small',
		});
	}, [hoverData]);
	React.useEffect(() => {
		const id = setTimeout(() => {
			setResData({
				...monitorData,
				...configData,
			});
		}, 2000);
		return () => {
			clearTimeout(id);
		};
	}, [configData, monitorData]);
	return (
		<React.Fragment>
			{item.isHaitian ? (
				<Tippy
					className="injection-map__map-item-modal"
					content={<InjectionMoldingMachine injectionMoldingMachineData={resData} />}
					maxWidth={470}
				>
					<Link
						onMouseEnter={() => {
							setHoverData(item.title);
						}}
						className="injection-map__map-item-inner"
						to={{
							pathname: item.url,
							state: {
								map: true,
							},
						}}
					>
						<div className="injection-map__map-item-title">{item.title}</div>
						{item.subTitle.includes('\n') ? (
							<div className="injection-map__map-item-sub-title">
								{item.subTitle.split('\n').map((subTitle, index) => {
									return (
										<React.Fragment key={index}>
											{subTitle}
											{index !== item.subTitle.split('\n').length - 1 ? <br /> : null}
										</React.Fragment>
									);
								})}
							</div>
						) : (
							<div className="injection-map__map-item-sub-title">{item.subTitle}</div>
						)}
						<div className="injection-map__machine-container">
							{direction === 'vectical' ? (
								<VerticalMachine height="100px" width="100%" />
							) : (
								<HorizontalMachine height="100px" width="100%" />
							)}
						</div>
					</Link>
				</Tippy>
			) : (
				<Tippy
					className="injection-map__map-item-modal"
					content={<InjectionMoldingMachine injectionMoldingMachineData={resData} />}
					maxWidth={470}
				>
					<div className="injection-map__map-item-inner injection-map__map-item-inner--none-haitian">
						<div className="injection-map__map-item-title">{item.title}</div>
						{item.subTitle.includes('\n') ? (
							<div className="injection-map__map-item-sub-title">
								{item.subTitle.split('\n').map((subTitle, index) => {
									return (
										<React.Fragment key={index}>
											{subTitle}
											{index !== item.subTitle.split('\n').length - 1 ? <br /> : null}
										</React.Fragment>
									);
								})}
							</div>
						) : (
							<div className="injection-map__map-item-sub-title">{item.subTitle}</div>
						)}
						<div className="injection-map__machine-container">
							{direction === 'vectical' ? (
								<VerticalMachine height="100px" width="100%" />
							) : (
								<HorizontalMachine height="100px" width="100%" />
							)}
						</div>
					</div>
				</Tippy>
			)}
		</React.Fragment>
	);
}

function InjectionMap() {
	const history = useHistory();
	return (
		<>
			<Breadcrumbs id="KHU VỰC MÁY ÉP" />
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__header">
							<h3>KHU VỰC MÁY ÉP</h3>
						</div>
						<div className="card__body">
							<div className="injection-map__container">
								<div className="injection-map__map">
									<div className="injection-map__map-first-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[0].map((item, index) => {
												return <InjectionMachine item={item} key={index} direction="vectical" />;
											})}
										</div>
									</div>
									<div className="injection-map__map-second-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[1].map((item, index) => {
												return <InjectionMachine item={item} key={index} direction="vectical" />;
											})}
										</div>
									</div>
									<div className="injection-map__map-third-row">
										<div className="injection-map__map-first-column">
											{INJECTION_MACHINE_LAYOUT[2][0].map((item, index) => {
												return <InjectionMachine item={item} key={index} direction="horizontal" />;
											})}
										</div>
										<div className="injection-map__map-second-column">
											{INJECTION_MACHINE_LAYOUT[2][1].map((item, index) => {
												return <InjectionMachine item={item} key={index} direction="horizontal" />;
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card__footer">
							<div className="row mb-10">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/layout/injection/pages/1">
										DẠNG BẢNG
									</ReportNavigationButton>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/layout/report/main/injection" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default InjectionMap;
