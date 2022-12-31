import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/';
import classes from './Category.module.css'

import CategoryItem from '../../components/CategoryItem/CategoryItem';
import ImageLoading from '../../components/UI/CustomLoading/ImageLoading';

const Category = props => {

    const { fetchItems, categoryItems, loading } = props;

    const category = props.match.params.category;

    useEffect(() => {
        fetchItems(category)
    }, [fetchItems, category])

    let items = (
        <React.Fragment>
            {categoryItems && categoryItems.map(item => (
                <Link key={item.key} to={`/product/${item.key}`} >
                    <CategoryItem
                        name={item.name}
                        imageURL={item.imageURL}
                    />
                </Link>
            ))}
        </React.Fragment>
    )

    if (loading || categoryItems === null) {
        items = <ImageLoading />
    }

    return (
        <div className={classes.CategoryItems} >
            {items}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categoryItems: state.browse.categoryItems,
        loading: state.browse.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: (category) => dispatch(
            actions.fetchCategoryItems(category)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);