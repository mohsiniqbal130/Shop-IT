import React from 'react';
import classes from './Toolbar.module.css';
import {Link} from 'react-router-dom';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <div style={{width: "40px"}} className={classes.MobileOnly} ></div>
        <div className={classes.Logo} >
            <Link to="/">
                <Logo />
            </Link>
        </div>
        <nav className={classes.DesktopOnly} >
            <NavigationItems isAuth={props.isAuth} />
        </nav>
        <div className={classes.MobileOnly}>
            <div className={classes.Logout}>
                {!props.isAuth && <NavigationItem link={"/auth"}>Login</NavigationItem>}
                {props.isAuth && <NavigationItem link={"/logout"}>Logout</NavigationItem>}
            </div>
        </div>
    </header>
)

export default Toolbar;