import { combineReducers } from 'redux';
import counter from './counter';
import news from './new';

const reducer = combineReducers({ counter, news });

export default reducer;
