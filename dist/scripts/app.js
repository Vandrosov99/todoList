// variables 
let btnADD = document.querySelector('.card__btn_add');
let addInput = document.querySelector('.card__task');
let collection = document.querySelector('.card__collection');
let btnClear = document.querySelector('.card__btn_clear');
let filterInput = document.querySelector('.card__search');
let emptyLine = document.querySelector('.card__isEmpty');



loadAllEvents();


function loadAllEvents() {
    // dom event
    document.addEventListener('DOMContentLoaded', getTasks);
    // event ADD
    btnADD.addEventListener('click', addTask);
    // event Remove (delegation)
    collection.addEventListener('click', removeSingleTask);
    //event remove ALL tasks
    btnClear.addEventListener('click', removeAllTasks);
    //filter tasks
    filterInput.addEventListener('keyup', filterTasks);
}

//addTask
function addTask(e) {
    if (addInput.value === "") {
        alert("add some Task");
        return "";
    }
    createTask(addInput.value);
    storeTaskInLocalStorage(addInput.value);
    console.log(collection.childNodes.length)
    if (collection.childNodes.length >= 1) {
        console.log("asdasd")
        emptyLine.style.display = 'none';
    } else {
        emptyLine.style.display = 'block';
    }
    addInput.value = "";
}
// create Div with text Task
function createTask(text) {
    const divItem = document.createElement('div');

    divItem.className = 'card__taskItem';

    divItem.innerHTML = `
    <p class="card__itemName">${text}</p>
    <div class="card__delete">
    </div>`;

    collection.appendChild(divItem);
}


function removeSingleTask(e) {
    let cardDel = e.target.classList.contains('card__delete');

    if (cardDel) {
        e.target.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.firstChild.nextSibling.textContent);
    }
    if (collection.childNodes.length >= 1) {
        console.log("asdasd")
        emptyLine.style.display = 'none';
    } else {
        emptyLine.style.display = 'block';
    }
}

function removeAllTasks(e) {
    while (collection.firstChild) {
        collection.removeChild(collection.firstChild);
    }
    removeAllTasksFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();


    document.querySelectorAll('.card__taskItem').forEach(function (task) {
        const item = task.firstElementChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    })
    // e.target.value = "";
}


function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasks() {
    //выводит все узлы 


    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        createTask(task);
    })

    // 
    if (collection.childNodes.length >= 1) {
        console.log("asdasd")
        emptyLine.style.display = 'none';
    } else {
        emptyLine.style.display = 'block';
    }


}

function removeTaskFromLocalStorage(el) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // elText = 
        tasks.forEach(function (task, index) {

            if (el === task) {
                tasks.splice(index, 1);
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function removeAllTasksFromLocalStorage() {
    localStorage.clear();

    if (collection.childNodes.length >= 1) {
        console.log("asdasd")
        emptyLine.style.display = 'none';
    } else {
        emptyLine.style.display = 'block';
    }

}
