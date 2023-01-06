import { useState } from "react";

function useWinDetector(): [string, (board: string[][]) => boolean] {
	const [winner, setWinner] = useState<string>("");

	function checkRows(board: string[][]) {
		for (let row of board) {
			if (row.every((cell) => cell === row[0] && cell !== "")) {
				setWinner(row[0]);
				return true;
			}
		}
		return false;
	}

	function checkColumns(board: string[][]) {
		for (let col = 0; col < board[0].length; col++) {
			let column = board.map((row) => row[col]);
			if (column.every((cell) => cell === column[0] && cell !== "")) {
				setWinner(column[0]);
				return true;
			}
		}
		return false;
	}

	function checkDiagonals(board: string[][]) {
		let diagonal1 = board.map((row, index) => row[index]);
		let diagonal2 = board.map((row, index) => row[row.length - 1 - index]);
		if (diagonal1.every((cell) => cell === diagonal1[0] && cell !== "")) {
			setWinner(diagonal1[0]);
			return true;
		}
		if (diagonal2.every((cell) => cell === diagonal2[0] && cell !== "")) {
			setWinner(diagonal2[0]);
			return true;
		}
		return false;
	}

	function checkForWin(board: string[][]) {
		if (checkRows(board)) {
			return true;
		}
		if (checkColumns(board)) {
			return true;
		}
		if (checkDiagonals(board)) {
			return true;
		}
		setWinner("");
		return false;
	}

	return [winner, checkForWin];
}

export { useWinDetector };
