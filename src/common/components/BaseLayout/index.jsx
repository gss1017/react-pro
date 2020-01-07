import React from 'react';
import {Menu, Icon, Dropdown, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import Sider from 'common/components/Sider';
import Authorized from 'common/components/Authorized';
import menus from 'config/menuConfig';
import PageContainer from '../PageContainer';
import {getAuthorityFromRouter} from '../../utils/utils';
import s from './index.scss';

const BreadcrumbItem = Breadcrumb.Item;

const menu = (
    <Menu>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                设置
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            <Link to="/user">退出</Link>
        </Menu.Item>
    </Menu>
);

export default class BaseLayout extends React.Component {

    getBreadcrumbsData(breadcrumbs, routes) {
        const breadcrumbsPaths = [
            {
                name: 'Home',
                path: '/'
            }
        ];

        if (breadcrumbs) {
            breadcrumbs.forEach((path) => {
                routes.forEach((route) => {
                    if (
                        route.component && path === route.path
                    ) {
                        breadcrumbsPaths.push({
                            name: route.title,
                            path: route.path
                        });
                    }
                });
            });
        }

        return breadcrumbsPaths;
    }

    renderBreadcrumbs(breadcrumbsData) {
        const len = breadcrumbsData.length;
        return (
            <div className={s.breadcrumbContainer}>
                <Breadcrumb>
                    {
                        breadcrumbsData.map(({name, path}, index) => {
                            return len - 1 === index
                                ? (
                                    <BreadcrumbItem key={name}>
                                        {name}
                                    </BreadcrumbItem>
                                )
                                : (
                                    <BreadcrumbItem key={name}>
                                        <Link to={path}>{name}</Link>
                                    </BreadcrumbItem>
                                );
                        })
                    }
                </Breadcrumb>
            </div>
        );

    }

    render() {
        const {route, location} = this.props;
        const routeItem = getAuthorityFromRouter(route.routes, location.pathname || '/')
        || ({title: 'Not Found'});
        const breadcrumbsData = this.getBreadcrumbsData(routeItem.breadcrumbs, route.routes);
        return (
            <PageContainer title={routeItem.title}>
                <div className={s.layoutContainer}>
                    <Sider menus={menus} />
                    <main className={s.layoutContentWrapper}>
                        <header className={s.layoutHeaderWrapper}>
                            <div className={s.headerItemLeftWrapper}>
                                {this.renderBreadcrumbs(breadcrumbsData)}
                            </div>
                            <div className={s.headerItemRightWrapper}>
                                <Dropdown overlay={menu}>
                                    <span className={s.exitText}>
                                    Hover me
                                        {' '}
                                        <Icon type="down" />
                                    </span>
                                </Dropdown>
                            </div>
                        </header>
                        <section>
                            <Authorized authority={routeItem.permissions}>
                                {this.props.children}
                            </Authorized>
                        </section>
                        <footer>
                            footer
                        </footer>
                    </main>
                </div>
            </PageContainer>

        );
    }

}
