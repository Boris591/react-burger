import info from './all-info-orders.module.css';
import MainInfo from "./main-info";
import ListValues from "./list-values";

interface AllInfoOrdersProps {
    done: number[];
    working: number[];
    all: number;
    today?: number;
}
function AllInfoOrders(props: AllInfoOrdersProps){
    return (
        <div className={info.container}>
            <div className={info.orders + ' mb-15'}>
                {props.done &&
                    <div className={info.ordersCol}>
                        <ListValues label='Готовы:' items={props.done} colorItems='green' />
                    </div>
                }
                {props.working &&
                    <div className={info.ordersCol}>
                        <ListValues label='В работе:' items={props.working} colorItems='white' />
                    </div>
                }
            </div>
            <MainInfo label='Выполнено за все время:' value={props.all} />
            {props.today &&
                <MainInfo label='Выполнено за сегодня:' value={props.today} />
            }
        </div>
    );
}

export default AllInfoOrders;
