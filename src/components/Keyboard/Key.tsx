import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxStoreSchema } from '../../Schema/reduxSchema';
import { increasePos, setBoard } from '../Board/boardSlice';
import './keyboard.css';

type KeyPropsType = {
	letter: string;
};

function Key(props: KeyPropsType) {
	const { letter } = props;

	const board = useSelector((state: reduxStoreSchema) => state.board.board);
	const position = useSelector(
		(state: reduxStoreSchema) => state.board.position
	);
	const row = useSelector((state: reduxStoreSchema) => state.board.row);
	const canType = useSelector((state: reduxStoreSchema) => state.board.canType);

	// Tính row hiện tại, vị trí chia cho 5 rồi làm tròn xuống
	const currentRow = Math.floor(position / 5);

	const dispatch = useDispatch();

	const handleChooseLetter = () => {
		if (canType) {
			if (currentRow > row) return;
			if (position >= 30) return;

			const newBoard = [...board];

			newBoard[position] = letter;
			dispatch(setBoard(newBoard));
			dispatch(increasePos());
		}
	};

	return (
		<div className='letter' onClick={handleChooseLetter} tabIndex={0}>
			{letter}
		</div>
	);
}

export default Key;
