import {CREATE_DECK, REMOVE_DECK, SUM_QUESTION_TO_DECK, CREATE_QUESTION} from './types'

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

export function sumQuestionToDeck(id){
  return {
    type: SUM_QUESTION_TO_DECK,
    id,
  }
}

export function createQuestion(values){
  return {
    type: CREATE_QUESTION,
    values,
  }
}
