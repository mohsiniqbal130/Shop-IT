import React, { useState } from 'react';

import classes from './Auth.module.css';
import { checkValidity } from '../../shared/utility';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CircleLoader from '../../components/UI/CustomLoading/CircleLoader/CircleLoader';
import ErrorBar from '../../components/UI/ErrorBar/ErrorBar';
import { errorMessage } from '../../shared/utility';

const animationClasses = {
    enter: classes["fade-enter"],
    enterDone: classes["fade-enter-active"],
    exit: classes["fade-exit"],
    exitDone: classes["fade-exit-active"]
}

const Auth = props => {

    // STATE

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },

        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        },
    })

    const [isSignUp, setIsSignUp] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);

    // HANDLERS

    const switchAuthHandler = (event) => {
        event.preventDefault()
        setIsSignUp(isSignUp => !isSignUp);
    }

    function inputChangedHandler(event, controlName) {

        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        setFormIsValid(formIsValid)
        setAuthForm(updatedControls)

    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        props.authenticate(
            authForm.email.value,
            authForm.password.value,
            isSignUp
        )
    }

    //LOGIC

    const formElementsArray = [];

    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
        />
    ))

    const ref = React.createRef(null)
    
    let authRedirect = null;

    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/" />
    }

    let displayForm = <CircleLoader />

    if (!props.loading) {
        displayForm = (
            <React.Fragment>
                {authRedirect}
                { props.error && <ErrorBar>{errorMessage[props.error.message]}</ErrorBar>}
                <h1>{isSignUp ? 'Create an account' : 'Sign in to Shop It'}</h1>
                <h3>{isSignUp ? 'Already' : "Don't"} have an account? <a href="/" onClick={switchAuthHandler} >
                        {isSignUp ? 'Sign in' : 'Sign up'}</a></h3>
                <form onSubmit={formSubmitHandler}>
                    {form}
                    <div className={classes.Button} >
                        <Button disabled={!formIsValid} >{isSignUp ? 'Sign up' : 'Log in'}</Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }

    return (
        <SwitchTransition mode={"out-in"} >
            <CSSTransition nodeRef={ref} timeout={0} key={isSignUp ? "Sign In" : "Sign Up"} classNames={animationClasses} >
                <div ref={ref} className={classes.Auth} >
                    {displayForm}
                </div>
            </CSSTransition>
        </SwitchTransition>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignUp) => dispatch(
            actions.auth(email, password, isSignUp)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);