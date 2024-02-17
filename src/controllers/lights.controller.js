import Colors from "@/lib/colors";
import { decimalToBinary } from "@/utils/binary";
import { createColor } from "./colors.controller";

const buildLights = (sirenSelected, fullFile) => {
	const sirenItems = Array.isArray(sirenSelected.sirens.Item) ? sirenSelected.sirens.Item : [sirenSelected.sirens.Item];
	
	const builtSirens = [];
	for (const columnIndex in sirenItems) {
		const columnData = sirenItems[columnIndex];

		const rotation = Number(columnData.rotation.delta.$.value);
		const multiples = Number(columnData.flashiness.multiples.$.value);
		const intensity = Number(columnData.intensity.$.value);

		let carcolsColor = columnData.color.$.value;
		let color = null;
		for (const [colorName, colorData] of Object.entries(Colors)) {
			if (colorData.carcols.color === carcolsColor) {
				color = colorName;
				break;
			}
		}

		if (!color) {
			const colorId = createColor(carcolsColor);
			color = colorId;
		}

		const binarySequence = decimalToBinary(columnData.flashiness.sequencer.$.value);
		for (const row in binarySequence) {
			const active = binarySequence[row] === "1";
			if (active) {
				if (!builtSirens[row]) {
					builtSirens[row] = [];
				}

				builtSirens[row][columnIndex] = {
					color,
					rotation,
					multiples,
					intensity,
				}
			}
		}
	}

	return {
		bpm: sirenSelected.sequencerBpm.$.value,
		id: sirenSelected.id.$.value,
		file: fullFile,
		lights: builtSirens,
	};
}

const exportLights = (lights) => {
	const builtLights = '';
	return builtLights;
}

export {
	buildLights, exportLights
};

