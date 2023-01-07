import React, { PropsWithChildren } from "react";
import { DateTime } from "luxon";
export interface HistoryProps {
	history: any[];
	onClearHistory: () => void;
}
export default function History(props: PropsWithChildren<HistoryProps>) {
	return (
		<div className="w-full flex flex-col gap-2 pt-6">
			<h2 className="font-semibold text-slate-700 text-center">
				Match History
			</h2>
			<div className="h-fit max-h-56 overflow-y-auto border border-slate-300 ring-opacity-5 rounded md:rounded-lg">
				<table className="min-w-full divide-y divide-slate-300">
					<thead className="bg-slate-50">
						<tr>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
							>
								Winner
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
							>
								Moves
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
							>
								Date
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200 bg-white">
						{props.history.length === 0 && (
							<tr>
								<td colSpan={3}>
									<span className="italic text-slate-500 py-4 text-sm text-center block">
										No game history yet.
									</span>
								</td>
							</tr>
						)}
						{props.history.map((gameRecord) => {
							return (
								<tr key={gameRecord.date}>
									<td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">
										{gameRecord.winner}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
										{gameRecord.moves}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
										{DateTime.fromISO(
											gameRecord.date
										).toLocaleString(DateTime.DATETIME_MED)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{props.history.length > 0 && (
				<button
					className="underline text-slate-500 text-sm uppercase"
					onClick={() => props.onClearHistory()}
				>
					Start a new match
				</button>
			)}
		</div>
	);
}
