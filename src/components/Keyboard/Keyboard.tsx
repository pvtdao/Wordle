import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxStoreSchema } from '../../Schema/reduxSchema';
import wordList from '../../word.json';
import {
	decreasePos,
	increasePos,
	increaseRow,
	setBoard,
	setCanType,
} from '../Board/boardSlice';
import { setMessage, showToast } from '../Toast/toastSlice';
import Key from './Key';
import './keyboard.css';

function Keyboard() {
	const keyboardRow = [
		'q w e r t y u i o p',
		'a s d f g h j k l',
		'z x c v b n m',
	];

	const [canEnter, setCanEnter] = useState(false);
	const [isWin, setIsWin] = useState(false);

	const board = useSelector((state: reduxStoreSchema) => state.board.board);
	const position = useSelector(
		(state: reduxStoreSchema) => state.board.position
	);
	const row = useSelector((state: reduxStoreSchema) => state.board.row);

	const correctWord = useSelector(
		(state: reduxStoreSchema) => state.board.correctWord
	);
	const canType = useSelector((state: reduxStoreSchema) => state.board.canType);

	const currentWord = `${board[position - 5]}${board[position - 4]}${
		board[position - 3]
	}${board[position - 2]}${board[position - 1]}`.toLowerCase();

	// Tính row hiện tại, vị trí chia cho 5 rồi làm tròn xuống
	const currentRow = useMemo(() => {
		return Math.floor(position / 5);
	}, [position]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (position % 5 === 0 && position !== 0) {
			if (wordList.words.includes(currentWord)) {
				setCanEnter(true);
			}
		}

		return () => {
			setCanEnter(false);
		};
	}, [position]);

	useEffect(() => {
		const handlePressLetter = (event: any) => {
			if (canType) {
				// Nếu nhấn chữ thì mới nhận chữ
				if (event.keyCode > 64 && event.keyCode < 91) {
					if (currentRow > row) return;
					if (position >= 30) return;

					const newBoard = [...board];
					newBoard[position] = event.key;

					dispatch(setBoard(newBoard));
					dispatch(increasePos());
				}
				// Nút xóa
				else if (event.keyCode === 8) {
					handleDeleteLetter();
				}
				// Nút enter
				else if (event.keyCode === 13) {
					handleEnter();
				}
			}
		};

		window.addEventListener('keyup', handlePressLetter);

		return () => {
			window.removeEventListener('keyup', handlePressLetter);
		};
	}, [board, row, canEnter]);

	const handleDeleteLetter = () => {
		// Check cái row hiện tại nếu mà nhỏ hơn cái row lưu trong redux thì không cho xóa nữa
		if (Math.floor((position - 1) / 5) < row) return;

		const newBoard = [...board];

		newBoard[position - 1] = '';
		dispatch(setBoard(newBoard));
		dispatch(decreasePos());
	};

	const getItemsPerRow = () => {
		let start: number = 0;
		let end: number = 0;

		switch (row) {
			case 0:
				start = 0;
				end = 5;
				break;
			case 1:
				start = 5;
				end = 10;
				break;
			case 2:
				start = 10;
				end = 15;
				break;
			case 3:
				start = 15;
				end = 20;
				break;
			case 4:
				start = 20;
				end = 25;
				break;
			case 5:
				start = 25;
				end = 30;
				break;

			default:
				break;
		}

		const boardItems = Array.from(
			document.getElementsByClassName('board__item')
		);

		const itemsPerRow = boardItems.slice(start, end);
		return itemsPerRow;
	};

	const shakePerRow = () => {
		const itemsShake = getItemsPerRow();

		for (const item of itemsShake) {
			if (item.classList.contains('shake')) {
				item.classList.remove('shake');
			}
			item.classList.remove('zoom-out');

			setTimeout(() => {
				item.classList.add('shake');
			}, 100);
		}
	};

	const flipPerWord = () => {
		const itemsFlip = getItemsPerRow();

		let countCorrect = 0;
		for (let i = 0; i < itemsFlip.length; i++) {
			if (correctWord[i] === itemsFlip[i].innerHTML.toUpperCase()) {
				countCorrect++;
			}
			(function (index) {
				setTimeout(function () {
					const value = itemsFlip[i].innerHTML;

					if (correctWord[i] === value.toUpperCase()) {
						itemsFlip[i].classList.add('correct');
					} else if (
						value !== '' &&
						correctWord.includes(value.toUpperCase())
					) {
						itemsFlip[i].classList.add('almost');
					} else if (
						value !== '' &&
						!correctWord.includes(value.toUpperCase())
					) {
						itemsFlip[i].classList.add('wrong');
					}
					itemsFlip[i].classList.add('flip');
				}, 500 * index);
			})(i);
		}

		if (countCorrect === 5) {
			dispatch(setCanType(false));
			dispatch(showToast(true));
			dispatch(setMessage('You win!'));
			setIsWin(true);
		} else {
			if (position === 30) {
				dispatch(showToast(true));
				dispatch(setMessage(correctWord));
			}
		}
	};

	const handleEnter = () => {
		// Check vị trí phải đang ở vị trí cuối cùng của hàng mới nhấn enter được
		if (canEnter) {
			flipPerWord();
			dispatch(increaseRow());
			setCanEnter(false);
		} else {
			shakePerRow();
		}
	};

	return (
		<div className='keyboard'>
			<div className='keyboard__container'>
				{keyboardRow.map((row, idx) => {
					return (
						<div className='key__row' key={idx}>
							{idx === 2 && (
								<div className='letter__row' onClick={handleEnter}>
									<div className='letter'>Enter</div>
								</div>
							)}
							{row.split(' ').map((letter, index) => {
								return (
									<div key={index} className='letter__row'>
										<Key letter={letter.toUpperCase()} />
										{letter === 'm' && (
											<div
												className='letter'
												style={{ marginLeft: '4px' }}
												onClick={handleDeleteLetter}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													height='24'
													viewBox='0 0 24 24'
													width='24'
												>
													<path
														fill='var(--color-tone-1)'
														d='M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z'
													></path>
												</svg>
											</div>
										)}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Keyboard;
