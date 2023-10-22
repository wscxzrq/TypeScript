import { applyMiddleware, createStore } from 'redux'
import { IRootState, rootReducer } from './reducers/RootReducer'
import logger from "redux-logger"
import thunk, { ThunkMiddleware } from 'redux-thunk'
export const store = createStore(rootReducer,applyMiddleware(thunk as ThunkMiddleware<IRootState>,logger)) 