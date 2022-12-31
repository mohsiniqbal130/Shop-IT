import React from 'react';

import classes from './MenuButton.module.css';

const menuButton = (props) => {
    
    let menuClasses = [classes.DrawerToggle]

    if(props.isOpened) {
        menuClasses = [classes.DrawerToggle, classes.Open]
    }
    
    return (
        <div onClick={props.show} className={menuClasses.join(' ')} >
            <div></div>
            <div></div>
            <div></div>
        </div>
        )
    }


export default menuButton