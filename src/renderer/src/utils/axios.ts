import axios from 'axios'
import { getToken, getUserId } from './auth'
import { useUserStore } from '../store'

const TOKEN_HEADER = 'x-auth-token'
const USERID_HEADER = 'x-auth-user-id'
const CLIENT_HEADER = 'x-client'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
// _axios.defaults.adapter = adapter

// const getParamsSerializer = params => qs.stringify(params,{indices:false})
// 请求拦截器
_axios.interceptors.request.use(
  function success(config) {
    const token = getToken()
    const userId = getUserId()
    // if(token){
    //   setToken(token)
    // }
    // 添加用户token
    config.headers[TOKEN_HEADER] = token
    config.headers[USERID_HEADER] = userId
    config.headers[CLIENT_HEADER] = 'pc'
    // get请求格式化(具体根据后端接口参数要求)
    // if(config.method.toLowerCase() === 'get'){
    //   config.paramsSerializer = getParamsSerializer
    // }
    return config
  },
  function fail(error) {
    console.log(error)
    return Promise.reject(error)
  }
)

// function checkToken(response){
//   const token = response.headers[TOKEN_HEADER]
//   setToken(token)
// }

// 响应拦截器
_axios.interceptors.response.use(
  function success(response) {
    // if(!getToken()) {
    //   checkToken(response)
    // }
    // console.log(response)
    const data = response.data
    return data
  },
  function fail(error) {
    const resp = error.response
    if (!resp) {
      console.log('网络请求失败')
      return Promise.reject(error)
    }
    // else {
    //   checkToken(resp)
    // }
    if (resp.status === 401) {
      useUserStore().logout('passive')
    } else if (resp.status === 403) {
      console.log('对不起，你没有权限进行此操作')
    } else {
      if (resp.data.message) {
        console.log(resp.data.message)
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default _axios
