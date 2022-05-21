import axios from 'axios';
import { format } from 'date-fns';
const packingApi = {
	REQUEST_URL: 'http://10.84.70.81:8083/api',
	getMonthlyPackingReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/shifts`, {
			params: {
				startTime,
				endTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
				page: 1,
				itemsPerPage: 100,
			},
		});
	},
	getPackingPlanTracking(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/shifts`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime,
				endTime: stopTime
					? format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd')
					: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
				page: 1,
				itemsPerPage: 100,
			},
		});
	},
	getAllEmployees() {
		return axios.get(`${this.REQUEST_URL}/employees`);
	},
	getPreShiftByPackingUnit(packingUnitId) {
		return axios.get(`${this.REQUEST_URL}/shifts/preshifts`, {
			params: {
				packingUnitId,
				page: 1,
				itemsPerPage: 1,
			},
		});
	},
	getAllPreShifts() {
		return axios.get(`${this.REQUEST_URL}/shifts/preshifts`, {
			params: {
				page: 1,
				itemsPerPage: 6,
			},
		});
	},
};

export { packingApi };
