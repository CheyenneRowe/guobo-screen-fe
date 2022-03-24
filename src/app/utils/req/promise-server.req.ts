import { getCookie, generateHttpRequest } from '@src/common/utils';

/**
 * define http method for get/delete/post/put request
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */

function handleRequest(config) {
    // const token = getCookie('token');
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }
}

const $httpRequest = generateHttpRequest({
    handleRequest,
    baseURL: ''
});

export const PromiseServiceReq = {
    GET: function (url: string, params: any, headers?: any) {
        return $httpRequest('GET', url, params, headers);
    },
    POST: function (url: string, params: any, headers?: any) {
        return $httpRequest('POST', url, params, headers);
    },
    UPLOAD: function (
        url: string,
        params: any,
        headers?: any,
        onUploadProgress?: (progressEvent: ProgressEvent) => void
    ) {
        return $httpRequest('POST', url, params, headers, onUploadProgress);
    },
    PUT: function (url: string, params: any, headers?: any) {
        return $httpRequest('PUT', url, params, headers);
    },
    PATCH: function (url: string, params: any, headers?: any) {
        return $httpRequest('PATCH', url, params, headers);
    },
    DELETE: function (url: string, params: any, headers?: any) {
        return $httpRequest('DELETE', url, params, headers);
    }
};
