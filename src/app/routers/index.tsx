import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainPage from '../modules/main-page/main-page';

import PrivateRoute from '@src/common/components/private-route'


const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/index" />
            </Route>
            <PrivateRoute path='/index' component={MainPage} />
        </Switch>
    );
};

export default AppRouter;
