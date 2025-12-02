const updateContent = () => {
    const content = document.getElementById('content')
    const hash = window.location.hash.substring(1) // remove o # do hash
    
    window.addEventListener('click', (e) =>{
        //get active element
        const activeElement = document.querySelector('.active')
        activeElement.classList.remove('active')
        activeElement.classList.add('inactive')

        //Define new target element
        const newActive = e.target
        newActive.classList.remove('inactive')
        newActive.classList.add('active')
    })

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

window.addEventListener('hashchange', updateContent);

