import axiosClient from './axiosClient';

const warehouseApi = {
	REQUEST_URL: 'https://cha-warehouse-management.azurewebsites.net',
	getProductById: (id) => {
		return axiosClient.get(`https://cha-warehouse-management.azurewebsites.net/api/items/${id}`);
	},
	getStockCardById: (startTime, endTime, itemId) => {
		return axiosClient.get(`https://cha-warehouse-management.azurewebsites.net/api/stockcardentries`, {
			params: {
				startTime,
				endTime,
				itemId,
			},
		});
	},
	getLocationById: (itemId) => {
		return axiosClient.get(`https://cha-warehouse-management.azurewebsites.net/api/containers`, { params: { itemId } });
	},
	getAllItem: () => {
		return axiosClient.get('https://cha-warehouse-management.azurewebsites.net/api/items');
	},
};

export { warehouseApi };
