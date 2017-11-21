import {createStore,compose,applyMiddleware} from 'redux'
import {persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage/index.native' // default: localStorage if web, AsyncStorage if react-native
import reducers from '../reducers'


const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)

function configureStore () {
  let store = createStore(reducer)
  let persistor = persistStore(store)

  return { persistor, store }
}

export default configureStore
