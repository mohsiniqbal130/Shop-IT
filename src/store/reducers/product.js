import * as actionTypes from '../actions/actionTypes';

const initialState = {
    product: null,
    order: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT:
            return setProduct(state, action)
        case actionTypes.SET_PRODUCT_LOADING:
            return setProductLoading(state, action)
        case actionTypes.SET_ORDER:
            return setOrder(state, action)
        default:
            return state
    }
}

const setProduct = (state, action) => {
    return {
        ...state,
        product: {
            ...action.productData
        }
    }
}

const setOrder = (state, action) => {
    if (action.order === null) {
        return {
            ...state,
            order: null
        }
    }
    return {
        ...state,
        order: {
            ...action.order
        }
    }
}

const setProductLoading = (state, action) => {
    return {
        ...state,
        loading: action.loading
    }
}

export default reducer;