import axios from 'axios'
const http = axios.create({
    baseURL : 'http://localhost:8888/api/private/v1/'
})


export const login = ({username,password})=>{
    return http.post('login',{
        username,
        password
    })
}

// 获取首页左侧菜单
export const menus = ()=>{
    return http.get('menus',{
        headers:{
            Authorization:window.localStorage.getItem('token')
        }
    })
}
export const users = ({query,pagenum,pagesize})=>{

    return http.get('users',{
        headers:{
            Authorization:window.localStorage.getItem('token')
        },
        params:{
            query,
        pagenum,
        pagesize
        }
    })
}