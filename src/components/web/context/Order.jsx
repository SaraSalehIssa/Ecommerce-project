import axios from "axios";
import { createContext } from "react";

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
            console.log(data);
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
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // All children of OrderContextProvider have this variables
    return <OrderContext.Provider value={{ createOrderContext, getOrderContext }}>
        {children}
    </OrderContext.Provider>;
}