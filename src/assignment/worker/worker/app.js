const { doc } = require('prettier');
const { store$ } = require('./store');
const { addWorkerAsync, loadWorkersAsync } = require('./worker-client');

const table = document.getElementById('table-worker');
const tbody = document.getElementsByTagName('tbody')[0];
const last_tr = document.createElement('tr');
last_tr.id = 'add-worker';
last_tr.innerHTML = `<td value='id'><input placeholder='ID'></input></td>
                    <td value='name'><input placeholder='nama...'></input></td>
                    <td><input placeholder='alamat...'></input></td>
                    <td><input placeholder='email...'></input></td>
                    <td><input placeholder='no hp...'></input></td>
                    <td><input placeholder='biografi...'></input></td>
                    <td><input placeholder='foto...'></input></td>
                    <td><button>Tambah data pekerja</button></td>`;
console.log(last_tr);
// form.onsubmit = (event) => {
//   event.preventDefault();
//   const task = input.value;
//   if (!task?.length) {
//     return;
//   }
//   // dispatch action add
//   store$.dispatch(addTaskAsync(task));
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
  table.innerHTML = tbody.innerHTML;
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
  table.append(last_tr);
}
