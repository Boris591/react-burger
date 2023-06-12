import header from "./app-header.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
function AppHeader(){
    return (
        <header className={header.header + " pt-4 pb-4"}>
            <div className={header.container}>
                <div className={header.col}>
                    <nav className={header.nav}>
                        <Link to="/" className={header.link + " p-5 mr-2 " + header.link_active}>
                            <BurgerIcon type="primary" />
                            <span className="text_type_main-default ml-2">Конструктор</span>
                        </Link>
                        <a href="/#" className={header.link + " p-5"}>
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
                        <Link to="/profile" className={header.link + " p-5"}>
                            <ProfileIcon type="secondary" />
                            <span className="text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
