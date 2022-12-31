import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/';

import Home from './containers/Home/Home';
import Browse from './containers/Browse/Browse';
import Product from './containers/Product/Product';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Category from './containers/Category/Category';

const App = props => {

  const { checkAuthStatus } = props;

  checkAuthStatus() 

  return (
    <Layout>
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/product/:id" exact component={Product} />
        {props.isAuthenticated && <Route path="/orders" exact component={Orders} />}
        <Route path="/browse" exact component={Browse} />
        <Route path="/browse/:category" exact component={Category} />
        {props.isAuthenticated && <Route path="/checkout" exact component={Checkout} />}
        {props.isAuthenticated && <Route path="/logout" exact component={Logout} />}
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStatus: () => dispatch(
      actions.checkAuthState()
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
