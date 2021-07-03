import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import ListofPets from './mascotas/components/ListofPets'
import Home from './mascotas/components/Home'

const router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/mascotas" component={ListofPets}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default router
