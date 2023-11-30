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