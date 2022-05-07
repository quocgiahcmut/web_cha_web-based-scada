import { createSlice } from '@reduxjs/toolkit';

const planTrackingData = createSlice({
	name: 'planTrackingData',
	initialState: {
		dailyInjectionPlanTrackingData: [],
		dailyPackingPlanTrackingData: [],
		monthlyInjectionPlanTrackingData: [],
		monthlyPackingPlanTrackingData: [],
	},
	reducers: {
		setDailyInjectionPlanTrackingData: (state, action) => {
			// state.dailyInjectionPlanTrackingData.push(action.payload);
			state.dailyInjectionPlanTrackingData = action.payload;
		},
		setDailyPackingPlanTrackingData: (state, action) => {
			// state.dailyPackingPlanTrackingData.push(action.payload);
			state.dailyPackingPlanTrackingData = action.payload;
		},
		setMonthlyInjectionPlanTrackingData: (state, action) => {
			state.monthlyInjectionPlanTrackingData = action.payload;
		},
		setMonthlyPackingPlanTrackingData: (state, action) => {
			state.monthlyPackingPlanTrackingData = action.payload;
		},
	},
});

const { reducer, actions } = planTrackingData;
export default reducer;
export const {
	setDailyPackingPlanTrackingData,
	setDailyInjectionPlanTrackingData,
	setMonthlyInjectionPlanTrackingData,
	setMonthlyPackingPlanTrackingData,
} = actions;
