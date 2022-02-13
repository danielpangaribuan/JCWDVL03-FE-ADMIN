import React from 'react';
import sidebarLogo from '../assets/images/logo.png';

function Sidebar () {
    return (
        <div class="sidebar-menu sticky-sidebar-menu">
            {/* <!-- logo start --> */}
            <div class="logo">
                <h1><a href="index.html">Collective</a></h1>
            </div>

            {/* <!-- if logo is image enable this --> */}
            {/* <!-- image logo -- */}
            <div class="logo">
                <a href="index.html">
                    <img src="image-path" alt="Your logo" title="Your logo" class="img-fluid" style={{height: '35px'}} />
                </a>
            </div>
            {/* <!-- //image logo --> */}

            <div class="logo-icon text-center">
                <a href="index.html" title="logo">
                    <img src={sidebarLogo} alt="logo-icon" />
                </a>
            </div>
            {/* <!-- //logo end --> */}

            <div class="sidebar-menu-inner">

                {/* <!-- sidebar nav start --> */}
                <ul class="nav nav-pills nav-stacked custom-nav">
                    <li>
                        <a href="index.html"><i class="fa fa-tachometer"></i><span> Dashboard</span></a>
                    </li>
                    <li class="menu-list">
                        <a href="#"><i class="fa fa-cogs"></i>
                            <span>Elements <i class="lnr lnr-chevron-right"></i></span></a>
                        <ul class="sub-menu-list">
                            <li><a href="carousels.html">Carousels</a> </li>
                            <li><a href="cards.html">Default cards</a> </li>
                            <li><a href="people.html">People cards</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="pricing.html"><i class="fa fa-table"></i> <span>Pricing tables</span></a>
                    </li>
                    <li>
                        <a href="blocks.html"><i class="fa fa-th"></i> <span>Content blocks</span></a>
                    </li>
                    <li class="active">
                        <a href="forms.html"><i class="fa fa-file-text"></i> <span>Forms</span></a>
                    </li>
                </ul>
                {/* <!-- //sidebar nav end --> */}
                {/* <!-- toggle button start --> */}
                <a class="toggle-btn">
                    <i class="fa fa-angle-double-left menu-collapsed__left"><span>Collapse Sidebar</span></i>
                    <i class="fa fa-angle-double-right menu-collapsed__right"></i>
                </a>
                {/* <!-- //toggle button end --> */}
            </div>
        </div>
    )
}

export default Sidebar;