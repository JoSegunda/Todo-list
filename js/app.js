//Set new active element
const newItem = document.querySelector('.view-list')
if (newItem.classList[1].localeCompare('inactive')) {
    //get active element
    const activeElement = document.querySelector('.active')
    activeElement.classList.remove('active')
    activeElement.classList.add('inactive')

    newItem.classList.remove('inactive')
    newItem.classList.add('active')
}



window.addEventListener('hashchange', updateContent);


const updateContent = () => {
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash

    const currentState = document.querySelector('.active')

    switch(hash){
        case 'active':
            content.innerHTML = 
            `
                <h1>Active</h1>
                <p>Bem vindo a active page
            `;
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
}