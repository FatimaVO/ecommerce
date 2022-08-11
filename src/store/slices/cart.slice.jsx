import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart;
        }
    }
});

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addProductThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post(
            "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
            product,
            getConfig()
        )
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
};


export const buyCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
};

export const deleteProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)))
        .catch((error) => console.log(error.response));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;