"use client";

import styles from "./Editor.module.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";

import ColumnSettingsDropdown from "@/components/ColumnSettingsDropdown";
import SeparatorsContainer from "@/components/SeparatorsContainer";
import { defaultLightModel, updateLights } from "@/lib/reducers/editor.reducer";
import dynamic from "next/dynamic";
import AppTutorial from "./editor.tutorial";

const Light = dynamic(() => import("@/components/Light"), { ssr: false });
const Toolbar = dynamic(() => import("@/components/Toolbar"), { ssr: false });

export default function Editor() {
	// Buy me a coffee widget
	useEffect(() => {
		if (document.getElementById("bmc-script")) return;

		const script = document.createElement("script");
		const div = document.getElementById("supportByBMC");
		script.setAttribute("id", "bmc-script");
		script.setAttribute("src", "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js");
		script.setAttribute("data-name", "BMC-Widget");
		script.setAttribute("data-cfasync", "false");
		script.setAttribute("data-id", "heyyczer");
		script.setAttribute("data-description", "Support me on Buy me a coffee!");
		script.setAttribute("data-message", "Would you like to support this tool?");
		script.setAttribute("data-color", "#40DCA5");
		script.setAttribute("data-position", "Right");
		script.setAttribute("data-x_margin", "18");
		script.setAttribute("data-y_margin", "18");

		script.onload = function () {
			var evt = new Event("DOMContentLoaded", { bubbles: false, cancelable: false });
			window.dispatchEvent(evt);
		};

		div.appendChild(script);
	}, []);

	const dispatch = useAppDispatch();
	const { bpm, lights } = useAppSelector((state) => state.editor);
	const settings = useAppSelector((state) => state.settings);

	const [currentRow, setCurrentRow] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRow((prev) => (prev + 1) % 32);
		}, 1000 / (bpm / 60));

		return () => clearInterval(interval);
	}, [bpm]);

	useEffect(() => {
		const preventContextMenu = (e) => e.preventDefault();
		window.addEventListener("contextmenu", preventContextMenu);

		return () => {
			window.removeEventListener("contextmenu", preventContextMenu);
		}
	}, []);

	useEffect(() => {
		if (!settings.oneColorPerColumn.value) return;
	
		const newLights = { ...lights };

		const columnColors = [];
		for (const rowIndex in lights) {
			const row = lights[rowIndex];
			for (const index in row ?? []) {
				const item = row[index];
				if (!item) continue;

				if (!columnColors[index] && item.color !== "none") {
					columnColors[index] = item.color;
				}

				if (item.color !== "none" && columnColors[index] && columnColors[index] !== item.color) {
					newLights[rowIndex] = { ...newLights[rowIndex], [index]: { ...item, color: columnColors[index] } };
				}
			}
		}

		if (JSON.stringify(newLights) !== JSON.stringify(lights)) {
			dispatch(updateLights(newLights));
		}
	}, [dispatch, settings.oneColorPerColumn.value, lights]);

	return (
		<DndProvider backend={HTML5Backend}>
			<SeparatorsContainer />
			<AppTutorial />

			<div className={`${styles.background} min-h-screen px-12 py-9`}>
				<div className="flex justify-between gap-x-6">
					<main className="flex flex-col gap-y-6 w-fit mx-auto">
						<Link href="/" className="text-2xl text-white font-bold upper w-fit">
							Siren
							<span className="text-gradient-primary">X</span>
						</Link>

						{/* Preview bar */}
						<div>
							<div>
								<h2 className="text-gray-300/60 uppercase text-xs tracking-[2px] font-light text-center">Preview</h2>
							</div>
							<div className="flex gap-x-1 px-1">
								{Array(settings.totalColumns.value)
									.fill()
									.map((_, columnIndex) => (
										<Light current={true} key={`preview-${columnIndex}`} disabled row={currentRow} column={columnIndex} />
									))}
							</div>

							<hr className="border-gray-300/30 w-1/2 mx-auto mt-2" />
						</div>

						<div>
							<div className={twMerge(`flex gap-x-1 justify-around rounded-lg px-1`)}>
								{Array(settings.totalColumns.value)
									.fill()
									.map((_, columnIndex) => (
											<ColumnSettingsDropdown key={columnIndex} columnIndex={columnIndex} data={lights?.[0]?.[columnIndex] || defaultLightModel} />
										))}
							</div>
							{Array(32)
								.fill()
								.map((_, rowIndex) => (
									<div className={twMerge(`flex gap-x-1 rounded-lg px-1`, (rowIndex === currentRow && "bg-white/10"))} key={rowIndex}>
										{Array(settings.totalColumns.value)
											.fill()
											.map((_, columnIndex) => (
												<Light key={`${rowIndex}-${columnIndex}`} row={rowIndex} column={columnIndex} current={rowIndex === currentRow} />
											))}
									</div>
								))}
						</div>
					</main>

					<Toolbar />
				</div>
			</div>

			<div id="supportByBMC" />
		</DndProvider>
	);
}
