import React from 'react';
import classes from './FeaturedProducts.module.css'

import ProductContainer from './ProductContainer/ProductContainer'

const FeaturedProducts = props => {

    return (
        <div className={classes.FeaturedProducts} >
            { props.products && <h1>Featured Products</h1>}
            <ProductContainer buttonClick={props.buttonClick} products={props.products} />
        </div>
    )
}

export default FeaturedProducts;