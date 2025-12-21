import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createOrder = async (paymentIntentId, token,courses) => {

   await axios.post(
    `${API_URL}/api/orders/create-orders`, {
        paymentIntentId,
        courses
    },{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
}