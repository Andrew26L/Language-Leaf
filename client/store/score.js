
// Action Types (Contants)
const INCREMENT_SCORE = "INCREMENT_SCORE"

// Action Creators
export const incrementScore = () => {
  return ({
    type: INCREMENT_SCORE
  })
}

export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return state + 1;
  default:
    return state;
  }
}
