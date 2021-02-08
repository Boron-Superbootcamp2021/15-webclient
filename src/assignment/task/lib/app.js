require('./app.css');
const { store$, cancelTasksAction } = require('./store');
const {
    addTaskAsync,
    loadTasksAsync,
    doneTaskAsync,
    undoneTaskAsync,
    cancelTaskAsync,
} = require('./task-client');

const { addAction } = require('./store');

// view
const btnTambah = document.getElementById('button-tambah');
const form = document.getElementById('task-form');
const card = document.getElementById('card')
const main = document.getElementById('main');
const inputName = document.getElementById('task-name');
const inputDetail = document.getElementById('task-detail');
const inputAttachment = document.getElementById('task-attachment');
const inputAssignee = document.getElementById('task-assignee');

btnTambah.addEventListener("click", () => {
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
})



form.onsubmit = (event) => {
    event.preventDefault();
    const task = {
        id: (getLastID() + 1),
        job: inputName.value,
        detail: inputDetail.value,
        attach: inputAttachment.value,
        assignee: {
            name: inputAssignee.value
        },
        done: 2,
    };
    // dispatch action add
    store$.dispatch(addAction(task));
};

// presentation layer
store$.subscribe(() => {
    const state = store$.getState();
    render(state);
});

const state = store$.getState();
render(state);

store$.dispatch(loadTasksAsync);

function render(state) {

    main.innerHTML = "";
    for (let i = 0; i < state.length; i++) {
        const data = state[i];
        let newCard = card.cloneNode(true);
        newCard.style.display = "inline-block"
        const job = newCard.querySelector('#job');
        const detail = newCard.querySelector('#detail');
        const attach = newCard.querySelector('#attach');
        const assignee = newCard.querySelector('#assignee');
        const btnSelesai = newCard.querySelector('#button-selesai');
        const btnBatal = newCard.querySelector('#button-batal');
        job.innerText = data.job;
        detail.innerText = data.detail;
        attach.innerText = data.attach;
        assignee.innerText = data.assignee.name;
        if (data.done == 1) {
            job.className = 'task-done';
            btnSelesai.onclick = function () {
                // dispatch action done
                store$.dispatch(undoneTaskAsync(data.id));
            };
        }else {
            job.className = '';
            btnSelesai.onclick = function () {
                // dispatch action done
                store$.dispatch(doneTaskAsync(data.id));
            };
        }
        btnBatal.onclick = function () {
            // dispatch action done
            store$.dispatch(cancelTaskAsync(data.id));
        };
        if (data.done != 0) {
            main.append(newCard);
        }
        
    }
}

function getLastID() {
    const state = store$.getState();
    let result = state[state.length - 1].id;
    return result;
}