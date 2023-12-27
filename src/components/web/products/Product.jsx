import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
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
                    <div className="col-lg-4 d-flex" key={index}>
                        <img src={img.secure_url} className="d-flex justify-content-between w-100" alt="product image" />
                    </div>
                ))}

                <div className={`${style.info}`}>
                    <h5 className={`${style.data}`}><span className={`${style.title}`}>name: </span>{data.name}</h5>
                    <p className={`${style.data}`}><span className={`${style.title}`}>price: </span> {data.price} <span>$</span></p>
                    <p className={`${style.data}`}><span className={`${style.title}`}>description: </span> {data.description}</p>
                    <div className='d-flex justify-content-center'>
                        <button className={`${style.btn}`} onClick={() => addToCart(data._id)}>Add To Cart</button>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <p className={`${style.data}`}><span className={`${style.title}`}>reviews: </span></p>
                        <Link className={`${style.btn}`} to={`/review/${productId}`}>Add New Review</Link>
                    </div>
                </div>
            </div>

            {data.reviews.length ? data.reviews.map((review, index) =>
                <div className="card" key={review._id}>
                    <div className="card-header">
                        Review {index}
                    </div>
                    <img src={review.createdBy.image.secure_url} className="rounded mx-auto d-block review-img my-3" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Comment: {review.comment}</h5>
                        <p className="card-text text-capitalize">Username: {review.createdBy.userName}</p>
                        <p className="card-text">Email: {review.createdBy.email}</p>
                        <p className="card-text">Rating:</p>
                        <div className="container">
                            <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-review text-dark" style={{ width: `${(review.rating / 5) * 100}%` }}>{(review.rating / 5) * 100}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : 'No reviews found!'}

        </div>
    )
}

export default Product