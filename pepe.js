function toggleModal(n){
    const modal = document.querySelectorAll(".modal-off")[n]
    modal.classList.toggle("modal");
}

function addList(){
    console.log(document.querySelector("#titleList"));
    const newList = {
        id:null,
        title: document.querySelector("#titleList").value,
        state: document.querySelector("input[name='state-list']:checked").value,
        resolutionDate: null,
        creationDate: new Date(Date.now()),
    }

    console.table(newList)

    if(!newList.title.length){
        alert("La lista necesita un título")
        return false;
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/list/add", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    var data = newList;
    xhttp.send(JSON.stringify(data));
    clearTitleList();

    setTimeout(() => {
        location.reload()
    }, 500);


    return false;
}

function addTask (){

    const newTask = {
        id:null,
        title: document.querySelector("#title").value.toString(),
        descrip: document.querySelector("#descrip").value.toString(),
        priority: document.querySelector("input[name='priority']:checked").value,
        state: document.querySelector("input[name='state']:checked").value,
        creationDate: new Date(Date.now()),
        deadline: document.querySelector("input[name='dl']").checked ? document.querySelector("input[name='dldate']").value : null,
        resolutionDate: null
    }
    const selectedLists = document.getElementsByClassName("listCheckbox");
    console.log(typeof selectedLists)
    const listsID = []
    for(const sl in selectedLists){
        if(selectedLists[sl].checked)
            listsID.push(selectedLists[sl].value);
    }

    //- console.log("ID: ",listsID);
    //- if(!newTask.title.length || !newTask.descrip.length){
    //-     alert("No puede ingresar una tarea sin título y descrpción.")
    //-     return false;
    //- }

    //- console.log(typeof newTask.deadline)

    if(newTask.deadline !== null &&  new Date(newTask.deadline) < new Date(Date.now())){
        alert("No puede elegir una fecha que ya pasó!");
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/item/add", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    var data = {newTask: newTask,listsID: listsID};
    console.log(data)
    xhttp.send(JSON.stringify(data));
    clearTitle();
    clearDescrip();

    setTimeout(() => {
        location.reload()
    }, 500);


    return false;
}

function markAsResolve(id){

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/item/markAsResolved/${id}`, true); 
    xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    xhttp.send();

    const div = document.getElementById(id)//document.querySelector("#"+id);
    div.classList.add("resolve");
    //- setTimeout(()=>{
    //-     div.remove();
    //- }, 1000)
    setTimeout(() => {
        location.reload()
    }, 500);

    return false;
}

function markAsUnresolve(id){

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/item/markAsUnresolve/${id}`, true); 
    xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    xhttp.send();

    const div = document.getElementById(id)//document.querySelector("#"+id);
    div.classList.remove("resolve");
    //- setTimeout(()=>{
    //-     div.remove();
    //- }, 1000)
    setTimeout(() => {
        location.reload()
    }, 500);

    return false;
}

function markAsResolving(id){

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/item/markAsResolving/${id}`, true); 
    xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    xhttp.send();

    const div = document.getElementById(id)//document.querySelector("#"+id);
    div.classList.remove("resolve");
    //- setTimeout(()=>{
    //-     div.remove();
    //- }, 1000)
    setTimeout(() => {
        location.reload()
    }, 500);

    return false;
}

function deleteTask (id){


    //console.log(id)

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/item/delete/${id}`, true); 
    xhttp.setRequestHeader("Content-Type", "XMLHttpRequest");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    xhttp.send();

    const div = document.getElementById(id)//document.querySelector("#"+id);
    div.classList.add("deleting");
    setTimeout(()=>{
        div.remove();
    }, 1000)

    return false;
}

function setOrder(){

    const options = document.getElementsByClassName("orderOption");
    const radios = document.getElementsByClassName("orderRadio");

    var order = [];

    //console.log(radios)

    for(const o in options){
        if(options[o].checked)
            order.push(options[o].name);
    }

    //- console.log(radios)
    
    if(order.length === 0){
        alert("No ha seleccionado un orden;")
        return false;
    }

    const data = {
        "order": options,
        "direc": "ASC"
    } 

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/todo/order", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
        }
    };
    xhttp.send(JSON.stringify(data));

    //return false;
}

function clearTitle(){
    document.querySelector("#title").value = ""
    return false;
}

function clearTitleList(){
    document.querySelector("#titleList").value = ""
    return false;
}

function clearDescrip(){
    document.querySelector("#descrip").value = ""
    return false;
}