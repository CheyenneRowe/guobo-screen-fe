import { isString } from 'lodash'
import moment from 'moment'

export const isBase64 = (url) =>
    typeof url === 'string' && url.indexOf(';') !== -1;

export const noop = () => {
    // 用于所有需要使用空函数的场景，避免重复创建函数
};

export const getLocalTime = time => {
    let formatTime = time
    if (time && isString(time) && time.indexOf(' +0000 UTC') !== -1) {
        formatTime = time.replace(' +0000 UTC', 'Z').replace(' ', 'T')
    }
    return moment.utc(formatTime).local()
}

export const getQueryString = (params, hasEncode = true) =>
    Object.keys(params)
        .filter((key) => params[key])
        .map(
            (key) =>
                `${key}=${hasEncode ? encodeURIComponent(params[key]) : params[key]}`
        )
        .join('&');

export const getFilterString = params =>
  Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== '')
    .map((key) => `${key}=${params[key]}`)
    .join(',');

    export const getCookie = (name) => {
      const strcookie = document.cookie; // 获取cookie字符串
      const arrcookie = strcookie.split('; '); // 分割
      // 遍历匹配
      for (let i = 0; i < arrcookie.length; i++) {
          const arr = arrcookie[i].split('=');
          if (arr[0] == name) {
              return arr[1];
          }
      }
      return null;
  }

  export const setCookie = (name, value) => {
      // 定义一天
      const days = 1;
      const exp = new Date();
      // 定义的失效时间，
      exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
      // 写入Cookie  ，toUMTstring将时间转换成字符串。
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString + ';path =/';
  }

export const safeParseJSON = (json, defaultValue) => {
    let result
    try {
        result = JSON.parse(json)
    } catch (e) { }

    if (!result && defaultValue !== undefined) {
        return defaultValue
    }
    return result
}
