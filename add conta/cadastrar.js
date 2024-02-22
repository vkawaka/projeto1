'use strict'

function cadastrar(){
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if(nome == '' || email == '' || senha == ''){  
        alert('Verifique se seus argumentos suprem as necessidades e restrições.')
        return {status: false, status_code: 404, message: 'Argumentos inválidos.'}
       
    }else{
        try{
            const novoUser = {
                nome: nome,
                email: email,
                senha: senha
            }
    
            enviar(novoUser)
        }catch(error){
            alert('Erro ao acessar a API :P')
            console.error(error)
        }
    }
}

async function enviar(novoUsuario){
    const novoUser = novoUsuario

    const url = 'http://localhost:5080/usuario'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(novoUser)
    }

    const response = await fetch(url, options)
    window.location.href = '../login/index.html'
    console.log(response.ok)
    return response.ok
}

