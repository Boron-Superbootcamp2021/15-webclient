const { client } = require('./client');
const { fetchWorkersApi} = require('../../worker/api/worker-service')

async function fetchTasksApi() {
  return await client.get('http://localhost:9999/getalltask');
}

async function addTaskApi(task) {
  const workers = await fetchWorkersApi()
  const worker = workers.find((t) => t.name == task.name);
  task.assignee = worker.id;
  await client.post('http://localhost:9999/task', task, {
    headers: {'Content-Type':"multipart/form-data"}
  });
  return task;
}

async function doneTaskApi(id) {
  return await client.put(`http://localhost:9999/updatetask?id=${id}`);
}

async function undoneTaskApi(id){
  return await client.put(`http://localhost:9999/downtask?id=${id}`);
}
async function cancelTaskApi(id) {
  return await client.delete(`http://localhost:9999/deletetask?id=${id}`);
}

 
module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi,
};
