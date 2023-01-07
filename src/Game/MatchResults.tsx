import { PropsWithChildren } from "react";
import { Player } from "./hooks/useBoardState";
import type { GameHistory } from "./hooks/useGameHistory";
export interface MatchResultsProps {
	history: GameHistory[];
}
export default function MatchResults(
	props: PropsWithChildren<MatchResultsProps>
) {
	return (
		<div className="w-full">
			<h2 className="font-semibold text-slate-700 text-center">
				Match Results
			</h2>
			<div className="flex flex-row items-center justify-around w-full">
				<div className="flex flex-col gap-2 items-center">
					<span className="text-6xl font-semibold text-red-700">
						{Player.X}
					</span>
					<span>
						<span className="font-semibold">
							{props.history.reduce(
								(total, gameHistory) =>
									(total +=
										gameHistory.winner === Player.X
											? 1
											: 0),
								0
							)}
						</span>{" "}
						wins
					</span>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<span className="text-6xl font-semibold text-blue-700">
						{Player.O}
					</span>
					<span>
						<span className="font-semibold">
							{props.history.reduce(
								(total, gameHistory) =>
									(total +=
										gameHistory.winner === Player.O
											? 1
											: 0),
								0
							)}
						</span>{" "}
						wins
					</span>
				</div>
			</div>
		</div>
	);
}
