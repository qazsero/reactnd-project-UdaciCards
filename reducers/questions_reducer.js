import {CREATE_QUESTION} from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_QUESTION:
      return [...state, action.values]
    default:
      return state
  }
}
