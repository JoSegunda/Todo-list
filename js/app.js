const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const submitTask = document.getElementById('submit-task')
var tasks = []
let tasksCount = 0
const activeTasks = ""

addButton.addEventListener('click', () => {
    modal_container.classList.add('show')
})
close.addEventListener('click', () => {
    modal_container.classList.remove('show')
})
// Evita que cliques dentro do modal (conteúdo) fechem o modal
modal.addEventListener('click', (e) => {
    e.stopPropagation()
})

// Fecha o modal quando o usuário clica no backdrop (fora do conteúdo)
modal_container.addEventListener('click', (e) => {
    if (e.target === modal_container) {
        modal_container.classList.remove('show')
    }
})

submitTask.addEventListener('click', (e) => {
    const task = document.getElementById('task-name')
    let newTask = {"Name":task, "completed":false}
    tasks.push(newTask)
    tasksCount += 1

    
    console.log("")
    console.log(task.Name)
    activeTasks = `

    <div id="tarefas">
        <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
        <div id="tarefa-name"><p>${task.Name}</p></div>
        <div id="deleteTask"><i class="fa-solid fa-trash" id="${tasksCount}"></i></div>
    </div>

    `;
        

})

window.addEventListener('hashchange', () => {
    
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash

    switch(hash){
        case 'active':
            console.log("OK")
            
        break;
        case 'completed':
            
            content.innerHTML = 
            `
                <h1>Completed</h1>
                <p>Bem vindo a completed page</p>
            `;
        break;
        case 'all-todos':
            content.innerHTML = 
            `
                <h1>All-todos</h1>
                <p>Bem vindo a All-todos page</p>
            `;
        break;
    }

});

function setActive(item){
        //Get the element that was clicked allways the first
        const newActive = document.querySelector(`#${item}`)

        if (newActive.classList[1] === 'inactive') {
            const currentActive = document.querySelector('.active')
            currentActive.classList.remove('active')
            currentActive.classList.add('inactive')

            newActive.classList.remove('inactive')
            newActive.classList.add('active')
        }

        //Get the current item

        //Get the active item
    }