import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal (props) {
    return (
        <Modal show={ props.show } onHide={ props.handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>
                    { props.modalTitle }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { props.modalBody }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ props.handleClose }>Close</Button>
                <Button variant="primary" onClick={ props.modalSave }>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal;