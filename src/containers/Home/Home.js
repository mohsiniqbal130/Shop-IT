import React, { Fragment, useEffect } from 'react';

import ImageSlider from '../../components/ImageSlider/ImageSlider';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import ImageLoading from '../../components/UI/CustomLoading/ImageLoading'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import axios from '../../axios-main';

const Home = props => {

    const {imageLinks, fetchHomeImages, fetchFeaturedProducts} = props;

    useEffect(() => {
        fetchHomeImages()
        fetchFeaturedProducts()
    }, [fetchHomeImages, fetchFeaturedProducts])

    const productButtonClick = (key) => {
        props.history.push(`/product/${key}`)
    }

    return (
        <Fragment>
            {imageLinks ? <ImageSlider links={imageLinks}/> : <ImageLoading />}
            <FeaturedProducts buttonClick={productButtonClick} products={props.featuredProducts} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        imageLinks: state.home.imageLinks,
        featuredProducts: state.home.featuredProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHomeImages: () => dispatch(
            actions.fetchHomeImages()
        ),
        fetchFeaturedProducts: () => dispatch(
            actions.fetchFeaturedProducts()
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));