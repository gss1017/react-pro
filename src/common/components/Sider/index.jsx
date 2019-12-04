// @flow
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import s from './index.scss';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const rootSubmenuKeys = []; // 支持多级目录

type menuT = {
    title: string,
    key: string,
    url?: string, // 选项要到达的地址
    level: number,
    icon?: string,
    childMenus?: Array<?menuT>
};

export type State = {
    openKeys?: Array<?string>
}

export type Props = {
    menus: Array<menuT>,
    logoUrl: string
};

export default class Sider extends React.Component<Props, State> {

    static defaultProps = {
        logoUrl: '/'
    };

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys: Array<string>) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        const a = {b: 1};
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
            console.log(a);
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    renderMenu(menu: menuT) {
        const title = (
            <span>
                {menu.icon && <Icon type={menu.icon} />}
                <span>{menu.title}</span>
            </span>
        );
        if (Array.isArray(menu.childMenus)) {
            return (
                <SubMenu key={`${menu.key}_${menu.level}`} title={title}>
                    {
                        menu.childMenus.map((item) => {
                            return this.renderMenu(item);
                        })
                    }
                </SubMenu>
            );
        } else {
            return (
                <MenuItem key={`${menu.key}_${menu.level}`}>
                    <Link to={menu.url}>{menu.title}</Link>
                </MenuItem>
            );
        }

    }

    render() {
        const {menus, logoUrl} = this.props;
        return (
            <aside className={s.layoutSideWrapper}>
                <a href="/" className={s.logo}>
                    <img src={logoUrl}/>
                </a>
                <div className={s.menuBtnWrapper}>
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{width: 240}}
                    >
                        {
                            menus.map((item) => {
                                rootSubmenuKeys.push(`${item.key}_${item.level}`);
                                return this.renderMenu(item);
                            })
                        }
                    </Menu>
                </div>
            </aside>
        );
    }

}
