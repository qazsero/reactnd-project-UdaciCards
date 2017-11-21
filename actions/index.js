import {CREATE_DECK, REMOVE_DECK} from './types'

export function createDeck(id, name){
  return {
    type: CREATE_DECK,
    id,
    name,
  }
}

export function removeDeck(id){
  return {
    type: REMOVE_DECK,
    id,
  }
}
