import { useDrop } from "react-dnd";

export default function SeparatorDropZone ({ moveSeparator, children }) {
	const [, drop] = useDrop(() => ({
		accept: "SEPARATOR",
		drop(item, monitor) {
			
		},
	}), [moveSeparator]);

	return (
		<div ref={drop}>
			{ children }
		</div>
	)
};
