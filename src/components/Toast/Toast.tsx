import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxStoreSchema } from '../../Schema/reduxSchema';
import './toast.css';
import { showToast } from './toastSlice';

function Toast() {
	const toastMessage = useSelector(
		(state: reduxStoreSchema) => state.toast.message
	);
	const toastStatus = useSelector(
		(state: reduxStoreSchema) => state.toast.status
	);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(showToast(false));
		}, 10000);
	}, [toastStatus]);

	return (
		<div className={`snackbar ${toastStatus && 'show'}`}>{toastMessage}</div>
	);
}

export default Toast;
