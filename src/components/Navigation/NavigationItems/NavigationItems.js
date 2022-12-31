import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => (
    <ul className={classes.NavigationItems} >
        <NavigationItem exact link={"/"}>Home</NavigationItem>
        <NavigationItem link={"/browse"}>Browse</NavigationItem>
        {props.isAuth && <NavigationItem link={"/orders"}>Orders</NavigationItem>}
        <div className={classes.DesktopOnly} >
            {!props.isAuth && <NavigationItem link={"/auth"}>Login</NavigationItem>}
            {props.isAuth && <NavigationItem link={"/logout"}>Logout</NavigationItem>}
        </div>
    </ul>
)

export default NavigationItems;