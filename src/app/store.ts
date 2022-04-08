import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../components/Board/boardSlice';
import toastReducer from '../components/Toast/toastSlice';

const rootReducer = {
	// Tên hiển thị trong extension redux sẽ là key board và toast
	board: boardReducer,
	toast: toastReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
