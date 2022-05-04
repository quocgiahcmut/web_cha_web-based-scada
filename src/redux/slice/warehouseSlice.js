import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const warehouseSlice = createSlice({
	name: 'warehouse',
	initialState,
	reducers: {
		setData: (state, action) => {
			const index = action.payload.index;
			const lastIndexOfState = state.length - 1;
			if (lastIndexOfState < index) {
				return [...state, action.payload];
			} else {
				const newState = [...state];
				newState[index] = action.payload;
				return newState;
			}
		},
		removeAll: (state, action) => [],
	},
});

export default warehouseSlice.reducer;
export const { setData, removeAll } = warehouseSlice.actions;
