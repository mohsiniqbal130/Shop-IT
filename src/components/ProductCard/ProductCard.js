import React from 'react';
import classes from './ProductCard.module.css'

import Button from '../UI/Button/Button';

const stylesProduct = {
    marginRight: '10px',
    marginLeft: '10px'
}

const stylesCategories = {
    textTransform: 'capitalize'
}

const productCard = props => {

    return (
        <div style={props.showSubData ? stylesProduct : stylesCategories} className={classes.ProductCard}>
            <img src={props.data.imageURL} alt=""/>
            <h2>{props.data.name}</h2>
            { props.showSubData &&
            (<><h3>Price: PKR {props.data.price}</h3>
            <h3>{props.data.inStock ? "In Stock" : "Out of Stock"}</h3>
            <Button onClick={props.onButtonClick} >Buy Now</Button></>)}
        </div>
    )
}

export default productCard;