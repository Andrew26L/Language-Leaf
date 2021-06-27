// Action Types (Contants)
const SET_QUESTION = "SET_QUESTION";
const SET_SUBMIT = "SET_SUBMIT";
const SET_COMPLETE = "SET_COMPLETE";
const SET_GUESS = "SET_GUESS";

// Action Creators
export const incrementQuestion = () => {
  return ({
    type: SET_QUESTION,
  })
}

export const toggleSubmitStatus = (bool) => {
  return ({
    type: SET_SUBMIT,
    submittedGuess: bool
  })
}

export const quizCompleted = (bool) => {
  return ({
    type: SET_COMPLETE,
    finishedQuiz: bool
  })
}

export const setGuess = (guess, lang) => {
  return ({
    type: SET_GUESS,
    guess,
    lang
  })
}

const initialState = {
  question: 0,
  submittedGuess: false,
  finishedQuiz: false,
  guess: '',
  lang: 'english'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {...state, question: state.question + 1};
    case SET_SUBMIT:
      return {...state, submittedGuess: action.submittedGuess};
    case SET_COMPLETE:
      return {...state, finishedQuiz: action.finishedQuiz};
    case SET_GUESS:
      return {...state, guess: action.guess, lang: action.lang}
    default:
      return state;
  }
}
