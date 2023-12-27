import React, { useContext, useState } from 'react'
import '../../../index.css'
import { OrderContext } from '../context/Order'
import { useNavigate, useParams } from 'react-router-dom'

function Review() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { addNewReviewContext } = useContext(OrderContext);

    const [formData, setFormData] = useState({
        comment: '',
        rating: ''
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
            const data = await addNewReviewContext(formData.comment, formData.rating, productId);
            console.log(data);

            if (data.message == 'success') {
                toast.success('Your feedback has been sent!', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    };

    return (
        <div className='container w-50 my-5 p-4 bg-lightSkyBlue'>
            <h2 className='my-3 text-capitalize text-center'>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <label className='form-label text-capitalize w-100 mb-3'>
                    feedback
                    <textarea
                        className='form-control'
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required />
                    {formData.comment.length === 0 ? <p className='text-danger'>Feedback is required!</p> : ''}
                </label>
                <br />
                <label className='form-label text-capitalize w-100 mb-3'>
                    rating
                    <input
                        className="form-range w-100"
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required />
                </label>
                <br />
                <button className='btn btn-lightSkyBlue w-100 mt-3 text-capitalize' type="submit">Add Review</button>
            </form>
        </div>
    )
}

export default Review