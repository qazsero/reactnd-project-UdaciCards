import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, LayoutAnimation} from 'react-native'
import {Button, Card} from 'react-native-elements'

import gstyles from '../styles'


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
    cant: this.props.quiz.length,
    done: 0,
    right: 0,
    expanded: false,
  }


  //Responder la Pregunta
  answerQuestion = (question, answer) => {
    let {done,right} = this.state
    //Realizó una pregunta
    done++
    //Si es cierta subimos el contador
    if(question.true === answer) {
      right++
    }
    //Finalmente actualizamos el state
    this.setState({done,right})
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 250
    });
  }

  render(){
    let {deck} = this.props
    let matchId = deck

    //Si no hay cartas
    if(this.props.quiz.length === 0){
      return (
        <View>
          <Text style={gstyles.textCenter} >This Deck hasn't any cards</Text>
          <Button onPress={() => this.props.navigation.goBack()} title="RETURN TO DECK AND ADD A CARD" buttonStyle={gstyles.buttonStyle} />
        </View>
      )
    }

    //Si ha superado el Quiz
    if(this.state.cant === this.state.done){
      return (
        <View>
          <Text style={gstyles.titleh1} >You have finished the Quiz</Text>
          <Text style={gstyles.textCenter} >{`Right answers: ${this.state.right} from ${this.state.cant} `}</Text>
          <Button onPress={() => this.props.navigation.goBack(this.props.nav.deckScreenKey)} title="BACK TO MAIN SCREEN" buttonStyle={gstyles.buttonStyle} />
        </View>
      )
    }

    //Pregunta actual
    let aq = this.props.quiz[this.state.done]

    //Si hay cartas y no va por la última
    //Librerias pa la animación del Flip
    //https://github.com/moschan/react-native-flip-card
    //https://github.com/jmurzy/react-native-foldview
    return (
      <View>
        <Text style={gstyles.titleh1} >{`Question ${this.state.done+1} of ${this.state.cant} `}</Text>

        <Card>
          <Text style={gstyles.cardTitleh1} >{aq.question}</Text>
          <Text>{aq.answer}</Text>
        </Card>

        <Button onPress={() => this.answerQuestion(aq,true)} title="TRUE" buttonStyle={gstyles.trueButtonStyle} />
        <Button onPress={() => this.answerQuestion(aq,false)} title="FALSE" buttonStyle={gstyles.falseButtonStyle} />
      </View>
    )
  }
}

function mapStateToProps({decks, questions, nav}, {navigation}){
  return {
    deck: selectedDeck(decks, navigation),
    quiz: questionsFromDeck(questions, navigation),
    nav
  }
}

export default connect (mapStateToProps, null)(QuizScreen)
