import {
    FORGOT_PASS_REQUEST, FORGOT_PASS_REQUEST_FAILED, FORGOT_PASS_REQUEST_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS, PASS_RESET_REQUEST, PASS_RESET_REQUEST_FAILED, PASS_RESET_REQUEST_SUCCESS,
    REG_REQUEST,
    REG_REQUEST_FAILED,
    REG_REQUEST_SUCCESS,
    TOKEN_REFRESH_REQUEST, TOKEN_REFRESH_REQUEST_FAILED,
    TOKEN_REFRESH_REQUEST_SUCCESS,
    TOKEN_REQUEST,
    TOKEN_REQUEST_FAILED,
    TOKEN_REQUEST_SUCCESS, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_REQUEST_FAILED, UPDATE_USER_INFO_REQUEST_SUCCESS
} from "../actions/auth";

const initialState = {
    user: null,
    regRequest: false,
    regFailed: false,
    loginRequest: false,
    loginFailed: false,
    tokenRequest: false,
    tokenLoad: false,
    tokenFailed: false,
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
};

export const authReducer = (state = initialState, action) => {
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
        case TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true,
                tokenLoad: false
            };
        }
        case TOKEN_REQUEST_SUCCESS: {
            return {
                ...state,
                tokenRequest: false,
                tokenFailed: false,
                tokenLoad: true,
                user: action.user
            };
        }
        case TOKEN_REQUEST_FAILED: {
            return {
                ...state,
                tokenFailed: true,
                tokenLoad: true,
                tokenRequest: false,
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
        default: {
            return state;
        }
    }
}
