const { client } = require('./client');

async function fetchWorkersApi() {
  return await client.get('http://localhost:9999/getallworker');
}

async function addWorkersApi(task) {
  return await client.post('http://localhost:9999/store', { task });
}
 
module.exports = {
    fetchWorkersApi,
    addWorkersApi
};
