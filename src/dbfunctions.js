const backendEndpoint = 'http://localhost:9000';

function fetchData(url){
    return fetch(backendEndpoint + url)
      .then((response) => {
        if(!response.ok){
          throw new Error(`Network response was not okay. Err code ${response.status}`);
        }

        return response.json();
      })
      .catch((err) => console.error('Fetch error:', err));
}

function postData(endpoint, payload){
    return fetch(backendEndpoint + endpoint, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({data: payload})
    })
    .then((response) => {
      if(!response.ok){
        throw new Error(`Network response was not okay. Err code ${response.status}`);
      }

      return response.json();
    })
    .catch((err) => console.log('Post error', err));

}

function putData(endpoint, payload){
  return fetch(backendEndpoint + endpoint, {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({data: payload})
  })
  .then((response) => {
    if(!response.ok){
      throw new Error(`Network response was not okay. Err code ${response.status}`);
    }

    return response.json()
  }).catch((err) => console.log('Update error', err));
}

function deleteData(endpoint){
  return fetch(backendEndpoint + endpoint, {
    method: 'DELETE'
  })
  .then((response) => {
    if(!response.ok){
      throw new Error(`Network response was not okay. Err code ${response.status}`);
    }

    return response.json()
  }).catch((err) => console.log('Deletion error', err));
}

export {fetchData, postData, putData, deleteData}