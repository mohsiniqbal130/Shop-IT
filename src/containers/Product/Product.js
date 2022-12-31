import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductContainer from '../../components/ProductContainer/ProductContainer';
import ImageLoading from '../../components/UI/CustomLoading/ImageLoading';
import Modal from '../../components/UI/Modal/Modal';
import StepperCounter from '../../components/UI/StepperCounter/StepperCounter';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/';

const Product = props => {

    const productID = props.match.params.id;

    const { fetchProduct, product, setOrder, order } = props;

    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        fetchProduct(productID);
    }, [fetchProduct, productID])

    const purchaseCancelHandler = () => {
        setOrder(null)
        setPurchasing(false)
    }

    const onButtonClick = () => {
        if (props.isAuthenticated) {

            setOrder({
                productID,
                productName: product.name,
                quantity: 1,
                totalPrice: +product.price
            })

            setPurchasing(true)
        } else {
            props.history.push("/auth")
        }
    }

    const onMinusClick = () => {
        setOrder({
            ...order,
            totalPrice: +order.totalPrice - +product.price,
            quantity: order.quantity - 1
        })
    }

    const onPlusClick = () => {
        setOrder({
            ...order,
            totalPrice: +order.totalPrice + +product.price,
            quantity: order.quantity + 1
        })
    }

    const onCheckoutClick = () => {
        props.resetOrder()
        props.history.push('/checkout')
    }

    let renderProduct = <ProductContainer onClick={onButtonClick} product={product} />

    if (!product || props.loading) {
        renderProduct = <ImageLoading />
    }

    if (product && Object.keys(product).length === 0) {
        //if invalid url entered
        renderProduct = <Redirect to="/" />
    }

    let modalData = null;

    if (product) {
        modalData = (
            <React.Fragment>
                <h2>{props.product.name}</h2>
                <h3>Quantity: {order && order.quantity}</h3>
                <StepperCounter
                    minusDisabled={order && order.quantity <= 1} 
                    plusDisabled={order && order.quantity >= 5}
                    onMinusClick={onMinusClick}
                    onPlusClick={onPlusClick} 
                />
                <h3>Total Price: PKR {order && order.totalPrice}</h3>
                <Button onClick={onCheckoutClick} >Checkout</Button>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                {modalData}
            </Modal>
            {renderProduct}
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        product: state.product.product,
        loading: state.product.loading,
        isAuthenticated: state.auth.token !== null,
        order: state.product.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(
            actions.fetchProduct(id)
        ),
        setOrder: (order) => dispatch(
            actions.setOrder(order)
        ),
        resetOrder: () => dispatch(
            actions.resetOrder()
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);