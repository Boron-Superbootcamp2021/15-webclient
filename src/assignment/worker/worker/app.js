const { doc } = require('prettier');
const { store$ } = require('./store');
const { addWorkerAsync, loadWorkersAsync } = require('./worker-client');

const table = document.getElementById('table-worker');
const thead = document
  .getElementsByTagName('tbody')[0]
  .getElementsByTagName('tr')[0];
const ttail = document.getElementById('add-worker-tr');
const form = document.getElementById('form-worker');
const dataName = document.getElementById('data-nama');
const dataAddress = document.getElementById('data-alamat');
const dataEmail = document.getElementById('data-email');
const dataNohp = document.getElementById('data-nohp');
const dataBiografi = document.getElementById('data-biografi');
const dataPhoto = document.getElementById('data-foto');

function getLastID() {
    const state = store$.getState();
    let result = state[state.length - 1].id;
    return result;
}

form.onsubmit = (event) => {
  event.preventDefault();
  const worker = {
      id: (getLastID()+1),
      name: dataName.value,
      address: dataAddress.value,
      email: dataEmail.value,
      nohp: dataNohp.value,
      biografi: dataBiografi.value,
      photo: dataPhoto.value,
  };
  console.log(worker);
  if (!worker?.length) {
    return;
  }
  // dispatch action add
  store$.dispatch(addWorkerAsync(worker));
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
