// Elements
const body = document.getElementsByTagName('body')[0];
const dark = document.getElementById('dark--mode--icon');
const light = document.getElementById('light--mode--icon');
const header = document.getElementById('todo-list--header');
const footer = document.getElementById('todo-list--footer');
const toDoList = document.getElementById('todo-list');
const input = document.getElementsByTagName('input')[0];
const filtAll = document.getElementById('filter-all');
const filtActive = document.getElementById('filter-active');
const filtComplete = document.getElementById('filter-completed');

const check = "check-circle";
const uncheck = "uncheck-circle";
const lineThrough = "line-through";

let todoTasks;
let id;

// get tasks from the localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data){
    todoTasks = JSON.parse(data);
    id = todoTasks.length;
    loadTasks(todoTasks);
}
else{
    todoTasks = [];
    id = 0;
}

// load tasks to the ui
function loadTasks(array){
    array.forEach(function (item){
        addTask(item.name,item.id,item.done,item.trash)
    })
}





function changeMode() {
    if (light.style.display !== 'inline-block') {
        body.classList.remove('light--mode');
        body.classList.add('dark--mode');
        light.style.display = 'inline-block';
        dark.style.display = 'none';
        header.style.background = '#25273c';
        header.style.boxShadow = '0 35px 50px rgba(0,0,0,.501961)';
        footer.style.background = '#25273c';
        toDoList.style.background = '#25273c';
        toDoList.style.boxShadow = '0 35px 50px rgba(0,0,0,.501961)';
    } else {
        body.classList.remove('dark--mode');
        body.classList.add('light--mode');
        dark.style.display = 'inline-block';
        light.style.display = 'none';
        header.style.background = '#ffffff';
        footer.style.background = '#ffffff';
        toDoList.style.background = '#ffffff';
    }
}

function addTask(todo,id,done){
    // if (trash) return;
    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : "";
    const item = `<li class="item">
            <img class="todo-check--box ${DONE}" onclick="taskDone(this)" id = ${id} src="https://img.icons8.com/ios/24/000000/circled.png"/>
            <span class="todo-check--text ${LINE}"> ${todo} </span>
            <img class = "close--task" onclick="taskRemove(this)" id = ${id}  src="https://img.icons8.com/ios/24/000000/multiply.png"/>
            <div class="divider"></div>
            </li>`;
    const position = "beforeend";

    toDoList.insertAdjacentHTML(position, item);
    // let li = document.createElement('li');
    // li.innerHTML = item;
    // toDoList.appendChild(li);
}

document.addEventListener("keypress", function(event){
    if (event.key === 'Enter'){
        const todo = input.value;
        todoTasks.push({
            name: todo,
            id: id,
            done: false,
            trash: false,
        })
        addTask(todo,id,false)//,false);
        id++;
        input.value='';
    }
})


function taskDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".todo-check--text").classList.toggle(lineThrough);
    todoTasks[element.id].done = true;//todoTasks[element.id].done ? false : true;
}

function taskRemove(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    todoTasks[element.id].trash = true;
}



const filterOptions = document.querySelector('.filters')
filterOptions.addEventListener('click', function (e){
    // const todos = toDoList.childNodes
    // console.log(todos)
    // console.log(e.target.value)

    todoTasks.forEach(function (item) {
        switch (e.target.value) {
            case "filter-all":
                const filteredTask = todoTasks.filter(item => {
                    return !(item.trash)
                })
                todoTasks.innerHTML = '';
                for (let i = 0; i < filteredTask.length; i++) {
                    addTask(filteredTask[i].name,filteredTask[i].id,filteredTask[i].done);
                }

                // if (!item.trash){
                //     todoTasks.innerHTML = [];
                //     addTask(item.name,item.id,item.done)
                // }//,item.trash);
                // // addTask(item.name,item.id,item.done,!item.trash);
                break;

            case "filter-completed":

                if (item.done) {
                    addTask(item.name,item.id,item.done)
                }
                break;
            case "filter-active":

                if (!item.trash && !item.done) {
                    addTask(item.name,item.id,item.done)
                }
                break;
        }
    })
});






