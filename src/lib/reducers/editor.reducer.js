import DeltaEnum from "@/enum/rotation.enum";

const { createSlice } = require("@reduxjs/toolkit")

const defaultLightModel = {
	color: "none",
	rotation: DeltaEnum.FRONT,
	multiples: 1,
	intensity: 3.50000000,
}

const initialState = {
	sirenId: null,
	uploadedFile: null,

	selectedColor: "red",
	bpm: 600,
	lights: [],
}

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setUploadData: (state, { payload: { id, file } }) => {
			state.sirenId = id;
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
		updateLight: (state, { payload: { row, column, color } }) => {
			if (!state.lights[row]) {
				state.lights[row] = [];
			}

			if (!state.lights[row][column]) {
				state.lights[row][column] = defaultLightModel;
			}

			const light = { ...state.lights[row][column] };
			light.color = color;
			state.lights[row][column] = light;
			return state;
		}
	}
});

export const { setUploadData, setCurrentBpm, setSelectedColor, updateLight } = editorSlice.actions;

export default editorSlice.reducer;