import * as actionTypes from '../actions/actionTypes';

const initialState = {
    imageLinks: null,
    featuredProducts: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOME_IMAGES:
            return setHomeImages(state, action)
        case actionTypes.SET_FEATURED_PRODUCTS:
            return setFeaturedProducts(state, action)
        default:
            return state
    }
}

const setHomeImages = (state, action) => {
    return {
        ...state,
        imageLinks: [
            ...action.data
        ]
    }
}

const setFeaturedProducts = (state, action) => {
    return {
        ...state,
        featuredProducts: [
            ...action.data
        ]
    }
}


export default reducer;