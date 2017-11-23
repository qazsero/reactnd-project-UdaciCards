import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'


/* SELECTORES */
selectedDeck = (state,navigation) => {
  let decks = state.filter((d) => d.id === navigation.state.params.matchId)
  let deck = {id:0, name:'', questions:0}
  if(decks.length == 1){ deck = decks[0] }
  return deck
}

questionsFromDeck = (state,navigation) => {
  let questions = state.filter((d) => d.parentId === navigation.state.params.matchId)
  return questions
}

/**********************************
Procedimiento
*Si no hay cartas se muestra mensaje de añadir una carta
*
**********************************/
class QuizScreen extends Component {
  state = {
    q_cant: this.props.quiz.length,
    q_done: 0,
    q_right: 0,
  }


  render(){

    let {deck} = this.props
    let matchId = deck

    //Si no hay cartas
    if(this.props.quiz.length === 0){
      return (
        <View>
          <Text>This Deck hasn't any cards</Text>
          <Button onPress={() => this.props.navigation.goBack()} title="Return to deck and add a card" />
        </View>
      )
    }

    //Si hay cartas y no va por la última
    //Librerias pa la animación del Flip
    //https://github.com/moschan/react-native-flip-card
    //https://github.com/jmurzy/react-native-foldview
    return (
      <View>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
        <Text>QuizScreen</Text>
      </View>
    )
  }
}

function mapStateToProps({decks, questions}, {navigation}){
  return {
    deck: selectedDeck(decks, navigation),
    quiz: questionsFromDeck(questions, navigation)
  }
}

export default connect (mapStateToProps, null)(QuizScreen)
