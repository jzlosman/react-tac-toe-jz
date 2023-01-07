import React, { PropsWithChildren, useEffect, useState } from "react";
export type SquarePosition = { rowIndex: number; colIndex: number };
export interface SquareProps {
	owner: string;
	onSelect: (position: SquarePosition) => void;
	position: SquarePosition;
	currentPlayer: string;
}
export default function Square(props: PropsWithChildren<SquareProps>) {
	const [color, setColor] = useState("");
	useEffect(() => {
		setColor(props.owner === "X" ? "text-red-700" : "text-blue-700");
	}, [props.owner]);
	return (
		<button
			className={`bg-slate-100 border border-slate-300 hover:border-blue-400 hover:bg-blue-100 aspect-square text-4xl font-semibold h-20 w-20 md:h-32 md:w-32 ${color}`}
			onClick={() => props.onSelect(props.position)}
		>
			{props.owner}
			{props.owner === "" && (
				<div className="flex items-center text-center w-full h-full opacity-0 hover:opacity-80 transition-opacity duration-200 text-slate-600 text-4xl font-semibold">
					<span className="text-center w-full">
						{props.currentPlayer}
					</span>
				</div>
			)}
		</button>
	);
}
