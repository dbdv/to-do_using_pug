window.onload = () => {
  const optionsParent = document.getElementById("optionsParent");
  optionsParent.addEventListener("click", (e) => {
    console.log(e);
    if (e.target.name != "direc" && e.target.tagName === "LABEL")
      e.target.classList.toggle("opSelected");
  });
};

function toggleModal(n) {
  const modal = document.querySelectorAll(".modal-off")[n];
  modal.classList.toggle("modal");
}

function addList() {
  console.log(document.querySelector("#titleList"));
  const newList = {
    id: null,
    title: document.querySelector("#titleList").value,
    state: document.querySelector("input[name='state-list']:checked").value,
    resolutionDate: null,
    creationDate: new Date(Date.now()),
  };

  console.table(newList);

  if (!newList.title.length) {
    alert("La lista necesita un título");
    return false;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/list/add", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  var data = newList;
  xhttp.send(JSON.stringify(data));
  clearTitleList();

  setTimeout(() => {
    location.reload();
  }, 500);

  return false;
}

async function logout() {
  fetch("/login/out", {
    method: "POST",
    headers: {
      Accept: "XMLHttpRequest",
      "Content-Type": "XMLHttpRequest",
    },
  }).then((res) => {
    if (res.status == 200) location.replace("/");
  });
}

async function addTask() {
  const newTask = {
    id: null,
    title: document.querySelector("#title").value.toString(),
    descrip: document.querySelector("#descrip").value.toString(),
    priority: document.querySelector("input[name='priority']:checked").value,
    state: document.querySelector("input[name='state']:checked").value,
    creationDate: new Date(Date.now()),
    deadline: document.querySelector("input[name='dl']").checked
      ? document.querySelector("input[name='dldate']").value
      : null,
    resolutionDate: null,
  };
  const select = document.querySelector(".listCheckbox");
  const listsID =
    select[select.selectedIndex].value == 0
      ? null
      : select[select.selectedIndex].value;
  setInterval(() => {
    console.log(listsID);
  }, 2000);
  //- console.log("ID: ",listsID);
  if (!newTask.title.length || !newTask.descrip.length) {
    alert("No puede ingresar una tarea sin título y descrpción.");
    return false;
  }

  //- console.log(typeof newTask.deadline)

  if (
    newTask.deadline !== null &&
    new Date(newTask.deadline) < new Date(Date.now())
  ) {
    alert("No puede elegir una fecha que ya pasó!");
    return false;
  }

  clearTitle();
  clearDescrip();
  await fetch("/item/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newTask: newTask, id_list: listsID }),
  }).finally(() => {
    location.reload();
  });

  //   var xhttp = new XMLHttpRequest();
  //   xhttp.open("POST", "/item/add", true);
  //   xhttp.setRequestHeader("Content-Type", "application/json");
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       // Response
  //       var response = this.responseText;
  //     }
  //   };
  //   var data = { newTask: newTask, listsID: listsID };
  //   console.log(data);
  //   xhttp.send(JSON.stringify(data));

  //   setTimeout(() => {
  //     location.reload();
  //   }, 500);

  return false;
}

function markAsResolve(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/item/markAsResolved/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  xhttp.send();

  const div = document.getElementById(id); //document.querySelector("#"+id);
  div.classList.add("resolve");
  //- setTimeout(()=>{
  //-     div.remove();
  //- }, 1000)
  setTimeout(() => {
    location.reload();
  }, 500);

  return false;
}

function markAsUnresolve(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/item/markAsUnresolve/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  xhttp.send();

  const div = document.getElementById(id); //document.querySelector("#"+id);
  div.classList.remove("resolve");
  //- setTimeout(()=>{
  //-     div.remove();
  //- }, 1000)
  setTimeout(() => {
    location.reload();
  }, 500);

  return false;
}

function markAsResolving(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/item/markAsResolving/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  xhttp.send();

  const div = document.getElementById(id); //document.querySelector("#"+id);
  div.classList.remove("resolve");
  //- setTimeout(()=>{
  //-     div.remove();
  //- }, 1000)
  setTimeout(() => {
    location.reload();
  }, 500);

  return false;
}

function deleteTask(id) {
  //console.log(id)

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/item/delete/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
    }
  };
  xhttp.send();

  const div = document.getElementById(id); //document.querySelector("#"+id);
  div.classList.add("deleting");
  setTimeout(() => {
    div.remove();
  }, 1000);

  return false;
}

function setOrder() {
  const options = document.getElementsByClassName("orderOption");
  const selected = document.getElementsByClassName("opSelected");
  const radios = document.getElementsByClassName("orderRadio");

  var order = [];
  let direc;

  //- console.table(selected)

  for (const s in selected) {
    //- console.log(selected[s].id)
    if (selected[s].id !== undefined && selected[s].id !== "")
      order.push(`${selected[s].id}`);
  }

  for (const r in radios) {
    if (radios[r].checked) direc = radios[r].value;
  }

  console.log(direc);
  //- console.log(radios)

  if (order.length === 0) {
    alert("No ha seleccionado un orden;");
    return false;
  }

  document.location.href = `/todo/orderBy/${order.join("/")}/${direc}`;
}

function cleanOrder() {
  document.location.href = `/todo/`;
}

function clearTitle() {
  document.querySelector("#title").value = "";
  return false;
}

function clearTitleList() {
  document.querySelector("#titleList").value = "";
  return false;
}

function clearDescrip() {
  document.querySelector("#descrip").value = "";
  return false;
}
