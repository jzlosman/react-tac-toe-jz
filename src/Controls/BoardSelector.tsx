import { PropsWithChildren } from "react";
import DarkButton from "./DarkButton";
export interface BoardSelectorProps {
	sizes: number[];
	onSelection: (size: number) => void;
}
export default function BoardSelector({
	sizes,
	onSelection,
}: PropsWithChildren<BoardSelectorProps>) {
	function handleBoardChoice(size: number) {
		onSelection(size);
	}
	return (
		<div className="flex flex-col md:flex-row gap-1.5 items-center justify-items-center">
			<span className="text-sm font-semibold text-slate-800 uppercase">
				New Game:
			</span>
			{sizes.map((size: number) => (
				<DarkButton key={size} onClick={() => handleBoardChoice(size)}>
					{size}x{size}
				</DarkButton>
			))}
		</div>
	);
}
