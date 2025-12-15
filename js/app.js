const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const submitTask = document.getElementById('submit-task')
const form = document.getElementById('taskform')


var deleteTask = ""
var tasks = []
var tasksMap = new Map()
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
    let newTask = {name:task.value, id:tasksCount,completed:false}

    // Add the created object to the existent tasks
    tasks.push(newTask)
    
    
    if (task_name) {
        tasksMap.set(tasksCount, {name:task.value, completed:false})
        console.log(tasksMap)
        // Show a message that the task has been added
        alert("The task was succesfuly added")

        // Do a reset on the form
        form.reset()

        tasksCount += 1
        // Atualiza a view atual assim que a tarefa é criada
        updateContent()
    }
})

function updateContent(){
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash

    content.innerHTML = ""
    var temp = ""
    
    switch(hash){
        case 'active':
            
            // this loop is to get each object inside the array

            tasksMap.forEach((task, id) => {
                if (!task.completed) {
                    temp += `

                    <div id="tarefas" class="${id}">
                        <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
                        <div id="tarefa-name"><p>${task.name}</p></div>
                        <div id="deleteTask"><i class="fa-solid fa-trash" onclick="delTask(${id})"></i></div>
                    </div>

                    `;
                } 
            });

            // Substitui o conteúdo (não acumula) para evitar duplicações
            content.innerHTML = temp
        break;
        case 'completed':

            tasksMap.forEach((task, id) => {
                if (task.completed) {
                    temp += `

                    <div id="tarefas" class="${id}">
                        <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
                        <div id="tarefa-name"><p>${task.name}</p></div>
                        <div id="deleteTask"><i class="fa-solid fa-trash" onclick="delTask(${id})"></i></div>
                    </div>

                    `;
                } 
            });

            content.innerHTML = temp

        break;
        case 'all-todos':

            tasksMap.forEach((task, id) => {
               
                temp += `
                <div id="tarefas" class="${id}">
                    <div class="iscompleted"><i onclick="taskCompleted()" class="fa-regular fa-circle-check fa-lg show-fa"></i><i class="fa-solid fa-circle-check fa-lg hide-fa"></i></div>
                    <div id="tarefa-name"><p>${task.name}</p></div>
                    <div id="deleteTask"><i class="fa-solid fa-trash" onclick="delTask(${id})"></i></div>
                </div>
                `;
            
            });
            content.innerHTML = temp
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
    // porque o Map usa chaves, não índices.
    if (tasksMap.has(itemId)) {
        tasksMap.delete(itemId)
    }

    updateContent()
}

function taskCompleted(){
    const showfa = document.querySelector('.show-fa')
    const hidefa = document.querySelector('.hide-fa')

    showfa.classList.replace('show-fa','hide-fa')
    hide.classList.replace('hide-fa','show-fa')
}