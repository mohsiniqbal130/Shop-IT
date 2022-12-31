import React from 'react';
import classes from './ConfirmationModal.module.css';

import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

const confirmationModal = props => (
    <div className={classes.ConfirmationModal} >
        <Modal show={props.show} modalClosed={props.modalClosed}>
            <h3>{props.children}</h3>
            <Button onClick={props.onNoClick} >No</Button>
            <Button onClick={props.onYesClick} >Yes</Button>
        </Modal>
    </div>
)

export default confirmationModal;