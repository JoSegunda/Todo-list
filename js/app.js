const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const submitTask = document.getElementById('submit-task')
var deleteTask = ""
var tasks = []
let tasksCount = 0
var activeTasks = []

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
    e.preventDefault()
    const task = document.getElementById('task-name')
    const task_name = ""+task.value
    if (!task_name) {
        alert("Tarefa não válida")
        return
    }
    let newTask = {"Name":task.value, "completed":false}
    tasks.push(newTask)
    tasksCount += 1

    
    if (task_name) {
        activeTasks[tasksCount-1] += `

        <div id="tarefas" class="${tasksCount}">
            <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
            <div id="tarefa-name"><p>${task_name}</p></div>
            <div id="deleteTask"><i class="fa-solid fa-trash" onclick="delTask(${tasksCount})"></i></div>
        </div>

        `;
        // Atualiza a view atual assim que a tarefa é criada
        updateContent()
    }
})

function updateContent(){
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash

    switch(hash){
        case 'active':
            content.innerHTML = ""
            var temp = ""
            activeTasks.forEach((struct) => {
                temp += struct
                console.log(temp)
            })
            content.innerHTML = temp
            deleteTask = document.getElementById('deleteTask')
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
        default:
            // Se não houver hash, mantém o conteúdo atual ou mostra active por padrão
            // content.innerHTML = activeTasks
        break;
    }
}

window.addEventListener('hashchange', updateContent);

// Renderiza a view atual ao carregar o script (útil ao recarregar a página)
updateContent();

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

function delTask(itemId) {
        console.log(itemId)
        deleteTask.addEventListener('click', () => {
        const toDelete = document.getElementsByClassName(itemId)[0]
        toDelete.remove()
        activeTasks.pop(itemId-1)
        updateContent()
    })
}