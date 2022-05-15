import React from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedBreadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import PackingMachine from '../../../components/packingMachine/PackingMachine';

function PackingPage() {
	const mockingData = [
		{
			id: 'module1',
			name: 'cụm máy 1',
			progress: 69,
			progressSetPoint: 512,
			workingHours: 7212,
			errorProducts: 5,
			fixedProducts: 5,
			productId: '3AJ2190DSA',
			isRunning: true,
		},
		{
			id: 'module2',
			name: 'cụm máy 2',
			progress: 400,
			progressSetPoint: 512,
			workingHours: 7712,
			errorProducts: 5,
			fixedProducts: 1,
			isRunning: false,
			productId: '3AJ2190DSA',
		},
		{
			id: 'module3',
			name: 'cụm máy 3',
			progress: 69,
			progressSetPoint: 512,
			workingHours: 7212,
			errorProducts: 5,
			fixedProducts: 5,
			isRunning: true,
			productId: '3AJ2190DSA',
		},
		{
			id: 'module4',
			name: 'cụm máy 4',
			progress: 400,
			progressSetPoint: 512,
			workingHours: 5112,
			errorProducts: 5,
			fixedProducts: 1,
			isRunning: false,
			productId: '3AJ2190DSA',
		},
		{
			id: 'module5',
			name: 'cụm máy 5',
			progress: 69,
			progressSetPoint: 512,
			workingHours: 7212,
			errorProducts: 5,
			fixedProducts: 5,
			isRunning: true,
			productId: '3AJ2190DSA',
		},
		{
			id: 'module6',
			name: 'cụm máy 6',
			progress: 69,
			progressSetPoint: 512,
			workingHours: 7212,
			errorProducts: 5,
			fixedProducts: 5,
			productId: '3AJ2190DSA',
			isRunning: true,
		},
	];
	const history = useHistory();

	const handleShowDetail = (item) => history.push(`/layout/packing/${item}`);
	return (
		<>
			<CustomizedBreadcrumbs id="KHU KIỂM TRA ĐÓNG GÓI" />
			<div className="row">
				{mockingData.map((item, index) => (
					<div key={index} className="col-4 col-md-6 col-sm-12">
						<div onClick={() => handleShowDetail(item.id)} className="dashboard card">
							<div className="card__header">
								<h3>{item.name}</h3>
							</div>
							<div className="card__body">
								<PackingMachine
									productId={item.productId}
									isRunning={item.isRunning}
									progress={item.progress}
									progressSetPoint={item.progressSetPoint}
									workingHours={item.workingHours}
									errorProducts={item.errorProducts}
									fixedProducts={item.fixedProducts}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default PackingPage;
