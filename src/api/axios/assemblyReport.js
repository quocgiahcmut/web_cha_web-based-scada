import axios from 'axios';
import { format } from 'date-fns';
const assemblyApi = {
	REQUEST_URL: 'http://10.84.70.81:8087/api',
	getPreShiftByAssemblyUnit(assemblyUnitId) {
		return axios.get(`${this.REQUEST_URL}/shifts/preshifts`, {
			params: {
				assemblyUnitId,
				page: 1,
				itemsPerPage: 1,
				startTime: format(Date.now(), 'yyyy-MM-dd'),
				endTime: format(Date.now(), 'yyyy-MM-dd'),
			},
		});
	},
	getAllPreShifts() {
		return axios.get(`${this.REQUEST_URL}/ShiftReports/preshifts`, {
			params: {
				page: 1,
				itemsPerPage: 6,
				startTime: format(Date.now(), 'yyyy-MM-dd'),
				endTime: format(Date.now(), 'yyyy-MM-dd'),
			},
		});
	},
};

export { assemblyApi };
