import { format } from 'date-fns';
// import axiosClient from './axiosClient';
import axios from 'axios';

const qaQcApi = {
	REQUEST_URL: 'http://192.168.1.80:8084/api',
	getEnduranceReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/SoftCloseTests`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getForcedEnduranceReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/ForcedCloseTests`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getRockTestReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/RockTests`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getStaticLoadReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/StaticLoadTests`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getCurlingForceReport(startTime, stopTime) {
		return axios.get(`${this.REQUEST_URL}/CurlingForceTests`, {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
	getWaterProofReport(startTime, stopTime) {
		return axios.get('/qaqc/waterproof', {
			params: {
				startTime,
				stopTime: format(new Date(stopTime).setDate(new Date(stopTime).getDate() + 1), 'yyyy-MM-dd'),
			},
		});
	},
};

export { qaQcApi };
