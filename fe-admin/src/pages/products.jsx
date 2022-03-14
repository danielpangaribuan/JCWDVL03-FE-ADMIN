import React, {useEffect, useRef,} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getAllProducts, addNewProduct, deleteProduct } from '../actions/product'

import Card from '../components/card'
import { Table, Form, Button, } from 'react-bootstrap'
import { event } from 'jquery'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

function Products () {
    const nameRef = useRef(' ')
    const priceRef = useRef(0)
    const quantitityRef = useRef(0)
    const warehouseRef = useRef(' ')
    const descRef = useRef(' ')
    const categoryRef = useRef(0)
    const weightRef = useRef(0)


    const dispatch = useDispatch()
    const { loading, products } = useSelector(state => {
        return {
            loading : state.products.loading,
            products : state.products.data
        }
    })

    useEffect(() => {
      dispatch(getAllProducts())
    }, [])

    const renderDataProducts = () => {
        return products.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.category_id}</td>
                    <td>{product.weight}</td>
                    <td>{product.description}</td>
                    <td>Rp {product.price.toLocaleString("id-ID")},00</td>
                    <td>{product.warehouse}</td>
                    <td>{product.quantity}</td>
                    <td className='text-center'>
                        <Button variant='danger' onClick={onButtonDelete} id={product.id}>
                            Delete
                        </Button>
                        <Button variant="warning" id={product.id}>
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
                <Form.Control type="text" placeholder="category id" ref={categoryRef}/>
                <br/>
                <Form.Control type="text" placeholder="weight" ref={weightRef}/>
                <br/>
                <Form.Control type="text" placeholder="Description" ref={descRef}/>
                <br/>
                <Form.Control type="text" placeholder="price" ref={priceRef}/>
                <br/>
                <Form.Control type="text" placeholder="warehouse" ref={warehouseRef}/>
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
            category_id : Number(categoryRef.current.value),
            weight : Number(weightRef.current.value),
            price : Number(priceRef.current.value),
            description : descRef.current.value,
        }
        dispatch(addNewProduct(body))
    }

    const onButtonDelete = (event) => {
        const id = Number(event.target.id)
        axios.delete(API_URL + `/products/${id}`)
        .then (res => console.log(res.data))
        .catch( error => console.log(error))
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
                        <th className="text-center">Deskripsi</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Warehouse</th>
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
            <Card cardTitle="Add Product" cardBody={ newproduct() }/>
            <Card cardTitle="Products" cardBody={ tableProducts() } />
        </div>
    )
}

export default Products;