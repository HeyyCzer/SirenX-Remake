import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentBpm, setSelectedColor } from "@/lib/reducers/editor";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function Toolbar() {
	const dispatch = useAppDispatch();
	const { colors, selectedColor, bpm } = useAppSelector((state) => state.editor);

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			const key = e.key;
			if (isNaN(parseInt(key))) return;
			if (document.querySelector("input:focus")) return;

			const colorName = Object.keys(colors)[parseInt(key) - 1];
			if (colorName && selectedColor !== colorName && !colors[colorName].toolbar.unlisted) {
				dispatch(setSelectedColor(colorName));
			}
		});
	}, [dispatch, selectedColor]);

	return (
		<aside className="flex flex-col gap-y-5 mt-14 bg-slate-900 w-full max-w-[300px] rounded-xl drop-shadow-lg px-6">
			<div className="flex justify-center py-6 text-white uppercase font-medium">
				<h1>Tool</h1>
				<h1 className="text-gradient-primary font-semibold">Box</h1>
			</div>

			<div className="flex flex-col gap-y-1.5">
				<button className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white uppercase tracking-[2px] font-semibold rounded-lg text-sm py-1">Import</button>
				<button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white uppercase tracking-[2px] font-semibold w-full rounded-lg text-sm py-1">Export</button>
			</div>

			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Adjust BPM</h2>

				{/* Slider */}
				<div className="flex flex-col items-center mt-2">
					<input
						type="range"
						min="1" max="1200" step="10"
						className="w-full"
						value={bpm}
						onChange={ (e) => dispatch(setCurrentBpm(e.target.value)) }
					/>
					<span className="mt-1 flex gap-x-2 text-white text-xs">
						Current BPM:
						<input
							type="number"
							max="1200" min="1" step="10"
							className="proportional-nums w-8 bg-transparent border-b-2 border-white/30 focus:border-emerald-400 transition-all outline-none text-center text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							value={bpm}
							onChange={ (e) => dispatch(setCurrentBpm(e.target.value)) }
						/>
					</span>
				</div>
			</div>

			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Siren Colors</h2>

				<div className="grid grid-cols-3 w-full gap-y-2 mt-4">
					{Object.entries(colors).filter(([, colorData]) => !colorData.toolbar.unlisted).map(([color, colorData], index) => {
						const selected = selectedColor === color;
						return (
							<button
								key={index}
								className={`relative ${selected ? colorData.toolbar.selected : colorData.toolbar.default} mx-auto flex items-center justify-center rounded-lg w-12 aspect-square transition-all`}
								onClick={() => dispatch(setSelectedColor(color))}
							>
								{selected && <FontAwesomeIcon icon={faCheck} className="text-2xl drop-shadow-[0px_2px_1px_#000]" />}

								{!selected && (
									<span className="absolute bottom-0.5 left-1 text-xs">
										{index + 1}
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>
		</aside>
	);
}
