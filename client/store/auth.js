import axios from 'axios';
import history from '../history'

const TOKEN = "token";

// Action Types (Constants)
const SET_AUTH = 'SET_AUTH';

// Action Creators
const setAuth = (auth) => ({
  type: SET_AUTH,
  auth
})

// Thunks
export const verifyMe = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token
        }
      })
      return dispatch(setAuth(res.data))
    }
  }
};

export const authenticate = (username, password, method) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {username, password});
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(verifyMe());
    } catch (error) {
      return dispatch(setAuth({error}))
    }
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {}
  }
}

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

