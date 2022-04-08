export type boardSchema = {
	board: string[];
	position: number;
	row: number;
	correctWord: string;
	canType: boolean;
};

export type toastSchema = {
	message: string;
	status: boolean;
};

export type reduxStoreSchema = {
	board: boardSchema;
	toast: toastSchema;
};
