//import modal from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import modal from "./modal.module.css";
function Modal(props){
    return (
        <div className={modal.modal}>
            <CloseIcon onClick={props.closeModal} type="primary" />
            <div className="inner">
                {props.title &&
                    <h3>{props.title}</h3>
                }
                {props.children}
            </div>
        </div>
    );

}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    closeModal: PropTypes.func
};
export default Modal;