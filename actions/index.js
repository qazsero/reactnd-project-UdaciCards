import {CREATE_DECK, REMOVE_DECK, SUM_QUESTION_TO_DECK, REMOVE_QUESTIONS_FROM_DECK, CREATE_QUESTION, SET_DECKSCREEN_KEY} from './types'

export function createDeck(id, name){
  return {
    type: CREATE_DECK,
    id,
    name,
  }
}

export function removeQuestionsFromDeck(id){
  return {type: REMOVE_QUESTIONS_FROM_DECK, id}
}

export function removeDeck(id){
  return {type: REMOVE_QUESTIONS_FROM_DECK, id}
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

export function setDeckScreenKey(key){
  return {
    type: SET_DECKSCREEN_KEY,
    key,
  }
}
