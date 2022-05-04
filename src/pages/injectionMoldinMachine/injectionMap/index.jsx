import React from 'react';
import './injectionMap.css';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as VerticalMachine } from '../../../assets/images/injectionMoldingMachine/vertical_injection_machine.svg';
import { ReactComponent as HorizontalMachine } from '../../../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';
import { INJECTION_MACHINE_LAYOUT } from '../../../utils/utils';
import InjectionMoldingMachine from '../../../components/injectionMoldingMachine/InjectionMoldingMachine';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
function InjectionMachine({ item, direction, modalPosition = [] }) {
	//fake data
	const data = {
		name: 'AXb15',
		number: 'M1',
		percent: 30,
		state: 'R',
		cycle: '30 giây',
		openDoorTime: '7 giây',
		productId: 'EE2003',
		wattage: 'small',
	};

	return (
		<React.Fragment>
			{item.isHaitian ? (
				<Link
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
						<div className={`card injection-map__map-item-modal ${modalPosition.join(' ')}`}>
							<InjectionMoldingMachine injectionMoldingMachineData={data} />
						</div>
					</div>
				</Link>
			) : (
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
						<div className={`card injection-map__map-item-modal ${modalPosition.join(' ')}`}>
							<InjectionMoldingMachine injectionMoldingMachineData={data} />
						</div>
					</div>
				</div>
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
												return (
													<InjectionMachine
														item={item}
														key={index}
														direction="vectical"
														modalPosition={index <= 7 ? ['bottom', 'right'] : ['bottom', 'left']}
													/>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-second-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[1].map((item, index) => {
												return (
													<InjectionMachine
														item={item}
														key={index}
														direction="vectical"
														modalPosition={index <= 7 ? ['bottom', 'right'] : ['bottom', 'left']}
													/>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-third-row">
										<div className="injection-map__map-first-column">
											{INJECTION_MACHINE_LAYOUT[2][0].map((item, index) => {
												return (
													<InjectionMachine
														item={item}
														key={index}
														direction="horizontal"
														modalPosition={index <= 2 ? ['bottom', 'right'] : ['top', 'right']}
													/>
												);
											})}
										</div>
										<div className="injection-map__map-second-column">
											{INJECTION_MACHINE_LAYOUT[2][1].map((item, index) => {
												return (
													<InjectionMachine
														item={item}
														key={index}
														direction="horizontal"
														modalPosition={index <= 2 ? ['bottom', 'left'] : ['top', 'left']}
													/>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card__footer">
							<div className="row mb-10">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/injection/pages/1">
										DẠNG BẢNG
									</ReportNavigationButton>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<ReportNavigationButton history={history} path="/report/main/injection" />
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
