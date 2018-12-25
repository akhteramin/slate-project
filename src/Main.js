import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';


import Editor from './components/Editor';

import NotFound from './components/NotFound';



const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route { ...rest } render={ matchProps => (
            <PublicLayout>
                <Component { ...matchProps } />
            </PublicLayout>
        ) }/>
    );
};

class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/app/editor"/>
                    </Route>

                    <PublicRoute path="/app/editor" component={ Editor }/>

                   
                    <Route component={ NotFound }/>
                </Switch>
            </Router>
        );
    }
}

export default Main;
