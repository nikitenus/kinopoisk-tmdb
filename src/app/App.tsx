import {Routing} from "@/common/routing/Routing.tsx"
import s from './App.module.css'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Header} from "@/common/components/Header/Header.tsx";
import {useState} from "react";
import {CssBaseline} from "@mui/material";

type ThemeMode = 'dark' | 'light'

export function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#9f5c44',
            },
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