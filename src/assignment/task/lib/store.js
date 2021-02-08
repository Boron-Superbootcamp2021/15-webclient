const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone, loadTasks, cancel } = require('./reducer');
const { loggingMiddleware, delayActionMiddleware, asyncMiddleware } = require('./middleware');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const loadTasksAction = createAction('loadTasks');
const cancelTasksAction = createAction('cancel');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [loadTasksAction]: loadTasks,
  [cancelTasksAction]: cancel,
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [thunkMiddleware.default, loggingMiddleware, delayActionMiddleware]
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
  loadTasksAction,
  cancelTasksAction,
};
