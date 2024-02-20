'use strict'

async function criarCardTL(){
    const chores = await fetch('http://localhost:5080/tarefas')
    const listChores = await chores.json()

    const container = document.getElementById('container-h')
    const containerTarefas = document.getElementById('tarefas-container')

    listChores.forEach(element => {
        const tarefa = document.createElement('div')

        tarefa.innerHTML = `
        <div class="tar">
            <p class="titulo">${element.descrição}</p>
            <p class="data">${element.dataConclusão}</p>
        </div>
        `
        containerTarefas.appendChild(tarefa)
    })

    container.appendChild(containerTarefas)
}

criarCardTL()