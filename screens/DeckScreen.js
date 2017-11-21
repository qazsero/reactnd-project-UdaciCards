import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'

import {removeDeck} from '../actions'

class DeckScreen extends Component {
  static navigationOptions = () => ({
    title: "Deck Options"
  })

  selectedDeck = () => {
    let decks = this.props.decks.filter((d) => d.id === this.props.navigation.state.params.matchId)
    let deck = {id:0, name:'', questions:0}
    if(decks.length == 1){ deck = decks[0] }
    return deck
  }

  removeDeck = () => {
    let deck = this.selectedDeck()
    this.props.removeDeck(deck.id)
    this.props.navigation.goBack()
  }



  render(){

    let deck = this.selectedDeck()

    return (
      <View>
        <Text>{deck.name}</Text>
        <Button title="CREATE NEW QUESTION" />
        <Button title="START QUIZ" />
        <Button onPress={() => this.removeDeck()} title="DELETE DECK" />
      </View>
    )
  }
}

function mapStateToProps({decks}){
  return {decks}
}

export default connect (mapStateToProps, {removeDeck})(DeckScreen)
