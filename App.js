import React from 'react'
import {AppLoading} from 'expo'
import {StyleSheet, Text, View} from 'react-native'
import {TabNavigator,StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

import configureStore from './store'
import DeckListScreen from './screens/DeckListScreen'
import NewDeckScreen from './screens/NewDeckScreen'
import DeckScreen from './screens/DeckScreen'
import NewQuestionScreen from './screens/NewQuestionScreen'
import QuizScreen from './screens/QuizScreen'

const { persistor, store } = configureStore()

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
      main: {
        screen:TabNavigator({
          deckList: {screen:DeckListScreen},
          newDeck: {screen:NewDeckScreen},
        }),
      },
      singleDeck: {screen: DeckScreen},
      newQuestion: {screen: NewQuestionScreen},
      quiz: {screen: QuizScreen}
    })


    return (
      <Provider store={store}>
        <PersistGate
          loading={<AppLoading />}
          persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
