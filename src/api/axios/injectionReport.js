import axios from 'axios';
import { format } from 'date-fns';

const injectionApi = {
	REQUEST_URL: 'http://10.84.70.81:8082/api',
	getInjectionReport(machineId, startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/shiftreports/machine/${machineId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime: startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getOeeStatistics(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/OeeStatistics`, {
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
	getInjectionPlanTracking(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/shiftreports`, {
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
	getAllPreShifts() {
		return axios.get(`${this.REQUEST_URL}/ShiftReports/preshifts`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				// startTime: format(Date.now(), 'yyyy-MM-dd'),
				// stopTime: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
			},
		});
	},
	getPreShiftsByMachine(machineId) {
		return axios.get(`${this.REQUEST_URL}/ShiftReports/preshifts/machine/${machineId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				// startTime: format(Date.now(), 'yyyy-MM-dd'),
				// stopTime: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
			},
		});
	},
};

export { injectionApi };
