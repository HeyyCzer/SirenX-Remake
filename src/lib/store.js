import { createColor } from "@/controllers/colors.controller";
import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./reducers/editor.reducer";
import settingsSlice from "./reducers/settings.reducer";
import tutorialSlice from "./reducers/tutorial.reducer";

export const makeStore = () => {
	const preloadedEditor = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`SirenX/editor`)) ?? undefined) : undefined;
	if (preloadedEditor && Object.keys(preloadedEditor?.lights ?? {})?.length > 0) {
		for (const row of Object.values(preloadedEditor.lights)) {
			for (const item of row ?? []) {
				if (item?.color?.startsWith("CUSTOM_")) {
					createColor(item.color.replace("CUSTOM_", ""))
				}
			}
		}
	}

	const store = configureStore({
		reducer: {
			editor: editorSlice,
			settings: settingsSlice,
			tutorial: tutorialSlice,
		},
		preloadedState: {
			editor: preloadedEditor ?? undefined,
			tutorial: typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`SirenX/tutorial`)) ?? undefined) : undefined,
		}
	});

	store.subscribe(() => {
		const state = store.getState();
		if (typeof window !== 'undefined') {
			localStorage.setItem(`SirenX/editor`, JSON.stringify(state.editor));
			localStorage.setItem(`SirenX/tutorial`, JSON.stringify(state.tutorial));
		}
	});

	return store;
};
