import React, { PropsWithChildren } from "react";

export interface HistoryProps {
	history: any[];
}
export default function History(props: PropsWithChildren<HistoryProps>) {
	return (
		<div className="w-full md:flex-1 flex flex-col gap-2 mt-0 md:mt-24">
			<div className="h-fit max-h-56 overflow-y-auto border border-gray-300 ring-opacity-5 rounded md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
							>
								Winner
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
							>
								Moves
							</th>
							<th
								scope="col"
								className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
							>
								Date
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{props.history.length === 0 && (
							<tr>
								<td colSpan={3}>
									<span className="italic text-gray-500 py-4 text-sm text-center block">
										No game history yet.
									</span>
								</td>
							</tr>
						)}
						{props.history.map((gameRecord) => {
							return (
								<tr>
									<td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 ">
										{gameRecord.winner}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{gameRecord.moves}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{gameRecord.date}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
