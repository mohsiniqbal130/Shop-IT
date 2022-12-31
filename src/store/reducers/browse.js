import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: null,
    categoryItems: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORIES:
            return setCategories(state, action)
        case actionTypes.FETCH_CATEGORY_ITEMS_START:
            return fetchCategoryItemsStart(state, action)
        case actionTypes.SET_CATEGORY_ITEMS:
            return setCategoryItems(state, action)
        default:
            return state
    }
}

const fetchCategoryItemsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const setCategories = (state, action) => {
    return {
        ...state,
        categories: action.data
    }
}

const setCategoryItems = (state, action) => {
    return {
        ...state,
        categoryItems: [
            ...action.categoryItems
        ],
        loading: false
    }
}

export default reducer;