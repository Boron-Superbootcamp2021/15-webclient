const { doc } = require('prettier');
const { store$ } = require('./store');
const { addWorkerAsync, loadWorkersAsync } = require('./worker-client');

const table = document.getElementById('table-worker');
const thead = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
const ttail = document.getElementById('add-worker-tr');
// const form = document.getElementById('add-worker-form');
console.log(ttail);

// form.onsubmit = (event) => {
//   event.preventDefault();
//   const worker = input.value;
//   console.log(worker);
//   if (!worker?.length) {
//     return;
//   }
//   // dispatch action add
//   store$.dispatch(addWorkerAsync(worker));
//   input.value = '';
// };

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
