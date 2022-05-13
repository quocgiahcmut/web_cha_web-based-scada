import React from 'react';
import Cookies from 'js-cookie';
import { useAuth } from 'oidc-react';
import { userApi } from '../api/axios/userApi';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/slice/LoginSlice';
function TokenHandler({ children }) {
	const dispatch = useDispatch();
	const { userData } = useAuth();
	React.useEffect(() => {
		if (userData) {
			console.log('userData', userData.access_token);
			Cookies.set('token', userData.access_token);
			(function () {
				userApi
					.getInfoUserByToken()
					.then((res) => {
						if (res) {
							dispatch(setUserInfo(res));
						} else {
							dispatch(
								setUserInfo({
									id: '',
									userName: '',
									email: '',
									employeeId: '',
									firstName: 'Không thể lấy dữ liệu',
									lastName: '',
									dateOfBirth: '',
									roles: '',
								})
							);
						}
					})
					.catch((err) => {
						console.error(err);
						dispatch(
							setUserInfo({
								id: '',
								userName: '',
								email: '',
								employeeId: '',
								firstName: 'Không thể lấy dữ liệu',
								lastName: '',
								dateOfBirth: '',
								roles: '',
							})
						);
					});
			})();
		} else {
			Cookies.remove('token');
		}
	}, [userData, dispatch]);
	return <>{children}</>;
}

export default TokenHandler;
