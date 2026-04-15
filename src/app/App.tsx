import {Routing} from "@/common/routing/Routing.tsx"
import s from './App.module.css'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Header} from "@/common/components/Header/Header.tsx";
import {useEffect, useState} from "react";
import {CssBaseline} from "@mui/material";

type ThemeMode = 'dark' | 'light'
const THEME_KEY = "theme-mode"

export function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem(THEME_KEY)
        return saved === "dark" || saved === "light" ? saved : "light"
    })

    useEffect(() => {
        localStorage.setItem(THEME_KEY, themeMode)
    }, [themeMode])

    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    })

    const changeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <div className={s.page}>
                <Header changeThemeMode={changeThemeMode}/>
                <main className={s.main}>
                    <Routing/>
                </main>
                <footer className={s.footer}>© 2025 Kinopoisk Demo · Data courtesy of TMDB.</footer>
            </div>
        </ThemeProvider>
    )
}