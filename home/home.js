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
           <div class="first"> 
           <p class="titulo">${element.descrição}</p>
           <p class="data">${element.dataConclusão}</p>
           </div>
           <button class="trash"><img src="./8664938_trash_can_delete_remove_icon.png" alt=""></button>
        </div>
        `
        containerTarefas.appendChild(tarefa)
    })

    container.appendChild(containerTarefas)
}

criarCardTL()