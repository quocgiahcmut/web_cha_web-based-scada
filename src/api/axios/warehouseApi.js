import axiosClient from './axiosClient';

const warehouseApi = {
	REQUEST_URL: 'https://cha-warehouse-management.azurewebsites.net',
	getProductById: (id) => {
		return axiosClient.get(`/api/items/${id}`);
	},
	getStockCardById: (startTime, endTime, itemId) => {
		return axiosClient.get(`/api/stockcardentries`, {
			params: {
				startTime,
				endTime,
				itemId,
			},
		});
	},
	getLocationById: (itemId) => {
		return axiosClient.get(`/api/containers`, { params: { itemId } });
	},
};

export { warehouseApi };
