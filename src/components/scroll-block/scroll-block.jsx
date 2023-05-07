import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import scroll from "./scroll-block.module.css";
import {createRef, useEffect} from "react";
import PropTypes from 'prop-types';
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
    }, [props.currentPos, scrollableNodeRef]);

    return (
        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{ maxHeight: props.height }} className={scroll.list}>
            {props.children}
        </SimpleBar>
    );
}

ScrollBlock.propTypes = {
    height: PropTypes.string.isRequired,
    handleTab: PropTypes.func,
    currentPos: PropTypes.number
};

export default ScrollBlock;