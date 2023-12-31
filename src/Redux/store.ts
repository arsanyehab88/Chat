import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import appApi from './appApi'
 
//presist our store
import  storage  from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

//reducers
const reducer = combineReducers({
    user:userSlice,
    [appApi.reducerPath]:appApi.reducer
})

const persistConfig = {
    key :"root",
    storage,
    blackList:[appApi.reducerPath]
}


const persistedReducer = persistReducer(persistConfig , reducer)


//creating store

const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk,appApi.middleware]
})

export default store;
