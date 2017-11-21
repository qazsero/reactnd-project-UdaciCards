import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, ScrollView} from 'react-native'

import DeckListCard from '../components/DeckListCard'

class DeckListScreen extends Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'Deck List',
  })


  goToDeck = (matchId) => {
    this.props.navigation.navigate('singleDeck',{matchId})
  }

  render(){
    return (
      <ScrollView>
        {this.props.decks.map((d) => (<DeckListCard key={d.id} deck={d} go={this.goToDeck} />))}
      </ScrollView>
    )
  }
}

function mapStateToProps({decks}){
  return {decks}
}

export default connect(mapStateToProps, null)(DeckListScreen)
