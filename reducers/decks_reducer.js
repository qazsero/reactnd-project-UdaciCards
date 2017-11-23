import {CREATE_DECK, REMOVE_DECK, SUM_QUESTION_TO_DECK} from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_DECK:
      return [...state, {id: action.id, name:action.name, questions:0}]
    case REMOVE_DECK:
      return state.filter((s) => s.id != action.id)
    case SUM_QUESTION_TO_DECK:
      return state.map((s) => s.id === action.id ? {...s, questions: s.questions+1} : s)
    default:
      return state
  }
}
