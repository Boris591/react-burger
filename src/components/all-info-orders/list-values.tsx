import info from "./all-info-orders.module.css";

interface ListValuesProps {
    label: string;
    items: string[] | number[];
    colorItems: 'green' | 'white';
}
function ListValues(props: ListValuesProps): JSX.Element{
    return (
        <>
            <span className={info.label + ' mb-6 text text_type_main-medium'}>
                {props.label}
            </span>
            <ul>
                {props.items.map((el, i) =>
                    <li className={info.itemList + ' mb-2 text text_type_digits-default ' + props.colorItems} key={i}>
                        {el}
                    </li>
                )}
            </ul>
        </>
    );
}

export default ListValues;
