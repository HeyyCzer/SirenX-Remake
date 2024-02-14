import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./reducers/editor";
import tutorialSlice from "./reducers/tutorial";

export const makeStore = () => {
	const data = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`SirenX/tutorial`)) ?? {}) : {};

	const store = configureStore({
		reducer: {
			editor: editorSlice,
			tutorial: tutorialSlice,
		},
		preloadedState: {
			tutorial: data,
		}
	});

	store.subscribe(() => {
		const state = store.getState();
		if (typeof window !== 'undefined') {
			localStorage.setItem(`SirenX/tutorial`, JSON.stringify(state.tutorial));
		}
	});

	return store;
};
