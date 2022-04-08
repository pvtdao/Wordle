import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Toast from './components/Toast/Toast';
import { reduxStoreSchema } from './Schema/reduxSchema';

function App() {
	const board = useSelector((state: reduxStoreSchema) => state.board.board);
	return (
		<div className='App'>
			<Toast />
			<Header />
			<Board board={board} />
		</div>
	);
}

export default App;
