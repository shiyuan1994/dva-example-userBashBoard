import React from 'react';
import styles from './User.css';
import {connect} from 'dva';
import {Table,Button,Pagination ,Popconfirm,} from 'antd';
import UserEditModal from './UserModal';
import {routerRedux} from 'dva/router';
import {PAGE_SIZE} from '../../constants';

/**
 * list: dataSource   相当于赋值一样，只写list，效果也是一样的
 */
function Users ({dispatch,list:dataSource,loading,total,page:current}){
    
    //分页器
    /**
     * @param {*} page :改变后的页数
     * Pagination组件中的onChange方法：是页码改变后的回调，参数是改变后的页码及每页显示的条数
     *      Function(page, pageSize)
     */
    function changePage(page){
        dispatch( routerRedux.push({
            pathname:'/users',
            query:{ page }
        }));
    }

    //创建一个用户
    function createUser(values){
        dispatch({
            type:'users/create',
            payload:{values}
        });
    }

    //编辑一个用户
    function editUser(id,values){
        dispatch({
            type:'users/patch',
            payload:{id,values}
        })
    }

    //删除一个用户
    function deleteUser(id){
        dispatch({
            type:'users/delete',
            payload:id
        })
    }

    const columns=[
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            render:text => <a href=''>{text}</a>
        },
        {
            title:'Email',
            dataIndex:'email',
            key:'email'
        },
        {
            title:'Website',
            dataIndex:'website',
            key:'website'
        },
        {
            title:'Operation',
            dataIndex:'operation',
            key:'operation',
            render:(text,record) => (
                <span className={styles.operation}>
                    <UserEditModal record={{}} onEdit={editUser.bind(null,record.id)}>
                        <a href=''>编辑</a>
                    </UserEditModal>
                    <Popconfirm
                        title='确认删除吗?'
                        onConfirm={deleteUser.bind(null,record.id)}
                    >
                        <a href=''>删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ];
    return(
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <UserEditModal createUser={createUser}>
                        <Button type='primary'>create User</Button>
                    </UserEditModal>
                </div>
                <Table 
                    columns={columns}
                    pagination={false}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={ record =>record.id }
                />
                <Pagination 
                    className='antd-table-pagination'
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={changePage}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state){
    const {list,total,page} = state.users;
    return{
        list,
        total,
        page,
        loading:state.loading.models.users
    }
}

export default connect(mapStateToProps)(Users);