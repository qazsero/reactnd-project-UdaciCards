import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Form} from 'react-native'
import {Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

import {createDeck} from '../actions'
import {createUid} from '../utils'

class NewDeckScreen extends Component {
  state = {
    isEmpty:false,
    deckName:''
  }

  handleSubmit = () => {
    //Si el nombre está vacio mostrar Error
    if(this.state.deckName === ''){
      return this.setState({isEmpty:true})
    }

    //Sino, créame un Deck
    let matchId = createUid()
    let name = this.state.deckName

    //No ejecuta el callback
    this.props.createDeck(matchId, name)
    this.props.navigation.navigate('singleDeck',{matchId})
  }

  static navigationOptions = ({ navigation}) => ({
    title: 'Create new Deck',
  })

  render(){
    return (
      <View>
          <FormLabel>Name</FormLabel>
          <FormInput value={this.state.deckName} onChangeText={deckName => this.setState({deckName})} />
          {this.state.isEmpty && <FormValidationMessage>Error message</FormValidationMessage>}
          <Button onPress={this.handleSubmit} title='CREATE DECK' />
      </View>
    )
  }
}

export default connect(null, {createDeck})(NewDeckScreen)
