import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSalesProduct, reportIncomeStatement } from '../actions/report';

import Filter from '../components/filter';
import Card from '../components/card';

import { Table, Form, Col, Row, FloatingLabel, Alert, Button } from 'react-bootstrap';
import { VictoryPie, VictoryChart, VictoryBar, VictoryGroup, VictoryTheme, VictoryLine, VictoryAxis, VictoryLegend } from 'victory';
import { AiOutlineInfoCircle } from "react-icons/ai";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

function Report () {
    const dispatch = useDispatch();
    const [labelsPie, setLabelsPie] = useState([]);
    const [dataPie, setDataPie] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [netIncome, setNetIncome] = useState([]);
    const [profitMargin, setProfitMargin] = useState([]);

    const { totalSales, data_income } = useSelector(state => {
        return {
            totalSales: state.reportSalesProduct.totalData,
            data_income: state.reportTotalData.data_income
        }
    });

    useEffect(() => {
        dispatch(getSalesProduct());
        dispatch(reportIncomeStatement());
        // if (totalSales.length) {
        //     for (let i = 0; i<totalSales.length; i++) {
        //         setLabelsPie(oldArray => [ ...oldArray, totalSales[i].product_name]);
        //         setDataPie(oldArray => [ ...oldArray, totalSales[i].quantity]);
        //     }
        // }
        if (data_income.length) {
            for (let i = 0; i < data_income.length; i++) {
                setRevenue(oldArray => [ ...oldArray, { x: i + 1, y: parseFloat(data_income[i].revenue) } ])
                setNetIncome(oldArray => [ ...oldArray, { x: i + 1, y: parseFloat(data_income[i].net_income) } ])
                setProfitMargin(oldArray => [ ...oldArray, { x: i + 1, y: parseFloat(data_income[i].profit_margin) * 10000000, label: data_income[i].profit_margin + '%' } ])
            }
        }
    }, []);

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

    // =================== CARD TABLE ===================
    const cardBody = () => {
        return (
            <div></div>
        )
    }
    const cardPie = () => {
        if (totalSales.length) {
            return (
                <div>
                    <h4>TOP 3 MOST SOLD</h4>
                    <VictoryPie 
                        data={[...totalSales]}
                        colorScale={["navy", "maroon", "darkGreen"]}
                        labelPosition="centroid"
                        labelPlacement="vertical"
                        height={350}
                        labels={({ datum }) => `${datum.x} (${datum.y}) \n\n`}
                        labelRadius={({ innerRadius }) => innerRadius + 10 }
                        innerRadius={20} 
                        style={{ labels: { fill: "white", fontSize: 12, fontWeight: "bold" }}} />
                </div>
            )
        }
    }

    const cardBar = () => {
        if (data_income.length) {
            return (
                <div>
                    <VictoryChart theme={VictoryTheme.material} height={302} >
                        <VictoryLegend x={80} y={20}
                            centerTitle
                            orientation="horizontal"
                            gutter={20}
                            data={[
                                { name: "Revenue", symbol: { fill: "#44B29D" }, labels: { fontSize: 7} },
                                { name: "Net Income", symbol: { fill: "#f9a83e" }, labels: { fontSize: 7} },
                                { name: "Profit Margin", symbol: { fill: "#c43a31" }, labels: { fontSize: 7} }
                            ]}
                        />
                        <VictoryAxis 
                            key={2}
                            dependentAxis
                            offsetX={50}
                            orientation="right"
                            tickValues={[0, 5 * 10000000, 10 * 10000000, 15 * 10000000, 20 * 10000000, 25 * 10000000 ]}
                            tickFormat={(t) => `${Math.round(t / 10000000)}%`}
                            style={{
                                ticks: { padding: 0 },
                                tickLabels: { fontSize: 7 }
                            }}
                        />
                        <VictoryAxis 
                            dependentAxis
                            offsetX={50}
                            style={{ 
                                tickLabels: {fontSize: 7, padding: 2}
                            }}
                            
                        />
                        <VictoryAxis 
                            offsetY={50}
                            style={{ 
                                tickLabels: {fontSize: 7, padding: 2 }
                            }}/>
                        <VictoryGroup offset={20}
                            colorScale={"qualitative"}
                        >   
                            <VictoryLine
                                style={{
                                    data: { stroke: "#c43a31" },
                                    parent: { border: "1px solid #ccc"},
                                    labels: { fontSize: 7 }
                                }}
                                data={profitMargin}
                            />
                            <VictoryBar
                                data={revenue}
                                style={{
                                    data: { fill: "#44B29D" },
                                }}
                            />
                            <VictoryBar
                                data={netIncome}
                                style={{
                                    data: { fill: "#f9a83e" },
                                }}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            )
        }
    }

    // =================== CARD SALES ===================
    const cardSales = () => {
        return (
            <div className="cardSales d-flex justify-content-between flex-column py-2">
                <div className="card_total mb-4">
                    <h4 className='mb-0'>23</h4>
                    <h5 className='text-success'>Transaction Complete <span className='text-primary'><AiOutlineInfoCircle /></span></h5>
                </div>
                <div className="card_percentage">
                    <span className="text-mute">Number of Sales / Total of Transaction : </span> <span>82%</span>
                </div>
            </div>
        )
    }


    return (
        <div className="container-fluid content-top-gap">
            <Filter filterContent={ filterTable() }/>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <Card cardTitleShow={false} cardFooterShow={false} cardBody={ cardBar() } />
                </div>
                <div className="col-md-6">
                    <Card cardTitleShow={false} cardFooterShow={false} cardBody={ cardPie() } />
                </div>
            </div>
            <Card cardTitleShow={true} cardTitle="Data Report" cardBody={ cardBody() } /* cardFooter={ tableFooterTransaction() } */ cardFooterShow={true} />
        </div>
    )
}

export default Report;