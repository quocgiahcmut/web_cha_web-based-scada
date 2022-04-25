import axiosClient from './axiosClient';

const qaQcApi = {
	getEnduranceReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/reliability', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getForcedEnduranceReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/deformation', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getRockTestReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/rocktest', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getStaticLoadReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/staticload', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getCurlingForceReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/curlingforce', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
	getWaterProofReport(dateStart, dateEnd) {
		return axiosClient.get('/qaqc/waterproof', {
			params: {
				dateStart,
				dateEnd,
			},
		});
	},
};

export { qaQcApi };
