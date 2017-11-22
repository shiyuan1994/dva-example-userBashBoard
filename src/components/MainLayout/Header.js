import React from 'react';
import {Menu,Icon} from 'antd';
import {Link} from 'dva/router';

function Header ({location}){
    return(
        <Menu
            mode='horizontal'
            theme='dark'
            selectedKeys={[location.pathname]}
        >
            <Menu.Item key='/users'>
                <Link to='/users'><Icon type='bars'>Users</Icon></Link>
            </Menu.Item>
            <Menu.Item key='/'>
                <Link to='/'><Icon type='home'>Home</Icon></Link>
            </Menu.Item>
            <Menu.Item key='404'>
                <Link to='/page-you-dont-know'><Icon type='frown-circle'>404</Icon></Link>
            </Menu.Item>
            <Menu.Item key='/antd'>
                 <a href="https://github.com/dvajs/dva">dva</a>
            </Menu.Item>
        </Menu>
    );  
}

export default Header;