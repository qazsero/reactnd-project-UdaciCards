import {CREATE_DECK, REMOVE_DECK} from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_DECK:
      return [...state, {id: action.id, name:action.name, questions:0}]
    case REMOVE_DECK:
      return state.filter((s) => s.id != action.id)
    default:
      return state
  }
}
