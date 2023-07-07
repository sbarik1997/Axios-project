//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'any token';

// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //       _limit: 5
    //     }
    // }).then(res => showOutput(res))
    //   .catch(err => console.log(err))

    axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // POST REQUEST
  function addTodo() {
    // axios({
    //   method: 'post',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   data: {
    //     title: "new Todo",
    //     completed: false
    //   }
    // }).then(res => showOutput(res))
    //   .catch(err => console.log(err))
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title: "new Todo",
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
      title: "Updated Todo",
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos,posts) => showOutput(posts)))
    .catch(err => console.log(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Athorization: 'sometoken' 
      }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title: "new Todo",
      completed: false
    },config)
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
      //server responded with a status other than 200 range
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status == 404){
          alert('Error: page not found')
        }
      }else if(err.request){
        //Request was made but no response
        console.log(err.request);
      }else{
        console.log(err.messege);
      }
    })
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if(axios.isCancel(thrown)){
        console.log('Request canceled',thrown.messege);
      }
    })
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
    return config;
  },error => {
    return Promise.reject(error);
  })
  
  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);