import { useAppDispatch } from "@/lib/hooks";
import { setUploadData } from "@/lib/reducers/editor.reducer";

const setLights = (sirenSelected, fullFile) => {
	const dispatch = useAppDispatch();
	dispatch(setUploadData({
		id: sirenSelected.id.$.value,
		file: fullFile
	}));

	dispatch(setCurrentBpm(sirenSelected.bpm.$.value));

	
}

const exportLights = (lights) => {
	const builtLights = '';
	return builtLights;
}

export {
	exportLights,
	setLights
};

