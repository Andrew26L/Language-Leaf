import axios from 'axios';

// Action Types (Constants)
const SET_QUIZ = 'SET_QUIZ';

// Action Creators
const setQuiz = (quiz) => ({
  type: SET_QUIZ,
  quiz
})

//Thunks
export const fetchQuiz = () => {
  return async (dispatch) => {
    const { data: words } = await axios.get('/api/words');
    const { data: sentences } = await axios.get('/api/sentences');
    const quiz = [];
    // Alternate every other question to be a word and then a sentence.
    for (let i = 0; i < words.length; i++) {
      quiz.push(words[i])
      if (sentences[i]) {
        quiz.push(sentences[i])
      }
    }
    dispatch(setQuiz(quiz));
  }
}

export const updateSolution = (quiz, guess, lang) => {
  return async (dispatch) => {
    if(quiz[lang][0].includes(" ")) {
      const { data: sentence } = await axios.put('/api/sentences',
        {
          _id: quiz._id,
          guess,
          lang
        }
      )
    } else {
      const { data: word } = await axios.put('/api/words',
        {
          _id: quiz._id,
          guess,
          lang
        }
      )
    }
  }
}

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}
