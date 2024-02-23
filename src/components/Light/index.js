import Colors from "@/lib/colors";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLight } from "@/lib/reducers/editor.reducer";

import { twMerge } from "tailwind-merge";

function getRow(number) {
	if (number <= 0 || !Number.isInteger(number)) {
		return;
	}

	let column = "";
	while (number > 0) {
		const rest = (number - 1) % 26;
		column = String.fromCharCode(rest + 65) + column;
		number = Math.floor((number - rest - 1) / 26);
	}

	return column;
}

export default function Light({ current = false, disabled = false, row, column }) {
	const dispatch = useAppDispatch();

	const { selectedColor, lights } = useAppSelector((state) => state.editor);
	const settings = useAppSelector((state) => state.settings);

	const handleClick = (color) => {
		if (disabled) return;
		dispatch(updateLight({ row, column, color, settings }));
	};

	const light = lights?.[row]?.[column];
	const color = light?.color || "none";

	return (
		<button
			className={twMerge(`group flex items-center justify-center h-5 w-8 bg-gray-200/20 outline-none rounded-md my-1 text-xs text-gray-300/50 font-semibold`, color !== "none" && Colors[color]?.editor?.default, current && color !== "none" && Colors[color]?.editor?.current)}
			disabled={disabled}
			onMouseDown={(e) => {
				e.preventDefault();
				if (e.buttons === 1) {
					handleClick(selectedColor);
				} else if (e.buttons === 2) {
					handleClick("none");
				}
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				handleClick("none");
			}}
			onMouseEnter={(e) => {
				e.preventDefault();
				if (e.buttons === 1) {
					handleClick(selectedColor);
				} else if (e.buttons === 2) {
					handleClick("none");
				}
			}}
		>
			{!disabled && (
				<span className={`${row !== 0 && "hidden"} group-hover:block text-[10px]`}>
					<span className="hidden group-hover:inline-block">{getRow(row + 1)}{' '}</span>
					<span className="group-hover:text-[10px] text-xs">{column + 1}</span>
				</span>
			)}
		</button>
	);
}
