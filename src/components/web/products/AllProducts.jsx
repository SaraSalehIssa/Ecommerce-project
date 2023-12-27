import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import WebCategories from '../categories/WebCategories';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../index.css';
import style from '../categories/Categories.module.css';
import { Link } from 'react-router-dom';

function AllProducts() {
    const [sortOption, setSortOption] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const getAllProducts = async (sort, min, max) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&sort=${sort}&price[lte]=${max}&price[gte]=${min}`);
        return data;
    };

    const { data, isLoading } = useQuery(['products', sortOption, minPrice, maxPrice], () => getAllProducts(sortOption, minPrice, maxPrice));

    const handleSortChange = (e) => {
        const selectedSortOption = e.target.value;
        setMinPrice(0);
        setMaxPrice(5000);
        setSortOption(selectedSortOption);
    };

    const handlePriceChange = (e) => {
        let minPriceInput = document.getElementById('minPriceInput').value;
        let maxPriceInput = document.getElementById('maxPriceInput').value;

        // Update the price state
        setMinPrice(minPriceInput);
        setMaxPrice(maxPriceInput);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <WebCategories />

            <div className='d-flex justify-content-center mt-5'>
                <h2 className='text-center text-capitalize border-bottom my-3 w-75'>all products</h2>
            </div>

            <div className='container w-75 d-flex justify-content-center'>
                <select
                    className="form-select form-select-sm"
                    onChange={handleSortChange}
                    aria-label="Small select example">
                    <option value="">Sort</option>
                    <option value="price">Price Low to High</option>
                    <option value="-price">Price High to Low</option>
                    <option value="discount">Discount Low to High</option>
                    <option value="-discount">Discount High to Low</option>
                </select>
            </div>

            <div className='container w-75 d-flex justify-content-center border-top border-bottom mt-3 py-3'>
                <div className="row g-3 align-items-center">
                    <div className="col-lg-1">
                        <label htmlFor="inputPassword6" className="col-form-label">Price:</label>
                    </div>
                    <div className="col-lg-3">
                        <div className="input-group">
                            <input id='minPriceInput' placeholder='From' type="number" min='1' className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                            <span className="input-group-text">$</span>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="input-group">
                            <input id='maxPriceInput' placeholder='To' type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                            <span className="input-group-text">$</span>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <button className={`${style.goBtn}`} onClick={handlePriceChange}>Go</button>
                    </div>
                </div>

            </div>

            <div className="container d-flex justify-content-center">
                <div className="row">
                    {data.products.length ? data.products.map((product) =>
                        <div className="col-lg-3 px-3" key={product._id}>
                            <div className={`${style.card}`}>
                                <img src={product.mainImage.secure_url} className={`${style.cardImg}`} alt="product image..." />
                                <div className="card-body p-2">
                                    <p className={`${style.cardTitle}`}>{product.name}</p>
                                    <p className={`${style.cardTitle}`}>Price: {product.price} $</p>
                                    <p className={`${style.cardTitle}`}>Discount: {product.discount} %</p>
                                    <p className={`${style.cardTitle}`}>Final Price: {product.finalPrice} $</p>
                                    <Link to={`/product/${product._id}`} className={`${style.cardBtn}`}>See Details</Link>
                                </div>
                            </div>
                        </div>
                    ) : 'No products found!'}
                </div>
            </div>
        </>
    );
}

export default AllProducts;
