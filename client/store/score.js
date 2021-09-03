import axios from 'axios';

// Action Types (Contants)
const INCREMENT_SCORE = "INCREMENT_SCORE"
const UPDATE_TOTAL_SCORE = "UPDATE_TOTAL_SCORE"

// Action Creators
export const incrementScore = () => {
  return ({
    type: INCREMENT_SCORE
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

export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return state + 1;
  default:
    return state;
  }
}
