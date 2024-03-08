import { createColor } from "@/controllers/colors.controller";
import { configureStore } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
import editorSlice from "./reducers/editor.reducer";
import settingsSlice from "./reducers/settings.reducer";
import tutorialSlice from "./reducers/tutorial.reducer";

const STORE_KEY = "SirenX//";
export { STORE_KEY };

export const makeStore = () => {
	const sentryReduxEnhancer = Sentry.createReduxEnhancer({
		// Optionally pass options listed below
	});

	const preloadedEditor = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`${STORE_KEY}editor`)) ?? undefined) : undefined;
	if (preloadedEditor && Object.keys(preloadedEditor?.lights ?? {})?.length > 0) {
		for (const row of Object.values(preloadedEditor.lights) ?? {}) {
			for (const item of Object.values(row) ?? {}) {
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
			tutorial: typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem(`${STORE_KEY}tutorial`)) ?? undefined) : undefined,
		},
		enhancers: (getDefaultEnhancers) => {
			return getDefaultEnhancers().concat(sentryReduxEnhancer);
		},
	});

	store.subscribe(() => {
		const state = store.getState();
		if (typeof window !== 'undefined') {
			localStorage.setItem(`${STORE_KEY}editor`, JSON.stringify(state.editor));
			localStorage.setItem(`${STORE_KEY}tutorial`, JSON.stringify(state.tutorial));
		}
	});

	return store;
};
