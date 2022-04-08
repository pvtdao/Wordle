import React from 'react';
import Keyboard from '../Keyboard/Keyboard';
import './board.css';
import BoardItem from './BoardItem';

type BoardPropsType = {
	board: string[];
};

function Board(props: BoardPropsType) {
	const { board } = props;
	return (
		<>
			<div className='board-container'>
				<div className='board'>
					{board.map((square, index) => {
						return <BoardItem key={index} value={square} index={index} />;
					})}
				</div>
			</div>

			<Keyboard />
		</>
	);
}

export default Board;
