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

            listUsers.forEach((usuario) => {
                if (email === usuario.email && senha === usuario.senha) {
                    alert('Usuário logado')
                    return true
                }
            })
        }
        catch (error) {
            alert('Erro ao acessar a API')
            console.error(error)
        }
    }
}