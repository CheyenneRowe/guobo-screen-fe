import { getCookie } from '@src/common/utils'

export const checkIfLogin = () => {
    const token = getCookie('token');
    return token;
};

export const loginRedirect = {
    type:'RedirectToOther',
    url:'/auth/ai/login'
};