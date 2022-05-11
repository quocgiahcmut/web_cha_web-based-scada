import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
		user: null,
		token: localStorage.getItem('token') || null,
	},
	reducers: {
		setLogin: (state, action) => {
			localStorage.setItem('isLoggedIn', action.payload.isLoggedIn);
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
		},
		setToken: (state, action) => {
			localStorage.setItem('token', action.payload);
			state.token = action.payload;
		},
	},
});
const { reducer, actions } = loginSlice;
export const { setLogin, setToken } = actions;
export default reducer;
