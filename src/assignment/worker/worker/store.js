const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, addWorker, loadWorkers } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const addWorkerAction = createAction('addWorker');
const loadWorkersAction = createAction('loadWorkers');

const todoReducer = createReducer(initialState, {
  [addWorkerAction]: addWorker,
  [loadWorkersAction]: loadWorkers,
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  addWorkerAction,
  loadWorkersAction,
};
