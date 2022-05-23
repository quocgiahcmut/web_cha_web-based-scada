import { createSlice } from '@reduxjs/toolkit';

const monitorData = createSlice({
	name: 'deformationMonitorData',
	initialState: {
		deformationMonitorData: {
			numb1: 10000,
			numb2: 5000,
			force1: 1200,
			force2: 1000,
			time1: 2000,
			time2: 5000,
			isRunning: true,
			isAlarm: false,
			mode: true,
			pvForceCylinder1: 1000,
			pvForceCylinder2: 1000,
			pvForceCylinder3: 1000,
			pvTimeHold1: 1423,
			pvTimeHold2: 1423,
			pvTimeHold3: 1423,
			pvNoPress1: 1232,
			pvNoPress2: 898,
		},
	},
	reducers: {
		setDeformationMonitorData: (state, action) => {
			state.deformationMonitorData = {
				...state.deformationMonitorData,
				...action.payload,
			};
		},
	},
});

const { reducer, actions } = monitorData;
export const { setDeformationMonitorData } = actions;
export default reducer;
