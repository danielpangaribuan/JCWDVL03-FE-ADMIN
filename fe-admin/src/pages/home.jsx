import React from 'react';
import StatisticCard from '../components/statisticCard';

function Home () {
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
                    <div className="col-xl-6 pr-xl-2">
                        <div className="row">
                            <StatisticCard statisticCardName="Total Users" statisticCardData="29.75M" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Home;