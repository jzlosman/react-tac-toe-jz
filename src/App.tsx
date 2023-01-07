import { SquarePosition } from "./Game/Square";
import { useState } from "react";
import { useWinDetector } from "./Game/hooks/useWinDetector";
import LightButton from "./Controls/LightButton";
import BoardSelector from "./Controls/BoardSelector";
import Board from "./Game/Board";
import { Player, useBoardState } from "./Game/hooks/useBoardState";
import { useSaveManagement } from "./Game/hooks/useSaveManagement";
import History from "./Game/History";
import { useGameHistory } from "./Game/hooks/useGameHistory";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { useCallback } from "react";
function App() {
	const [winner, checkForWin, clearWinner] = useWinDetector();

	const { onSaveGame, onLoadGame } = useSaveManagement();

	const { layout, markSquareForPlayer, generateLayout, setLayout } =
		useBoardState();

	const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);

	const { history, onClearHistory, onUpdateHistory, onLoadHistory } =
		useGameHistory();

	useEffect(() => {
		onLoadHistory();
		generateLayout(3);
	}, []);

	function handlePlayerChoice(position: SquarePosition) {
		markSquareForPlayer(currentPlayer, position);
		const winningPlayer = checkForWin(layout);
		if (winningPlayer !== "") {
			handleWinner(winningPlayer);
		}
	}

	function handleWinner(winningPlayer: Player) {
		onUpdateHistory({
			winner: winningPlayer,
			date: DateTime.now().toISO(),
			moves: 10,
		});
	}

	function handlePlayerChange(player: Player) {
		setCurrentPlayer(player);
	}

	function handlePlayAgain() {
		generateLayout(layout.length);
		clearWinner();
	}

	function handleSave(_event: any) {
		onSaveGame(layout, currentPlayer);
	}

	async function handleLoad(_event: any) {
		const loadedLayout = onLoadGame();
		if (loadedLayout.board && loadedLayout.currentPlayer) {
			setLayout(loadedLayout.board);
			setCurrentPlayer(loadedLayout.currentPlayer);
			await checkForWin(loadedLayout.board);
		}
	}

	return (
		<main className={`absolute inset-0 overflow-auto bg-slate-50 p-8`}>
			<div
				className={`mx-auto flex flex-col md:flex-row gap-4 items-start w-full md:w-1/2`}
			>
				<div className="flex flex-col w-fit gap-2">
					<h1 className={`text-center text-3xl font-semibold`}>
						<span className={`text-red-700`}>Tic</span>-Tac-
						<span className={`text-blue-700`}>Toe</span>
					</h1>
					<BoardSelector
						sizes={[3, 6, 9]}
						onSelection={(size: number) => generateLayout(size)}
					></BoardSelector>

					<Board
						currentPlayer={currentPlayer}
						winner={winner}
						layout={layout}
						onPlayerChange={handlePlayerChange}
						onPlayerChoice={handlePlayerChoice}
						onPlayAgain={handlePlayAgain}
					></Board>
					<div
						className={`flex flex-col md:flex-row gap-1.5 justify-between w-full`}
					>
						<LightButton icon="download" onClick={handleSave}>
							Save
						</LightButton>
						<LightButton icon="upload" onClick={handleLoad}>
							Load
						</LightButton>
					</div>
				</div>
				<History history={history}></History>
			</div>
		</main>
	);
}
export default App;
