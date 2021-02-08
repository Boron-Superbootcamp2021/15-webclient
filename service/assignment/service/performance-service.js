/* eslint-disable no-unused-vars */
const nats = require('nats');
const {registerLog}= require('./performance')

const client = nats.connect();

client.on('connect', () => {
  main();
});

client.on('close', (err) => {
  if (err) {
    console.error(err);
  }
  console.log('connection close');
});

function subscriber() {
  let subId1, subId2, subId3, subId4;
  subId1 = client.subscribe('totalWorkers', (msg, reply, subject, sid) => {
    console.log('log: ', msg);
    registerLog('totalWorkers');
    if (msg === 'unsub') {
      if (subId1) {
        client.unsubscribe(subId1);
        console.log('sub-1: unsubscribed');
      }
    }
  });
  subId2 = client.subscribe('totalTasks', (msg, reply, subject, sid) => {
    console.log('log: ', msg);
    registerLog('totalTasks');
    if (msg === 'unsub') {
      if (subId2) {
        client.unsubscribe(subId2);
        console.log('sub-1: unsubscribed');
      }
    }
  });
  subId3 = client.subscribe('finish', (msg, reply, subject, sid) => {
    console.log('log: ', msg);
    registerLog('finish');
    if (msg === 'unsub') {
      if (subId3) {
        client.unsubscribe(subId3);
        console.log('sub-1: unsubscribed');
      }
    }
  });
  subId4 = client.subscribe('cancel', (msg, reply, subject, sid) => {
    console.log('log: ', msg);
    registerLog('cancel');
    if (msg === 'unsub') {
      if (subId4) {
        client.unsubscribe(subId4);
        console.log('sub-1: unsubscribed');
      }
    }
  });
  
}

function loggingMsg(from, status){
    let date = new Date()
    let msg = `${date} from ${from} status ${status}`
    client.publish(from, msg)
}

function main() {
  subscriber();
}



module.exports = {
    loggingMsg,
}