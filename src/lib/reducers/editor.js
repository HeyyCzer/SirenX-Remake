import DeltaEnum from "@/enum/rotation";

const { createSlice } = require("@reduxjs/toolkit")

const defaultLightModel = {
	color: "none",
	rotation: DeltaEnum.FRONT,
	multiples: 1,
	intensity: 3.50000000,
}

const initialState = {
	selectedColor: "red",
	bpm: 600,
	lights: [],

	settings: {
		separatorsVisible: {
			label: "Show/hide separators",
			description: "This will show the created separators.",
			attributes: {
				type: "checkbox",
			},
			value: true,
		},
		oneColorPerColumn: {
			label: "Limit one color per column",
			description: "This is useful for visualizing your pattern.",
			negativeEffect: "By disabling this, you will not be able to export files.",
			attributes: {
				type: "checkbox",
			},
			value: true,
		},
		totalColumns: {
			label: "Total of columns",
			description: "This is the total rows of the editor. The maximum is 32.",
			attributes: {
				type: "range",
				min: 20,
				max: 32,
			},
			parseValue: (value) => parseInt(value),
			value: 20,
		}
	},

	colors: {
		red: {
			toolbar: {
				name: "Red",
				default: "bg-red-500/50 hover:bg-red-500 text-white",
				selected: "bg-red-500 text-white",
			},
			editor: {
				default: "bg-red-500/50",
				current: "bg-red-500 drop-shadow-[0px_0px_10px_#ff0000]",
			}
		},
		blue: {
			toolbar: {
				name: "Blue",
				default: "bg-blue-500/50 hover:bg-blue-500 text-white",
				selected: "bg-blue-500 text-white",
			},
			editor: {
				default: "bg-blue-500/50",
				current: "bg-blue-500 drop-shadow-[0px_0px_10px_#0000ff]",
			}
		},
		white: {
			toolbar: {
				name: "White",
				default: "bg-white/50 hover:bg-white text-black",
				selected: "bg-white text-black",
			},
			editor: {
				default: "bg-white/50",
				current: "bg-white drop-shadow-[0px_0px_10px_#ffffff]",
			}
		},
		amber: {
			toolbar: {
				name: "Amber",
				default: "bg-amber-500/50 hover:bg-amber-500 text-white",
				selected: "bg-amber-500 text-white",
			},
			editor: {
				default: "bg-amber-500/50",
				current: "bg-amber-500 drop-shadow-[0px_0px_10px_#ffbf00]",
			}
		},
		purple: {
			toolbar: {
				name: "Purple",
				default: "bg-purple-500/50 hover:bg-purple-500 text-white",
				selected: "bg-purple-500 text-white",
			},
			editor: {
				default: "bg-purple-500/50",
				current: "bg-purple-500 drop-shadow-[0px_0px_10px_#800080]",
			}
		},
		green: {
			toolbar: {
				name: "Green",
				default: "bg-green-500/50 hover:bg-green-500 text-white",
				selected: "bg-green-500 text-white",
			},
			editor: {
				default: "bg-green-500/50",
				current: "bg-green-500 drop-shadow-[0px_0px_10px_#008000]",
			}
		},
		lightBlue: {
			toolbar: {
				name: "Light Blue",
				default: "bg-blue-400/50 hover:bg-blue-400 text-white",
				selected: "bg-blue-400 text-white",
			},
			editor: {
				default: "bg-blue-400/50",
				current: "bg-blue-400 drop-shadow-[0px_0px_10px_#0000ff]",
			}
		},
		pink: {
			toolbar: {
				name: "Pink",
				default: "bg-pink-500/50 hover:bg-pink-500 text-white",
				selected: "bg-pink-500 text-white",
			},
			editor: {
				default: "bg-pink-500/50",
				current: "bg-pink-500 drop-shadow-[0px_0px_10px_#ff00ff]",
			}
		},
		none: {
			toolbar: {
				unlisted: true,
				default: "bg-white/10 border-2 border-white/50 text-white/50 hover:border-white hover:text-white",
				selected: "bg-red-500/10 border-2 border-red-500 text-red-500",
			},
			editor: {
				default: "bg-gray-200/20",
				current: "bg-gray-200/20",
			}
		},
	},
}

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setCurrentBpm: (state, { payload }) => {
			state.bpm = payload;
			return state;
		},
		setSelectedColor: (state, { payload }) => {
			state.selectedColor = payload;
			return state;
		},
		updateSettings: (state, { payload: { key, value } }) => {
			if (state.settings[key].parseValue) {
				value = state.settings[key].parseValue(value);
			}
			state.settings[key].value = value;
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

export const { setCurrentBpm, setSelectedColor, updateSettings, updateLight } = editorSlice.actions;

export default editorSlice.reducer;