import React from 'react';
import './qaqcOverviewReportTable.css';
function QaqcOverviewReportTable({ overviewData }) {
	const { purpose, testNote, productId, productName } = overviewData;
	let purposeVietSub;
	switch (purpose) {
		case 'period':
			purposeVietSub = 'Định kỳ';
			break;
		case 'anomaly':
			purposeVietSub = 'Bất thường';
			break;
		case 'newProduct':
			purposeVietSub = 'SP mới';
			break;
		case 'other':
			purposeVietSub = 'Khác';
			break;
		default:
			break;
	}
	return (
		<>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card__body mb-30">
							<table id="qaqcOverviewReportTable">
								<tbody>
									<tr>
										<td>Mã sản phẩm</td>
										<td>{productId ? productId : ''}</td>
									</tr>
									<tr>
										<td>Tên sản phẩm</td>
										<td>{productName ? productName : ''}</td>
									</tr>
									<tr>
										<td>Mục đích kiểm tra</td>
										<td>{purposeVietSub ? purposeVietSub : ''}</td>
									</tr>
									<tr>
										<td>Ghi chú</td>
										<td>{testNote ? testNote : ''}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default QaqcOverviewReportTable;
