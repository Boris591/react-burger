import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import scroll from "./scroll-block.module.css";
import {createRef, useEffect, useRef, useState} from "react";
function ScrollBlock(props){
    const scrollableNodeRef = createRef();

    useEffect(() => {
        scrollableNodeRef.current.addEventListener('scroll', function(e){
            if(scrollableNodeRef.current && props.handleTab){
                props.handleTab(scrollableNodeRef.current.scrollTop);
            }
        });
    });

    useEffect(() => {
        //scrollableNodeRef.current.scrollTo({top: props.currentPos, behavior: 'smooth'});
        scrollableNodeRef.current.scrollTop = props.currentPos;
    }, [props.currentPos]);

    return (
        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{ maxHeight: props.height }} className={scroll.list}>
            {props.children}
        </SimpleBar>
    );
}

export default ScrollBlock;