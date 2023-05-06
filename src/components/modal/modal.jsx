import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import modal from "./modal.module.css";
function Modal(props){
    return (
        <div className={modal.modal + " p-10"}>
            <div className={modal.inner}>
                <div className={modal.top}>
                    {props.title &&
                        <h3 className="text text_type_main-large pr-6">{props.title}</h3>
                    }
                    <div onClick={props.closeModal} className={modal.close}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
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