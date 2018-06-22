import { combineReducers } from 'redux'
import users from './users'
import internals from './internals';

const rootReducer = combineReducers({
    users,
    internals,
    // threads,
    // channels,
})

export default rootReducer
