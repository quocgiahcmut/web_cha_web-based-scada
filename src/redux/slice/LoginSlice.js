import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
		user: JSON.parse(localStorage.getItem('user')) || {
			id: '',
			userName: '',
			email: '',
			employeeId: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			roles: '',
		},
		token: localStorage.getItem('token') || null,
	},
	reducers: {
		setLogin: (state, action) => {
			localStorage.setItem('isLoggedIn', action.payload.isLoggedIn);
			state.isLoggedIn = action.payload.isLoggedIn;
		},
		setToken: (state, action) => {
			localStorage.setItem('token', action.payload);
			state.token = action.payload;
		},
		setUserInfo: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload));
			state.user = action.payload;
		},
	},
});
const { reducer, actions } = loginSlice;
export const { setLogin, setToken, setUserInfo } = actions;
export default reducer;
