import * as userService from '../services/users';

export default {
    namespace:'users',
    state:{
        list:[],
        total:null,
        page:null
    },
    reducers:{      
        /**
         * 为什么使用data：list
         */
        save:(state,{ payload:{ data:list,total,page }}) =>{
            return {...state, list , total , page };    
        }
    },
    effects:{
        //获取用户数据
        *fetch( { payload:{ page=1 } },{call,put} ){
            const {data,headers} = yield call(userService.fetch, {page} );
            yield put({
                type:'save',
                payload:{
                    data,
                    total:parseInt(parseInt(headers['x-total-count']),10),
                    page:parseInt(page,10)
                }
            });
        },
        *remove({ payload: id },{call,put}){
            yield call(userService.remove,id);
            yield put({type:'reload'});
        },
        *reload(action,{put,select}){
            const page =yield select( state => state.users.page);
            yield put({
                type:'fetch',
                payload:page
            })
        },
        *create({payload:values},{call,put}){
            yield call(userService.create,values);
            yield put({
                type:'reload'
            })
        },
        *patch({ payload: {id,values}} ,{put,call}){
            yield call(userService.patch,id,values);
            yield put({type:'reload'});
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname,query}) =>{  //query:{page:'2'}
                if(pathname==='/users'){
                    dispatch({
                        type:'fetch',
                        payload:query
                    });
                }
            });
        }
    }
}