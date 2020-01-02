import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import omit from 'lodash/omit';
import BaseLayout from 'common/components/BaseLayout';
import NormalLayout from 'common/components/NormalLayout';

// pages
const Loading = () => <div>Loading...</div>;
const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'Home' */'pages/home'),
    loading: Loading
});
const Page2 = Loadable({
    loader: () => import(/* webpackChunkName: 'Page2' */'pages/page2'),
    loading: Loading
});
const Page3 = Loadable({
    loader: () => import(/* webpackChunkName: 'Page3' */'pages/page3'),
    loading: Loading
});
const Login = Loadable({
    loader: () => import(/* webpackChunkName: 'Login' */'pages/login'),
    loading: Loading
});
const P404 = Loadable({
    loader: () => import(/* webpackChunkName: 'P404' */'pages/404'),
    loading: Loading
});
// permissions: admin | user
const baseLayoutRoutes = [
    {
        path: '/',
        redirect: '/home',
        exact: true,
    },
    {
        title: 'Home',
        key: 'home',
        component: Home,
        path: '/home',
        permissions: ['user', 'admin'],
        exact: true
    },
    {
        title: 'page2',
        key: 'page2',
        component: Page2,
        path: '/page2',
        permissions: ['admin'],
        exact: true
    },
    {
        title: 'page3',
        key: 'page3',
        component: Page3,
        path: '/page3', // permissions 默认都有权限
        exact: true
    }
];

const normalLayoutRoutes = [
    {
        path: '/user/login',
        redirect: '/user/login',
        exact: true,
    },
    {
        title: 'Login',
        key: 'Login',
        component: Login,
        path: '/user/login',
        permissions: ['user', 'admin'],
        exact: true
    }
];

// 不同布局的路由
const routes = [
    {
        path: '/user',
        component: NormalLayout,
        routes: normalLayoutRoutes
    },
    {
        path: '/',
        component: BaseLayout,
        routes: baseLayoutRoutes,
        permissions: ['admin', 'user']
    }
];
// 修改Redirect的索引
function modifyRedirectIndex(arr) {
    if (!Array.isArray(arr)) return arr;
    const index404 = arr.findIndex(item => item.title === '404');
    const redirect = arr.find(item => item.redirect);
    const index = arr.indexOf(redirect);
    if (index > -1) {
        if (index404 === -1) {
            arr.splice(index, 1);
            arr.push(redirect);
            arr.push({
                title: '404',
                key: '404',
                component: P404,
            });
        }
    }
    return arr;
}
function renderRoutes(arr) {
    const routeArr = modifyRedirectIndex(arr);
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
