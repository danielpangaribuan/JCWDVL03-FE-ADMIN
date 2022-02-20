import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Moment from 'react-moment';
import StatisticCard from '../components/statisticCard';
import Card from '../components/card';
import MyModal from '../components/modal';
import { Table, Pagination, Button} from 'react-bootstrap';
import { AiOutlineUserAdd, AiFillEdit, AiFillDelete, AiOutlineUser } from 'react-icons/ai';

function Home () {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    // ====================== MODAL DETAIL ====================
    const [showModalDetail, setShowModalDetail] = useState(false);
    const handleClose_modalDetail = () => setShowModalDetail(false);
    const handleShow_modalDetail = () => setShowModalDetail(true);

    const modalUserDetail = () => {
        return (
            <div></div>
        )
    }

    // ======================= DATA USER =======================
    const buttonCreateUser = () => {
        return (
            <Button variant="primary" size="sm" >
                <AiOutlineUserAdd className="mr-2" />
                Create
            </Button>
        )
    }

    const cardBodyUser = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Lengkap</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Jenis Kelamin</th>
                        <th>Tanggal Lahir</th>
                        <th>Status Verified</th>
                        <th>Tanggal Daftar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { renderDataUser() }
                </tbody>
            </Table>
        )
    }

    const cardFooterUser = () => {
        return (
            <div className="row">
                <div className="col-lg-6 offset-6 d-flex justify-content-end">
                    <Pagination className="mb-0">
                        <Pagination.Prev onClick={ () => setPagination(currPage - 1) } data={currPage} className={currPage ===  1 ? 'disabled' : ''} />
                        { renderPagination() }
                        <Pagination.Next onClick={ () => setPagination(currPage + 1) } data={currPage} className={currPage === totalPage ? 'disabled' : ''} />
                    </Pagination>
                </div>
            </div>
        )
    }

    const setPagination = (paging) => {
        setPage(parseInt(paging));
        getDataUser();
    }

    const getDataUser = () => {
        Axios.get(`http://localhost:2000/api/users?page=${page}&size=${size}`)
        .then((res) => {
            setData(res.data.data);
            setTotalPage(data.totalPage);
            setCurrPage(data.currentPage);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const renderPagination = () => {
        let pagination = [];
        for(let i = 1; i <= totalPage; i++ ) {
            let active = i === currPage ? 'active' : '';
            pagination.push(<Pagination.Item key={i} className={active} onClick={ () => setPagination(i) }>{i}</Pagination.Item>)
        }
        return pagination;
    }

    const renderDataUser = () => {
        if (data.rows) {
            return data.rows.map((item, idx) => {
                return (
                    <tr key={item.id}>
                        <td>{ idx + 1 }</td>
                        <td>{ item.nama_lengkap }</td>
                        <td>{ item.email }</td>
                        <td>{ item.username }</td>
                        <td>{ item.jenis_kelamin }</td>
                        <td>
                            <Moment format='DD MMM YYYY'>
                                { item.tanggal_lahir }
                            </Moment>
                        </td>
                        <td className='text-center'>
                            { item.status_verified === 0 ? <span className="text-danger">Tidak Aktif</span> : <span className="text-success">Aktif</span> }
                        </td>
                        <td>
                            <Moment format='DD MMM YYYY'>
                                { item.created_at }
                            </Moment>    
                        </td>
                        <td>
                            <Button className="bg-transparent text-info mr-1" style={{borderWidth: 0}} size="sm" onClick={ () => handleShow_modalDetail() }>
                                <AiOutlineUser />
                                {/* Detail */}
                            </Button>
                            <Button className="bg-transparent text-warning mr-1" style={{borderWidth: 0}} size="sm">
                                <AiFillEdit />
                                {/* Edit */}
                            </Button>
                            <Button className="bg-transparent text-danger" style={{borderWidth: 0}} size="sm">
                                <AiFillDelete />
                                {/* Delete */}
                            </Button>
                            
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan="7">
                        Data not found
                    </td>
                </tr>
            )
        }
    }

    useEffect(() => {
        getDataUser();
    }, [data]);

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
            {/* <!-- //statistics data --> */}
            
            {/* ==================== DATA USER ====================*/}
            <Card cardTitle="Data User" buttonCreate={ buttonCreateUser() } cardBody={ cardBodyUser() } cardFooter={ cardFooterUser() } />
            <MyModal modalTitle="Detail User" modalBody={ modalUserDetail() } show={ showModalDetail } handleClose={ () => handleClose_modalDetail() }  />

        </div>
    )
}
export default Home;