import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SeparatorDropZone from "./dropZone";
import Separator from "./separator";

export default function SeparatorsContainer() {
	const [separators, setSeparators] = useState([]);

	const removeSeparator = useCallback((id) => {
		setSeparators(separators => separators.filter((separator) => separator.id !== id));
	}, []);

	const moveSeparator = useCallback((id, x) => {
		const separator = separators.find((separator) => separator.id === id);
		separator.x = x;
		separator.id = uuidv4();

		setSeparators(separators => [
			...separators.filter((separator) => separator.id !== id),
			separator,
		]);
	}, [separators]);

	useEffect(() => {
		const handleKeydown = (e) => {
			if (e.key === "q") {
				e.preventDefault();
				setSeparators(separators => [...separators, { id: uuidv4(), x: window.innerWidth / 2 }]);
			}
		}
		window.addEventListener("keydown", handleKeydown);
		
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		}
	}, [])

	return (
		<>
			{
				separators.map((separator, index) => (
					<Separator key={index} uuid={separator.id} x={separator.x} moveSeparator={moveSeparator} />
				))
			}

			<SeparatorDropZone removeSeparator={removeSeparator} />
		</>
	)
}