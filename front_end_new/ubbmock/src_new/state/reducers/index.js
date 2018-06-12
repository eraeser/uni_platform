import { combineReducers } from 'redux'
import users from './users'

const rootReducer = combineReducers({
    users,
    // threads,
    // channels,
})

export default rootReducer
