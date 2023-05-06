import ReactDOM from "react-dom";
import popup from "./popup.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import {useCallback, useEffect} from "react";

function Popup(props){
    const node = document.getElementById("react-popups");
    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            props.closeModal();
        }
    }, [props]);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    return ReactDOM.createPortal(
        (
            <div className={popup.popup}>
                <ModalOverlay closeModal={props.closeModal}/>
                <Modal title={props.title} closeModal={props.closeModal}>
                    {props.children}
                </Modal>
            </div>
        ), node
    );
}

Popup.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    closeModal: PropTypes.func
};

export default Popup;