import React from 'react'
import {AppLoading, Notifications} from 'expo'
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

  tomorrow14h (){
    // Create a date for now and remember the time
    var d = new Date()
    var time = +d

    // Set the time to 14:00 and add a day
    d.setHours(14,0,0,0)
    d.setDate(d.getDate() + 1)

    return d.getTime()
  }

  componentWillMount(){
    //Boramos todas las notificaciones planteadas
    //y creamos una para mañana a las 14 horas
    Notifications.cancelAllScheduledNotificationsAsync()

    let localNotification = {
      title: 'Study with UdaciCards',
      body: 'Prepare for exam and study with your decks today',
    }


    let schedulingOptions = {
      time:this.tomorrow14h(),
      repeat:'day'
    }

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
  }

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
