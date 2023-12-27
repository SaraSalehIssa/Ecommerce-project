import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import WebCategories from './../categories/WebCategories';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../index.css';
import style from '../categories/Categories.module.css'
import { Link } from 'react-router-dom';

function Products() {
    let [pageNum, setPageNum] = useState(1);
    const getProducts = async (page) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4`);
        return data;
    };

    const { data, isLoading } = useQuery(['products', pageNum], () => getProducts(pageNum));

    const handlePageChange = (page) => {
        setPageNum(page);
    };

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
        <>
            <WebCategories />

            <div className='d-flex justify-content-center mt-5'>
                <h2 className='text-center text-capitalize border-bottom my-3 w-75'>products</h2>
                <Link className={`${style.showAllBtn}`} to='/allProducts'>show all</Link>
            </div>

            <div className="container d-flex justify-content-center">
                <div className='row'>
                    {data.products.length ? data.products.map((product) =>
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

            <div className='container px-5'>
                {data.products.length ? (
                    <>
                        <div className='row d-flex justify-content-center mx-auto my-5'>
                            {Array.from({ length: Math.ceil(parseInt(data.total) / parseInt(data.page)) }, (_, i) => (
                                <nav aria-label="..." className="col-lg-1 p-0" key={i}>
                                    <ul className="pagination d-flex justify-content-center">
                                        <li>
                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            ))}
                        </div>
                    </>
                ) : (
                    'No products found!'
                )}
            </div>
        </>
    )
}

export default Products