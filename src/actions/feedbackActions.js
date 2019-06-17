import { GET_FEEDBACKS, GET_USER_FEEDBACKS } from "./types";
import axios from "axios";
import store from "../store";

//Get all the admin list
export const getAllFeedbacks = () => dispatch => {
  axios
    .get("http://localhost:5000/admin/feedback/search")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_FEEDBACKS,
        payload: res.data //adminlist
      });
    })
    .catch(err => {
      dispatch({
        type: GET_FEEDBACKS,
        payload: null
      });
      console.log(err);
    });
};

//Get all the admin list
export const getUserFeedbacks = () => dispatch => {
  axios
    .get("http://localhost:5000/feedback/search", {
      params: {
        userid: store.getState().user_r.user.userid
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_USER_FEEDBACKS,
        payload: res.data //adminlist
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FEEDBACKS,
        payload: null
      });
      console.log(err);
    });
};

///Post feedback
export const addFeedback = (feedback, history) => dispatch => {
  console.log(feedback);
  const feedbackData = {
    description: feedback,
    userid: store.getState().user_r.user.userid
  };

  axios
    .post("http://localhost:5000/feedback/add", feedbackData)
    .then(res => {})
    .catch(err => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};

// //Update admin
// //Put request
// export const updateAdmin = (adminData, history) => dispatch => {
//   console.log(adminData);
//   axios
//     .put("http://localhost:5000/admin/admins/update", adminData)
//     .then(res => {
//       console.log("Admin Updated");
//       window.location.reload();
//     })
//     .catch(err => {
//       console.log("Error" + err);
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

//Delete admin
export const deleteFeedback = id => dispatch => {
  axios
    .delete("http://localhost:5000/feedback/delete", {
      feedbackid: id,
      userid: store.getState().user_r.user.userid
    })
    .then(res => {
      console.log(res.data.message);
    })
    .catch(err => {
      console.log("Error " + err.response.message);
    });
};