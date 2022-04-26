import { createSlice } from '@reduxjs/toolkit';

const reportData = createSlice({
	name: 'enduranceReportData',
	initialState: {
		enduranceReportData: [],
		enduranceReportDataDate: {},
		forcedEnduranceReportData: [],
		forcedEnduranceReportDataDate: {},
		deformationReportData: [],
		deformationReportDataDate: {},
		waterProofReportData: [],
		waterProofReportDataDate: {},
	},
	reducers: {
		setEnduranceReportData: (state, action) => {
			state.enduranceReportData.push(action.payload);
		},
		setEnduranceReportDataDate: (state, action) => {
			state.enduranceReportDataDate = action.payload;
		},
		resetEnduranceReportData: (state) => {
			state.enduranceReportData = [];
			state.enduranceReportDataDate = {};
		},
		setForcedEnduranceReportData: (state, action) => {
			state.forcedEnduranceReportData.push(action.payload);
		},
		setForcedEnduranceReportDataDate: (state, action) => {
			state.forcedEnduranceReportDataDate = action.payload;
		},
		resetForcedEnduranceReportData: (state) => {
			state.forcedEnduranceReportData = [];
			state.forcedEnduranceReportDataDate = {};
		},
		setDeformationReportData: (state, action) => {
			state.deformationReportData.push(action.payload);
		},
		setDeformationReportDataDate: (state, action) => {
			state.deformationReportDataDate = action.payload;
		},
		resetDeformationReportData: (state) => {
			state.deformationReportData = [];
			state.deformationReportDataDate = {};
		},
		setWaterProofReportData: (state, action) => {
			state.waterProofReportData.push(action.payload);
		},
		setWaterProofReportDataDate: (state, action) => {
			state.waterProofReportDataDate = action.payload;
		},
		resetWaterProofReportData: (state) => {
			state.waterProofReportData = [];
			state.waterProofReportDataDate = {};
		},
	},
});

const { reducer, actions } = reportData;
export const {
	setEnduranceReportData,
	setForcedEnduranceReportData,
	setEnduranceReportDataDate,
	setForcedEnduranceReportDataDate,
	setDeformationReportData,
	setDeformationReportDataDate,
	resetDeformationReportData,
	resetEnduranceReportData,
	resetForcedEnduranceReportData,
	resetWaterProofReportData,
	setWaterProofReportData,
	setWaterProofReportDataDate,
} = actions;
export default reducer;
