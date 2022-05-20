import { createSlice } from '@reduxjs/toolkit';
import { getInjectionMachineStatus } from '../../utils/utils';
const injectionMonitorSlice = createSlice({
	name: 'injectionMonitorSlice',
	initialState: {
		perInjectionMonitorData: {
			isRunning: false,
			cycleTime: 0,
			openTime: 0,
			counterShot: 0,
			setCycle: 1,
		},
		perInjectionMConfigData: {
			id: '',
			plannedQuantity: 1,
			cycle: 0,
			standardOpenTime: 0,
			product: {
				id: '',
				name: '',
			},
			moldId: '',
			wattage: '',
		},
		runningMachines: [
			{
				id: 'M28',
				isRunning: false,
			},
			{
				id: 'M26',
				isRunning: false,
			},
			{
				id: 'M24',
				isRunning: false,
			},
			{
				id: 'M22',
				isRunning: false,
			},
			{
				id: 'M20',
				isRunning: false,
			},
			{
				id: 'M18',
				isRunning: false,
			},
			{
				id: 'M16',
				isRunning: false,
			},
			{
				id: 'M14',
				isRunning: false,
			},
			{
				id: 'M12',
				isRunning: false,
			},
			{
				id: 'M10',
				isRunning: false,
			},
			{
				id: 'M8',
				isRunning: false,
			},
			{
				id: 'M6',
				isRunning: false,
			},
			{
				id: 'M4',
				isRunning: false,
			},
			{
				id: 'M2',
				isRunning: false,
			},
			{
				id: 'M27',
				isRunning: false,
			},
			{
				id: 'M25',
				isRunning: false,
			},
			{
				id: 'M23',
				isRunning: false,
			},
			{
				id: 'M21',
				isRunning: false,
			},
			{
				id: 'M19',
				isRunning: false,
			},
			{
				id: 'M17',
				isRunning: false,
			},
			{
				id: 'M15',
				isRunning: false,
			},
			{
				id: 'M13',
				isRunning: false,
			},
			{
				id: 'M11',
				isRunning: false,
			},
			{
				id: 'M9',
				isRunning: false,
			},
			{
				id: 'M7',
				isRunning: false,
			},
			{
				id: 'M5',
				isRunning: false,
			},
			{
				id: 'M3',
				isRunning: false,
			},
			{
				id: 'M1',
				isRunning: false,
			},
			{
				id: 'L6',
				isRunning: false,
			},
			{
				id: 'L7',
				isRunning: false,
			},
			{
				id: 'L8',
				isRunning: false,
			},
			{
				id: 'L9',
				isRunning: false,
			},
			{
				id: 'L10',
				isRunning: false,
			},
			{
				id: 'L11',
				isRunning: false,
			},
			{
				id: 'L12',
				isRunning: false,
			},
			{
				id: 'L5',
				isRunning: false,
			},
			{
				id: 'L4',
				isRunning: false,
			},
			{
				id: 'L3',
				isRunning: false,
			},
			{
				id: 'L2',
				isRunning: false,
			},
			{
				id: 'L1',
				isRunning: false,
			},
		],
	},
	reducers: {
		setPerInjectionMonitorData: (state, action) => {
			state.perInjectionMonitorData = action.payload;
		},
		setPerInjectionMConfigData: (state, action) => {
			state.perInjectionMConfigData = action.payload;
		},
		setRunningMachines: (state, action) => {
			state.runningMachines.map((item) => {
				if (item.id === action.payload.deviceQueryResults[0].tagQueryResults[0].tagName.split('.')[0]) {
					item.isRunning = getInjectionMachineStatus(action.payload.deviceQueryResults[0].tagQueryResults[0].value);
				}
				return item;
			});
		},
	},
});

const { actions, reducer } = injectionMonitorSlice;
export const { setPerInjectionMConfigData, setPerInjectionMonitorData, setRunningMachines } = actions;
export default reducer;
