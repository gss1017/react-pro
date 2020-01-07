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

/*
* @title [string] 页面和面包屑名称
* @key [string]
* @component [React.Node] 页面元素
* @path [string] 页面元素
* @permissions [Array<string>] 页面可访问的权限 默认所有权限
* @exact [boolean] 路由是否严格匹配 route 的一个props
* route 的其他props...
* */
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
        exact: true,
        breadcrumbs: ['/page2']
    },
    {
        title: 'page3',
        key: 'page3',
        component: Page3,
        path: '/page3', // permissions 默认都有权限
        exact: true,
        breadcrumbs: ['/page3']
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

// todo 因为 redirect 标签先挂载，404的 route 没有生效
// 解决办法 将 redirect 拆分出来单独做处理
// 修改Redirect的索引
export function modifyRedirectIndex(arr) {
    if (!Array.isArray(arr)) return arr;
    const index404 = arr.findIndex(item => item.title === '404');
    const redirect = arr.find(item => item.redirect);
    const index = arr.indexOf(redirect);
    if (index404 === -1) {
        if (index > -1) {
            arr.splice(index, 1);
            arr.push(redirect);
        }
        arr.push({
            title: '404',
            key: '404',
            component: P404
        });
    }
    return arr;
}
