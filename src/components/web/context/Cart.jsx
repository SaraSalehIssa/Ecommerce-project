import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
    let [count, setCount] = useState(0);

    const addToCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } });

            if (data.message == 'success') {
                toast.success('Product added successfully!', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setCount(++count);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getCartContext = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
                { headers: { Authorization: `Tariq__${token}` } });
            setCount(data.count);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const removeItemContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const clearAllContext = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
                {},
                { headers: { Authorization: `Tariq__${token}` } });
            setCount(0);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const increaseQtyContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const decreaseQtyContext = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // All children of CartContextProvider have count variable
    return <CartContext.Provider value={{ addToCartContext, getCartContext, removeItemContext, count, setCount, clearAllContext, increaseQtyContext, decreaseQtyContext }}>
        {children}
    </CartContext.Provider>;
}