import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const { checkIfLogin, loginRedirect } = require(`@src/app/utils/auth`);

// 这个组件将根据登录的情况, 返回一个路由
const PrivateRoute = ({ component: Component, ...props }) => {
    return (
        <Route
            {...props}
            render={(p) => {
                if (
                    process.env.NODE_ENV !== 'production' ||
                    !checkIfLogin ||
                    checkIfLogin()
                ) {
                    return <Component />;
                } else {
                    if (loginRedirect) {
                        switch (loginRedirect.type) {
                            case 'RedirectToOther':
                                window.location.href = loginRedirect.url;
                                return;
                            case 'Redirect':
                            default:
                                return (
                                    <Redirect
                                        to={{
                                            pathname:
                                                loginRedirect.url || '/login',
                                            state: {
                                                from: p.location.pathname,
                                            },
                                        }}
                                    />
                                );
                        }
                    }
                    return <Component />;
                }
            }}
        />
    );
};
export default PrivateRoute;
