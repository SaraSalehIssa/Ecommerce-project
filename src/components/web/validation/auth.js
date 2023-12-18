import * as yup from 'yup';

export const registerSchema = yup.object({
    userName: yup.string().required("Username is required!").min(3, "Username must be at least 3 characters!").max(30, "Username must be at most 30 characters!"),
    email: yup.string().required("Email is required!").email(),
    password: yup.string().required("Password is required!").min(3, "Password must be at least 3 characters!").max(30, "Password must be at most 30 characters!"),
});

export const loginSchema = yup.object({
    email: yup.string().required("Email is required!").email(),
    password: yup.string().required("Password is required!").min(3, "Password must be at least 3 characters!").max(30, "Password must be at most 30 characters!"),
});

export const sendCodeSchema = yup.object({
    email: yup.string().required("Email is required!").email(),
});

export const forgotPasswordSchema = yup.object({
    email: yup.string().required("Email is required!").email(),
    code: yup.string().required("Code is required!").length(4, "Code must be equal 4 characters!"),
    password: yup.string().required("Password is required!").min(3, "Password must be at least 3 characters!").max(30, "Password must be at most 30 characters!"),
});