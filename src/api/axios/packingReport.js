import axiosClient from './axiosClient';
import axios from 'axios';
import { format } from 'date-fns';
const packingApi = {
	getMonthlyPackingReport(startTime, stopTime) {
		return axiosClient.get('/packing', {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getTemporaryPackingPlanTracking(startTime, stopTime) {
		return axios.get('https://my.api.mockaroo.com/plan_tracking_packing.json?key=4ead7de0', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime,
				stopTime: stopTime
					? format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd')
					: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
			},
		});
	},
	getAllEmployees() {
		return axiosClient.get('/api/employees/');
	},
};

export { packingApi };
