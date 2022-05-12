import { axiosIdentity } from './axiosClient';

export const userApi = {
	getInfoUserByToken: async () => {
		const response = await axiosIdentity.get('/api/users/myinfo');
		return response;
	},
};
