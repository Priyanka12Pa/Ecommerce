import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CardElement } from "@stripe/react-stripe-js";


function Payment(props) {
    const { open, handleClose, handlePayment } = props
    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CardElement />
                <Button onClick={handlePayment}>Pay</Button>
            </Modal.Body>
            
        </Modal>
    )
}

export default Payment;