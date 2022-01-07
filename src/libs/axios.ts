import axios from "axios";

/* 实例化请求配置 */
const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    // "Access-Control-Allow-Origin-Type": "*",
  },
  // 请求时长
  timeout: 1000 * 30,
  // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
  baseURL: "",
  //     ? "测试"
  //     : "正式",
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

instance.interceptors.request.use(config => {
  return config
});

instance.interceptors.response.use(function (resp) {
  const config = resp.config
  const data = resp.data

  // if (config?.loading !== false) {
  //   store.dispatch('setLoading', false)
  // }

  // 是否直接返回原生axios内容
  // if (config.useRaw) {
  //   return resp
  // } else {
  //   return data
  // }
  return data
}, function (error) {
  const config = error.config
  if (config && !config.isSkip) {
    // todo
  }
  if (config && config.loading !== false) {
    // store.dispatch('setLoading', false)
  }
  return Promise.reject(error)
})

export default instance;
