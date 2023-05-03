import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import scroll from "./scroll-block.module.css";
import {createRef, useEffect, useRef, useState} from "react";
function ScrollBlock(props){
    const scrollableNodeRef = createRef();

    useEffect(() => {
        scrollableNodeRef.current.addEventListener('scroll', function(e){
            console.log(scrollableNodeRef.current.scrollTop);
        });
    });

    return (
        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{ maxHeight: props.height }} className={scroll.list}>
            {props.children}
        </SimpleBar>
    );
}

export default ScrollBlock;