import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import Card from '../components/card';
import MyModal from '../components/modal';
import { getDataMembers } from '../actions/member';
import { Table, Pagination, Button, Form, Col, Row } from 'react-bootstrap';
import { AiOutlineUserAdd, AiFillEdit, AiFillDelete, AiOutlineUser } from 'react-icons/ai';

function Home () {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => {
        return {
            data : state.members.data,
            loading : state.members.data
        }
    });

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
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Nama Penerima
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Alamat Penerima
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Nama Provinsi
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Nama Kota
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Kodepos
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
            </Form>
        )
    }
    
    // ====================== MODAL EDIT =======================
    const [showModalEdit, setShowModalEdit] = useState(false);
    const handleClose_modalEdit = () => setShowModalEdit(false);
    const handleShow_modalEdit = () => setShowModalEdit(true);

    const modalDataEdit = () => {
        return (
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Nama Lengkap
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control type="text" placeholder="Nama Lengkap" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Email
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintexttext">
                    <Form.Label column sm="3">
                        username
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="Username" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="jenisKelamin">
                    <Form.Label column sm="3">
                        Jenis Kelamin
                    </Form.Label>
                    <Col sm="9">
                        <Form.Select aria-label="Default Select Status">
                            <option value="">Laki-laki</option>
                            <option value="">Perempuan</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="tanggalLahir">
                    <Form.Label column sm="3">
                        Tanggal Lahir
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="text" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="statusUser">
                    <Form.Label column sm="3">
                        Status User
                    </Form.Label>
                    <Col sm="9">
                        <Form.Select aria-label="Default Select Status">
                            <option value="">Aktif</option>
                            <option value="">Tidak Aktif</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form>
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
        dispatch(getDataMembers(page, size));
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
        if (data.data.rows) {
            console.log(data.data)
            return data.data.rows.map((item, idx) => {
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
                            <Button className="bg-transparent text-warning mr-1" style={{borderWidth: 0}} size="sm" onClick={ () => handleShow_modalEdit() }>
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
                    <td colSpan="9">
                        Data not found
                    </td>
                </tr>
            )
        }
    }

    useEffect(() => {
        dispatch(getDataMembers(page, size));
        setTotalPage(data.totalPage);
        setCurrPage(data.currentPage);
    }, []);

    return (
        <div className="container-fluid content-top-gap">
            {/* ==================== DATA USER ====================*/}
            <Card cardTitle="Data User" buttonCreate={ buttonCreateUser() } cardBody={ cardBodyUser() } cardFooter={ cardFooterUser() } />
            <MyModal size="lg" modalTitle="Alamat User" modalBody={ modalUserDetail() } show={ showModalDetail } handleClose={ () => handleClose_modalDetail() }  />
            <MyModal size="lg" modalTitle="Ubah Data User" modalBody={ modalDataEdit() } show={ showModalEdit } handleClose={ () => handleClose_modalEdit() } />
        </div>
    )
}
export default Home;