import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';
import style from './Product.module.css';

function Product() {
    const { productId } = useParams();
    const { addToCartContext } = useContext(CartContext);

    const getProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const addToCart = async (productId) => {
        const result = await addToCartContext(productId);
    }

    const { data, isLoading } = useQuery('product_details', getProduct);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='container products'>
            <div className="row">
                {data.subImages.map((img, index) => (
                    <div className="col-lg-4 d-flex">
                        <img src={img.secure_url} className="d-flex justify-content-between w-100" alt="product image" key={index} />
                    </div>
                ))}

                <div className={`${style.info}`}>
                    <h5 className={`${style.data}`}><span className={`${style.title}`}>name: </span>{data.name}</h5>
                    <p className={`${style.data}`}><span className={`${style.title}`}>price: </span> {data.price} <span>$</span></p>
                    <p className={`${style.data}`}><span className={`${style.title}`}>description: </span> {data.description}</p>
                    <div className='d-flex justify-content-center'>
                        <button className={`${style.btn}`} onClick={() => addToCart(data._id)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product