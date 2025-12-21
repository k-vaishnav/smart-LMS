import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const addToCart = async (courseId, token) => {
  try{
     const { data } = await axios.post(
    `${API_URL}/api/cart/add`,
    { courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
  }
  catch(err){
    console.log(err);
  }
 
};

export const fetchCartItems = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/cart/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeCartItem = async (cartItemId, token) => {
  const { data } = await axios.delete(
    `${API_URL}/api/cart/remove/${cartItemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
