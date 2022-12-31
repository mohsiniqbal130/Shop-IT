import React from 'react';

import classes from './CheckMarkLoader.module.css';

const checkMarkLoader = props => {

    let loadingClasses = [classes.CheckMarkLoader]

    if (props.check) {
        loadingClasses.push(classes.checkmark)
        loadingClasses.push(classes.loadComplete)
    }

    if (props.fail) {
        loadingClasses.push(classes.failmark)
        loadingClasses.push(classes.loadComplete)
    }

    return (
        <div className={loadingClasses.join(' ')}>
            <div className={classes.draw}></div>
        </div>
    )

}

export default checkMarkLoader;