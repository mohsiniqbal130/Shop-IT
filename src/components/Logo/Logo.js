import React from 'react';
import logo from '../../assets/logo.png';
import classes from './Logo.module.css';

const Logo = props => (
    <div  className={classes.Logo}>
        <img src={logo} alt=""/>
    </div>
)
export default Logo;