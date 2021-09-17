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

export const addReport = (quiz, guess, language) => {
  return async (dispatch) => {
    if(quiz[language][0].includes(" ")) {
      const { data: sentence } = await axios.post('/api/report/sentence',
        {
          _id: quiz._id,
          guess,
          language
        }
      )
    } else {
      const { data: word } = await axios.post('/api/report/word',
        {
          _id: quiz._id,
          guess,
          language
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
