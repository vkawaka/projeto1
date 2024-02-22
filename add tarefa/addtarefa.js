'use strict'
const message = require('../root.js')

function adicionar(){
    const titulo = document.getElementById('titulo').value
    const data = document.getElementById('data').value


   if(titulo == '' || data == ''){
    alert('Verifique se seus argumentos suprem as necessidades e restrições.')
    return {status: false, status_code: 404, message: 'Argumentos inválidos.'}
   }else{
    try{
        const novaTarefa = {
            descrição: titulo,
            dataConclusão: data,
            idUsuario: localStorage.getItem('id')
        }

        enviar(novaTarefa)
    }catch(error){
        alert('Erro ao acessar a API :P')
        console.error(error)

   }
   }
}

async function enviar(novaTarefa){
    const novaT = novaTarefa

    const url = 'http://localhost:5080/tarefas'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(novaT)
    }

    const response = await fetch(url, options)
    window.location.href = "../home/home.html"
    console.log(response.ok)
    return response.ok
}