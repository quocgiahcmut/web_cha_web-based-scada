import { createSlice } from '@reduxjs/toolkit';

const oeeReportData = createSlice({
	name: 'oeeReportData',
	initialState: {
		oeeOverall: [0, 0, 0],
		oeeTarget: localStorage.getItem('oeeTarget') || '50',
		pauseTimeProportion: 0,
		lastTimeUpdated: 0,
		discrepancy: 0,
		trend: null,
		detailLabels: [],
		availabilityDetailSeries: [],
		scrapDetailSeries: [],
		totalQuantityDetailSeries: [],
		downTimeData: {
			detail: 'Thời gian nghỉ',
			percent: 0,
			trend: 'up',
		},
		firstTimeGoToPage: true,
		initialOeeDateStart: localStorage.getItem('initialOeeDateStart') || 7,
	},
	reducers: {
		setOeeOverall: (state, action) => {
			let status = [];
			action.payload.forEach((item) => {
				status.push(isNaN(+item) ? 0 : +item);
			});
			state.oeeOverall = status;
		},
		setOeeTarget: (state, action) => {
			localStorage.setItem('oeeTarget', action.payload);
			state.oeeTarget = action.payload;
		},
		setPauseTimeProportion: (state, action) => {
			state.pauseTimeProportion = action.payload;
		},
		setLastTimeUpdated: (state, action) => {
			state.lastTimeUpdated = action.payload;
		},
		setDiscrepancy: (state, action) => {
			state.discrepancy = action.payload;
		},
		setTrend: (state, action) => {
			state.trend = action.payload;
		},
		setDownTimeData: (state, action) => {
			state.downTimeData = {
				...state.downTimeData,
				percent: action.payload,
			};
		},
		setDetailLabels: (state, action) => {
			state.detailLabels = action.payload.reverse();
		},
		pushAvailabilityDetailSeries: (state, action) => {
			state.availabilityDetailSeries.unshift(action.payload);
		},
		resetDetailSeries: (state) => {
			state.availabilityDetailSeries = [];
			state.scrapDetailSeries = [];
			state.totalQuantityDetailSeries = [];
		},
		pushScrapDetailSeries: (state, action) => {
			state.scrapDetailSeries.unshift(action.payload);
		},
		pushTotalQuantityDetailSeries: (state, action) => {
			state.totalQuantityDetailSeries.unshift(action.payload);
		},
		setFirstTimeGoToPage: (state) => {
			state.firstTimeGoToPage = false;
		},
		setInitialOeeDateStart: (state, action) => {
			localStorage.setItem('initialOeeDateStart', action.payload);
			state.initialOeeDateStart = action.payload;
		},
	},
});

const { reducer, actions } = oeeReportData;
export const {
	setInitialOeeDateStart,
	setOeeOverall,
	setFirstTimeGoToPage,
	pushScrapDetailSeries,
	pushAvailabilityDetailLabels,
	pushAvailabilityDetailSeries,
	resetDetailSeries,
	setOeeTarget,
	pushTotalQuantityDetailSeries,
	setPauseTimeProportion,
	setLastTimeUpdated,
	setDetailLabels,
	setDiscrepancy,
	setTrend,
	setDownTimeData,
} = actions;
export default reducer;
