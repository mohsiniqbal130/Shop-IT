import * as actionTypes from '../actions/actionTypes';

import axios from '../../axios-main';

export const setCategories = (categories) => {
    return { type: actionTypes.SET_CATEGORIES, data: categories }
}

export const setCategoryItems = (categoryItems) => {
    return { type: actionTypes.SET_CATEGORY_ITEMS, categoryItems }
}

export const fetchCategoryItemsStart = () => {
    return { type: actionTypes.FETCH_CATEGORY_ITEMS_START }
}

export const fetchCategories = () => {
    return dispatch => {
        axios.get('/categories.json')
            .then(response => {
                let categories = []
                for (let key in response.data) {
                    categories.push({
                        key,
                        ...response.data[key]
                    })
                }
                dispatch(setCategories(categories))
            })
            .catch(err => {})
    }
}

export const fetchCategoryItems = (category) => {
    return dispatch => {
        dispatch(fetchCategoryItemsStart())
        axios.get(`/products.json?orderBy="category"&equalTo="${category}"`)
            .then(response => {
                let categoryItems = []
                for (let key in response.data) {
                    categoryItems.push({
                        key,
                        ...response.data[key]
                    })
                }
                dispatch(setCategoryItems(categoryItems))
            })
            .catch(error => {})
    }
}