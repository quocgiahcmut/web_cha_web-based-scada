import axiosClient from './axiosClient';
import { format } from 'date-fns';

const warehouseApi = {
	REQUEST_URL: 'https://cha-warehouse-management.azurewebsites.net',
	getProductById: (id) => {
		return axiosClient.get(`/api/items/${id}`);
	},
	getStockCardById: (itemId, startTime, endTime) => {
		return axiosClient.get(`/api/stockcardentries`, {
			params: {
				itemId,
				startTime: startTime ? startTime : format(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
				endTime: endTime
					? format(new Date(endTime).setDate(new Date(endTime).getDate() + 1), 'yyyy-MM-dd')
					: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
			},
		});
	},
	getLocationById: (itemId) => {
		return axiosClient.get(`/api/containers`, { params: { itemId } });
	},
	getAllItem: () => {
		return axiosClient.get('/api/items');
	},
};

export { warehouseApi };
