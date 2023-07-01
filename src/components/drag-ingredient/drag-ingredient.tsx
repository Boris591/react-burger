import {useRef} from "react";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";

interface DragIngredientProps {
    id: string;
    index?: number;
    class: string;
    tp: string;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    children: React.ReactNode;
}

const DragIngredient: React.FC<DragIngredientProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const index = props.index;
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item: any, monitor: DropTargetMonitor<unknown, unknown>) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index !== undefined ? index : 0;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : null;

            if (dragIndex < hoverIndex && hoverClientY !== null && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY !== null && hoverClientY > hoverMiddleY) {
                return;
            }

            if (props.moveCard) {
                props.moveCard(dragIndex, hoverIndex);
            }
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

    const preventDefault = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
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
