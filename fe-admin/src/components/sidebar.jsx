import React from 'react';
import sidebarLogo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Sidebar () {
    const dispatch = useDispatch();


    const navigation = useNavigate();
    
    return (
        <div className="sidebar-menu sticky-sidebar-menu">
            {/* <!-- logo start --> */}
            <div className="logo">
                <h1><a href="index.html">Collective</a></h1>
            </div>

            {/* <!-- if logo is image enable this --> */}
            {/* <!-- image logo -- */}
            <div className="logo">
                <a onClick={() => navigation('/')}>
                    <img src="image-path" alt="Your logo" title="Your logo" className="img-fluid" style={{height: '35px'}} />
                </a>
            </div>
            {/* <!-- //image logo --> */}

            <div className="logo-icon text-center">
                <a onClick={() => navigation('/')} title="logo">
                    <img src={sidebarLogo} alt="logo-icon" />
                </a>
            </div>
            {/* <!-- //logo end --> */}

            <div className="sidebar-menu-inner">

                {/* <!-- sidebar nav start --> */}
                <ul className="nav nav-pills nav-stacked custom-nav">
                    <li>
                        <a onClick={() => navigation('products')}><i className="fa fa-tachometer"></i><span> Products</span></a>
                    </li>
                    <li>
                        <a onClick={() => navigation('transaction')} ><i className="fa fa-money"></i> <span>Transaction Products</span></a>
                    </li>
                    <li>
                        <a onClick={() => navigation('user-members')} ><i className="fa fa-user"></i> <span>User Member</span></a>
                    </li>
                    <li>
                        <a onClick={() => navigation('user-operator')} ><i className="fa fa-users"></i> <span>User Operator</span></a>
                    </li>
                    <li>
                        <a onClick={() => navigation('report')} ><i className="fa fa-file-text"></i> <span>Report</span></a>
                    </li>
                </ul>
                {/* <!-- //sidebar nav end --> */}
                {/* <!-- toggle button start --> */}
                <a className="toggle-btn">
                    <i className="fa fa-angle-double-left menu-collapsed__left"><span>Collapse Sidebar</span></i>
                    <i className="fa fa-angle-double-right menu-collapsed__right"></i>
                </a>
                {/* <!-- //toggle button end --> */}
            </div>
        </div>
    )
}

export default Sidebar;