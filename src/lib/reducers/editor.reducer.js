import DeltaEnum from "@/enum/rotation.enum";
import DefaultCarcols from "/public/default_carcols.json";

const { createSlice } = require("@reduxjs/toolkit")

const defaultLightModel = {
	color: "none",
	rotation: DeltaEnum.FRONT.delta,
	multiples: 1,
	intensity: 3.50000000,
}

const initialState = {
	sirenId: null,
	sirenName: "SirenX-GeneratedCarcols",
	uploadedFile: DefaultCarcols,

	selectedColor: "red",
	bpm: 600,
	lights: Array(32).fill()
		.map(() => 
			Array(20).fill(defaultLightModel)
		),
}

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setUploadData: (state, { payload: { id, name, file } }) => {
			state.sirenId = id;
			state.sirenName = name;
			state.uploadedFile = file;
			return state;
		},
		setCurrentBpm: (state, { payload }) => {
			state.bpm = payload;
			return state;
		},
		setSelectedColor: (state, { payload }) => {
			state.selectedColor = payload;
			return state;
		},
		updateLight: (state, { payload: { row, column, color, settings } }) => {
			if (!state.lights[row]) {
				state.lights[row] = [];
			}

			if (!state.lights[row][column]) {
				state.lights[row][column] = defaultLightModel;
			}

			if (settings.oneColorPerColumn.value) {
				for (const row of Object.values(state.lights)) {
					if (row[column]?.color && row[column]?.color !== color && color !== "none" && row[column]?.color !== "none") {
						row[column].color = color;
					}
				}
			}

			const light = { ...state.lights[row][column] };
			light.color = color;
			state.lights[row][column] = light;
			return state;
		},
		updateLights: (state, { payload: lights }) => {
			state.lights = lights;
			return state;
		}
	}
});

export const { setUploadData, setCurrentBpm, setSelectedColor, updateLight, updateLights } = editorSlice.actions;

export { defaultLightModel };

export default editorSlice.reducer;