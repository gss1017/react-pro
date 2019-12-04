import React from 'react';
import {Menu, Icon, Dropdown} from 'antd';
import Sider from 'common/components/Sider';
import menus from 'config/menuConfig';
import s from './index.scss';

const menu = (
    <Menu>
        <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                设置
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            退出
        </Menu.Item>
    </Menu>
);

export default class BaseLayout extends React.Component {

    render() {
        return (
            <div className={s.layoutContainer}>
                <Sider menus={menus} />
                <main className={s.layoutContentWrapper}>
                    <header className={s.layoutHeaderWrapper}>
                        <div className={s.headerItemLeftWrapper}>
                            左边的功能
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
                        {this.props.children}
                    </section>
                    <footer>
                        footer
                    </footer>
                </main>
            </div>
        );
    }

}
