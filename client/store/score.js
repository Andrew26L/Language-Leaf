import axios from 'axios';

// Action Types (Contants)
const INCREMENT_SCORE = "INCREMENT_SCORE"
const SET_SCORE = "SET_SCORE"

// Action Creators
export const incrementScore = () => {
  return ({
    type: INCREMENT_SCORE
  })
}

export const setScore = (score) => {
  return ({
    type: SET_SCORE,
    score
  })
}

export const updateUserScore = (score) => {
  return async (dispatch) => {
    const { data: newScore } = await axios.put(
      'api/score',
      {score},
      {headers: {
        authorization: window.localStorage.getItem("token")
      }});
  }
}

export const fetchUserScore = () => {
  return async (dispatch) => {
    const { data } = await axios.get('api/score',
    {headers: {
      authorization: window.localStorage.getItem("token")
    }});
    dispatch(setScore(data.score));
  }
}

export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return state + 1;
    case SET_SCORE:
      return action.score;
  default:
    return state;
  }
}
