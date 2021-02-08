const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchTasksApi, addTaskApi, doneTaskApi, undoneTaskApi, cancelTaskApi } = require('../api/task-service');
const {
  addAction,
  doneAction,
  undoneAction,
  loadTasksAction,
  cancelTasksAction,
} = require('./store');

const addTaskAsync = (task) => async (dispatch, getState) => {
  const taskData = await addTaskApi(task);
  dispatch(addAction(taskData));
};

const loadTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await fetchTasksApi();
  dispatch(loadTasksAction(tasksAsync));
};

const doneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    await doneTaskApi(id);
    dispatch(doneAction(id));
  };
};

const undoneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await undoneTaskApi(id);
      await dispatch(undoneAction(id));
    } catch (err) {
      console.log(err);
    }
  }
}
const cancelTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await cancelTaskApi(id);
      dispatch(cancelTasksAction(id));
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  addTaskAsync,
  loadTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
  cancelTaskAsync,
};
