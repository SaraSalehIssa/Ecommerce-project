import { useFormik } from 'formik'
import Input from '../../shared/Input'
import { sendCodeSchema } from '../validation/auth'
import '../../../index.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function SendCode() {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
    };

    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, users);

        if (data.message == 'success') {
            toast.success('Send code successfully, please check email!', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/forgotpassword');
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: sendCodeSchema
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
            <h2 className='my-3 text-capitalize text-center'>send code</h2>
            <form onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button
                    type="submit"
                    className="btn btn-lightSkyBlue w-100 mt-3 text-capitalize"
                    disabled={!formik.isValid}>
                    submit
                </button>
            </form>
        </div>
    )
}

export default SendCode