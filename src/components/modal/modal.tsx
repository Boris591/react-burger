import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import modal from "./modal.module.css";
import {useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ScrollBlock from "../scroll-block/scroll-block";
interface ModalProps {
    title?: string;
    children: JSX.Element;
    closeModal: () => void;
}

function Modal(props: ModalProps): JSX.Element {
    const node: HTMLElement | null = document.getElementById("react-popups");
    const escFunction = useCallback((event: KeyboardEvent) => {
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

    return (
        <>
            {node &&
                ReactDOM.createPortal(
                    (
                        <div className={modal.wrapper}>
                            <ModalOverlay closeModal={props.closeModal} />
                            <div className={modal.modal + " p-10"}>
                                <ScrollBlock height='560px'>
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
                                </ScrollBlock>
                            </div>
                        </div>
                    ), node
                )
            }
        </>
    )

}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired
};
export default Modal;
