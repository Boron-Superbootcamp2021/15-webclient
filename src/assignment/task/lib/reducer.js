// setup state
const initialState = [
];

// reduce function
function add(state, action) {
  state.push({
    id: action.payload.id,
    job: action.payload.job,
    detail: action.payload.detail,
    attach: action.payload.attach,
    assignee: { name: action.payload.name },
    done: action.payload.done
  });
  return state;
}

function done(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.done = 1;
  return state;
}

function undone(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.done = 2;
  return state;
}

function cancel(state, action) {
  const task = state.find((t) => t.id === action.payload);
  let result = state.indexOf(task);
  state.splice(result, 1);
  task.done = 0;
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  add,
  done,
  undone,
  loadTasks,
  cancel,
};
