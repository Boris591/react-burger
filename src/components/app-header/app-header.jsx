import header from "./app-header.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
function AppHeader(){
    return (
        <header className={header.header + " pt-4 pb-4"}>
            <div className={header.container}>
                <div className={header.col}>
                    <nav className={header.nav}>
                        <a className={header.link + " p-5 mr-2"}>
                            <BurgerIcon type="primary" />
                            <span className="text_type_main-default ml-2">Конструктор</span>
                        </a>
                        <a className={header.link + " p-5"}>
                            <ListIcon type="secondary" />
                            <span className="text_type_main-default text_color_inactive ml-2">Лента заказов</span>
                        </a>
                    </nav>
                </div>
                <div className={header.col}>
                    <Logo />
                </div>
                <div className={header.col}>
                    <nav className={header.nav}>
                        <a className={header.link + " p-5"}>
                            <ProfileIcon type="secondary" />
                            <span className="text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;