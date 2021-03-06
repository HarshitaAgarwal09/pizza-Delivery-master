import { GET_CART } from "../actions/types";
import store from "../store";
import axios from "axios";

export const addToCart = (cartData, history, quantity) => (dispatch) => {
  const cart_items = store.getState().cr.cart;

  let should_update = true;
  if (cart_items != null) {
    cart_items.products.forEach((product) => {
      if (product.productid === cartData.productid) {
        //Increase by one
        if (cartData.operation === "+1") {
          cartData.qty = parseInt(
            parseInt(product.qty) + parseInt(cartData.qty)
          );
          //Decrease
        } else if (cartData.operation === "-1") {
          //on decreasing by one quantity becomes zero
          if (product.qty <= 1) {
            dispatch(deleteCartProduct(cartData));
            should_update = false;
          } else {
            //Deceased by one
            cartData.qty = product.qty - 1;
          }
        }
      }
    });
  }

  if (should_update) {
    const cart = {
      userid: store.getState().user_r.user.userid,
      name: store.getState().user_r.user.name,
      products: [
        {
          product_id: cartData._id,
          _id: cartData._id,
          productid: cartData.productid,
          name: cartData.name,
          price: cartData.price,
          toppings: cartData.toppings,
          qty: cartData.qty,
          total: cartData.qty * cartData.price
        }
      ]
    };
    axios
      .post("https://pizza-hub.herokuapp.com/cart/add", cart)
      .then((res) => {
        dispatch(getCart());
        // history.push("/cart");
      })
      .catch((err) => {
        alert("Some error has occured. Please try again later!!" + err);
      });
  }
};

export const getCart = (cartData) => (dispatch) => {
  const userid = store.getState().user_r.user.userid;
  axios
    .get("https://pizza-hub.herokuapp.com/cart/search", {
      params: {
        userid: userid
      }
    })
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data.record[0] //cartList
      });
      dispatch(getPriceDetails());
    })
    .catch((err) => {
      dispatch({
        type: GET_CART,
        payload: null //cartList
      });
    });
};

export const getPriceDetails = (productid) => (dispatch) => {
  dispatch({
    type: "GET_PRICE"
  });
};

//Delete product
export const deleteCartProduct = (cartData) => (dispatch) => {
  const deleteCartData = {
    userid: store.getState().user_r.user.userid,
    name: store.getState().user_r.user.name,
    products: [
      {
        productid: cartData.productid,
        name: cartData.name,
        price: cartData.price,
        toppings: cartData.toppings,
        qty: cartData.qty,
        total: cartData.qty * cartData.price
      }
    ]
  };
  axios
    .post("https://pizza-hub.herokuapp.com/cart/deleteOne", deleteCartData)
    .then((res) => {
      alert("Product deleted from Cart");
      dispatch(getCart());
    })
    .catch((err) => {
      alert("Error in deletion. Please try again later!!");
    });
};

//Delete products in cart
export const deleteAllCart = (productid) => (dispatch) => {
  const deleteData = {
    userid: store.getState().user_r.user.userid
  };
  axios
    .post("https://pizza-hub.herokuapp.com/cart/deleteAll", deleteData)
    .then((res) => {
      alert("Error in deletion");
      dispatch(getCart());
    })
    .catch((err) => {
      alert("Error in deletion! Please try again later");
    });
};
