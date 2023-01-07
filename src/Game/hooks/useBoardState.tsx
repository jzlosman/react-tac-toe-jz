import { useState } from "react";
import { SquarePosition } from "../Square";
export enum Player {
	NONE = "",
	X = "X",
	O = "O",
}

export const useBoardState = () => {
	const [layout, setLayout] = useState<Player[][]>([[Player.NONE]]);

	const generateLayout = (size: number) => {
		const rowTemplate = Array.from(Array(size), (_) => "");
		const newLayout = Array.from(Array(size), (_) =>
			Array.from(rowTemplate, (_) => Player.NONE)
		);
		setLayout([...newLayout]);
	};

	const markSquareForPlayer = (player: Player, position: SquarePosition) => {
		const newLayout = [...layout];
		newLayout[position.rowIndex][position.colIndex] = player;
		setLayout(newLayout);
	};

	return { setLayout, generateLayout, markSquareForPlayer, layout };
};
