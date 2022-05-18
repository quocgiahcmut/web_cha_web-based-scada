import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import './assemblyCluster.css';
// const order = [1, 8, 15, 22, 2, 9, 16, 23, 3, 10, 17, 24, 4, 11, 18, 25, 5, 12, 19, 26, 6, 13, 20, 27, 7, 14, 21, 28];
const order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
function AssemblyCluster({ data, index, isRunning, currentValue }) {
	console.log('data', data);
	const { setpoint, product } = data;
	return (
		<>
			<div className="col-6">
				<div className="card">
					<div className="assemblyCluster__container mb-20">
						<div className="card__body">
							<div className="assemblyCluster__title">
								<span>{`Cụm máy ${order[index]}:`}</span>
							</div>
							<div className="assemblyCluster__header">
								<span>Trạng thái máy</span>
								<div
									className={`assemblyCluster__status ${
										isRunning ? `assemblyCluster__status--active ` : `assemblyCluster__status--stop`
									}`}
								></div>
							</div>
							<div className="row">
								<div className="col-12">
									<table id="packing">
										<tbody>
											<tr>
												<td>Số lượng lắp ráp</td>
												<td>
													<ProgressBar width="150px" height="15px" percent={(currentValue / setpoint) * 100} />
												</td>
												<td>{currentValue} sản phẩm</td>
											</tr>
											<tr>
												<td>Mã chi tiết</td>
												<td></td>
												<td>{product.id}</td>
											</tr>
											<tr>
												<td>Tên chi tiết</td>
												<td></td>
												<td>{product.name}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AssemblyCluster;
