import overlay from "./modal-overlay.module.css";
interface ModalOverlayProps {
    closeModal?: () => void;
}

function ModalOverlay(props: ModalOverlayProps): JSX.Element {
    return (
        <div onClick={props.closeModal} className={overlay.wrapper}></div>
    );
}

export default ModalOverlay;
