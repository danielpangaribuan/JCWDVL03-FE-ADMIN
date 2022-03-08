import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyModal from '../components/modal';
import Filter from '../components/filter';
import Card from '../components/card';
import Moment from 'react-moment';
import moment from 'moment';
import { Table, Form, Col, Row, FloatingLabel, Alert, Button } from 'react-bootstrap';
import { BsFillBagFill } from 'react-icons/bs';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

import { getDataTransactions, getDetailTransactions, comboStatusTransaction, updateStatusTransaction } from '../actions/transaction';

function Transaction () {
    const [startDate, setStartDate] = useState(moment().subtract(1, 'weeks').format('DD/MM/YYYY'));
    const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));
    const [statusFltr, setStatusFltr] = useState('');

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
    }, [loadingStatus]);

    const applyDatePicker = (event, picker) => {
        let datePicker = document.getElementById("datetimePicker_fltr");
        datePicker.value = picker.startDate.format('DD/MM/YYYY') +  ' - ' + picker.endDate.format('DD/MM/YYYY');

        setStartDate(picker.startDate);
        setEndDate(picker.endDate);
    }

    // ====================== MODAL DETAIL ====================
    const [showModalDetail, setShowModalDetail] = useState(false);
    const handleClose_modalDetail = () => setShowModalDetail(false);
    const handleShow_modalDetail = () => setShowModalDetail(true);

    const [show_alert, setShow_alert] = useState(false)
    
    const getDetail = (id) => {
        dispatch(getDetailTransactions(id));
        setTransactionDetailID(id);
        handleShow_modalDetail();
    }

    const modalTransactionDetail = () => {
        if (detail.length || detail.length == undefined) {
            return (
                <div>
                    { 
                        show_alert === true ? 
                        <Alert variant="success" onClose={() => setShow_alert(false)} dismissible>
                            <Alert.Heading>Status Transaction Updated!</Alert.Heading>
                        </Alert> 
                        :
                        ''
                    }
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
                                            <Form.Select aria-label="Floating label select example" defaultValue={detail.status_code} disabled={detail.status_code == 6 ? true : detail.status_code == 8 ? true : false } onChange={ (item) => setUpdateStatus(item.target.value) }>
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
                </div>
            )
        }
    }

    const buttonUpdateStatusTransaction = () => {
        dispatch(updateStatusTransaction(TransactionDetailID, updateStatus));

        if (loadingStatus === false) {
            setShow_alert(true);
            getDetail(TransactionDetailID);
            // handleClose_modalDetail()

        }
    }

    // =================== FILTER ======================

    const filterCard = () => {
        return (
            <Form>
                <Row className="g-6">
                    <Col md>
                        <DateRangePicker
                            initialSettings={{ startDate: startDate, endDate: endDate, locale: { format: 'DD/MM/YYYY' } }}
                            onApply={ (event, picker) => applyDatePicker(event, picker) }
                        >
                            <FloatingLabel controlId="datetimePicker_fltr" label="Date Range">
                                <Form.Control aria-label="Floating label select example" defaultValue={startDate + ' - ' + endDate}/>
                            </FloatingLabel>
                        </DateRangePicker>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="status_fltr" label="Status" defaultValue='' onChange={ (item) => setStatusFltr(item.target.value)} >
                            <Form.Select aria-label="Floating label select example">
                                <option value=''>All</option>
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
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="fullname_fltr" label="Fullname">
                            <Form.Control aria-label="Floating label select example" placeholder="Keyword" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="invoice_fltr" label="Works with selects">
                            <Form.Control aria-label="Floating label select example" placeholder="Fill Invoice" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <Button className="w-100 h-100" onClick={ () => submitFilter() }>Submit</Button>
                    </Col>
                </Row>
            </Form>
        )
    }

    const submitFilter = () => {
        let fullname_fltr = document.getElementById('fullname_fltr').value;
        let invoice_fltr = document.getElementById('invoice_fltr').value;
        console.log(startDate, endDate)
        console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
        dispatch(getDataTransactions(invoice_fltr, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), fullname_fltr, statusFltr));
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

    // const tableFooterTransaction = () => {
    //     return (
    //         <div className="row">
    //             <div className="col-lg-6">
    //                 <Form>
    //                     <Form.Select aria-label="Default Select Status" defaultValue={size} style={{ width: '130px'}} onChange={ (item) => setSize(item.target.value) }>
    //                         <option value={ totalData }>All</option>
    //                         <option value="10">10 Rows</option>
    //                         <option value="25">25 Rows</option>
    //                         <option value="50">25 Rows</option>
    //                     </Form.Select>
    //                 </Form>
    //             </div>
    //             <div className="col-lg-6 d-flex justify-content-end">
    //                 <Pagination className="mb-0">
    //                     <Pagination.Prev onClick={ () => setPage(currPage - 1) } className={currPage ===  1 ? 'disabled' : ''} />
    //                     { renderPagination() }
    //                     <Pagination.Next onClick={ () => setPage(currPage + 1) } className={currPage === totalPage ? 'disabled' : ''} />
    //                 </Pagination>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="container-fluid content-top-gap">
            <Filter filterContent={ filterCard() }/>
            <br />
            <Card  cardTitleShow={true} cardTitle="Transaction" cardBody={ tableTransaction() } cardFooterShow={true} /* cardFooter={ tableFooterTransaction() } */ />
            <MyModal size="xl" modalTitle="Detail Transaction" modalBody={ modalTransactionDetail() } show={ showModalDetail } handleClose={ () => handleClose_modalDetail() } modalSave={ () => buttonUpdateStatusTransaction() } loadingSpinner={ loadingStatus } />
        </div>
    )
}

export default Transaction;