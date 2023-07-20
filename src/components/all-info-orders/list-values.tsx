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
            <div className={info.label + ' mb-6 text text_type_main-medium'}>
                {props.label}
            </div>
            <ul className={info.list}>
                {props.items.map((el, i) => (
                        <li className={(props.colorItems === 'green' ? info.green : info.white) + ' mb-2 text text_type_digits-default ' + props.colorItems} key={i}>
                            {el}
                        </li>
                    )
                )}
            </ul>
        </>
    );
}

export default ListValues;
