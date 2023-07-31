import {
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_REQUEST_FAILED,
    FORGOT_PASS_REQUEST_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST, LOGOUT_REQUEST_FAILED,
    LOGOUT_REQUEST_SUCCESS,
    PASS_RESET_REQUEST,
    PASS_RESET_REQUEST_FAILED,
    PASS_RESET_REQUEST_SUCCESS,
    REG_REQUEST,
    REG_REQUEST_FAILED,
    REG_REQUEST_SUCCESS,
    TOKEN_REFRESH_REQUEST,
    TOKEN_REFRESH_REQUEST_FAILED,
    TOKEN_REFRESH_REQUEST_SUCCESS,
    USER_REQUEST,
    USER_REQUEST_FAILED,
    USER_REQUEST_SUCCESS,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_REQUEST_FAILED,
    UPDATE_USER_INFO_REQUEST_SUCCESS
} from "../actions/constants/auth";
import {User} from "../types/data";
import {AuthActions} from "../actions/auth";

export type AuthState = {
    user: null | User;
    regRequest: boolean;
    regFailed: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
    userRequest: boolean;
    tokenLoad: boolean;
    userRequestFailed: boolean;
    tokenRefreshRequest: boolean;
    tokenRefreshFailed: boolean;
    forgotPassRequest: boolean;
    forgotPassSuccess: boolean;
    forgotPassFailed: boolean;
    passResetRequest: boolean;
    passResetSuccess: boolean;
    passResetFailed: boolean;
    updateUserInfoRequest: boolean;
    updateUserInfoFailed: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;
}

export const initialState: AuthState = {
    user: null,
    regRequest: false,
    regFailed: false,
    loginRequest: false,
    loginFailed: false,
    userRequest: false,
    tokenLoad: false,
    userRequestFailed: false,
    tokenRefreshRequest: false,
    tokenRefreshFailed: false,
    forgotPassRequest: false,
    forgotPassSuccess: false,
    forgotPassFailed: false,
    passResetRequest: false,
    passResetSuccess: false,
    passResetFailed: false,
    updateUserInfoRequest: false,
    updateUserInfoFailed: false,
    logoutRequest: false,
    logoutFailed: false,
};

export const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case REG_REQUEST: {
            return {
                ...state,
                regRequest: true,
            };
        }
        case REG_REQUEST_SUCCESS: {
            return {
                ...state,
                regRequest: false,
                regFailed: false,
                user: action.user
            };
        }
        case REG_REQUEST_FAILED: {
            return {
                ...state,
                regFailed: true,
                regRequest: false,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
            };
        }
        case LOGIN_REQUEST_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                user: action.user
            };
        }
        case LOGIN_REQUEST_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
            };
        }
        case USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                tokenLoad: false
            };
        }
        case USER_REQUEST_SUCCESS: {
            return {
                ...state,
                userRequest: false,
                userRequestFailed: false,
                tokenLoad: true,
                user: action.user
            };
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userRequestFailed: true,
                tokenLoad: true,
                userRequest: false,
            };
        }
        case TOKEN_REFRESH_REQUEST: {
            return {
                ...state,
                tokenRefreshRequest: true,
            };
        }
        case TOKEN_REFRESH_REQUEST_SUCCESS: {
            return {
                ...state,
                tokenRefreshRequest: false,
                tokenRefreshFailed: false,
            };
        }
        case TOKEN_REFRESH_REQUEST_FAILED: {
            return {
                ...state,
                tokenRefreshFailed: true,
                tokenRefreshRequest: false,
            };
        }
        case FORGOT_PASS_REQUEST: {
            return {
                ...state,
                forgotPassRequest: true,
            };
        }
        case FORGOT_PASS_REQUEST_SUCCESS: {
            return {
                ...state,
                forgotPassSuccess: true,
                forgotPassRequest: false,
                forgotPassFailed: false,
            };
        }
        case FORGOT_PASS_REQUEST_FAILED: {
            return {
                ...state,
                forgotPassFailed: true,
                forgotPassRequest: false,
            };
        }
        case PASS_RESET_REQUEST: {
            return {
                ...state,
                passResetRequest: true,
            };
        }
        case PASS_RESET_REQUEST_SUCCESS: {
            return {
                ...state,
                passResetSuccess: true,
                passResetRequest: false,
                passResetFailed: false,
            };
        }
        case PASS_RESET_REQUEST_FAILED: {
            return {
                ...state,
                passResetFailed: true,
                passResetRequest: false,
            };
        }
        case UPDATE_USER_INFO_REQUEST: {
            return {
                ...state,
                updateUserInfoRequest: true,
            };
        }
        case UPDATE_USER_INFO_REQUEST_SUCCESS: {
            return {
                ...state,
                user: action.user,
                updateUserInfoRequest: false,
                updateUserInfoFailed: false,
            };
        }
        case UPDATE_USER_INFO_REQUEST_FAILED: {
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            };
        }
        case LOGOUT_REQUEST_SUCCESS: {
            return {
                ...state,
                user: null,
                logoutRequest: false,
                logoutFailed: false,
            };
        }
        case LOGOUT_REQUEST_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            };
        }
        default: {
            return state;
        }
    }
}
