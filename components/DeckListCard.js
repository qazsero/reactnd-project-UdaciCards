import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Button, Card } from 'react-native-elements'

import gstyles from '../styles'

class DeckListCard extends Component {


  render(){

    let {deck} = this.props

    return (
      <TouchableOpacity onPress={() => this.props.go(this.props.deck.id)}>
        <Card>
          <Text style={gstyles.cardTitle} >{deck.name}</Text>
          <Text>{deck.questions} {deck.questions === 1 ? 'Card' : 'Cards'}</Text>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = {

}

export default DeckListCard
