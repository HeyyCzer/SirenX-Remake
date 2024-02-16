import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./reducers/editor.reducer";
import settingsSlice from "./reducers/settings.reducer";
import tutorialSlice from "./reducers/tutorial.reducer";

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			editor: editorSlice,
			settings: settingsSlice,
			tutorial: tutorialSlice,
		},
		preloadedState: {
			editor: typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`SirenX/editor`)) ?? undefined) : undefined,
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
