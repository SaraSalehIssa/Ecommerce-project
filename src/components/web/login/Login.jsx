import React from 'react'
import { useFormik } from 'formik'
import Input from '../../shared/Input'
import { loginSchema } from '../validation/auth'
import '../../../index.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Login({ saveCurrentUser }) {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async users => {
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users);
        console.log(data);

        if (data.message == 'success') {
            localStorage.setItem("userToken", data.token);
            saveCurrentUser();

            toast.success('Login was successful!', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/home');
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema
    });

    const inputs = [
        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'email',
            placeholder: 'Your email...',
            value: formik.values.email,
        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'password',
            placeholder: 'Your password...',
            value: formik.values.password,
        },
    ]

    const renderInputs = inputs.map((input, index) => {
        return <>
            <Input
                id={input.id}
                type={input.type}
                name={input.name}
                title={input.title}
                placeholder={input.placeholder}
                value={input.value}
                key={index}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors} />
        </>
    })

    return (
        <div className='container w-50 my-5 p-4 bg-lightSkyBlue'>
            <h2 className='my-3 text-capitalize text-center'>login</h2>
            <form onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button
                    type="submit"
                    className="btn btn-lightSkyBlue w-100 mt-3 text-capitalize"
                    disabled={!formik.isValid}>
                    login
                </button>
            </form>
        </div>
    )
}

export default Login