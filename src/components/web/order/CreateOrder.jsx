import React, { useContext, useState } from 'react'
import '../../../index.css'
import { CartContext } from '../context/Cart'
import { useQuery } from 'react-query'
import { OrderContext } from '../context/Order'

function CreateOrder() {
    const { getCartContext } = useContext(CartContext);
    const { createOrderContext } = useContext(OrderContext);

    const getCart = async () => {
        const result = await getCartContext();
        return result;
    }

    const { data, isLoading } = useQuery("cart", getCart);

    const [formData, setFormData] = useState({
        couponName: '',
        address: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createOrderContext(formData.couponName, formData.address, formData.phone);
        } catch (error) {
            console.log(error);
        }
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
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <h2 className='text-capitalize text-center my-3 p-0'>List Of Your Products</h2>
                        <hr className='mx-auto' />
                    </div>
                </div>
            </div>
            <div className='row w-100 p-3'>
                {data?.products ? (
                    data.products.map((product) =>
                        <div className='col-lg-2'>
                            <img className='d-flex justify-content-between w-100 rounded' src={product.details.mainImage.secure_url} key={product._id} />
                        </div>
                    )
                ) : <h2>Cart is empty!</h2>}
            </div>

            <div className='container w-50 my-5 p-4 bg-lightSkyBlue'>
                <h2 className='my-3 text-capitalize text-center'>Create Order</h2>
                <form onSubmit={handleSubmit}>
                    <label className='form-label text-capitalize w-100 mb-3'>
                        coupon name
                        <input
                            className='form-control'
                            type="text"
                            name="couponName"
                            value={formData.couponName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className='form-label text-capitalize w-100 mb-3'>
                        address
                        <input
                            className='form-control'
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        {formData.address.length === 0 ? <p className='text-danger'>address is required!</p> : ''}
                    </label>
                    <br />
                    <label className='form-label text-capitalize w-100 mb-3'>
                        phone
                        <input
                            className='form-control'
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {formData.phone.length === 0 ? <p className='text-danger'>phone number is required!</p> : ''}
                    </label>
                    <br />
                    <button className='btn btn-lightSkyBlue w-100 mt-3 text-capitalize' type="submit">Create Order</button>
                </form>
            </div>
        </>
    )
}

export default CreateOrder