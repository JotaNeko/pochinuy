window.onload = () => {
    let form = document.querySelector('#confesionForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let confessionTitle = document.querySelector('#confesionTitulo').value;
        let confessionText = document.querySelector('#confesionTexto').value;
        let name = document.querySelector('#confesante').value;
        

        let sendConfession = await fetch('https://confesionario-back-end.vercel.app/confesar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({confessionTitle, confessionText, name})
        }).then(response => response.json()) ;

        window.location.replace(sendConfession)
    });
}