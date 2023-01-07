import { Player } from "./useBoardState";

export const useSaveManagement = () => {
	const onSaveGame = (board: Player[][], currentPlayer: Player) => {
		window.localStorage.setItem("board", JSON.stringify(board));
		window.localStorage.setItem("currentPlayer", currentPlayer);
	};

	const onLoadGame = (): {
		board: Player[][] | null;
		currentPlayer: Player | null;
	} => {
		const board = window.localStorage.getItem("board");
		const currentPlayer: Player =
			(window.localStorage.getItem("currentPlayer") as Player) ??
			Player.NONE;
		return {
			board: board ? JSON.parse(board) : null,
			currentPlayer: currentPlayer,
		};
	};
	return { onSaveGame, onLoadGame };
};
