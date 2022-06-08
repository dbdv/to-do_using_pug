function hideError() {
  const spans = document.querySelectorAll(".login-error");
  for (const span of spans) {
    //console.log(span);
    span.classList.remove("error-on");
  }
}

function showError(elementClass) {
  document.querySelector(`.${elementClass}`).classList.add("error-on");
}

function login() {
  const username = document.querySelector("#username").value;
  password = document.querySelector("#password").value;

  if (!username) {
    showError("username-error");
    return;
  }
  if (!password) {
    showError("password-error");
    return;
  }

  console.log(username, password);
}
