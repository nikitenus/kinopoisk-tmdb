import {Header} from "@/common/components/Header/Header"
import {Routing} from "@/common/routing/Routing.tsx"
import s from './App.module.css'

function App() {
    return (
        <>
            <Header/>
            <div className={s.layout}>
                <Routing/>
            </div>
            Футер
        </>
    )
}

export default App
