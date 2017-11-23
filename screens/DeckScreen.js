import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'

import {removeDeck} from '../actions'


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



  removeDeck = () => {
    let {deck} = this.props
    this.props.removeDeck(deck.id)
    this.props.navigation.goBack()
  }



  render(){

    let {deck} = this.props
    let matchId = deck.id

    return (
      <View>
        <Text>{deck.name}</Text>
        <Text>{deck.questions} {deck.questions === 1 ? 'Card' : 'Cards'}</Text>
        <Button onPress={() => this.props.navigation.navigate('newQuestion',{matchId})} title="CREATE NEW CARD" />
        <Button onPress={() => this.props.navigation.navigate('quiz',{matchId})} title="START QUIZ" />
        <Button onPress={() => this.removeDeck()} title="DELETE DECK" />
      </View>
    )
  }
}

function mapStateToProps({decks}, {navigation}){
  return {
    deck: selectedDeck(decks, navigation)
  }
}

export default connect (mapStateToProps, {removeDeck})(DeckScreen)
