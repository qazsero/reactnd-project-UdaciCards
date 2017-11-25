import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, LayoutAnimation, Animated, TouchableOpacity, StyleSheet} from 'react-native'
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

  initialState = () => ({
    cant: this.props.quiz.length,
    done: 0,
    right: 0,
    expanded: false,
  })

  state = this.initialState()


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
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 250
    });
    this.setState({done,right})
  }

  restartQuiz = () => {
    this.setState(this.initialState())
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
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
          <Button onPress={() => this.restartQuiz()} title="RESTART QUIZ" buttonStyle={gstyles.buttonStyle} />
          <Button onPress={() => this.props.navigation.goBack(this.props.nav.deckScreenKey)} title="BACK TO MAIN SCREEN" buttonStyle={gstyles.buttonStyle} />
        </View>
      )
    }

    //Pregunta actual
    let aq = this.props.quiz[this.state.done]

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View>
        <Text style={gstyles.titleh1} >{`Question ${this.state.done+1} of ${this.state.cant} `}</Text>

          <View>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <TouchableOpacity onPress={() => this.flipCard()} >
                <Card>
                  <Text style={gstyles.cardTitleh1} >{aq.question}</Text>
                  <Text>{aq.answer}</Text>
                </Card>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <TouchableOpacity onPress={() => this.flipCard()} >
                <Card>
                  <Text style={gstyles.cardTitleh2} >Is the answer correct?</Text>
                  <Text style={gstyles.textCenter}>{aq.true ? 'YES!':'NO'}</Text>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          </View>

        <Text style={gstyles.helperText}>Do you need help? Touch the Card!</Text>

        <Button onPress={() => this.answerQuestion(aq,true)} title="TRUE" buttonStyle={gstyles.trueButtonStyle} />
        <Button onPress={() => this.answerQuestion(aq,false)} title="FALSE" buttonStyle={gstyles.falseButtonStyle} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard:{
    width: '100%',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  }
});

function mapStateToProps({decks, questions, nav}, {navigation}){
  return {
    deck: selectedDeck(decks, navigation),
    quiz: questionsFromDeck(questions, navigation),
    nav
  }
}

export default connect (mapStateToProps, null)(QuizScreen)
