import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

function DragIngredient(props){
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
        <div
            ref={ref}
            data-handler-id={handlerId}
            style={{ opacity }}
            onDrop={preventDefault}
            className={props.class}
        >
            {props.children}
        </div>
    );
}

export default DragIngredient;
