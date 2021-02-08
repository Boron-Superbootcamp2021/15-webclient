async function client(endpoint, { method, body, ...customConf } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  if (config.headers['Content-Type'] == 'application/json') {
    config.body = JSON.stringify(body);
  }
  else if (config.headers['Content-Type'] == 'multipart/form-data' ){
    body.assignee = body.assignee.name;
    const formData = new FormData();

    for (const name in body) {
      formData.append(name, body[name]);
    }
    config.body = formData;
    config.headers = {};
  }

  let data;
  try {
     const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

client.get = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'GET', ...customConf });
};

client.post = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'POST', body, ...customConf });
};

client.put = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'PUT', body, ...customConf });
};
client.delete = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'DELETE', body, ...customConf });
};


module.exports = { client };
