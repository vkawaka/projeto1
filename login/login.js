'use strict'

async function validarLogin() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if (email === '' || senha === '') {
        alert('por favor, preencha todos os campos necessários.')
        return false
    } else {

        try {
            const users = await fetch('http://localhost:5080/usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'appplication/json',
                }
            })

            const listUsers = await users.json()

            listUsers.forEach((user) => {
                if(email === user.email && senha === user.senha){

                    localStorage.setItem('user',user.nome)
                    localStorage.setItem('id', user.id)
                    localStorage.setItem('email', user.email)
                    localStorage.setItem('premium', user.premium)
                    
                    alert('User logado com sucesso!!')
                    window.location.href = "../home/home.html"
                }
            })
        }
        catch (error) {
            alert('Erro ao acessar a API')
            console.error(error)
        }
    }
}