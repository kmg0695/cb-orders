import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get("http://localhost:5151/api/products");
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:5151/api/products/${id}`
    );
    console.log(data);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_DETAILS_RESET,
  });
};
