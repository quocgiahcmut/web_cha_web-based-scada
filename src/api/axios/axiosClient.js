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
		authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2QzJFNzI3OUExN0UwMDc3RTVFOTJFMDAzRDg4NUFCIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2F1dGhlbnRpY2F0aW9uc2VydmVyMjAyMjAxMTEwOTQzNDMuYXp1cmV3ZWJzaXRlcy5uZXQiLCJuYmYiOjE2NTIzMzcyMTQsImlhdCI6MTY1MjMzNzIxNCwiZXhwIjoxNjUyMzY2MDE0LCJhdWQiOiJodHRwczovL2F1dGhlbnRpY2F0aW9uc2VydmVyMjAyMjAxMTEwOTQzNDMuYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIm5hdGl2ZS1jbGllbnQtc2NvcGUiLCJJZGVudGl0eVNlcnZlckFwaSJdLCJhbXIiOlsicHdkIl0sImNsaWVudF9pZCI6InJlYWN0LWNsaWVudCIsInN1YiI6IjQzMmJiMTJiLTk3MWYtNGQ2Zi03N2UzLTA4ZGEyZjQwNmI3NCIsImF1dGhfdGltZSI6MTY1MjMzNjUyMiwiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjdHSkhTRzRZS1lZVjZNSU9IRTVPNktYRUtSTUlKT1dHIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibmhtZHVuZyIsIm5hbWUiOiJuaG1kdW5nIiwic2lkIjoiMEExMERBQkRBQzZBN0M3QTA1QTkzQTMzNzM2NjdBNTgiLCJqdGkiOiIyNjA3M0VGNzQ1NkY0RDY5OUI5MTI5QjdENEM3MDg2RiJ9.O5mMTVLVqI_-Mbh5SilJBZMKV6xMicHtq4RuQ7KF10E9AZd26wPGlWeDvzJg_rsm5B27bL07jBXMPX5-KrvP13ENWZtS6zMlcVAe5GseDTI0KuQAhv_sT9YWxdtZ1Qpxwin2Osy1PWbPmbJZNNuoguOwN9RbA4zCGHDMeinBN6qee2_3WLko-6ulXhxVRl4voswDJP1tE_jPw3rAsV4XyvnLuoX0siUs4ymcdtZ54YtiAxQXGNFk3osBIFlmxLnbJSaVDDpLYOqOlZdguSrtBt-NmwTR3PiQoyuF9j2W9N93NAIHJldBn-NVUXzYSB0f6Xkny3JSLW6X2Rx9D7WaXQ`,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
		'Cors-Allow-Origin': 'http://localhost:3000/',
	},
});
// axiosIdentity.interceptors.request.use((config) => {
// 	const token = Cookies.get('token');
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

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
