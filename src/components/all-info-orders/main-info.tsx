import info from './all-info-orders.module.css';

interface MainInfoProps {
    label: string;
    value: string | number;
}
function MainInfo(props: MainInfoProps): JSX.Element{
    return (
        <div className={info.main + ' mt-15'}>
            <span className={info.label + ' text text_type_main-medium'}>
                {props.label}
            </span>
            <div className='text text_type_digits-large'>
                {props.value}
            </div>
        </div>
    );
}

export default MainInfo;
