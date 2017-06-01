import { LOGIN, GET_AUTH_USER, GET_AUTH_ORGS, GET_EVENTS } from "./auth.type";
import {
  fetchAccessToken,
  fetchAuthUser,
  fetchAuthUserOrgs,
  fetchUserEvents
} from "api";
import { uuid } from "utils";
import * as Keychain from "react-native-keychain";

export const auth = (code, state) => {
  return dispatch => {
    dispatch({ type: LOGIN.PENDING });

    fetchAccessToken(code, state)
      .then(data => {
        // Keychain.setGenericPassword("key", uuid()).then(function() {
        //   console.log("Key stored in keychain successfully!");
        // });

        dispatch({
          type: LOGIN.SUCCESS,
          payload: data.access_token
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN.ERROR,
          payload: error
        });
      });
  };
};

export const getUser = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_USER.PENDING });

    fetchAuthUser(accessToken)
      .then(data => {
        dispatch({
          type: GET_AUTH_USER.SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_USER.ERROR,
          payload: error
        });
      });
  };
};

export const getOrgs = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_ORGS.PENDING });

    fetchAuthUserOrgs(accessToken)
      .then(data => {
        dispatch({
          type: GET_AUTH_ORGS.SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_AUTH_ORGS.ERROR,
          payload: error
        });
      });
  };
};

export const getUserEvents = user => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_EVENTS.PENDING });

    fetchUserEvents(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_EVENTS.SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_EVENTS.ERROR,
          payload: error
        });
      });
  };
};
