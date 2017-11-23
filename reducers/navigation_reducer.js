import {SET_DECKSCREEN_KEY} from '../actions/types'


let initialState = {
  deckScreenKey:''
}


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DECKSCREEN_KEY:
      return {...state, deckScreenKey: action.key}
    default:
      return state
  }
}
