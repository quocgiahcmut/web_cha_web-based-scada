import React from 'react';
import './injectionMap.css';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as VerticalMachine } from '../../../assets/images/injectionMoldingMachine/vertical_injection_machine.svg';
import { ReactComponent as HorizontalMachine } from '../../../assets/images/injectionMoldingMachine/injectionFullDetail.svg';
import ReportNavigationButton from '../../../components/reportNavigationButton/ReportNavigationButton';
import { INJECTION_MACHINE_LAYOUT } from '../../../utils/utils';
function InjectionMap() {
	const history = useHistory();
	return (
		<>
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
													<React.Fragment key={index}>
														{item.isHaitian ? (
															<Link className="injection-map__map-item-inner" to={item.url}>
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
																	<VerticalMachine height="100px" width="100%" />
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
																	<VerticalMachine height="100px" width="100%" />
																</div>
															</div>
														)}
													</React.Fragment>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-second-row">
										<div className="injection-map__map-item">
											{INJECTION_MACHINE_LAYOUT[1].map((item, index) => {
												return (
													<React.Fragment key={index}>
														{item.isHaitian ? (
															<Link className="injection-map__map-item-inner" to={item.url}>
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
																	<VerticalMachine height="100px" width="100%" />
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
																	<VerticalMachine height="100px" width="100%" />
																</div>
															</div>
														)}
													</React.Fragment>
												);
											})}
										</div>
									</div>
									<div className="injection-map__map-third-row">
										<div className="injection-map__map-first-column">
											{INJECTION_MACHINE_LAYOUT[2][0].map((item, index) => {
												return (
													<React.Fragment key={index}>
														{item.isHaitian ? (
															<Link className="injection-map__map-item-inner--horizontal" to={item.url}>
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
																	<HorizontalMachine height="100%" width="200px" />
																</div>
															</Link>
														) : (
															<div className="injection-map__map-item-inner--horizontal injection-map__map-item-inner--none-haitian">
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
																	<HorizontalMachine height="100%" width="200px" />
																</div>
															</div>
														)}
													</React.Fragment>
												);
											})}
										</div>
										<div className="injection-map__map-second-column">
											{INJECTION_MACHINE_LAYOUT[2][1].map((item, index) => {
												return (
													<React.Fragment key={index}>
														{item.isHaitian ? (
															<Link className="injection-map__map-item-inner--horizontal" to={item.url}>
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
																	<HorizontalMachine height="100%" width="200px" />
																</div>
															</Link>
														) : (
															<div className="injection-map__map-item-inner--horizontal injection-map__map-item-inner--none-haitian">
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
																	<HorizontalMachine height="100%" width="200px" />
																</div>
															</div>
														)}
													</React.Fragment>
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
