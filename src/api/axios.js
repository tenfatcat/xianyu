import axios from 'axios'
import router from '../router/router'
import Vue from 'vue'
const http = axios.create({
    baseURL : 'http://localhost:8888/api/private/v1/'
})
// 设置默认的请求头
// http.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')


// 请求拦截
http.interceptors.request.use(function (config) {
    // 开关变量,打开页面之后将变量关闭
    // flag = false
    // 发送请求前调用（发送请求做一些事）
    // 把你所有的请求拦下来
    // 拦下来给你加一个请求头，请求头的内容是token
    config.headers.Authorization = window.localStorage.getItem('token')
    // window.console.log('我调用了', config)
    return config;

}, function (error) {

    //发生错误的回调函数
    return Promise.reject(error);
});


// 响应拦截
// 开关变量,应用响应拦截会拦截每一次响应,一个页面发出多个请求就会有多个提示登录的信息弹出,用开关变量限制信息弹出次数
// let flag = false;
// http.interceptors.response.use(function (config) {
//     if(flag){
//         return config
//     }
//     // 响应请求前调用
//     // 把你所有的请求拦下来
//     // 拦下来给你加一个登录判断，
//     if(config.data.meta.status == 400 && config.data.meta.msg == "无效token"){
//         router.push('/login')
//       Vue.prototype.$message.error('请先登录')
//     //   开关变量,打开变量
//       flag = true;
//     }
//     // window.console.log('我调用了', config)
//     return config;

// }, function (error) {

//     //发生错误的回调函数
//     return Promise.reject(error);
// });




export const login = ({username,password})=>{
    return http.post('login',{
        username,
        password
    })
}

// 获取首页左侧菜单
export const menus = ()=>{
    return http.get('menus',{
        // headers:{
        //     Authorization:window.localStorage.getItem('token')
        // }
    })
}
export const users = ({query,pagenum,pagesize})=>{

    return http.get('users',{
        
        params:{
            query,
        pagenum,
        pagesize
        }
    })
}
export const adduser = ({username,password,email,mobile})=>{
    return http.post('users',{
        username,
        password,
        email,
        mobile
    })
}
export const userState = (uid,type)=>{
   return http.put(`users/${uid}/state/${type}`)
}
// 编辑用户
export const edituser = ({id,email,mobile})=>{
    return http.put(`users/${id}`,{
        email,
        mobile
    })
}
// 删除用户
export const deleteuser = (id)=>{
    return http.delete(`users/${id}`)
}
// 获取角色列表
export const checkroles = ()=>{
    return http.get('roles')
}
// 改变用户的角色
export const changeroles = ({id,rid})=>{
    return http.put(`users/${id}/role`,{
        rid
    })
}
// 获取所有 tag标签的权限
export const allright = (type)=>{
    return http.get(`rights/${type}`)
}
// 删除 tag标签的权限
export const delRight = (roleId,rightId)=>{
    return http.delete(`roles/${roleId}/rights/${rightId}`)
}
// 添加树形图 的权限
export const roleright = ({roleId,rids})=>{
    return http.post(`roles/${roleId}/rights`,{
        rids
    })
} 
// 添加角色
export const addplayer = ()=>{
    return http.post(`roles`,{
        roleName,
        roleDesc
    })
}
// 商品分类获取
export const getCategories = (type) =>{
    return http.get(`categories`,{
        params:{
            type
        }
    })
}

