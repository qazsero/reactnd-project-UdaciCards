import {TabNavigator,StackNavigator} from 'react-navigation'

import DeckListScreen from './screens/DeckListScreen'
import NewDeckScreen from './screens/NewDeckScreen'
import DeckScreen from './screens/DeckScreen'
import NewQuestionScreen from './screens/NewQuestionScreen'
import QuizScreen from './screens/QuizScreen'

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

export default MainNavigator
