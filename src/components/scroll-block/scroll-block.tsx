import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import scroll from "./scroll-block.module.css";
import {useEffect, useRef} from "react";

interface ScrollBlockProps {
    height: string;
    handleTab?: (scrollTop: number) => void;
    currentPos?: number;
    children: React.ReactNode;
}
function ScrollBlock(props: ScrollBlockProps): JSX.Element {
    const scrollableNodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            if (scrollableNodeRef.current && props.handleTab) {
                props.handleTab(scrollableNodeRef.current.scrollTop);
            }
        };

        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableNodeRef.current) {
                scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [props.handleTab]);

    useEffect(() => {
        if (scrollableNodeRef.current && props.currentPos !== undefined) {
            scrollableNodeRef.current.scrollTop = props.currentPos;
        }
    }, [props.currentPos]);

    return (
        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{ maxHeight: props.height }} className={scroll.list}>
            {props.children}
        </SimpleBar>
    );
}

export default ScrollBlock;
