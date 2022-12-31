import React from 'react';
import classes from './StepperCounter.module.css';

const stepperCounter = props => (
    <div className={classes.StepperCounter}>
        <button disabled={props.minusDisabled} onClick={props.onMinusClick} >-</button>
        <button disabled={props.plusDisabled} onClick={props.onPlusClick} >+</button>
    </div>
)

export default stepperCounter;