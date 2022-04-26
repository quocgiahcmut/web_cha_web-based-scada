import { createSlice } from '@reduxjs/toolkit';

const monitorData = createSlice({
	name: 'deformationMonitorData',
	initialState: {
		deformationMonitorData: {
			numb1: 'running...',
			numb2: 'running...',
			force1: 'running...',
			force2: 'running...',
			time1: 'running...',
			time2: 'running...',
			isRunning: false,
			isAlarm: false,
			mode: null,
			pvForceCylinder1: 'running...',
			pvForceCylinder2: 'running...',
			pvForceCylinder3: 'running...',
			pvTimeHold1: 'running...',
			pvTimeHold2: 'running...',
			pvTimeHold3: 'running...',
			pvNoPress1: 'running...',
			pvNoPress2: 'running...',
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
