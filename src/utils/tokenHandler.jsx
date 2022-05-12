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
			Cookies.set('token', userData.access_token);
			(function () {
				userApi
					.getInfoUserByToken()
					.then((res) => {
						dispatch(setUserInfo(res));
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
