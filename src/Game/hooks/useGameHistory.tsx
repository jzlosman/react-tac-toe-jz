import { useState } from "react";

export interface GameHistory {
	winner: string;
	date: string;
	moves: number;
}

export const useGameHistory = () => {
	const [history, setHistory] = useState<GameHistory[]>([]);

	const onLoadHistory = () => {
		const loadedHistory = window.localStorage.getItem("history");
		if (loadedHistory == null) {
			setHistory([]);
			return;
		}
		setHistory(JSON.parse(loadedHistory));
	};

	const onUpdateHistory = (gameHistory: GameHistory) => {
		const currentHistory = [...history];
		currentHistory.unshift(gameHistory);
		setHistory(currentHistory);
		window.localStorage.setItem("history", JSON.stringify(history));
	};

	const onClearHistory = () => {
		setHistory([]);
		window.localStorage.setItem("history", JSON.stringify([]));
	};

	return { history, onUpdateHistory, onLoadHistory, onClearHistory };
};
