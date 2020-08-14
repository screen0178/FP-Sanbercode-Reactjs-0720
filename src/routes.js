import React from 'react'
import {Switch, Route} from 'react-router'

import Signup from './component/Signup'
import Login from './component/Login'
import MovieList from './component/MovieList'
import GameList from './component/GameList'

const Routes = () => {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/games">
                <GameList />
            </Route>
            <Route path="/">
                <MovieList />
            </Route>
        </Switch>
    )
}

export default Routes;