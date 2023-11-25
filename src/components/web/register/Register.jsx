import React from 'react'
import { useFormik } from 'formik'
import Input from '../../shared/Input'
import registerSchema from '../validation/auth'
import '../../../index.css'
import axios from 'axios'
import { toast } from 'react-toastify';

function Register() {

    const initialValues = {
        userName: '',
        email: '',
        password: '',
        image: '',
    };

    const handleFieldChange = event => {
        formik.setFieldValue('image', event.target.files[0]);
    };

    const onSubmit = async users => {
        const formData = new FormData();
        formData.append("userName", users.userName);
        formData.append("email", users.email);
        formData.append("password", users.password);
        formData.append("image", users.image);

        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData);

        if (data.message == 'success') {
            formik.resetForm();
            toast.success('Account created successfully, please verify your email to login!', {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        console.log(data);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema
    });

    const inputs = [
        {
            id: 'username',
            type: 'text',
            name: 'userName',
            title: 'user name',
            placeholder: 'Your name...',
            value: formik.values.userName,
        },
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
        {
            id: 'image',
            type: 'file',
            name: 'image',
            title: 'user image',
            onChange: handleFieldChange,
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
                onChange={input.onChange || formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors} />
        </>
    })

    return (
        <div className='container w-50 my-5 p-4 bg-lightSkyBlue'>
            <h2 className='my-3 text-capitalize text-center'>registration</h2>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {renderInputs}
                <button
                    type="submit"
                    className="btn btn-lightSkyBlue w-100 mt-3"
                    disabled={!formik.isValid}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Register