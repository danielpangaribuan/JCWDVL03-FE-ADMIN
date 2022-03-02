import React, { useState } from 'react';

import Filter from '../components/filter';
import Card from '../components/card';

import { Table, Form, Col, Row, FloatingLabel, Alert, Button } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

function Report () {
    const [startDate, setStartDate] = useState(moment().subtract(1, 'weeks').format('DD/MM/YYYY'));
    const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));

    const applyDatePicker = (event, picker) => {
        let datePicker = document.getElementById("datetimePicker_fltr");
        datePicker.value = picker.startDate.format('DD/MM/YYYY') +  ' - ' + picker.endDate.format('DD/MM/YYYY');

        setStartDate(picker.startDate);
        setEndDate(picker.endDate);
    }

    // ================== FILTER =================
    const submitFilter = () => {
        // let fullname_fltr = document.getElementById('fullname_fltr').value;
        // let invoice_fltr = document.getElementById('invoice_fltr').value;
        // console.log(startDate, endDate)
        // console.log(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
        // dispatch(getDataTransactions(invoice_fltr, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), fullname_fltr, statusFltr));
    }

    const filterTable = () => {
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

    // =================== CARD ===================
    const cardBody = () => {
        return (
            <div></div>
        )
    }

    return (
        <div className="container-fluid content-top-gap">
            <Filter filterContent={ filterTable() }/>
            <br />
            <Card cardTitle="Data Report" cardBody={ cardBody() } /* cardFooter={ tableFooterTransaction() } */ />
        </div>
    )
}

export default Report;