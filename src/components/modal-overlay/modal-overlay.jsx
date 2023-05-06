import overlay from "./modal-overlay.module.css";
import PropTypes from "prop-types";
function ModalOverlay(props){
    return (
        <div onClick={props.closeModal} className={overlay.wrapper}></div>
    );
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
};

export default ModalOverlay;