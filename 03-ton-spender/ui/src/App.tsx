import { FC } from 'react'
import Header from './components/Header/Header.tsx'
import Middle from './components/Middle/Middle.tsx'
import Footer from './components/Footer/Footer.tsx'
import SpentContextProvider from './contexts/spent/spent.context.provider.tsx'
import './App.css'

const App: FC = () => {
    return (
        <div className={'app'}>
            <Header />
            <SpentContextProvider>
                <Middle />
            </SpentContextProvider>
            <Footer />
        </div>
    )
}

export default App
