import {CREATE_QUESTION, REMOVE_QUESTIONS_FROM_DECK} from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_QUESTION:
      return [...state, action.values]
    case REMOVE_QUESTIONS_FROM_DECK:
      return state.filter((s) => s.parendId != action.id)
    default:
      return state
  }
}
