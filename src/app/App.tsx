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
            <CssBaseline enableColorScheme />
            <Header changeThemeMode={changeThemeMode}/>
            <div className={s.layout}>
                <Routing/>
            </div>
            Футер
        </ThemeProvider>
    )
}