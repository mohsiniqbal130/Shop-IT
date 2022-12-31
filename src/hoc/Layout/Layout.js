import React, { Fragment, useState } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import MenuButton from '../../components/Navigation/MenuButton/MenuButton'
import { connect } from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(currentState => !currentState);
    }

    return (
        <Fragment>
            <MenuButton isOpened={showSideDrawer} show={sideDrawerToggleHandler} /> 
            <SideDrawer isAuth={props.isAuthenticated} open={showSideDrawer} closed={sideDrawerClosedHandler}/>
            <Toolbar isAuth={props.isAuthenticated} opened={sideDrawerToggleHandler} />
            {props.children}
        </Fragment>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);