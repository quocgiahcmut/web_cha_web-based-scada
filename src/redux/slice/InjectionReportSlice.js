import { createSlice } from '@reduxjs/toolkit';

const reportData = createSlice({
	name: 'injectionReportData',
	initialState: {
		injectionReportData: [],
	},
	reducers: {
		setInjectionReportData: (state, action) => {
			state.injectionReportData.push(action.payload);
		},
		resetInjectionReportData: (state) => {
			state.injectionReportData = [];
		},
	},
});

const { reducer, actions } = reportData;
export const { setInjectionReportData, resetInjectionReportData } = actions;
export default reducer;
