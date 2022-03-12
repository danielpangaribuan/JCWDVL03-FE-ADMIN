import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSalesProduct, reportIncomeStatement, getNumberOfSales, getTotalData  } from '../actions/report';

import Filter from '../components/filter';
import Card from '../components/card';
import StatisticCard from '../components/statisticCard';

import { Table, Form, Col, Row, FloatingLabel, Alert, Button } from 'react-bootstrap';
import { VictoryPie, VictoryChart, VictoryBar, VictoryGroup, VictoryTheme, VictoryLine, VictoryAxis, VictoryLegend } from 'victory';
import { AiOutlineInfoCircle, AiFillStar } from "react-icons/ai";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import NumberFormat from "react-number-format";

function Report () {
    const dispatch = useDispatch();
    // const [labelsPie, setLabelsPie] = useState([]);
    const dataColor = ["#3C4890", "#726A95", "#9ba3d4"];
    const salesColor =["#4E9F3D", "#3C4890", "#726A95", "#950101", "#2D6E7E", "#00A8CC", "#EAE7AF"]
    const [dataPie, setDataPie] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [netIncome, setNetIncome] = useState([]);
    const [profitMargin, setProfitMargin] = useState([]);
    const [numberOfSales, setNumberOfSales] = useState([]);
    const [legenfNoF, setLegendNoF] = useState([]);
    const [startDate, setStartDate] = useState(moment().subtract(1, 'years').format('DD/MM/YYYY'));
    const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));

    const { data, data_income, totalSales, totalProfit, totalRevenue, number_sales } = useSelector(state => {
        return {
            data: state.reportSalesProduct.data,
            data_income: state.reportTotalData.data_income,
            totalSales: state.reportTotalData.data.total_sales,
            totalProfit: state.reportTotalData.data.total_profit,
            totalRevenue: state.reportTotalData.data.total_revenue,
            number_sales: state.reportTotalData.number_sales
        }
    });

    useEffect(() => {
        dispatch(getSalesProduct(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(reportIncomeStatement(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(getTotalData(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(getNumberOfSales(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        if (!revenue) {
            onSubmit().click();
        }
    }, []);
    
    const applyDatePicker = (event, picker) => {
        let datePicker = document.getElementById("datetimePicker_fltr");
        datePicker.value = picker.startDate.format("DD/MM/YYYY") +  ' - ' + picker.endDate.format("DD/MM/YYYY");
        
        setStartDate(picker.startDate.format("DD/MM/YYYY"));
        setEndDate(picker.endDate.format("DD/MM/YYYY"));
    }

    const onSubmit = () => {
        dispatch(getSalesProduct(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(reportIncomeStatement(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(getTotalData(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        dispatch(getNumberOfSales(moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')));
        if (data_income.length && data.length && number_sales.length) {
            setRevenue([]);
            setNetIncome([]);
            setProfitMargin([]);
            setDataPie([]);
            setNumberOfSales([]);
            setLegendNoF([]);
            for (let i = 0; i < data_income.length; i++) {
                setRevenue(oldArray => [ ...oldArray, { x: moment(data_income[i].time).format('MMM YYYY'), y: parseFloat(data_income[i].revenue) } ]);
                setNetIncome(oldArray => [ ...oldArray, { x: moment(data_income[i].time).format('MMM YYYY'), y: parseFloat(data_income[i].net_income) } ]);
                setProfitMargin(oldArray => [ ...oldArray, { x: moment(data_income[i].time).format('MMM YYYY'), y: parseFloat(data_income[i].profit_margin) * 10000000, label: data_income[i].profit_margin + '%' } ]);
            }
            for (let i = 0; i < data.length; i++) {
                setDataPie(oldArray => [ ...oldArray, { x: data[i].product_name, y: data[i].quantity, color: dataColor[i] } ]);
            }
            for (let i = 0; i< number_sales.length; i++) {
                setNumberOfSales(oldArray => [ ...oldArray, { x: number_sales[i].product_name, y: number_sales[i].quantity, color: salesColor[i] } ]);
                setLegendNoF(oldArray => [...oldArray, { name: number_sales[i].product_name, symbol: { fill: salesColor[i] }, labels: { fontSize: 8} } ])
            }
        } else {
            setRevenue([]);
            setNetIncome([]);
            setProfitMargin([]);
            setDataPie([]);
            setNumberOfSales([]);
            setLegendNoF([]);
        }
    }
    // =================== CARD TABLE ===================
    const cardBody = () => {
        return (
            <div></div>
        )
    }
    const cardPie = () => {
        if (dataPie.length) {
            return (
                <div className="cardPie">
                    <div className="row">
                        <div className="col-sm-4">
                            <h4 style={{ whiteSpace: 'nowrap' }}>TOP 3 MOST SOLD</h4>
                            <ul className="p-0 d-flex justify-content-center align-items-start flex-column h-100"
                                 style={{ whiteSpace: 'nowrap',
                                 fontSize: '18px', lineHeight: '30px' }} >
                                {
                                    dataPie.map((item, idx) => {
                                        return (
                                            <li style={{ listStyle: 'none' }} key={ idx }>
                                                <AiFillStar className="mr-3" style={{ color: item.color }} />
                                                { item.x }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-sm-8">
                            <VictoryPie 
                                data={[...dataPie]}
                                colorScale={dataColor}
                                labelPosition="centroid"
                                labelPlacement="vertical"
                                height={400}
                                labels={({ datum }) => `${datum.y}`}
                                labelRadius={({ innerRadius }) => innerRadius + 65 }
                                innerRadius={100} 
                                style={{ labels: { fill: ({ datum }) => datum.color, fontSize: 24 }}} />
                        </div>
                    </div>
                </div>
            )
        }
    }

    const cardBarNumberOfSales = () => {
        if (numberOfSales.length) {
            return (
                <div>
                    <div>
                        <VictoryLegend x={0} y={0}
                            centerTitle
                            orientation="horizontal"
                            gutter={20}
                            itemsPerRow={4}
                            data={legenfNoF}
                            height={40}
                            width={300}
                        />
                    </div>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        height={400}
                        width={600}
                        >

                        <VictoryBar horizontal
                            textAnchor="start"
                            // domain={{ x: [0, numberOfSales[0].y ] }}
                            domainPadding={{ x: 0 }}
                            offsetY={22}
                            style={{ 
                                fontSize: '20px', 
                                data: {
                                    fill: ({ datum }) => datum.color,
                                    width: 15,
                                },
                                zIndex: 1
                            }}
                            data={numberOfSales}
                            animate={{
                                onLoad: { duration: 1000 }
                            }}
                        />
                        <VictoryAxis dependentAxis
                            label="Quantity"
                            offsetY={42}
                            style={{
                                axis: {stroke: "#fff" },
                                axisLabel: {fontSize: 20, padding: 30},
                                grid: { stroke: "#000", strokeWidth: 1 },
                                ticks: { stroke: "#000", size: -4 },
                                tickLabels: {fontSize: 15, padding: 10}
                                // grid: { fille:}
                            }}
                        />
                    </VictoryChart>
                </div>
            )
        }
    }

    const cardBar = () => {
        if (data_income.length) {
            return (
                <div>
                    <VictoryChart 
                        theme={VictoryTheme.material} 
                        height={200} 
                        domainPadding={{ x: 25 }}
                        padding={{ top: 35, bottom: 35, right: 35, left: 35 }}
                    >
                        <VictoryLegend x={80} y={10}
                            centerTitle
                            orientation="horizontal"
                            gutter={20}
                            data={[
                                { name: "Revenue", symbol: { fill: "#3C4890" }, labels: { fontSize: 7 } },
                                { name: "Net Income", symbol: { fill: "#727cb9" }, labels: { fontSize: 7 } },
                                { name: "Profit Margin", symbol: { fill: "#9ba3d4" }, labels: { fontSize: 7 } }
                            ]}
                        />
                        <VictoryAxis 
                            key={2}
                            dependentAxis
                            offsetX={35}
                            orientation="right"
                            tickValues={[0, 5 * 10000000, 10 * 10000000, 15 * 10000000, 20 * 10000000, 25 * 10000000 ]}
                            tickFormat={(t) => `${Math.round(t / 10000000)}%`}
                            style={{
                                axis: {stroke: "#fff" },
                                ticks: { padding: -5 },
                                tickLabels: { fontSize: 4 },
                                grid: { stroke: "#bbb" }
                            }}
                        />
                        <VictoryAxis 
                            dependentAxis
                            offsetX={35}
                            tickValues={[0, 5 * 10000000, 10 * 10000000, 15 * 10000000, 20 * 10000000, 25 * 10000000 ]}
                            style={{ 
                                axis: {stroke: "#fff" },
                                tickLabels: {fontSize: 4, padding: 2, angle: -20 },
                                grid: { stroke: "#bbb" }
                            }}
                            
                        />
                        <VictoryAxis 
                            offsetY={35}
                            style={{ 
                                tickLabels: {fontSize: 7, padding: 2, fontSize: 4 },
                                padding: { left: 120 },
                                axis: { strokeWidth: 1 }
                            }}
                        />
                        <VictoryGroup offset={0}
                            colorScale={"qualitative"} >
                            <VictoryLine
                                style={{
                                    data: { stroke: "#9ba3d4" },
                                    parent: { border: "1px solid #ccc"},
                                    labels: { fontSize: 7 }
                                }}
                                data={profitMargin}
                            />
                            <VictoryBar
                                alignment="start"
                                data={revenue}
                                style={{
                                    data: { fill: "#3C4890" },
                                }}
                            />
                            <VictoryBar
                                alignment="end"
                                data={netIncome}
                                style={{
                                    data: { fill: "#727cb9" },
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

    const statisticCard = () => {
        return (
            <div className="statistics">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="row">
                            <StatisticCard statisticCardName="Transaction Complete" statisticCardData={totalSales} iconStatistic="lnr-cart" />
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="row">
                            <StatisticCard statisticCardName="Transaction Complete" statisticCardData={totalSales} iconStatistic="lnr-cart" />
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="row">
                            <StatisticCard 
                                statisticCardName="Total Profit" 
                                statisticCardData={ <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={totalProfit}
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    displayType="text"
                                                    type="text"
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                                } 
                                iconStatistic="lnr-diamond"
                            />
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="row">
                            <StatisticCard 
                                statisticCardName="Total Revenue" 
                                statisticCardData={ <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={totalRevenue}
                                                    prefix="Rp. "
                                                    decimalSeparator="."
                                                    displayType="text"
                                                    type="text"
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                                } 
                                iconStatistic="lnr-briefcase"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid content-top-gap">
            <div className='d-flex justify-content-between align-items-center'>
                <div className="welcome-msg py-2">
                    <h1>Sales Dashboard</h1>
                </div>
                <div>
                    <div className="formSubmit d-flex">
                        <Button className="mx-1" onClick={ () => onSubmit() }>Submit</Button>
                        <DateRangePicker
                            initialSettings={{ startDate: startDate, endDate: endDate, locale: { format: 'DD/MM/YYYY' } }}
                            onApply={ (event, picker) => applyDatePicker(event, picker) }
                        >
                            <Form.Control id="datetimePicker_fltr" className="bg-transparent" aria-label="Floating label select example" defaultValue={startDate + ' - ' + endDate}/>
                        </DateRangePicker>
                    </div>
                </div>

            </div>

            {/* <Filter filterContent={ filterTable() }/> */}
            { statisticCard() }
            <br />
            <div className="row">
                <div className="col-md-7">
                    <Card cardTitleShow={false} cardFooterShow={false} cardBody={ cardBar() } />
                </div>
                <div className="col-md-5">
                    <Card cardTitleShow={false} cardFooterShow={false} cardBody={ cardPie() } />
                    <Card cardTitleShow={false} cardFooterShow={false} cardBody={ cardBarNumberOfSales() } />
                </div>
            </div>
            <Card cardTitleShow={true} cardTitle="Data Report" cardBody={ cardBody() } /* cardFooter={ tableFooterTransaction() } */ cardFooterShow={true} />
        </div>
    )
}

export default Report;