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
            
            
        </div>
    )
}
export default Home;