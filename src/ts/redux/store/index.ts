import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
