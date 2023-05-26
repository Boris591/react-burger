import {CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./constructor-card.module.css";
import PropTypes from "prop-types";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

function ConstructorCard(props){
    const ref = useRef(null);
    const index = props.index;
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = props.index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            props.moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: props.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    if (props.tp !== 'bun') drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();
    return (
        <div ref={ref}
             data-handler-id={handlerId}
             style={{ opacity }}
             onDrop={preventDefault} className={card.card + " pl-8"}>
            <div className={card.drag}>
                {!props.blocked &&
                    <DragIcon type="primary" />
                }
            </div>
            <div className={card.main + " pr-8 pl-6 " + props.type}>
                <div className={card.img + " mr-5"}>
                    <img src={props.img} alt={props.name}/>
                </div>
                <span className={card.name + " text_type_main-default mr-5"}>
                    {props.name}
                </span>
                <div className={card.other}>
                    <div className={card.price + " mr-5"}>
                        <span className="text text_type_digits-default">{props.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    {props.blocked ?
                        <LockIcon type="secondary" /> :
                        <DeleteIcon type="primary" />
                    }
                </div>
            </div>

        </div>
    );
}

ConstructorCard.propTypes = {
    count: PropTypes.number,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    blocked: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['first', 'default', 'last']),
};

export default ConstructorCard;
