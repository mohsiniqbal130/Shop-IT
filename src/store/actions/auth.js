import axios from 'axios'

import * as actionTypes from './actionTypes';
import APIKEY from '../../shared/APIKEY';

export const authStart = () => {
    return { type: actionTypes.AUTH_START }
}

export const authSuccess = (token, userID) => {
    return { type: actionTypes.AUTH_SUCCESS, token, userID }
}

export const authFail = (error) => {
    return { type: actionTypes.AUTH_FAIL, error }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, +expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userID')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {

        dispatch(authStart())

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`

        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
        }

        axios.post(url, authData)
            .then(response => {
                //storing token and time in local storage
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userID', response.data.localId)

                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            }).catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"))

            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userID = localStorage.getItem('userID')
                dispatch(authSuccess(token, userID))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    }
}