export const usePersistData = () => {
	const onSaveGame = (board: string[][], currentPlayer: string) => {
		window.localStorage.setItem("board", JSON.stringify(board));
		window.localStorage.setItem("currentPlayer", currentPlayer);
	};

	const onLoadGame = (): {
		board: string[][] | null;
		currentPlayer: string | null;
	} => {
		const board = window.localStorage.getItem("board");
		return {
			board: board ? JSON.parse(board) : null,
			currentPlayer: window.localStorage.getItem("currentPlayer"),
		};
	};
	return { onSaveGame, onLoadGame };
};
