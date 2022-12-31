import React from 'react';
import classes from './ErrorBar.module.css';

const errorBar = props => (
    <div className={classes.ErrorBar} >
        <p>{props.children}</p>
    </div>
)

export default errorBar;