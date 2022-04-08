import { createSlice } from '@reduxjs/toolkit';
import wordList from '../../word.json';
const randomNumber = Math.floor(Math.random() * wordList.words.length);

const initialState = {
	board: [
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	],
	position: 0,
	row: 0,
	correctWord: wordList.words[randomNumber].toUpperCase(),
	canType: true,
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard(state, action) {
			state.board = action.payload;
			return state;
		},
		increasePos(state) {
			state.position++;
		},
		decreasePos(state) {
			state.position--;
		},
		increaseRow(state) {
			state.row++;
		},
		setCanType(state, action) {
			state.canType = action.payload;
			return state;
		},
	},
});

const { actions, reducer } = boardSlice;
export const { setBoard, increasePos, decreasePos, increaseRow, setCanType } =
	actions;
export default reducer;
