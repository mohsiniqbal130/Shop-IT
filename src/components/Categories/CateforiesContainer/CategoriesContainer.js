import React from 'react';

import classes from './CategoriesContainer.module.css';

import ImageLoading from '../../UI/CustomLoading/ImageLoading';
import ProductCard from '../../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const categoriesContainer = props => {

    let categories = (<ImageLoading />)

    if (props.categories) {
        categories = props.categories.map(category => (
            <div key={category.key} className={classes.CategoryCard} >
                <Link to={`/browse/${category.name}`} >
                    <ProductCard data={category} />
                </Link>
            </div>
        ))
    }

    return (
        <div className={classes.CategoriesContainer} >
        {categories}
        </div>
    )
}

export default categoriesContainer;