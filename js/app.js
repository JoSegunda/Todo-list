const updateContent = () => {
    const content = document.getElementById('content')
    const hash = window.hash.substring(1) // remove o # do hash

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
                <h1>Active</h1>
                <p>Bem vindo a active page
            `;
    }
}