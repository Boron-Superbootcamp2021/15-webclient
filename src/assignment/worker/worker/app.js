const { doc } = require('prettier');
const { store$ } = require('./store');
const { addWorkerAsync, loadWorkersAsync } = require('./worker-client');

const table = document.getElementById('table-worker');
const thead = document
  .getElementsByTagName('tbody')[0]
  .getElementsByTagName('tr')[0];
const ttail = document.getElementById('add-worker-tr');
const form = document.getElementById('form-worker');
const input = document.getElementsByClassName('data-input');

form.onsubmit = (event) => {
  event.preventDefault();
  let worker = {
    payload: {
      id: input[0].value,
      name: input[1].value,
      address: input[2].value,
      email: input[3].value,
      nohp: input[4].value,
      biografi: input[5].value,
      photo: input[6].value,
    },
  };
  console.log(worker);
  if (!worker?.length) {
    return;
  }
  // dispatch action add
  store$.dispatch(addWorkerAsync(worker));
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';
  }
};

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

const state = store$.getState();
render(state);

store$.dispatch(loadWorkersAsync);

function render(state) {
  table.innerHTML = thead.innerHTML;
  for (let i = 0; i < state.length; i++) {
    const worker = state[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
                <td>${worker.id}</td>
                <td>${worker.name}</td>
                <td>${worker.address}</td>
                <td>${worker.email}</td>
                <td>${worker.nohp}</td>
                <td>${worker.biografi}</td>
                <td>${worker.photo}</td>
                <td><button>Hapus data</button></td>
        `;
    table.append(tr);
  }
  table.append(ttail);
}
