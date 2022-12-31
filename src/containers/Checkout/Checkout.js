import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { checkValidity } from '../../shared/utility';
import classes from './Checkout.module.css';
import * as actions from '../../store/actions/';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CheckMarkLoader from '../../components/UI/CustomLoading/CheckMarkLoader/CheckMarkLoader';

const Checkout = props => {

    // STATE

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },

        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Contact No'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },

        address1: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address Line 1'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        },

        address2: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address Line 2'
            },
            value: '',
            validation: {
                required: false,
            },
            valid: true,
            touched: false
        },

        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City'
            },
            value: '',
            validation: {
                required: false,
            },
            valid: false,
            touched: false
        },
    })

    const [formIsValid, setFormIsValid] = useState(false);

    function inputChangedHandler(event, controlName) {

        const updatedControls = {
            ...orderForm,
            [controlName]: {
                ...orderForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, orderForm[controlName].validation),
                touched: true
            }
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        setFormIsValid(formIsValid)
        setOrderForm(updatedControls)

    }

    const onFormSubmit = (event) => {
        event.preventDefault()

        let orderData = {
            ...props.order,
            userID: props.userID,
            deliveryData: {
                name: orderForm.name.value,
                contact: orderForm.phone.value,
                address1: orderForm.address1.value,
                address2: orderForm.address2.value,
                city: orderForm.city.value
            }
        }

        props.onOrderStart(props.token, orderData)

    }

    // LOGIC

    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
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

    let redirect = null;

    if (!props.order || (props.order && Object.keys(props.order).length === 0)) {
        redirect = <Redirect to="/" />
    }

    let orderSummary = null
    if (props.order) {
        orderSummary = (
            <div className={classes.OrderSummary} >
                <h2>{props.order.productName}</h2>
                <h3>Quantity: {props.order.quantity}</h3>
                <h3>Total Price: {props.order.totalPrice}</h3>
            </div>
        )
    }

    let finalForm = (
        <>
            <h1>Checkout</h1>
            <form onSubmit={onFormSubmit} >
                {form}
                <h1>Order Summary</h1>
                {orderSummary}
                <Button disabled={!formIsValid} >Order</Button>
            </form>
        </>
    )

    if (props.loading) {
        finalForm = <CheckMarkLoader />
    }
     
    if (props.orderSuccess) {
        finalForm = (
            <div className={classes.FinalLoader} >
                <CheckMarkLoader check />
                <h3>Your order has been successfully placed and will be delivered in 7 - 10 Business days. Please visit the <Link to="/orders" >Orders</Link> page to view your orders</h3>
            </div>
        )
    }

    return (
        <div className={classes.OrderForm} >
            {redirect}
            {finalForm}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order: state.product.order,
        userID: state.auth.userID,
        loading: state.order.loading,
        orderSuccess: state.order.orderSuccess,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart: (token, orderData) => dispatch(
            actions.order(token, orderData)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);