const addButton = document.getElementById('addButton')
const modal_container = document.getElementById('modal-container')
const close = document.getElementById('')

addButton.addEventListener('click', () => {
    
})



window.addEventListener('hashchange', () => {
    
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash

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