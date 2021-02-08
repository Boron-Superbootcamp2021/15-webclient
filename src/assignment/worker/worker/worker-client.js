const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchWorkersApi, addWorkersApi } = require('../api/worker-service');
const { store$, addWorkerAction, loadWorkersAction } = require('./store');

const addWorkerAsync = (worker) => async (dispatch, getState) => {
  const workerData = await addWorkersApi(worker);
  dispatch(addWorkerAction(workerData));
};

const loadWorkersAsync = async (dispatch, getState) => {
  const workersAsync = await fetchWorkersApi();
  dispatch(loadWorkersAction(workersAsync));
};

module.exports = {
  addWorkerAsync,
  loadWorkersAsync,
};
