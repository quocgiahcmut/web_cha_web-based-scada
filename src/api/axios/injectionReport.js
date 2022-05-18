import axiosClient from './axiosClient';
import axios from 'axios';
import { format } from 'date-fns';

const injectionApi = {
	REQUEST_URL: 'http://192.168.1.80:8082/api',
	getInjectionReport(dateStart, dateEnd) {
		return axiosClient.get('/injection', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getTemporaryInjectionReport(machineId, startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/shiftreports/machine/a1`, {
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
	getTemporaryOeeStatistics(startTime, stopTime) {
		//yyyy-MM-dd

		return axios.get(`${this.REQUEST_URL}/oeestatistics`, {
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
	getTemporaryInjectionPlanTracking(startTime, stopTime) {
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
	getTemporaryAllPreShifts() {
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
	getTemporaryPreShiftsByMachine(machineId) {
		return axios.get(`${this.REQUEST_URL}/ShiftReports/preshifts/a1`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				// startTime: format(Date.now(), 'yyyy-MM-dd'),
				// stopTime: format(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
				// machineId,
			},
		});
	},
	getMockarooInjectionReport() {
		return axios.get('https://my.api.mockaroo.com/injection_molding_machine_report.json?key=4ead7de0');
	},
};

export { injectionApi };
