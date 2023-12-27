import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";

export const OrderContext = createContext(null);

export function OrderContextProvider({ children }) {
    const createOrderContext = async (couponName, address, phone) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
                {
                    couponName,
                    address,
                    phone
                },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getOrderContext = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const addNewReviewContext = async (comment, rating, productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,
                {
                    comment,
                    rating
                },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            toast.error('You have previously rated this product OR you must wait until the product reaches you!', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error);
        }
    }

    // All children of OrderContextProvider have this variables
    return <OrderContext.Provider value={{ createOrderContext, getOrderContext, addNewReviewContext }}>
        {children}
    </OrderContext.Provider>;
}