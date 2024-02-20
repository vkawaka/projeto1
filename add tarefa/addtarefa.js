'use strict'

function adicionar(){
    const titulo = document.getElementById('titulo').value
    const data = document.getElementById('data').value


    try{
        const novaTarefa = {
            descrição: titulo,
            dataConclusão: data
        }

        enviar(novaTarefa)
    }catch(error){
        alert('Erro ao acessar a API :P')
        console.error(error)
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
    console.log(response.ok)
    return response.ok
}