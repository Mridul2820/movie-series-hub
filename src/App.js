import React from 'react'
import Header from './components/Header'
import MainNav from './components/MainNav';
import './styles/app.scss'

const App = () => {
    return (
        <>
            <Header />
            <div className="app">
                <h1>Hey</h1>
            </div>
            <MainNav/>
        </>
        
    )
}

export default App
