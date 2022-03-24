import * as React from 'react';
import { Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import './header.less';

export interface HeaderProps {
    collapsed: boolean;
    username: string;
    toggleCollapsedState(): void;
    showLogoutMenu?: boolean;
    handleLogout?(): void;
}

class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <header id="header">
                <span className="nav-trigger">
                    {this.props.collapsed ?
                        <MenuUnfoldOutlined onClick={this.props.toggleCollapsedState} /> :
                        <MenuFoldOutlined onClick={this.props.toggleCollapsedState} />
                    }
                </span>
                <Menu className="user-info" mode="horizontal">
                    <Menu.SubMenu title={this.props.username || 'username'} >
                        {
                            this.props.showLogoutMenu ? (
                                <Menu.Item className="logout" key="logout" style={{ textAlign: "center" }} onClick={this.props.handleLogout}>
                                    <span>logout</span>
                                </Menu.Item>
                            ) : null
                        }
                    </Menu.SubMenu>
                </Menu>
            </header>
        );
    }
}

export default Header;
