import React, { MouseEventHandler, PropsWithChildren } from "react";
import PropTypes from "prop-types";
export interface DarkButtonProps {
	icon?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function DarkButton(props: PropsWithChildren<DarkButtonProps>) {
	return (
		<button
			onClick={(e) => props.onClick(e)}
			className="flex flex-row items-center gap-1.5 rounded-md border border-blue-600 bg-blue-500 text-white font-semibold px-6 py-1.5 shadow-sm hover:bg-blue-400 hover:shadow-md"
		>
			{props.icon && <i className={`fa-solid fa-${props.icon}`}></i>}
			{props.children}
		</button>
	);
}
