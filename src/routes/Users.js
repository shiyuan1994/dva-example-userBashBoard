import React from 'react';
import UserComponent from '../components/Users/User';
import MainLayout from '../components/MainLayout/MainLayout';

import styles from './Users.css';

import {connect} from 'dva';


function Users ({location}){
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
               <UserComponent />
            </div>
        </MainLayout>
    );
}

export default connect()(Users);