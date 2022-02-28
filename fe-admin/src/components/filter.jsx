import React from 'react';

function Filter (props) {
    return (
        <div>
            <div className="card card_border">
                <div className="card-header card-grid__header px-4 py-3 bg-transparent d-flex justify-content-between align-items-center">
                    <h5>
                        Filter
                    </h5>
                    <div className="button-create">
                        { props.buttonHide }
                    </div>
                </div>
                <div className="card-body p-4">
                    { props.filterContent }
                </div>
            </div>
        </div>
    )
}

export default Filter;