import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: '',
	status: false,
};

const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		setMessage(state, action) {
			state.message = action.payload;
			return state;
		},
		showToast(state, action) {
			state.status = action.payload;
			return state;
		},
	},
});

const { actions, reducer } = toastSlice;
export const { setMessage, showToast } = actions;
export default reducer;
