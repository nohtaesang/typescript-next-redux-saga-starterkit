import { combineReducers } from 'redux';
import personReducer from './person';
import { PersonState } from '../models/person';

const rootReducer = combineReducers({ personReducer });

export default rootReducer;

export type State = {
	personReducer: PersonState;
};
