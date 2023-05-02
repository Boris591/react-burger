import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useState} from "react";
function BurgerConstructor(props){
    const [products, setProducts] = useState();
    return (
        <div className={"pt-25"}>
            <div className={construct.list}>
                <ConstructorCard type="first" blocked={true} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                <ScrollBlock height={'464px'}>
                    <>
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                        <ConstructorCard type="default" blocked={false} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
                    </>
                </ScrollBlock>
                <ConstructorCard type="last" blocked={true} img={'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'} price={20} name="Краторная булка N-200i" />
            </div>
            <div className={construct.result}>
                <div className={construct.price}>
                    <span>610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;