"use client";

import styles from "./Editor.module.css";

import Light from "@/components/Light";
import Toolbar from "@/components/Toolbar";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";

import SeparatorsContainer from "@/components/SeparatorsContainer";
import AppTutorial from "./editor.tutorial";

export default function Editor() {
	// Buy me a coffee widget
	useEffect(() => {
		const script = document.createElement("script");
		const div = document.getElementById("supportByBMC");
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

	const { bpm, settings } = useAppSelector((state) => state.editor);

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

	return (
		<DndProvider backend={HTML5Backend}>
			<SeparatorsContainer />
			<AppTutorial />

			<div className={`${styles.background} min-h-screen px-12 py-9`}>
				<div className="flex justify-between gap-x-6">
					<main className="flex flex-col gap-y-6 w-fit mx-auto">
						<Link href="/" className="text-2xl text-white font-bold upper">
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
