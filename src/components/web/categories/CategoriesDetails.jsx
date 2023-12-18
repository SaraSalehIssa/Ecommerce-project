import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import style from './Categories.module.css'

function CategoriesDetails() {
    const { categoryId } = useParams();

    const getCategoriesDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const { data, isLoading } = useQuery('category_details', getCategoriesDetails);

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
        <div className="container">
            <div className="row">
                {data.length ? data.map((product) =>
                    <div className="col-lg-3 px-3" key={product._id}>
                        <div className={`${style.card}`}>
                            <img src={product.mainImage.secure_url} className={`${style.cardImg}`} alt="product image..." />
                            <div className="card-body p-2">
                                <p className={`${style.cardTitle}`}>{product.name}</p>
                                <Link to={`/product/${product._id}`} className={`${style.cardBtn}`}>See Details</Link>
                            </div>
                        </div>
                    </div>
                ) : 'No products found!'}
            </div>
        </div>
    )
}

export default CategoriesDetails