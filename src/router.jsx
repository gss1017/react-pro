import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import omit from 'lodash/omit';
import {routes, modifyRedirectIndex} from 'config/routerConfig';

function renderRoutes(routeItems) {
    const routeArr = modifyRedirectIndex(routeItems);
    return routeArr
        ? (
            <Switch>
                {routeArr.map((route, i) => {
                    const {component: Component} = route;
                    const currentProps = omit({...route}, 'component');
                    if (route.redirect) {
                        return (
                            <Redirect
                                key={route.key || i}
                                form={route.path}
                                to={route.redirect}
                                exact={route.exact}
                            />
                        );
                    }
                    return (
                        <Route
                            key={i}
                            {...currentProps}
                            component={(props) => {
                                const childRoutes = renderRoutes(route.routes);
                                if (route.component) {
                                    return (
                                        <Component {...props} route={route}>
                                            {childRoutes}
                                        </Component>
                                    );
                                } else {
                                    return childRoutes;
                                }
                            }}
                        />
                    );
                })}
            </Switch>
        )
        : null;
}

export default function Router(props) {
    return (
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    );
}
