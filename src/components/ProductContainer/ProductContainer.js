import React from 'react';

import classes from './ProductContainer.module.css';

import Button from '../UI/Button/Button';

const productContainer = props => {
    return (
        <div className={classes.ProductContainer} >
            <div className={classes.ProductData} >
                <h1>{props.product.name}</h1>
                <h2>Price: PKR {props.product.price}</h2>
                <h2>{props.product.inStock ? "In Stock" : "Out of Stock"}</h2>
                <Button onClick={props.onClick} disabled={!props.product.inStock} >Order Now</Button>
            </div>
            <div className={classes.ProductImage} >
                <img src={props.product.imageURL} alt=""/>
            </div>
        </div>
    )
}

export default productContainer;