import React, {useEffect, useRef, useState,} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getAllProducts, addNewProduct, deleteProduct, getCategory,getWarehouse } from '../actions/product'

import Card from '../components/card'
import { Table, Form, Button, } from 'react-bootstrap'
import { event } from 'jquery'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

function Products () {
    const nameRef = useRef(' ')
    const priceRef = useRef(0)
    const quantitityRef = useRef(0)
    const descRef = useRef(' ')
    const [cat, setcat] = useState(' ')
    const [wh ,setwh] = useState(' ')
    const weightRef = useRef(0)


    const dispatch = useDispatch()
    const { loading, products, category, warehouse } = useSelector(state => {
        return {
            loading : state.products.loading,
            products : state.products.data,
            category : state.products.category,
            warehouse : state.products.warehouse,
        }
    })

    useEffect(() => {
      dispatch(getAllProducts());
      dispatch(getCategory())
      dispatch(getWarehouse())
    }, [])

    const renderDataProducts = () => {
        return products.map( product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.category}</td>
                    <td>{product.weight}</td>
                    <td><img src={API_URL + `/products/${product.image}`} /></td>
                    <td>{product.description}</td>
                    <td>Rp {product.price.toLocaleString("id-ID")},00</td>
                    <td>{product.warehouse}</td>
                    <td>{product.quantity}</td>
                    <td className='text-center'>
                        <Button variant='danger' onClick={onButtonDelete} id={product.id}>
                            Delete
                        </Button>
                        <Button variant="warning" onClick={onButtonEdit} id={product.id}>
                            Edit
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    const newproduct = () => {
        return (
             <Form className="product-form">
                <Form.Control type="text" placeholder="product name" ref={nameRef}/>
                <br/>
                <Form.Select aria-label="Floating label select example" onChange={ (item) => setcat(item.target.value) }>
                                <option value=''> category</option>
                                    {
                                        category.map((item, idx) => {
                                            return (
                                                <option value={ item.id } key={ idx }>
                                                    { item.name }
                                                </option>
                                            )
                                        })
                                    }
                </Form.Select>
                <br/>
                <Form.Control type="text" placeholder="weight" ref={weightRef}/>
                <br/>
                <Form.Control type="text" placeholder="image" ref={weightRef}/>
                <br/>
                <Form.Control type="text" placeholder="Description" ref={descRef}/>
                <br/>
                <Form.Control type="text" placeholder="price" ref={priceRef}/>
                <br/>
                <Form.Select aria-label="Floating label select example" onChange={ (item) => setwh(item.target.value) }>
                                <option value=''> warehouse</option>
                                    {
                                        warehouse.map((item, idx) => {
                                            return (
                                                <option value={ item.id } key={ idx }>
                                                    { item.warehouse_name }
                                                </option>
                                            )
                                        })
                                    }
                </Form.Select>
                <br/>
                <Form.Control type="text" placeholder="quantity" ref={quantitityRef}/>
                <br/>
                <Button variant="primary" onClick={onButtonSubmit}>Submit</Button>
            </Form>
        )
    }

    const onButtonSubmit = () => {
        const body = {
            product_name : nameRef.current.value,
            category : cat,
            weight : Number(weightRef.current.value),
            price : Number(priceRef.current.value),
            description : descRef.current.value,
            warehouse : wh,
            quantity : Number(quantitityRef.current.value)
        }
        dispatch(addNewProduct(body))
    }

    const onButtonDelete = (event) => {
        const id = Number(event.target.id)
        axios.delete(API_URL + `/products/${id}`)
        .then (res => console.log(res.data))
        .catch( error => console.log(error))
    }

    const onButtonEdit = () => {
        
    }

    const tableProducts = () => {
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">Categori</th>
                        <th className="text-center">Weight</th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Deskripsi</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Warehouse</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { renderDataProducts() }
                </tbody>
            </Table>
        )
    }

    return (
        <div className="container-fluid content-top-gap">
            <Card cardTitleShow={true} cardTitle="Add Product" cardBody={ newproduct() }/>
            <Card cardTitleShow={true} cardTitle="Products" cardBody={ tableProducts() } />
        </div>
    )
}

export default Products;