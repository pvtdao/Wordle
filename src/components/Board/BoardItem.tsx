import React, { useRef } from 'react';
import './board.css';

type BoardItemPropsType = {
	value: string;
	index: number;
};

function BoardItem(props: BoardItemPropsType) {
	const { value } = props;
	const boardItemRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={boardItemRef}
			className={`board__item ${value !== '' && 'active zoom-out'} `}
		>
			{value}
		</div>
	);
}

export default React.memo(BoardItem);
