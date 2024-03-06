import React from 'react';
import { Menu } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';

import './Menu-top.scss';

export default function MenuTop() {
    const menuApp = [
        {
            id: 1,
            name: 'Home',
            path: '/',
        },
        {
            id: 2,
            name: 'Search',
            path: '/search',
        },
        {
            id: 3,
            name: 'Popular',
            path: '/popular',
        },
        {
            id: 4,
            name: 'New Movies',
            path: '/new-movies',
        }
    ]

    return (
        <div className="menu-top">
            <div className="menu-top__logo">
                <Logo/>
            </div>
            <Menu
                className="menu-top__content"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
            >
                {menuApp.map((element, index) => (
                    <Menu.Item key={element.id}>
                        <Link to={element.path} key={index}>{element.name}</Link>
                    </Menu.Item>
                ))}    
            </Menu>
        </div>
    )
}