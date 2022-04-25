import axiosClient from './axiosClient';

const packingApi = {
	getMonthlyPackingReport(dateStart, dateEnd) {
		return axiosClient.get('/packing', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
};

export { packingApi };
