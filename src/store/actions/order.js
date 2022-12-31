import * as actionTypes from './actionTypes';
import axios from '../../axios-main';

export const resetOrder = () => {
    return { type: actionTypes.ORDER_RESET }
}

const orderStart = () => {
    return { type: actionTypes.ORDER_START }
}

const orderSuccess = (orderData) => {
    return { type: actionTypes.ORDER_SUCCESS, orderData }
}

const setOrders = (orders) => {
    return { type: actionTypes.SET_ORDERS, orders }
}

const fetchOrderStart = () => {
    return { type: actionTypes.FETCH_ORDERS_START }
}

const orderDelete = (orderID) => {
    return { type: actionTypes.DELETE_ORDER, orderID }
}

export const fetchOrders = (token, userID) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get(`/orders.json?auth=${token}&orderBy="userID"&equalTo="${userID}"`)
            .then(response => {
                let orders = []
                for (let key in response.data) {
                    orders.push({
                        key,
                        ...response.data[key]
                    })
                }
                dispatch(setOrders(orders))
            })
            .catch(error => {})
    }
}

export const deleteOrder = (token, orderID) => {
    return dispatch => {
        dispatch(orderStart())
        axios.delete(`/orders/${orderID}.json?auth=${token}`)
            .then(response => {
                dispatch(orderDelete(orderID))
            })
            .catch(response => {

            })
    }
}

export const order = (token, orderData) => {
    return dispatch => {
        dispatch(orderStart())
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(orderSuccess(orderData))
            })
            .catch(error => {

            })
    }
}