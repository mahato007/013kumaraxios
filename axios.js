// axios global
axios.defaults.headers.common["X-AUTH-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// get request
function getTodos() {
  axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos?_limit=5",
  })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}
// post request
function addTodo() {
  //   console.log('addtodo')
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "new todo",
      completed: false,
    },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}
// put/patch request
function updateTodo() {
  // console.log('updatatodo')
  axios({
    method: "patch",
    url: "https://jsonplaceholder.typicode.com/todos/1",
    data: { title: "updatetodo", completed: true },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}
// delete request
function removeTodo() {
  axios({
    method: "delete",
    url: "https://jsonplaceholder.typicode.com/todos/1",
  })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}
// simulataneous request
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then((res) => {
      console.log(res[0]);
      console.log(res[1]);
      showOutput(res[1]);
    })
    .catch((err) => console.error(err));
}

// custom header
function customHeaders() {
  // console.log('customheader')
  const config = {
    header: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "new todo",
      completed: false,
    },
  })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}
// transfor response
function transformResponse() {
  const option = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(option).then((res) => showOutput(res));
}
// error
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss")
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.data);
        console.log(err.response.data);
        if (err.response.status === 404) {
          alert("Error:Page Not Found");
        }
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// cancel
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request cancelled", thrown.message);
      }
    });
  if (true) {
    source.cancel("Request Cancelled!");
  }
}
// intercepting request and response
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
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

// Event Listner
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("header").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
