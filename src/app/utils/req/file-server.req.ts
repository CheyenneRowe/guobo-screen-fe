import { getCookie, generateHttpRequest } from '@src/common/utils';
import { jwtDecode } from '@src/common/utils/jwt-decode'

/**
 * define http method for get/delete/post/put request
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */

function handleRequest(config) {
    const token = getCookie('token');
    const { username } = jwtDecode(token || '');
    if (username) {
        config.headers['UserName'] = username;
    }
}

const $httpRequest = generateHttpRequest({
    handleRequest,
    baseURL: '/dataload'
});

export const FileServerReq = {
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
        onUploadProgress?: (progressEvent: ProgressEvent) => void,
        cancelToken?: any
    ) {
        return $httpRequest('POST', url, params, headers, onUploadProgress, cancelToken);
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
