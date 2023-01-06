import Square, { SquarePosition } from "./Game/Square";
import { useState } from "react";
import { useWinDetector } from "./Game/hooks/useWinDetector";
import { usePersistData } from "./Game/hooks/usePersistData";

function App() {
	const [layout, setLayout] = useState([
		["", "", ""],
		["", "", ""],
		["", "", ""],
	]);

	const [currentPlayer, setCurrentPlayer] = useState("X");

	const [winner, checkForWin] = useWinDetector();

	const { onSaveGame, onLoadGame } = usePersistData();

	function generateLayout(size: number) {
		const rowTemplate = Array.from(Array(size), (_) => "");
		const newLayout = Array.from(Array(size), (_) =>
			Array.from(rowTemplate, (_) => "")
		);
		setLayout([...newLayout]);
		checkForWin([...newLayout]);
	}

	function togglePlayer() {
		setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
	}

	function handlePlayOnSquare(position: SquarePosition) {
		if (layout[position.rowIndex][position.colIndex] !== "") {
			return;
		}
		if (winner !== "") {
			return;
		}

		const newLayout = [...layout];
		newLayout[position.rowIndex][position.colIndex] = currentPlayer;
		setLayout(newLayout);
		checkForWin(newLayout);
		togglePlayer();
	}

	function handleSave(_event: any) {
		onSaveGame(layout, currentPlayer);
	}

	function handleLoad(_event: any) {
		const loadedLayout = onLoadGame();
		if (loadedLayout.board && loadedLayout.currentPlayer) {
			setLayout(loadedLayout.board);
			setCurrentPlayer(loadedLayout.currentPlayer);
			checkForWin(loadedLayout.board);
		}
	}
	return (
		<main className={`absolute inset-0 overflow-auto bg-slate-50`}>
			<div className={`mx-auto flex flex-col gap-4 items-center w-fit`}>
				<h1 className={`text-center text-3xl font-semibold`}>
					<span className={`text-red-700`}>Tic</span>-Tac-
					<span className={`text-blue-700`}>Toe</span>
				</h1>
				<div className="flex flex-col md:flex-row gap-1.5 items-center justify-items-center">
					<span className="text-sm font-semibold text-slate-800 uppercase">
						New Game:
					</span>
					<button
						className="rounded-md bg-blue-500 text-white font-semibold px-6 py-1.5"
						onClick={() => generateLayout(3)}
					>
						3x3
					</button>
					<button
						className="rounded-md bg-blue-500 text-white font-semibold px-6 py-1.5"
						onClick={() => generateLayout(6)}
					>
						6x6
					</button>
					<button
						className="rounded-md bg-blue-500 text-white font-semibold px-6 py-1.5"
						onClick={() => generateLayout(9)}
					>
						9x9
					</button>
				</div>
				<div
					className={`relative flex flex-col items-center space-y-1`}
				>
					{layout.map((rowSquare, rowIndex) => (
						<div className={`flex flex-row items-center space-x-1`}>
							{rowSquare.map((colSquare, colIndex) => (
								<Square
									key={`${rowIndex}:${colIndex}`}
									owner={colSquare}
									position={{ rowIndex, colIndex }}
									onSelect={handlePlayOnSquare}
								></Square>
							))}
						</div>
					))}
					{winner !== "" && (
						<div className="absolute flex flex-row items-center inset-0 bg-slate-500 bg-opacity-40 !mt-0">
							<h2 className="text-center font-bold text-3xl text-white w-full">
								{winner} wins!
							</h2>
						</div>
					)}
				</div>

				<div
					className={`flex flex-col md:flex-row gap-1.5 justify-between w-full`}
				>
					<button
						className="rounded-md bg-white text-slate-800 border-slate-300 border hover:bg-slate-200 font-semibold px-6 py-1.5"
						onClick={handleSave}
					>
						Save
					</button>
					<button
						className="rounded-md bg-white border-slate-300 border hover:bg-slate-200 text-slate-800 font-semibold px-6 py-1.5"
						onClick={handleLoad}
					>
						Load Last Save
					</button>
				</div>
			</div>
		</main>
	);
}
export default App;
