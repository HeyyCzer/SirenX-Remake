import { useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ColumnSettingsDropdown from "../ColumnSettingsDropdown";

const Light = dynamic(() => import("@/components/Light"), { ssr: false });

export default function LightsEditor() {
	const { bpm } = useAppSelector((state) => state.editor);
	const { totalColumns } = useAppSelector((state) => state.settings);

	const [currentRow, setCurrentRow] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRow((prev) => (prev + 1) % 32);
		}, 1000 / (bpm / 60));

		return () => clearInterval(interval);
	}, [bpm]);

	return (
		<main className="flex flex-col gap-y-6 w-fit mx-auto overflow-x-auto">
			<Link href="/" className="text-2xl text-white font-bold upper w-fit">
				Siren
				<span className="text-gradient-primary">X</span>
			</Link>

			{/* Preview bar */}
			<div className="w-[inherit]">
				<div>
					<h2 className="text-gray-300/60 uppercase text-xs tracking-[2px] font-light text-center">Preview</h2>
				</div>
				<div className="flex gap-x-1 px-1">
					{
						Array.from({ length: totalColumns.value })
							.map((_, columnIndex) => (
								<Light isPreview isCurrent key={`preview-${columnIndex}`} disabled row={currentRow} column={columnIndex} />
							))
					}
				</div>

				<hr className="border-gray-300/30 w-1/2 mx-auto mt-2" />
			</div>

			<div className="w-[inherit]">
				<div className={twMerge(`flex gap-x-1 justify-around rounded-lg px-1 w-[inherit]`)}>
					{
						Array.from({ length: totalColumns.value })
							.map((_, columnIndex) => (
								<ColumnSettingsDropdown key={columnIndex} columnIndex={columnIndex} />
							))
					}
				</div>
				{
					Array.from({ length: 32 })
						.map((_, rowIndex) => (
							<div className={twMerge(`flex gap-x-1 rounded-lg px-1 w-[inherit]`, rowIndex === currentRow && "bg-white/10")} key={rowIndex}>
								{Array.from({ length: totalColumns.value }, (_, i) => i).map((_, columnIndex) => (
									<Light key={`${rowIndex}-${columnIndex}`} row={rowIndex} column={columnIndex} isCurrent={rowIndex === currentRow} />
								))}
							</div>
						))
				}
			</div>
		</main>
	);
}
