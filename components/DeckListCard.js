import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Button, Card } from 'react-native-elements'



class DeckListCard extends Component {


  render(){
    return (
      <TouchableOpacity onPress={() => this.props.go(this.props.deck.id)}>
        <Card>
          <Text>{this.props.deck.name}</Text>
          <Text>{this.props.deck.questions} Questions</Text>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = {

}

export default DeckListCard
