import {authReducer} from "./auth";
import * as types from '../actions/constants/auth';


const initialState = {
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

describe('authReducer', () => {
    it('should return initialState', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle REG_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.REG_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                regRequest: true,
            })
        );
    });

    it('should handle REG_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.REG_REQUEST_SUCCESS,
                user: {name: 'test', email: 'test@test.ru'}
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                regRequest: false,
                regFailed: false,
                user: {name: 'test', email: 'test@test.ru'}
            })
        );
    });

    it('should handle REG_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.REG_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                regFailed: true,
                regRequest: false,
            })
        );
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginRequest: true,
            })
        );
    });

    it('should handle LOGIN_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_REQUEST_SUCCESS,
                user: {name: 'test', email: 'test@test.ru'}
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginRequest: false,
                loginFailed: false,
                user: {name: 'test', email: 'test@test.ru'}
            })
        );
    });

    it('should handle LOGIN_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGIN_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                loginFailed: true,
                loginRequest: false,
            })
        );
    });

    it('should handle USER_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequest: true,
                tokenLoad: false
            })
        );
    });

    it('should handle USER_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_REQUEST_SUCCESS,
                user: {name: 'test', email: 'test@test.ru'}
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequest: false,
                userRequestFailed: false,
                tokenLoad: true,
                user: {name: 'test', email: 'test@test.ru'}
            })
        );
    });

    it('should handle USER_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.USER_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                userRequestFailed: true,
                tokenLoad: true,
                userRequest: false,
            })
        );
    });

    it('should handle TOKEN_REFRESH_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_REFRESH_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenRefreshRequest: true,
            })
        );
    });

    it('should handle TOKEN_REFRESH_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_REFRESH_REQUEST_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenRefreshRequest: false,
                tokenRefreshFailed: false,
            })
        );
    });

    it('should handle TOKEN_REFRESH_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.TOKEN_REFRESH_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                tokenRefreshFailed: true,
                tokenRefreshRequest: false,
            })
        );
    });

    it('should handle FORGOT_PASS_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASS_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                forgotPassRequest: true,
            })
        );
    });

    it('should handle FORGOT_PASS_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASS_REQUEST_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                forgotPassSuccess: true,
                forgotPassRequest: false,
                forgotPassFailed: false,
            })
        );
    });

    it('should handle FORGOT_PASS_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.FORGOT_PASS_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                forgotPassFailed: true,
                forgotPassRequest: false,
            })
        );
    });

    it('should handle PASS_RESET_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.PASS_RESET_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                passResetRequest: true,
            })
        );
    });

    it('should handle PASS_RESET_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.PASS_RESET_REQUEST_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                passResetSuccess: true,
                passResetRequest: false,
                passResetFailed: false,
            })
        );
    });

    it('should handle PASS_RESET_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.PASS_RESET_REQUEST_FAILED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                passResetFailed: true,
                passResetRequest: false,
            })
        );
    });

    it('should handle UPDATE_USER_INFO_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.UPDATE_USER_INFO_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserInfoRequest: true,
            })
        );
    });

    it('should handle UPDATE_USER_INFO_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.UPDATE_USER_INFO_REQUEST_SUCCESS,
                user: {name: 'test', email: 'test@test.ru'}
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserInfoRequest: false,
                updateUserInfoFailed: false,
                user: {name: 'test', email: 'test@test.ru'}
            })
        );
    });

    it('should handle UPDATE_USER_INFO_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.UPDATE_USER_INFO_REQUEST_FAILED
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true,
            })
        );
    });

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_REQUEST
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                logoutRequest: true,
            })
        );
    });

    it('should handle LOGOUT_REQUEST_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_REQUEST_SUCCESS
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                user: null,
                logoutRequest: false,
                logoutFailed: false,
            })
        );
    });

    it('should handle LOGOUT_REQUEST_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT_REQUEST_FAILED
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                logoutRequest: false,
                logoutFailed: true,
            })
        );
    });

});
