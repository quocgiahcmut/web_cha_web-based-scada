import React from 'react';
import { useAuth } from 'oidc-react';
import { useHistory } from 'react-router-dom';
import './login.css';
import logo from '../../assets/images/favicon.png';
import bkLogo from '../../assets/images/BK_VIAMLAB.png';
function Login() {
	const { userData, signIn } = useAuth();
	const history = useHistory();
	React.useEffect(() => {
		if (userData) {
			history.push('/layout/dashboard');
		}
	}, [history, userData]);
	const handleLogin = async () => {
		await signIn();
	};
	return (
		<>
			<div className="login-page">
				<div className="login-box">
					<div className="login-header mb-10">
						<h2>HỆ THỐNG THU GIÁM SÁT VÀ THU THẬP DỮ LIỆU</h2>
					</div>
					<div className="login-img mb-40">
						<img height="150px" width="auto" src={logo} alt="logo" />
						<img height="150px" width="auto" src={bkLogo} alt="BK logo" />
					</div>
					<button
						className="login-button"
						onClick={async () => {
							await handleLogin();
						}}
						type="button"
					>
						Đăng nhập
					</button>
					<a href="https://facebook.com" className="login-forgotPassword">
						Quên mật khẩu?
					</a>
					<span className="login-copyrights">© all copyrights reserved</span>
					{/* <span className="login-copyrights">Tri Hoang Minh</span> */}
				</div>
			</div>
		</>
	);
}

export default Login;
