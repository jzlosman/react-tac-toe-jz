import { useState } from "react";
import type { Board } from "./useBoardState";
import { Player } from "./useBoardState";
export interface WinDetectorResults {
	winner: Winner;
	checkForWinner: (board: Board) => Winner;
	clearWinner: () => void;
	countMoves: (board: Board) => number;
}

export type Winner = Player | null;

function useWinDetector(): WinDetectorResults {
	const [winner, setWinner] = useState<Winner>(null);

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

	function checkForWinner(board: Board): Winner {
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

		if (countMoves(board) === Math.pow(board.length, 2)) {
			// cat's game
			setWinner(Player.NONE);
			return Player.NONE;
		}
		setWinner(null);
		return null;
	}

	function clearWinner() {
		setWinner(null);
	}

	function countMoves(board: Board): number {
		return board.reduce((count, row) => (count += countMovesInRow(row)), 0);
	}

	function countMovesInRow(row: Player[]): number {
		return row.reduce(
			(count, square) => (count += square === Player.NONE ? 0 : 1),
			0
		);
	}

	return { winner, checkForWinner, clearWinner, countMoves };
}

export { useWinDetector };
