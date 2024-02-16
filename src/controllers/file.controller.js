import { Modal } from '@/lib/modal';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseString as parseXML } from 'xml2js';

const uploadFile = (fileContent) => {
	parseXML(fileContent, { explicitArray: false }, async (err, json) => {
		let sirens = json?.CVehicleModelInfoVarGlobal?.Sirens.Item;
		if (err || !sirens) {
			return Modal.fire({
				icon: 'error',
				title: 'Error',
				text: 'The file provided is not a valid carcols.meta file or does not contain any siren data. Please try another file.'
			});
		}

		const hasMultipleSirens = Array.isArray(sirens);
		if (!hasMultipleSirens) {
			sirens = [sirens];
		}

		let selectedSiren = null;
		if (sirens.length === 1) {
			selectedSiren = sirens[0];
		} else {
			const sirenOptions = sirens.reduce((acc, siren) => ({ ...acc, [siren.id.$.value]: `${siren.name} (ID: ${siren.id.$.value})` }), {});
			await Modal.fire({
				title: 'Select a siren to edit',
				text: 'The selected file contains multiple sirens. Please select one to continue.',
				input: 'select',
				inputOptions: sirenOptions,

				showCancelButton: true,
				confirmButtonText: (
					<>
						<FontAwesomeIcon icon={faCheck} />
						<span className="ml-1">Let&apos;s edit this!</span>
					</>
				)
			}).then(({ isConfirmed, value }) => {
				if (!isConfirmed) return;

				selectedSiren = sirens.find((siren) => siren.id.$.value === value);
			});
		}

		if (!selectedSiren) return;

		setLights(selectedSiren, json);
	});
}

const downloadFile = (content, fileName) => {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
	element.setAttribute('download', fileName);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}

export {
	downloadFile,
	uploadFile
};

