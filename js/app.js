const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const submitTask = document.getElementById('submit-task')
const form = document.getElementById('taskform')


var tasks = []
let tasksCount = 0



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
    const task_name = ('' + task.value).trim()
    if (!task_name) {
        alert("Tarefa não válida")
        return
    }
    // Create a new todo with an id and set completed to false
    tasksCount += 1
    const newTask = {name: task_name, id: tasksCount, completed: false}

    // Add the created object to the tasks array (source of truth)
    tasks.push(newTask)
    
    
    if (task_name) {
        // Show a message that the task has been added
        alert("The task was succesfuly added")

        // Do a reset on the form
        form.reset()

        // Atualiza a view atual assim que a tarefa é criada
        updateContent()
    }
})

function updateContent(){
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash
    
    switch(hash){
        case 'active': {
            // Render tasks that are not completed
            const visible = tasks.filter(t => !t.completed)
            if (visible.length === 0) {
                content.innerHTML = '<p>Nenhuma tarefa ativa</p>'
            } else {
                const html = visible.map(t => `\n                    <div class="tarefas" data-id="${t.id}">\n                        <div class="iscompleted">\n                          <i data-action="toggle-complete" data-id="${t.id}" class="fa-regular fa-circle-check fa-lg show-fa"></i>\n                          <i class="fa-solid fa-circle-check fa-lg hide-fa"></i>\n                        </div>\n                        <div class="tarefa-name"><p>${t.name}</p></div>\n                        <div class="deleteTask"><i data-action="delete" data-id="${t.id}" class="fa-solid fa-trash"></i></div>\n                    </div>\n                `).join('')
                content.innerHTML = html
            }
            break;
        }
        break;
        case 'completed': {
            const visible = tasks.filter(t => t.completed)
            if (visible.length === 0) {
                content.innerHTML = '<p>Nenhuma tarefa concluída</p>'
            } else {
                content.innerHTML = visible.map(t => `\n                    <div class="tarefas" data-id="${t.id}">\n                        <div class="iscompleted">\n                          <i data-action="toggle-complete" data-id="${t.id}" class="fa-regular fa-circle-check fa-lg show-fa"></i>\n                          <i class="fa-solid fa-circle-check fa-lg hide-fa"></i>\n                        </div>\n                        <div class="tarefa-name"><p>${t.name}</p></div>\n                        <div class="deleteTask"><i data-action="delete" data-id="${t.id}" class="fa-solid fa-trash"></i></div>\n                    </div>\n                `).join('')
            }
            break;
        }
        break;
        case 'all-todos': {
            if (tasks.length === 0) {
                content.innerHTML = '<p>Nenhuma tarefa</p>'
            } else {
                content.innerHTML = tasks.map(t => `\n                    <div class="tarefas" data-id="${t.id}">\n                        <div class="iscompleted">\n                          <i data-action="toggle-complete" data-id="${t.id}" class="fa-regular fa-circle-check fa-lg show-fa"></i>\n                          <i class="fa-solid fa-circle-check fa-lg hide-fa"></i>\n                        </div>\n                        <div class="tarefa-name"><p>${t.name}</p></div>\n                        <div class="deleteTask"><i data-action="delete" data-id="${t.id}" class="fa-solid fa-trash"></i></div>\n                    </div>\n                `).join('')
            }
            break;
        }
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
// --- Event delegation: handle delete / complete actions centrally ---
const contentElement = document.getElementById('content')
contentElement.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    const action = btn.dataset.action
    const id = parseInt(btn.dataset.id, 10)
    if (action === 'delete') {
        delTask(id)
    }
    if (action === 'toggle-complete') {
        taskCompleted(id)
    }
})
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
    const index = tasks.findIndex(t => t.id === itemId)
    if (index > -1) {
        tasks.splice(index, 1)
    }
    updateContent()
}

function taskCompleted(itemId) {
    const task = tasks.find(t => t.id === itemId)
    if (task) {
        task.completed = !task.completed
    }
    updateContent()
}