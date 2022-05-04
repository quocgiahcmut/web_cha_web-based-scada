import axiosClient from './axiosClient';
import axios from 'axios';
import { format } from 'date-fns';

const injectionApi = {
	getInjectionReport(dateStart, dateEnd) {
		return axiosClient.get('/injection', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getTemporaryInjectionReport(machineId, dateStart, dateEnd) {
		return axios.get(`http://192.168.1.80:8082/api/shiftreports/machine/a1`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime: dateStart,
				stopTime: dateEnd,
			},
		});
	},
	getTemporaryOeeStatistics(dateStart, dateEnd) {
		//yyyy-MM-dd
		return axios.get(`http://192.168.1.80:8082/api/oeestatistics`, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime: dateStart,
				stopTime: dateEnd ? dateEnd : format(Date.now(), 'yyyy-MM-dd'),
			},
		});
	},
	getTemporaryInjectionPlanTracking(startTime, stopTime) {
		return axios.get('https://my.api.mockaroo.com/plan_tracking_injection.json?key=4ead7de0', {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
			},
			params: {
				startTime,
				stopTime: stopTime ? stopTime : format(Date.now(), 'yyyy-MM-dd'),
			},
		});
	},
};

export { injectionApi };
