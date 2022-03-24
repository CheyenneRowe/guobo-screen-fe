import axios, { Method } from 'axios';
import qs from 'qs';

const defaultHeaders = () => ({
    // "Content-Type": "application/json"
});

export const generateHttpRequest = function ({
    handleRequest = (config) => { },
    handleResponseError = (err) => { },
    baseURL = ''
} = {}) {
    const http = axios.create({
        baseURL: process.env.NODE_ENV === "production" ? baseURL : '/api' + baseURL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 拦截器
    http.interceptors.request.use(
        function (config) {
            handleRequest && handleRequest(config);
            return config;
        },
        function (error) {
            // 响应错误
            console.error(error);
            return Promise.reject(error);
        }
    );
    http.interceptors.response.use(
        function (response) {
            console.log(response);
            // 响应数据
            return response.data;
        },
        function (error) {
            // 响应错误
            console.error(error);
            if (error.response) {
                handleResponseError && handleResponseError(error.response)
            }
            return Promise.reject(error);
        }
    );

    /**
     * define http method for get/delete/post/put request
     * @param method
     * @param url
     * @param data
     * @param headers
     * @returns {Promise}
     */
    function $httpRequest(
        method: Method,
        url: string,
        params: any,
        headers?: any,
        onUploadProgress?: (progressEvent: ProgressEvent) => void,
        cancelToken?: any // TODO: type def
    ) {
        return http({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' || method === 'PATCH' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            headers: headers || defaultHeaders(),
            onUploadProgress,
            cancelToken
        });
    }
    return $httpRequest;
}

const $httpRequest = generateHttpRequest();

/**
 * define http method for get/delete/post/put request
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */

export const GET = function (url: string, params: any, headers?: any) {
    return $httpRequest('GET', url, params, headers);
};
export const POST = function (url: string, params: any, headers?: any) {
    return $httpRequest('POST', url, params, headers);
};
export const UPLOAD = function (
    url: string,
    params: any,
    headers?: any,
    onUploadProgress?: (progressEvent: ProgressEvent) => void
) {
    return $httpRequest('POST', url, params, headers, onUploadProgress);
};
export const PUT = function (url: string, params: any, headers?: any) {
    return $httpRequest('PUT', url, params, headers);
};
export const PATCH = function (url: string, params: any, headers?: any) {
    return $httpRequest('PATCH', url, params, headers);
};
export const DELETE = function (url: string, params: any, headers?: any) {
    return $httpRequest('DELETE', url, params, headers);
};
