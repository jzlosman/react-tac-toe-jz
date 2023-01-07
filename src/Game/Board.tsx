import React, { PropsWithChildren } from "react";
import DarkButton from "../Controls/DarkButton";
import { Player } from "./hooks/useBoardState";
import { Winner } from "./hooks/useWinDetector";
import Square, { SquarePosition } from "./Square";
export interface BoardProps {
	layout: Player[][];
	winner: Winner;
	currentPlayer: Player;
	onPlayerChoice: (position: SquarePosition) => void;
	onPlayAgain: () => void;
	onPlayerChange: (currentPlayer: Player) => void;
}
export default function Board({
	layout,
	winner,
	currentPlayer,
	onPlayerChoice,
	onPlayAgain,
	onPlayerChange,
}: PropsWithChildren<BoardProps>) {
	function handlePlayOnSquare(position: SquarePosition) {
		if (layout[position.rowIndex][position.colIndex] !== "") {
			return;
		}
		if (winner != null) {
			return;
		}
		onPlayerChoice(position);
		togglePlayer();
	}

	function togglePlayer() {
		onPlayerChange(currentPlayer === Player.X ? Player.O : Player.X);
	}

	return (
		<div className={`relative flex flex-col items-center space-y-1`}>
			{layout.map((rowSquare, rowIndex) => (
				<div
					className={`flex flex-row items-center space-x-1`}
					key={`row-${rowIndex}`}
				>
					{rowSquare.map((colSquare, colIndex) => (
						<Square
							key={`${rowIndex}:${colIndex}`}
							owner={colSquare}
							position={{ rowIndex, colIndex }}
							currentPlayer={currentPlayer}
							onSelect={handlePlayOnSquare}
						></Square>
					))}
				</div>
			))}
			{winner != null && winner !== "" && (
				<div className="absolute flex flex-row items-center inset-0 bg-slate-800 bg-opacity-40 !mt-0">
					<div className="flex flex-col items-center w-full gap-2">
						<h2 className="text-center font-bold text-5xl text-white w-full drop-shadow-md">
							{winner} wins!
						</h2>
						<DarkButton
							icon="rotate-right"
							onClick={() => onPlayAgain()}
						>
							Play again
						</DarkButton>
					</div>
				</div>
			)}
			{winner !== null && winner === "" && (
				<div className="absolute flex flex-row items-center inset-0 bg-slate-800 bg-opacity-40 !mt-0">
					<div className="flex flex-col items-center w-full gap-2">
						<h2 className="text-center font-bold text-5xl text-white w-full drop-shadow-md">
							Cat's Game!
						</h2>
						<DarkButton
							icon="rotate-right"
							onClick={() => onPlayAgain()}
						>
							Play again
						</DarkButton>
					</div>
				</div>
			)}
		</div>
	);
}
