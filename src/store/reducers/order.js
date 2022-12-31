import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: null,
    loading: false,
    orderSuccess: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_START:
            return orderStart(state, action)
        case actionTypes.ORDER_SUCCESS:
            return orderSuccess(state, action)
        case actionTypes.ORDER_RESET:
            return orderReset(state, action)
        case actionTypes.SET_ORDERS:
            return setOrders(state, action)
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action)
        case actionTypes.DELETE_ORDER:
            return deleteOrder(state, action)
        default:
            return state
    }
}

const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const orderReset = (state, action) => {
    return {
        ...state,
        loading: false,
        orderSuccess: false
    }
}

const orderStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const orderSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        orderSuccess: true
    }
}

const setOrders = (state, action) => {
    return {
        ...state,
        loading: false,
        orders: [
            ...action.orders
        ]
    }
}

const deleteOrder = (state, action) => {
    return {
        ...state,
        loading: false,
        orders: state.orders.filter(order => order.key !== action.orderID)
    }
}

export default reducer;