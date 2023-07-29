import {checkResponse, getCookie, request, saveTokens, setCookie} from "../../utils/help-methods";
import {
    BASE_URL,
    FORGOT_PASS_POINT,
    LOGIN_POINT, LOGOUT_POINT,
    REG_POINT,
    RESET_PASS_POINT,
    TOKEN_POINT,
    USER_POINT
} from "../../utils/constants";
import {
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_REQUEST_FAILED,
    FORGOT_PASS_REQUEST_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST, LOGOUT_REQUEST_FAILED, LOGOUT_REQUEST_SUCCESS,
    PASS_RESET_REQUEST,
    PASS_RESET_REQUEST_FAILED,
    PASS_RESET_REQUEST_SUCCESS,
    REG_REQUEST,
    REG_REQUEST_FAILED,
    REG_REQUEST_SUCCESS, TOKEN_REFRESH_REQUEST, TOKEN_REFRESH_REQUEST_FAILED, TOKEN_REFRESH_REQUEST_SUCCESS,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_REQUEST_FAILED,
    UPDATE_USER_INFO_REQUEST_SUCCESS,
    USER_REQUEST, USER_REQUEST_FAILED, USER_REQUEST_SUCCESS
} from "./constants/auth";
import {User} from "../types/data";
import {AppDispatch, AppThunk} from "../types";

export interface RegRequestAction {
    readonly type: typeof REG_REQUEST;
}

export interface RegRequestSuccessAction {
    readonly type: typeof REG_REQUEST_SUCCESS;
    readonly user: User
}

export interface RegRequestFailedAction {
    readonly type: typeof REG_REQUEST_FAILED;
}

export interface LoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface LoginRequestSuccessAction {
    readonly type: typeof LOGIN_REQUEST_SUCCESS;
    readonly user: User
}

export interface LoginRequestFailedAction {
    readonly type: typeof LOGIN_REQUEST_FAILED;
}

export interface UserRequestAction {
    readonly type: typeof USER_REQUEST;
}

export interface UserRequestSuccessAction {
    readonly type: typeof USER_REQUEST_SUCCESS;
    readonly user: User
}

export interface UserRequestFailedAction {
    readonly type: typeof USER_REQUEST_FAILED;
}

export interface TokenRefreshRequestAction {
    readonly type: typeof TOKEN_REFRESH_REQUEST;
}

export interface TokenRefreshRequestSuccessAction {
    readonly type: typeof TOKEN_REFRESH_REQUEST_SUCCESS;
}

export interface TokenRefreshRequestFailedAction {
    readonly type: typeof TOKEN_REFRESH_REQUEST_FAILED;
}

export interface ForgotPassRequestAction {
    readonly type: typeof FORGOT_PASS_REQUEST;
}

export interface ForgotPassRequestSuccessAction {
    readonly type: typeof FORGOT_PASS_REQUEST_SUCCESS;
}

export interface ForgotPassRequestFailedAction {
    readonly type: typeof FORGOT_PASS_REQUEST_FAILED;
}

export interface PassResetRequestAction {
    readonly type: typeof PASS_RESET_REQUEST;
}

export interface PassResetRequestSuccessAction {
    readonly type: typeof PASS_RESET_REQUEST_SUCCESS;
}

export interface PassResetRequestFailedAction {
    readonly type: typeof PASS_RESET_REQUEST_FAILED;
}

export interface UpdateUserInfoRequestAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}

export interface UpdateUserInfoRequestSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST_SUCCESS;
    readonly user: User
}

export interface UpdateUserInfoRequestFailedAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST_FAILED;
}

export interface LogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface LogoutRequestSuccessAction {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export interface LogoutRequestFailedAction {
    readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export type AuthActions =
    | RegRequestAction
    | RegRequestSuccessAction
    | RegRequestFailedAction
    | LoginRequestAction
    | LoginRequestSuccessAction
    | LoginRequestFailedAction
    | UserRequestAction
    | UserRequestSuccessAction
    | UserRequestFailedAction
    | TokenRefreshRequestAction
    | TokenRefreshRequestSuccessAction
    | TokenRefreshRequestFailedAction
    | ForgotPassRequestAction
    | ForgotPassRequestSuccessAction
    | ForgotPassRequestFailedAction
    | PassResetRequestAction
    | PassResetRequestSuccessAction
    | PassResetRequestFailedAction
    | UpdateUserInfoRequestAction
    | UpdateUserInfoRequestSuccessAction
    | UpdateUserInfoRequestFailedAction
    | LogoutRequestAction
    | LogoutRequestSuccessAction
    | LogoutRequestFailedAction;



export const getNewReg: AppThunk = (params: any) => {
    return function(dispatch: AppDispatch) {
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

export const getLogin = (params: any) => {
    return function(dispatch: AppDispatch) {
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

export const getForgotPass: AppThunk = (params: any) => {
    return function(dispatch: AppDispatch) {
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

export const getResetPass: AppThunk = (params: any) => {
    return function(dispatch: AppDispatch) {
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

export const updateUserInfo: AppThunk = (params: any) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST
        });

        fetchWithRefresh(BASE_URL + USER_POINT, {
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
                dispatch({
                    type: UPDATE_USER_INFO_REQUEST_FAILED
                });
            });
    }
}

export const getUserRequest: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: USER_REQUEST
        });

        fetchWithRefresh(BASE_URL + USER_POINT, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: getCookie('accessToken')
            },
        }).then(data => {
            dispatch(
                {
                    type: USER_REQUEST_SUCCESS,
                    user: data.user
                })
        })
            .catch((err) => {
                dispatch({
                    type: USER_REQUEST_FAILED
                });
            });
    }
}

export const refreshToken = () => {
    return request(BASE_URL + TOKEN_POINT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    });
}

export const fetchWithRefresh = async (url: string, options: any) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.status === 403) {
            const refreshData = await refreshToken();
            saveTokens(refreshData.refreshToken, refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const logoutRequest: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });

        request(BASE_URL + LOGOUT_POINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        }).then(data => {
            setCookie('refreshToken', null, {expires: -1});
            setCookie('accessToken', null, {expires: -1});
            dispatch(
                {
                    type: LOGOUT_REQUEST_SUCCESS
                });
        })
            .catch(() => dispatch({type: LOGOUT_REQUEST_FAILED}));
    }
}
