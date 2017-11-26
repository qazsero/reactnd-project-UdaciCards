import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Button, FormLabel, FormInput, FormValidationMessage, CheckBox} from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'

import {sumQuestionToDeck, createQuestion} from '../actions'
import gstyles from '../styles'

class NewQuestionScreen extends Component {
  initialState = () => ({
    question:'',
    answer:'',
    isQEmpty:false,
    isAEmpty:false,
    tfChecked:false,
  })

  state = this.initialState()

  checkIfFormFilled = () => {
    let errors = 0

    if(this.state.question.length === 0){
      this.setState({isQEmpty:true})
      errors++
    }

    if(this.state.answer.length === 0){
      this.setState({isAEmpty:true})
      errors++
    }

    if(errors === 0) return true
    else return false
  }

  onSubmitAndNext = () => {
    if(this.checkIfFormFilled() === true) {
      this.submitQuestion()
      this.setState(this.initialState())
      this.refs.toast.show('The question has been added succesfully');
    }
  }

  submitQuestion(){
    let parentId = this.props.navigation.state.params.matchId
    let values = {
      parentId,
      question: this.state.question,
      answer: this.state.answer,
      isCorrect:this.state.tfChecked,
    }
    this.props.createQuestion(values)
    this.props.sumQuestionToDeck(parentId)
  }


  render(){
    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput value={this.state.question} onChangeText={question => this.setState({question})} />
        {this.state.isQEmpty && <FormValidationMessage>You have to fill the question</FormValidationMessage>}

        <FormLabel>Answer</FormLabel>
        <FormInput value={this.state.answer} onChangeText={answer => this.setState({answer})} />
        {this.state.isAEmpty === 0 && <FormValidationMessage>You have to fill the answer</FormValidationMessage>}


        <CheckBox
          center
          title='True'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => this.setState({tfChecked:true})}
          checked={this.state.tfChecked}
        />
        <CheckBox
          center
          title='False'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          onPress={() => this.setState({tfChecked:false})}
          checked={!this.state.tfChecked}
        />

        <Button onPress={() => this.onSubmitAndNext()} title='SAVE CARD' buttonStyle={gstyles.buttonStyle} />
        <Toast
          ref="toast"
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.6}
        />
      </View>
    )
  }
}

export default connect (null, {sumQuestionToDeck, createQuestion})(NewQuestionScreen)
