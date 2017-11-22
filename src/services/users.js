import req from '../utils/request';
import {PAGE_SIZE} from '../constants';

//获取用户数据
//加括号代表对象中的某一项参数，，解构赋值
export function fetch( { page } ){
    return req('/api/users?_page=${ page }&_limit=${PAGE_SIZE}');
}

//删除某条用户数据
export function remove(id){
    return req('/api/users/${id}',{
        method:'DELETE'
    });
}   

//更新某条用户数据
export function patch(id,values){
    return req('/api/users/${id}',{
        method:'PATCH',
        body:JSON.stringify(values)
    });
}

//增加一条用户数据
export function create (values){
    return req('/api/users',{
        method:'POST',
        body:JSON.stringify(values)
    });
}