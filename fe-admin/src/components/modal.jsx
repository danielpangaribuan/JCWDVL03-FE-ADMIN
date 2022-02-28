import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function MyModal (props) {
    return (
        <Modal show={ props.show } onHide={ props.handleClose } size={ props.size }>
            <Modal.Header closeButton>
                <Modal.Title>
                    { props.modalTitle }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { props.modalBody }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="transparent" onClick={ props.handleClose }>Close</Button>
                <Button variant="primary" onClick={ props.modalSave }>
                    { props.loadingSpinner == false ? 'Save Changes' : <Spinner animation="border" /> } 
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal;