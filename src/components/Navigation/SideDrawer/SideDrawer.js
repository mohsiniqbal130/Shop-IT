import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close]

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} >
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav onClick={props.closed} >
                <NavigationItems isAuth={props.isAuth} />
            </nav>
            </div>
        </Fragment>
    );
}

export default SideDrawer;