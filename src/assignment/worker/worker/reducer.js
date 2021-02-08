// setup state
const initialState = [
  {
    id: 1,
    name: 'budiz',
    address: 'purwokerto',
    email: 'andi@mail.com',
    nohp: '14045',
    biografi: 'ingin menjadi hokage',
    photo: '1612774453194-905.png',
  },
];

// reduce function
function addWorker(state, action) {
  return [
    ...state,
    {
      id: action.payload.id,
      name: action.payload.name,
      address: action.payload.address,
      email: action.payload.email,
      nohp: action.payload.nohp,
      biografi: action.payload.biografi,
      photo: action.payload.photo,
    },
  ];
}

function loadWorkers(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  addWorker,
  loadWorkers
};
