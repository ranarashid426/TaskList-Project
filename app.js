const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter')
const clearBtn = document.querySelector('.clear-tasks')
const taskList = document.querySelector('.list-group')
const taskInput  = document.querySelector('#task')

loadEventListener()

function loadEventListener() {
    form.addEventListener('submit',addTask)
    taskList.addEventListener('click',removeTask)
    filter.addEventListener('keyup',filterTask)
    clearBtn.addEventListener('click',clearTasks)
    document.addEventListener('DOMContentLoaded',getTasks)

}


function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))


        // localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    tasks.forEach(task=>{
        const li = document.createElement('li')
        li.className = "list-group-item d-flex justify-content-between align-items-center"
        li.appendChild(document.createTextNode(task));
        // li.innerText = document.createTextNode(taskInput.value)
        const link = document.createElement('a')
        link.className = "link-item bg-dark rounded-pill  p-2"
        link.innerHTML = "<i class='fa fa-remove' style='color: white'></i>"
        li.appendChild(link)
        taskList.appendChild(li)

        
    })



}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Please add a Task')
        
    } else {
        const li = document.createElement('li')
        li.className = "list-group-item d-flex justify-content-between align-items-center"
        li.appendChild(document.createTextNode(taskInput.value));
        // li.innerText = document.createTextNode(taskInput.value)
        const link = document.createElement('a')
        link.className = "link-item bg-dark rounded-pill  p-2"
        link.innerHTML = "<i class='fa fa-remove' style='color: white'></i>"
        li.appendChild(link)
        taskList.appendChild(li)
        // console.log(li)

        // Add task to local storage
        storeTaskInLocalStorage(taskInput.value)
    
        taskInput.value = ''
        
    }
    e.preventDefault()

}


function storeTaskInLocalStorage(task) {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
       tasks = []
   }else{
       tasks = JSON.parse(localStorage.getItem('tasks'))

   }
   tasks.push(task)
   localStorage.setItem('tasks',JSON.stringify(tasks))
}

// remove task
function removeTask(e) {
    if (e.target.classList.contains('link-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.remove()
            removeTaskFromLocalStorage(e.target.parentElement)


            
        }
    } 
}

// Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll(".list-group-item").forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.background = "white"
            
        } else {
            task.style.background = "black"
        }
    })

}


// removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
   if (localStorage.getItem('tasks') === null) {
       tasks = []
   }else{
       tasks = JSON.parse(localStorage.getItem('tasks'))

   }
   tasks.forEach((task,index) => {
       if (taskItem.textContent === task) {
           tasks.splice(index,1)
       }
   })

   localStorage.setItem('tasks',JSON.stringify(tasks))
}

// Clear Tasks
function clearTasks(e) {
    // taskList.innerHTML = ""
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        localStorage.clear()
    }
}