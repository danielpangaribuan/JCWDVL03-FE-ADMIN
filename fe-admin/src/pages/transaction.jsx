import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyModal from '../components/modal';
import Filter from '../components/filter';
import Card from '../components/card';
import Moment from 'react-moment';
import { Table, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { BsFillBagFill } from 'react-icons/bs';

import { getDataTransactions, getDetailTransactions, comboStatusTransaction, updateStatusTransaction } from '../actions/transaction';

function Transaction () {

    const [updateStatus, setUpdateStatus] = useState(null);
    const [TransactionDetailID, setTransactionDetailID] = useState(null);
    const dispatch = useDispatch();
    const { data, loading, detail, loadingDetail, statusCombo, loadingStatus } = useSelector(state => {
        return {
            data: state.transactions.data,
            loading: state.transactions.loading,
            detail: state.transactionDetail.data,
            loadingDetail: state.transactionDetail.loading,
            statusCombo: state.transactionStatusCombo.data,
            loadingStatus: state.transactionUpdateStatus.loading
        }
    });

    useEffect(() => {
        // if (!data.length) {
        dispatch(getDataTransactions());
        dispatch(comboStatusTransaction());
        // }
    }, [loadingStatus])

    // ====================== MODAL DETAIL ====================
    const [showModalDetail, setShowModalDetail] = useState(false);
    const handleClose_modalDetail = () => setShowModalDetail(false);
    const handleShow_modalDetail = () => setShowModalDetail(true);
    
    const getDetail = (id) => {
        dispatch(getDetailTransactions(id));
        setTransactionDetailID(id);
        handleShow_modalDetail();
    }

    const modalTransactionDetail = () => {
        if (detail.length || detail.length == undefined) {
            return (
                <Row>
                    <Col sm="6">
                        <Table className='table-borderless'>
                            <tbody>
                                <tr>
                                    <th>Invoice</th>
                                    <td>{ detail.invoice_number }</td>
                                </tr>
                                <tr>
                                    <th>Nama Lengkap</th>
                                    <td>{ detail.fullname }</td>
                                </tr>
                                <tr>
                                    <th>Alamat</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <Form.Select aria-label="Floating label select example" defaultValue={detail.status_code} onChange={ (item) => setUpdateStatus(item.target.value) }>
                                            {
                                                statusCombo.map((item, idx) => {
                                                    return (
                                                        <option value={ item.id } key={ idx }>
                                                            { item.status }
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bukti Transfer</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Waktu Transaksi</th>
                                    <td>
                                        <Moment format='DD MMM YYYY HH:mm:ss'>
                                            { detail.created_at }
                                        </Moment>
                                    </td>
                            
                                </tr>
                                <tr>
                                    <th>Waktu Terakhir Update</th>
                                    <td>
                                        <Moment format='DD MMM YYYY HH:mm:ss'>
                                            { detail.updated_at }
                                        </Moment>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm="6">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Jumlah</th>
                                    <th>Harga (Satuan)</th>
                                    <th>Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    detail.products.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{ item.product_name} </td>
                                                <td>{ item.price }</td>
                                                <td>{ item.quantity }</td>
                                                <td>{ item.total_price }</td>
                                            </tr>
                                        )
                                    }) 
                                }
                                <tr>
                                    <th colSpan={2}>Total</th>
                                    <th>{ detail.total_quantity }</th>
                                    <td>{ detail.total_price }</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )
        }
    }

    const buttonUpdateStatusTransaction = () => {
        dispatch(updateStatusTransaction(TransactionDetailID, updateStatus));

        if (loadingStatus === false) {
            setUpdateStatus(null)
            setTransactionDetailID(null)
            handleClose_modalDetail()

        }
    }

    // =================== FILTER ======================

    const filterCard = () => {
        return (
            <Form>
                <Row className="g-6">
                    <Col md>
                        
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                            <Form.Select aria-label="Floating label select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                            <Form.Select aria-label="Floating label select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                            <Form.Select aria-label="Floating label select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
                            <Form.Select aria-label="Floating label select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>
        )
    }

    const renderDataTransaction = () => {
        if (data.length) {
            return data.map((item, idx) => {
                return (
                    <tr key={idx}>
                        <td className="text-center">{ idx + 1}</td>
                        <td>{ item.invoice_number }</td>
                        <td>{ item.fullname }</td>
                        <td className="text-right">{ item.total_quantity }</td>
                        <td className="text-right">{ item.total_price }</td>
                        <td className={`text-center ${ item.status_code === 8 ? 'text-danger' : item.status_code == 6 ? 'text-success' : '' }`}>{ item.status_type }</td>
                        <td className="text-center">
                            <a className="btn btn-info text-white" onClick={ () => getDetail(item.id) }>
                                <BsFillBagFill />
                            </a>
                        </td>
                    </tr>
                )
            })
        }
    }

    const tableTransaction = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th>Invoice</th>
                        <th>Member</th>
                        <th className="text-right">Total Quantity</th>
                        <th className="text-right">Total Price</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { renderDataTransaction() }
                </tbody>
            </Table>
        )
    }

    return (
        <div className="container-fluid content-top-gap">
            <Filter filterContent={ filterCard() }/>
            <br />
            <Card cardTitle="Transaction" cardBody={ tableTransaction() } />
            <MyModal size="xl" modalTitle="Detail Transaction" modalBody={ modalTransactionDetail() } show={ showModalDetail } handleClose={ () => handleClose_modalDetail() } modalSave={ () => buttonUpdateStatusTransaction() } loadingSpinner={ loadingStatus } />
        </div>
    )
}

export default Transaction;