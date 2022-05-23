import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
const axiosClient = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000/',
		'Access-Control-Request-Headers': 'Content-Type',
	},
	withCredentials: false,
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		if (error && error.response && error.response.data) {
			return error.response.data;
		}
		return error;
	}
);

const axiosIdentity = axios.create({
	baseURL: `${process.env.REACT_APP_IDENTITY_SERVER}`,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
		'Cors-Allow-Origin': 'http://localhost:3000/',
	},
});
axiosIdentity.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosIdentity.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		if (error && error.response && error.response.data) {
			return error.response.data;
		}
		return error;
	}
);

export default axiosClient;
export { axiosIdentity };
