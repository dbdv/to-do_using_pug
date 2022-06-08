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

async function login() {
  const mail = document.querySelector("#mail").value;
  password = document.querySelector("#password").value;

  if (!mail) {
    showError("mail-error");
    return;
  }
  if (!password) {
    showError("password-error");
    return;
  }

  fetch("/login/in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail: mail, password: password }),
  })
    .then((res) => {
      console.log(res);
      if (res.status == 404) {
        showError("mail-error");
      }
    })
    .finally((res) => {
      console.log(res);
      console.log("end");
    });
}
