import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet'

// Components
import Header from './components/Header'
import MainNav from './components/MainNav';

// Pages
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Search from './pages/Search';

import { Container } from "@material-ui/core";
import './styles/app.scss'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Helmet>
                <title>Entertainment Hub</title>
                <meta 
                    name="description"
                    content="Get the info of trending Movies and Series"
                />
                <meta name="keywords" content="movies, tv series, search movies"/>
            </Helmet>
            <div className="app">
                <Container>
                    <Switch>
                        <Route 
                            path='/' 
                            component={Trending} 
                            exact 
                        />
                        <Route 
                            path='/movies' 
                            component={Movies} 
                        />
                        <Route 
                            path='/series' 
                            component={Series} 
                        />
                        <Route 
                            path='/search' 
                            component={Search}
                        />
                    </Switch>
                </Container>
            </div>
            <MainNav/>
        </BrowserRouter>
        
    )
}

export default App
