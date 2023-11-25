import React from 'react'

function Input({ id, type = 'text', name, title, placeholder, value, onChange, errors, onBlur, touched }) {
    console.log(errors)
    return (
        <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor={id}>{title}</label>
            <input
                className="form-control"
                id={id}
                type={type}
                name={name}
                title={title}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                touched={touched} />
            {touched[name] && errors[name] && <p className='text text-danger'>{errors[name]}</p>}
        </div>
    )
}

export default Input