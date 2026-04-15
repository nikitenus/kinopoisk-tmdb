import {NavLink} from "react-router"
import {navItems} from "./navItems"
import s from "./Header.module.css"
import logo from '@/assets/logo.svg'

export const Header = () => {
    return (
        <header className={s.container}>
            <div className={s.wrapper}>
                <NavLink to={'/'} className={s.logoWrap}>
                    <img src={logo} alt="logo" className={s.logo}/>
                </NavLink>

                <nav className={s.nav}>
                    <ul className={s.list}>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({isActive}) => `link ${isActive ? s.activeLink : ""}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button className={s.themeBtn} type="button">
                    {/*{theme === "light" ? "🌙 Dark" : "☀️ Light"}*/}
                    🌙
                </button>
            </div>
        </header>
    )
}
