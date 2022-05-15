import { createSlice } from '@reduxjs/toolkit';

const packingReportData = createSlice({
	name: 'packingReportData',
	initialState: {
		packingReportData: [],
	},
	reducers: {
		setPackingReportData: (state, action) => {
			// state.enduranceReportData.push(action.payload);
			state.packingReportData = action.payload;
		},
	},
});

const { reducer, actions } = packingReportData;
export const { setPackingReportData } = actions;
export default reducer;
