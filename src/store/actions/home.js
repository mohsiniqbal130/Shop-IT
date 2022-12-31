import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-main';

export const setHomeImages = (imagesData) => {
    return { type: actionTypes.SET_HOME_IMAGES, data: imagesData }
}

export const setFeaturedProducts = (products) => {
    return { type: actionTypes.SET_FEATURED_PRODUCTS, data: products }
}

export const fetchHomeImages = () => {
    return dispatch => {
        axios.get('/featured.json')
            .then(response => {
                let imageLinks = []
                for (let key in response.data) {
                    imageLinks.push({
                        key,
                        url: response.data[key].url
                    })
                }
                dispatch(setHomeImages(imageLinks))
            })
            .catch(err => {})
    }
}

export const fetchFeaturedProducts = () => {
    return dispatch => {
        axios.get('/products.json?orderBy="featured"&equalTo=true')
            .then(response => {
                let featuredProducts = []
                for (let key in response.data) {
                    featuredProducts.push({
                        key,
                        ...response.data[key]
                    })
                }
                dispatch(setFeaturedProducts(featuredProducts))
            })
            .catch(err => {})
    }
}