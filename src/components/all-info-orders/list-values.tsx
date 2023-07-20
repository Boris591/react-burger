import info from "./all-info-orders.module.css";

interface ListValuesProps {
    label: string;
    items: string[] | number[];
    colorItems: 'green' | 'white';
}
function ListValues(props: ListValuesProps): JSX.Element{
    const checkCol = (i: number) => {
        return i % 10 === 0
    }
    return (
        <>
            <span className={info.label + ' mb-6 text text_type_main-medium'}>
                {props.label}
            </span>
            {props.items.map((el, i) => (
                <>
                    {i && <p></p>}
                    <li className={info.itemList + ' mb-2 text text_type_digits-default ' + props.colorItems} key={i}>
                        {el}
                    </li>
                </>
                )
            )}
        </>
    );
}

export default ListValues;
