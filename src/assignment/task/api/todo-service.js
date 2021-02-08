const { client } = require('./client');

async function fetchTasksApi() {
  return await client.get('http://localhost:9999/getalltask');
}

async function addTaskApi(task) {
  return await client.post('http://localhost:9999/task', task, {
    headers: {'Content-Type':"multipart/form-data"}
  });
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
