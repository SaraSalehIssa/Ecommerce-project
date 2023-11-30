import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

function CategoriesDetails() {
    const { categoryId } = useParams();

    const getCategoriesDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const { data, isLoading } = useQuery('category_details', getCategoriesDetails);
    console.log(data)

    if (isLoading)
        return <h2>Loading...</h2>

    return (
        <div className='container products'>
            {data.length ? data.map((product) =>
                <div className='product' key={product._id}>
                    <img src={product.mainImage.secure_url} className="rounded-circle image-card p-3" alt="product image..." />
                    <h2>{product.name}</h2>
                    <Link to={`/product/${product._id}`}>See Details</Link>
                </div>
            ) : 'No products found!'}
        </div>
    )
}

export default CategoriesDetails