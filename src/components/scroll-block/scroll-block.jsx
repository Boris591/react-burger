import PerfectScrollbar from "react-perfect-scrollbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import scroll from "./scroll-block.module.css";
import {useState} from "react";
function ScrollBlock(props){
    return (
        <PerfectScrollbar style={{ height: props.height }} className={scroll.list}>
            {props.children}
        </PerfectScrollbar>
    );
}

export default ScrollBlock;