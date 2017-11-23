import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'

import {removeQuestionsFromDeck, removeDeck, setDeckScreenKey} from '../actions'
import gstyles from '../styles'

selectedDeck = (state,navigation) => {
  let decks = state.filter((d) => d.id === navigation.state.params.matchId)
  let deck = {id:0, name:'', questions:0}
  if(decks.length == 1){ deck = decks[0] }
  return deck
}


class DeckScreen extends Component {
  static navigationOptions = () => ({
    title: "Deck Options"
  })

  componentDidMount(){
    this.props.setDeckScreenKey(this.props.navigation.state.key)
  }



  removeDeck = () => {
    let {deck} = this.props
    this.props.removeQuestionsFromDeck(deck.id)
    this.props.removeDeck(deck.id)
    this.props.navigation.goBack()
  }



  render(){

    let {deck} = this.props
    let matchId = deck.id

    return (
      <View>
        <Text style={gstyles.titleh1} >{deck.name}</Text>
        <Text style={gstyles.textCenter} >{deck.questions} {deck.questions === 1 ? 'Card' : 'Cards'}</Text>
        <Button onPress={() => this.props.navigation.navigate('newQuestion',{matchId})} title="CREATE NEW CARD" buttonStyle={gstyles.buttonStyle} />
        <Button onPress={() => this.props.navigation.navigate('quiz',{matchId})} title="START QUIZ" buttonStyle={gstyles.buttonStyle} />
        <Button onPress={() => this.removeDeck()} title="DELETE DECK" buttonStyle={gstyles.buttonStyle} />
      </View>
    )
  }
}

function mapStateToProps({decks}, {navigation}){
  return {
    deck: selectedDeck(decks, navigation)
  }
}

export default connect (mapStateToProps, {removeQuestionsFromDeck, removeDeck, setDeckScreenKey})(DeckScreen)
