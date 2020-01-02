import React from 'react';
import Loadable from 'react-loadable';
import BaseLayout from 'common/components/BaseLayout';
import NormalLayout from 'common/components/NormalLayout';

const Loading = () => <div>Loading...</div>;
const LazyLoad = loader => Loadable({
    loader,
    loading: Loading
});

// pages
const Home = LazyLoad(() => import(/* webpackChunkName: 'Home' */'pages/home'));
const Page2 = LazyLoad(() => import(/* webpackChunkName: 'Page2' */'pages/page2'));
const Page3 = LazyLoad(() => import(/* webpackChunkName: 'Page3' */'pages/page3'));
const Login = LazyLoad(() => import(/* webpackChunkName: 'Login' */'pages/login'));
const P404 = LazyLoad(() => import(/* webpackChunkName: 'P404' */'pages/404'));

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
        path: '/user',
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
    },
    {
        title: 'Login Out',
        key: 'loginOut',
        component: Page3,
        path: '/user/loginOut',
        exact: true
    }
];

// 不同布局的路由
export const routes = [
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
export function modifyRedirectIndex(arr) {
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
