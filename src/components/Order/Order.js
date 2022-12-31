import React from 'react';
import classes from './Order.module.css';

import Button from '../../components/UI/Button/Button';

const order = props => (
    <div className={classes.Order} >
        <h2>{props.name}</h2>
        <h2>X {props.quantity} -- PKR {props.price}</h2>
        <Button onClick={props.onCancelClick} >Cancel</Button>
    </div>
)

export default order