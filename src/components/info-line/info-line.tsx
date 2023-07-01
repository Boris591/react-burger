import {Link} from "react-router-dom";
import line from "./info-line.module.css";
import React from "react";

interface InfoLineProps {
    label: string;
    link: string;
    txt: string;
}
const InfoLine: React.FC<InfoLineProps> = (props) => {
    return (
        <div className={line.block + " mb-4"}>
            <span className="text text_type_main-default text_color_inactive mr-2">{props.label}</span>
            <Link className="text text_type_main-default" to={props.link}>
                {props.txt}
            </Link>
        </div>
    );
}

export default InfoLine;
