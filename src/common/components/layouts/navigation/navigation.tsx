import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.less';

export interface NavigationProps {
    location: any;
    collapsed: boolean;
    navs: Array<any>;
}

export interface NavigationState {
    openMenuIndex: number; // 当前打开的主菜单的index
    activedSubMenuIndex: string; // 当前选中的二级菜单的index(menuIndex + '-' + subIndex)
}

class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            openMenuIndex: 0,
            activedSubMenuIndex: '-1--1'
        };
    }

    componentDidMount() {
        this.openMenu()
    }

    componentDidUpdate(preProps) {
        if (preProps.location.pathname !== this.props.location.pathname) {
            this.openMenu();
        }

    }

    openMenu = () => {
        this.props.navs.forEach((menuItem:any, menuIndex) => {
            if (menuItem.hasSubMenu) {
                menuItem.subMenuArray.forEach((subItem, subIndex) => {
                    if (this.props.location.pathname.includes(subItem.key)) {
                        this.setState({
                            openMenuIndex: menuIndex,
                            activedSubMenuIndex: menuIndex + '-' + subIndex
                        });
                    }
                });
            } else if (this.props.location.pathname.includes(menuItem.key)) {
                this.setState({
                    openMenuIndex: menuIndex
                });
            }
        });
    }
    clickMenu = (menuitem, menuIndex) => {
        if (menuitem.hasSubMenu) {
            if (this.state.openMenuIndex === menuIndex) {
                this.setState({
                    openMenuIndex: -1
                });
            } else {
                this.setState({
                    openMenuIndex: menuIndex
                });
            }
        } else {
            this.setState({
                openMenuIndex: menuIndex,
                // collapsed: true
            });
        }
    }
    clickSubMenu = (menuIndex, subIndex) => {
        this.setState({
            activedSubMenuIndex: menuIndex + '-' + subIndex,
            // collapsed: true
        })
    }
    renderSubMenu = (menuitem, menuIndex) => {
        return (
            <ul className={menuitem.hasSubMenu && this.state.openMenuIndex === menuIndex ? 'sub-menu sub-menu-show' : 'sub-menu'}>
                {this.props.collapsed ?
                    <li className="sub-menu-header">
                        <Link to={ `/${menuitem.key}` } onClick={() => this.clickMenu(menuitem, menuIndex)}>
                            <div className="sub-menu-header-title">{ menuitem.name}</div>
                        </Link>
                    </li>
                : null}
                {menuitem?.hasSubMenu && menuitem?.subMenuArray.map((subitem, subIndex) => {
                    return (
                        <li className="sub-menu-item" key={subIndex}>
                            <Link className={this.state.activedSubMenuIndex === `${menuIndex}-${subIndex}` ? 'sub-menu-title sub-menu-actived' : 'sub-menu-title'} to={ `/${menuitem.key}/${subitem.key}` } onClick={() => this.clickSubMenu(menuIndex, subIndex)}>
                                <span>{subitem.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
    render = () => {
        console.log('render', this.props.location);

        return (
            <ul id="nav-menu">
                {this.props.navs.map((menuitem, menuIndex) => {
                    return (
                        <li className="menu-item" key={menuIndex}>
                            <Link to={`/${menuitem.key}`} className={this.state.openMenuIndex === menuIndex ? 'menu-title menu-actived' : 'menu-title'} onClick={() => this.clickMenu(menuitem, menuIndex)}>
                                <menuitem.icon className="menu-icon" />
                                {!this.props.collapsed ? <span className="menu-text">{ menuitem.name }</span> : null}
                                {!this.props.collapsed && menuitem.hasSubMenu ? <span className="arrow-icon iconfont iconzhankai" ></span> : ''}
                            </Link>
                            {this.renderSubMenu(menuitem, menuIndex)}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Navigation;
