import React from 'react';

function StatisticCard (props) {
    return (
        <div className="statistics-grid">
            <div className="card card_border border-primary-top p-4">
                <i className={`lnr ${props.iconStatistic}`}> </i>
                <h3 className="text-primary number"> { props.statisticCardData } </h3>
                <p className="stat-text">{ props.statisticCardName }</p>
            </div>
        </div>
    )
}

export default StatisticCard;