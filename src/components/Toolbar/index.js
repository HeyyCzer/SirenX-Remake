import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentBpm, setSelectedColor, updateSettings } from "@/lib/reducers/editor";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function Toolbar() {
	const dispatch = useAppDispatch();
	const { colors, settings, selectedColor, bpm } = useAppSelector((state) => state.editor);

	useEffect(() => {
		const handleKeypress = (e) => {
			if (document.querySelector("input:focus")) return;

			const key = e.key;
			if (isNaN(parseInt(key))) return;

			const colorName = Object.keys(colors)[parseInt(key) - 1];
			if (colorName && selectedColor !== colorName && !colors[colorName].toolbar.unlisted) {
				dispatch(setSelectedColor(colorName));
			}
		}
		window.addEventListener("keypress", handleKeypress);

		return () => {
			window.removeEventListener("keypress", handleKeypress);
		}
	}, [dispatch, colors, selectedColor]);

	return (
		<aside id="toolbar" className="flex flex-col gap-y-5 mt-14 bg-slate-900 w-full max-w-[300px] rounded-xl drop-shadow-lg px-6">
			<div className="flex justify-center py-6 text-white uppercase font-medium">
				<h1>Tool</h1>
				<h1 className="text-gradient-primary font-semibold">Box</h1>
			</div>

			<div className="flex flex-col gap-y-1.5">
				<button id="toolbar-import" className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-white uppercase tracking-[2px] font-semibold rounded-lg text-sm py-1">Import</button>
				<button id="toolbar-export" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white uppercase tracking-[2px] font-semibold w-full rounded-lg text-sm py-1">Export</button>
			</div>

			{/* BPM */}
			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Adjust BPM</h2>

				<div id="toolbar-bpm" className="flex flex-col items-center mt-2">
					<input
						type="range"
						min="1" max="1200" step="10"
						className="w-full accent-emerald-400"
						value={bpm}
						onChange={ (e) => dispatch(setCurrentBpm(e.target.value)) }
					/>
					<span className="mt-1 flex gap-x-2 text-white text-xs items-center">
						Current BPM:
						<input
							type="number"
							max="1200" min="1" step="10"
							className="proportional-nums py-0 px-0 bg-transparent border-0 border-b-2 border-white/30 focus:border-emerald-400 transition-all outline-none text-center text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
							value={bpm}
							onChange={ (e) => dispatch(setCurrentBpm(e.target.value)) }
						/>
					</span>
				</div>
			</div>

			{/* COLORS */}
			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Siren Colors</h2>

				<div id="toolbar-colors" className="grid grid-cols-3 w-full gap-y-2 mt-4">
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

			{/* SETTINGS */}
			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Settings</h2>

				<div id="toolbar-settings" className="flex flex-col gap-y-2 mt-4 text-gray-300 text-xs">
					{Object.entries(settings).filter(([, settingsData]) => !settingsData.unlisted).map(([settingsId, settingsData], index) => (
						<div key={index} className="flex flex-col gap-y-1">
							<div className="flex justify-between items-center gap-x-2">
								<input
									className={twMerge("accent-emerald-400 text-emerald-400 rounded-md focus:ring-0 outline-none mt-1", (settingsData.attributes?.type === "range" && "w-full"))}
									id={`settings-${settingsId}`}
									checked={settingsData.value}
									value={settingsData.value}
									onChange={(e) => dispatch(updateSettings({ key: settingsId, value: e.target.value }))}
									{...(settingsData.attributes ?? {})}
								/>
								{settingsData.attributes?.type === "range" && (
									<span className="text-white text-xs">{settingsData.value}</span>
								)}
							</div>
							<label htmlFor={`settings-${settingsId}`}>
								<h5 className="text-white font-semibold text-sm">{settingsData.label}</h5>
								{settingsData.description && (
									<p>{settingsData.description}</p>
								)}
								{settingsData.negativeEffect && (
									<p className="text-amber-500">{settingsData.negativeEffect}</p>
								)}
							</label>
						</div>
					))}
				</div>
			</div>

			{/* KEYBINDS */}
			<div>
				<h2 className="text-center uppercase tracking-[2px] text-white text-sm">Useful keybinds</h2>

				<div id="toolbar-keybinds" className="flex flex-col gap-y-2 mt-4 text-gray-300 text-xs">
					<div className="grid grid-cols-2 gap-x-2 items-center">
						<kbd><kbd>Mouse Left</kbd></kbd>
						<p>Draw color</p>
					</div>
					<div className="grid grid-cols-2 gap-x-2 items-center">
						<kbd><kbd>Mouse Right</kbd></kbd>
						<p>Erase color</p>
					</div>
					<div className="grid grid-cols-2 gap-x-2 items-center">
						<kbd><kbd>0-9</kbd></kbd>
						<p>Change color</p>
					</div>
					<div className="grid grid-cols-2 gap-x-2 items-center">
						<kbd><kbd>Q</kbd></kbd>
						<p>Create separator</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
