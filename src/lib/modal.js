import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.js";

const ReactSwal = withReactContent(Swal);

export const Modal = ReactSwal.mixin({
	confirmButtonText: (
		<>
			<FontAwesomeIcon icon={faCheck} />
			<span className="ml-1">Confirmar</span>
		</>
	),
	cancelButtonText: (
		<>
			<FontAwesomeIcon icon={faXmark} />
			<span className="ml-1">Cancelar</span>
		</>
	),
});