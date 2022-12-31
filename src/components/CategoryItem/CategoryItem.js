import React from 'react';
import classes from './CategoryItem.module.css';

const categoryItem = props => (
    <div className={classes.CategoryItem} >
        <div className={classes.Data} >
            <img src={props.imageURL} alt=""/>
            <h2>{props.name}</h2>
        </div>
        <div className={classes.ArrowRight} >

        </div>
    </div>
)

export default categoryItem;