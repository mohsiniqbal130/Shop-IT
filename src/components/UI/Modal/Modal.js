import React, { Fragment, useRef } from 'react';
import classes from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {

    const animationClasses = {
        enter: classes["fade-enter"],
        enterDone: classes["fade-enter-active"],
        exit: classes["fade-exit"],
        exitDone: classes["fade-exit-active"]
    }

    const animationTiming = {
        enter: 0,
        exit: 250
    }

    const nodeRef = useRef(null);

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <CSSTransition in={props.show} nodeRef={nodeRef} unmountOnExit timeout={animationTiming} classNames={animationClasses} >
                <div ref={nodeRef} className={classes.Modal} >
                    {props.children}
                </div>
            </CSSTransition>
        </Fragment>
    )

}

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});