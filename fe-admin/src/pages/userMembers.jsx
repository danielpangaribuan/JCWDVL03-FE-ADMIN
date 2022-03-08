import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import Card from '../components/card';
import MyModal from '../components/modal';
import { getDataUsers } from '../actions/user';
import { Table, Pagination, Button, Form, Col, Row } from 'react-bootstrap';
import { AiFillDelete, AiOutlineUser } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function UserMembers () {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
    const { data, loading, totalPage, currPage, totalData } = useSelector(state => {
        return {
            data : state.users.data,
            totalPage : state.users.data.totalPage,
            currPage : state.users.data.currentPage,
            totalData : state.users.data.length,
            loading : state.users.loading
        }
    });

    useEffect(() => {
        dispatch(getDataUsers(page, size, 1));
    }, [page, size]);
    console.log(data)

    // ====================== MODAL DETAIL ====================
    const [showModalDetail, setShowModalDetail] = useState(false);
    const handleClose_modalDetail = () => setShowModalDetail(false);
    const handleShow_modalDetail = () => setShowModalDetail(true);

    const modalUserDetail = () => {
        return (
            <Form>
                <Row>
                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Nama Lengkap
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Email
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Username
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Jenis Kelamin
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Tanggal Lahir
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Status User
                            </Form.Label>
                            <Col sm="7">
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    style={{paddingLeft: '40px'}}
                                    className="h-100 d-flex align-items-center"
                                />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="5">
                                Nama Penerima
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Alamat Penerima
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Nama Provinsi
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Nama Kota
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                Kodepos
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control plaintext readOnly disabled defaultValue="Password" />
                            </Col>
                        </Form.Group>
                    </Col>

                </Row>
                
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
    const cardBodyUser = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th>Nama Lengkap</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th className="text-center">Jenis Kelamin</th>
                        <th className="text-center">Tanggal Lahir</th>
                        <th className="text-center">Status Verified</th>
                        <th className="text-center">Tanggal Daftar</th>
                        <th className="text-center">Actions</th>
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
                <div className="col-lg-6">
                    <Form>
                        <Form.Select aria-label="Default Select Status" defaultValue={size} style={{ width: '130px'}} onChange={ (item) => setSize(item.target.value) }>
                            <option value={ totalData }>All</option>
                            <option value="10">10 Rows</option>
                            <option value="25">25 Rows</option>
                            <option value="50">25 Rows</option>
                        </Form.Select>
                    </Form>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                    <Pagination className="mb-0">
                        <Pagination.Prev onClick={ () => setPage(currPage - 1) } className={currPage ===  1 ? 'disabled' : ''} />
                        { renderPagination() }
                        <Pagination.Next onClick={ () => setPage(currPage + 1) } className={currPage === totalPage ? 'disabled' : ''} />
                    </Pagination>
                </div>
            </div>
        )
    }

    const renderPagination = () => {
        let pagination = [];
        for(let i = 1; i <= totalPage; i++ ) {
            let active = i === currPage ? 'active' : '';
            pagination.push(<Pagination.Item key={i} className={active} onClick={ () => setPage(i) }>{i}</Pagination.Item>)
        }
        return pagination;
    }

    const renderDataUser = () => {
        if (data.length) {
            return data.rows.map((item, idx) => {
                return (
                    <tr key={item.id}>
                        <td className="text-center">{ idx + 1 }</td>
                        <td>{ item.fullname }</td>
                        <td>{ item.email }</td>
                        <td>{ item.username }</td>
                        <td className="text-center">{ item.gender }</td>
                        <td className="text-center">
                            <Moment format='DD MMM YYYY'>
                                { item.tanggal_lahir }
                            </Moment>
                        </td>
                        <td className='text-center'>
                            { item.status_verified === 0 ? <span className="text-danger">Tidak Aktif</span> : <span className="text-success">Aktif</span> }
                        </td>
                        <td className="text-center">
                            <Moment format='DD MMM YYYY'>
                                { item.created_at }
                            </Moment>    
                        </td>
                        <td className="text-center">
                            <Button className="bg-transparent text-info mr-1" style={{borderWidth: 0}} size="sm" onClick={ () => handleShow_modalDetail() }>
                                <AiOutlineUser />
                                {/* Detail */}
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
                    <td colSpan="9" style={{ textAlign: 'center' }}>
                        Data not found
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="container-fluid content-top-gap">
            {/* ==================== DATA USER ====================*/}
            <Card cardTitleShow={true} cardTitle="Data User" cardBody={ cardBodyUser() } cardFooter={ cardFooterUser() } cardFooterShow={true} />
            <MyModal size="lg" modalTitle="Alamat User" modalBody={ modalUserDetail() } show={ showModalDetail } handleClose={ () => handleClose_modalDetail() }  />
            <MyModal size="lg" modalTitle="Ubah Data User" modalBody={ modalDataEdit() } show={ showModalEdit } handleClose={ () => handleClose_modalEdit() } />
        </div>
    )
}
export default UserMembers;