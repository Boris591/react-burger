import {getCookie, request, saveTokens} from "../../utils/help-methods";
import {
    BASE_URL,
    FORGOT_PASS_POINT,
    LOGIN_POINT,
    REG_POINT,
    RESET_PASS_POINT,
    TOKEN_POINT,
    USER_POINT
} from "../../utils/constants";

export const REG_REQUEST = 'REG_REQUEST';
export const REG_REQUEST_SUCCESS = 'REG_REQUEST_SUCCESS';
export const REG_REQUEST_FAILED = 'REG_REQUEST_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const TOKEN_REQUEST_FAILED = 'TOKEN_REQUEST_FAILED';
export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_REQUEST_SUCCESS = 'TOKEN_REFRESH_REQUEST_SUCCESS';
export const TOKEN_REFRESH_REQUEST_FAILED = 'TOKEN_REFRESH_REQUEST_FAILED';
export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_REQUEST_SUCCESS = 'FORGOT_PASS_REQUEST_SUCCESS';
export const FORGOT_PASS_REQUEST_FAILED = 'FORGOT_PASS_REQUEST_FAILED';
export const PASS_RESET_REQUEST = 'FORGOT_PASS_RESET_REQUEST';
export const PASS_RESET_REQUEST_SUCCESS = 'FORGOT_PASS_RESET_REQUEST_SUCCESS';
export const PASS_RESET_REQUEST_FAILED = 'FORGOT_PASS_RESET_REQUEST_FAILED';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_REQUEST_SUCCESS = 'UPDATE_USER_INFO_REQUEST_SUCCESS';
export const UPDATE_USER_INFO_REQUEST_FAILED = 'UPDATE_USER_INFO_REQUEST_FAILED';

export const getNewReg = (params) => {
    return function(dispatch) {
        dispatch({
            type: REG_REQUEST
        });

        request(BASE_URL + REG_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params),
        }).then(data => {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch(
                {
                    type: REG_REQUEST_SUCCESS,
                    user: data.user
                })
            })
            .catch(() => dispatch({type: REG_REQUEST_FAILED}));
    }
}

export const getLogin = (params) => {
    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        request(BASE_URL + LOGIN_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params),
        }).then(data => {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch(
                {
                    type: LOGIN_REQUEST_SUCCESS,
                    user: data.user
                })
        })
            .catch(() => dispatch({type: LOGIN_REQUEST_FAILED}));
    }
}

export const getForgotPass = (params) => {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASS_REQUEST
        });

        request(BASE_URL + FORGOT_PASS_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params),
        }).then(data => {
            dispatch(
                {
                    type: FORGOT_PASS_REQUEST_SUCCESS
                })
        })
            .catch(() => dispatch({type: FORGOT_PASS_REQUEST_FAILED}));
    }
}

export const getResetPass = (params) => {
    return function(dispatch) {
        dispatch({
            type: PASS_RESET_REQUEST
        });

        request(BASE_URL + RESET_PASS_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params),
        }).then(data => {
            dispatch(
                {
                    type: PASS_RESET_REQUEST_SUCCESS
                })
        })
            .catch(() => dispatch({type: PASS_RESET_REQUEST_FAILED}));
    }
}

export const updateUserInfo = (params) => {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST
        });

        request(BASE_URL + USER_POINT, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: getCookie('accessToken')
            },
            body: JSON.stringify(params),
        }).then(data => {
            dispatch(
                {
                    type: UPDATE_USER_INFO_REQUEST_SUCCESS,
                    user: data.user
                })
        })
            .catch((err) => {
                if (err.status === 403) {
                    dispatch(refreshTokenRequest(params));
                }else {
                    dispatch({
                        type: UPDATE_USER_INFO_REQUEST_FAILED
                    });
                }
            });
    }
}

export const getTokenRequest = () => {
    return function(dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });

        request(BASE_URL + USER_POINT, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: getCookie('accessToken')
            },
        }).then(data => {
            dispatch(
                {
                    type: TOKEN_REQUEST_SUCCESS,
                    user: data.user
                })
        })
            .catch((err) => {
                if (err.status === 403) {
                    dispatch(refreshTokenRequest());
                }else {
                    dispatch({
                        type: TOKEN_REQUEST_FAILED
                    });
                }
            });
    }
}

export const refreshTokenRequest = (info=false) => {
    return function(dispatch) {
        dispatch({
            type: TOKEN_REFRESH_REQUEST
        });

        request(BASE_URL + TOKEN_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        }).then(data => {
            saveTokens(data.refreshToken, data.accessToken);
            dispatch(
                {
                    type: TOKEN_REFRESH_REQUEST_SUCCESS
                });
            if(!info){
                dispatch(getTokenRequest());
            }else{
                dispatch(updateUserInfo(info));
            }
        })
            .catch(() => dispatch({type: TOKEN_REFRESH_REQUEST_FAILED}));
    }
}
