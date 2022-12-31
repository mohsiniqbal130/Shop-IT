import * as actionTypes from './actionTypes';

import axios from '../../axios-main';

export const setProduct = (productData) => {
    return { type: actionTypes.SET_PRODUCT, productData }
}

export const setProductLoading = (loading) => {
    return { type: actionTypes.SET_PRODUCT_LOADING, loading }
}

export const setOrder = (order) => {
    return { type: actionTypes.SET_ORDER, order }
}

export const fetchProduct = (id) => {
    return dispatch => {
        dispatch(setProductLoading(true))
        axios.get(`/products/${id}.json`)
            .then(response => {
                dispatch(setProductLoading(false))
                dispatch(setProduct(response.data))
            })
            .catch(err => {
                dispatch(setProductLoading(false))
            })
    }
}