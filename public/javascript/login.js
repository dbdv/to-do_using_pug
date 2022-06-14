function hideError(span) {
  if (document.querySelector(`.${span}-error`))
    document.querySelector(`.${span}-error`).classList.remove("error-on");
}

function showError(elementClass) {
  document.querySelector(`.${elementClass}`).classList.add("error-on");
}

function showMsg() {
  document.querySelector(".msg").classList.add("msg-on");
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

  document
    .querySelector(".loaderContainer")
    .classList.add("loaderContainer-On");

  fetch("/login/in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail: mail, password: password }),
  }).then((res) => {
    console.log(res);
    if (res.status == 404) {
      document
        .querySelector(".loaderContainer")
        .classList.remove("loaderContainer-On");

      showError("mail-error");
    }
    if (res.status == 403) {
      document
        .querySelector(".loaderContainer")
        .classList.remove("loaderContainer-On");

      showError("password-error");
    }

    if (res.status === 200) location.replace("/todo");
  });
}

function githubLogin() {
  document
    .querySelector(".loaderContainer")
    .classList.add("loaderContainer-On");
  location.replace("/auth/github");
}

async function signup() {
  const mail = document.querySelector("#sign-mail").value,
    password = document.querySelector("#sign-password").value,
    name = document.querySelector("#sign-name").value;

  if (!mail) {
    showError("sign-mail-error");
    return;
  }
  if (!password) {
    showError("sign-password-error");
    return;
  }

  if (!name) {
    showError("sign-name-error");
    return;
  }
  fetch("/login/sign", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail: mail, password: password, name: name }),
  }).then((res) => {
    console.log(res);
    if (res.status == 403) {
      showError("sign-mail-error");
    }

    if (res.status === 201) {
      mail.value = "";
      name.value = "";
      password.value = "";
      showMsg();
      setTimeout(() => {
        toggleRegisterForm();
      }, 500);
    }
  });
}

function toggleRegisterForm() {
  document.querySelector(".signup").classList.toggle("signup-on");
  document.querySelector(".msg").classList.remove("msg-on");
}
