import React, { useEffect } from 'react';
import axios from '../../axios-main';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Categories from '../../components/Categories/Categories';

const Browse = props => {

    const { fetchCategories, categories } = props;

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return (
        <Categories categories={categories} />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(
            actions.fetchCategories()
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.browse.categories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Browse, axios));