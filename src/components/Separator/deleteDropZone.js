import { useDrop } from "react-dnd";

export default function SeparatorDropZone({ removeSeparator }) {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "SEPARATOR",
		drop(item) {
			removeSeparator(item.id);
			return undefined;
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActive = canDrop && isOver;
	let backgroundColor = "#222";
	if (isActive) {
		backgroundColor = "darkgreen";
	} else if (canDrop) {
		backgroundColor = "darkkhaki";
	}

	return (
		<div ref={drop} className={`${canDrop ? "flex" : "hidden"} absolute left-0 top-1/2 -translate-y-1/2 bg-red-500/10 h-1/2 w-8 [writing-mode:vertical-lr] text-center text-red-500 justify-center items-center leading-none rounded-r-lg`}>
			<span className="rotate-180 text-sm uppercase tracking-widest">Delete separator</span>
		</div>
	);
}
