import React from 'react';

function Card (props) {

    return (
        <div className="data-tables">
            <div className="row">
                <div className="col-lg-12 chart-grid mb-4">
                    <div className="card card_border">
                        <div className="card-header card-grid__header px-4 py-3 bg-transparent d-flex justify-content-between align-items-center">
                            <h5>
                                { props.cardTitle }
                            </h5>
                            <div className="button-create">
                                { props.buttonCreate }
                            </div>
                        </div>
                        <div className="card-body px-4 pt-2 pb-0">
                            { props.cardBody }
                        </div>
                        <div className="card-footer px-4">
                            { props.cardFooter }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;