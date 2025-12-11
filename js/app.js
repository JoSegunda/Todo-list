const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const submitTask = document.getElementById('submit-task')
const from = document.getElementById('taskform')
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
    // Create a new todo with an id and set completed to false
    let newTask = {Name:task.value, id:tasksCount,completed:false}
    // Add the created object to the existent tasks
    tasks.push(newTask)
    
    
    if (task_name) {
        // Show a message that the task has been added
        alert("The task was succesfuly added")

        tasksCount += 1
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
            // this loop is to get each object inside the array
            tasks.forEach((task) => {

                const innerObject = Object.values(task)
                // This loop is to get each object content
                innerObject.forEach((value) => {
                    // This checks if the tasks are completed or not, so they can be shown
                    if(!value[2]){  // If the task is not completed (false) we can show it
                        temp = `

                        <div id="tarefas" class="${value[1]}">
                            <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
                            <div id="tarefa-name"><p>${value[0]}</p></div>
                            <div id="deleteTask"><i class="fa-solid fa-trash" onclick="delTask(${value[1]})"></i></div>
                        </div>

                        `;
                    }
                    
                })
                content.innerHTML += temp
            })
            
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
    }
function delTask(itemId) {

        deleteTask.addEventListener('click', () => {
        const toDelete = document.getElementsByClassName(itemId)[0]

        updateContent()
    })
}