import React from 'react';
import classes from './Categories.module.css'

import CategoriesContainer from './CateforiesContainer/CategoriesContainer';

const categories = props => {

    return (
        <div className={classes.Categories} >
            { props.categories && <h1>Categories</h1>}
            <CategoriesContainer categories={props.categories} />
        </div>
    )
}

export default categories;