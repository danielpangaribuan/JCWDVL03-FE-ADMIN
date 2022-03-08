import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticCard from '../components/statisticCard';
import NumberFormat from "react-number-format";

import { AiOutlineInfoCircle } from "react-icons/ai";

import { getTotalData } from '../actions/report';

function Home () {
    const dispatch = useDispatch();
    const { totalSales, totalProfit, totalRevenue, totalMember } = useSelector(state => {
        return {
            totalSales: state.reportTotalData.data.total_sales,
            totalProfit: state.reportTotalData.data.total_profit,
            totalMember: state.reportTotalData.data.total_member,
            totalRevenue: state.reportTotalData.data.total_revenue,
        }
    });

    useEffect(() => {
        dispatch(getTotalData());
    }, [])


    return (
        <div className="container-fluid content-top-gap">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb my-breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
            <div className="welcome-msg pt-3 pb-4">
                <h1>Hi <span className="text-primary">John</span>, Welcome back</h1>
                <p>Very detailed & featured admin.</p>
            </div>

            {/* <!-- statistics data --> */}
            <div className="statistics">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="row">
                            <StatisticCard statisticCardName="Total Members" statisticCardData={totalMember} iconStatistic="lnr-users" />
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
            
        </div>
    )
}
export default Home;