import axios from 'axios';
import { format } from 'date-fns';
const packingApi = {
	REQUEST_URL: 'http://10.84.70.81:8083/api',
	getMonthlyPackingReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/packing`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getPackingPlanTracking(startTime, stopTime) {
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
		return axios.get(`${this.REQUEST_URL}employees/`);
	},
};

export { packingApi };
