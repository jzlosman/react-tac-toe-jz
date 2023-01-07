import React, { MouseEventHandler, PropsWithChildren } from "react";
import PropTypes from "prop-types";
export interface LightButtonProps {
	icon?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function LightButton(
	props: PropsWithChildren<LightButtonProps>
) {
	return (
		<button
			onClick={(e) => props.onClick(e)}
			className="flex flex-row items-center gap-1.5 rounded-md border border-slate-300 bg-slate-200 text-slate-800 font-semibold px-6 py-1.5 shadow-sm
		hover:bg-slate-100 hover:shadow-md"
		>
			{props.icon && <i className={`fa-solid fa-${props.icon}`}></i>}
			{props.children}
		</button>
	);
}
