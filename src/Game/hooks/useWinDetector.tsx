import { useState } from "react";
import { Player } from "./useBoardState";

function useWinDetector(): [Player, (board: Player[][]) => Player, () => void] {
	const [winner, setWinner] = useState<Player>(Player.NONE);

	function checkRows(board: Player[][]): Player {
		for (let row of board) {
			if (row.every((cell) => cell === row[0] && cell !== Player.NONE)) {
				return row[0];
			}
		}
		return Player.NONE;
	}

	function checkColumns(board: Player[][]) {
		for (let col = 0; col < board[0].length; col++) {
			let column = board.map((row) => row[col]);
			if (column.every((cell) => cell === column[0] && cell !== "")) {
				return column[0];
			}
		}
		return Player.NONE;
	}

	function checkDiagonals(board: Player[][]) {
		let diagonal1 = board.map((row, index) => row[index]);
		let diagonal2 = board.map((row, index) => row[row.length - 1 - index]);
		if (diagonal1.every((cell) => cell === diagonal1[0] && cell !== "")) {
			return diagonal1[0];
		}
		if (diagonal2.every((cell) => cell === diagonal2[0] && cell !== "")) {
			return diagonal2[0];
		}
		return Player.NONE;
	}

	function checkForWin(board: Player[][]): Player {
		const rowWinner = checkRows(board);
		if (rowWinner !== Player.NONE) {
			setWinner(rowWinner);
			return rowWinner;
		}

		const columnWinner = checkColumns(board);
		if (columnWinner !== Player.NONE) {
			setWinner(columnWinner);
			return columnWinner;
		}

		const diagonalWinner = checkDiagonals(board);
		if (diagonalWinner !== Player.NONE) {
			setWinner(diagonalWinner);
			return diagonalWinner;
		}

		setWinner(Player.NONE);
		return Player.NONE;
	}

	function clearWinner() {
		setWinner(Player.NONE);
	}

	return [winner, checkForWin, clearWinner];
}

export { useWinDetector };
