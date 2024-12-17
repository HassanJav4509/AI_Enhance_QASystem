import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { documentReducer } from './reducer';
import { watchUploadDocument } from './saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(watchUploadDocument);

export default store;
