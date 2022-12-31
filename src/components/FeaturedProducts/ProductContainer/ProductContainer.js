import React from 'react';
import classes from './ProductContainer.module.css';
import { withRouter } from 'react-router-dom';

import ProductCard from '../../ProductCard/ProductCard';
import ImageLoading from '../../UI/CustomLoading/ImageLoading';

const productContainer = props => {

    let products = (<ImageLoading />)

    if (props.products) {
        products = props.products.map(product => 
            <ProductCard 
                key={product.key} 
                showSubData 
                data={product} 
                onButtonClick={props.buttonClick.bind(this, product.key)}
            />
            )
    }
    return ( 
        <>
            <div className={classes.ProductContainer} >
                {props.products && products}
            </div>
            {!props.products && products}
        </>
    )
}

export default withRouter(productContainer);