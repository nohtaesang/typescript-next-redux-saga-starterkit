import { all } from 'redux-saga/effects';
import { watchGetPersonList } from './person';

export default function* rootSaga() {
	yield all([ watchGetPersonList() ]);
}
