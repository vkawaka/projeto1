'use strict'


async function criarCardTL(){
    const chores = await fetch('http://localhost:5080/tarefas')
    const listChores = await chores.json()

    const container = document.getElementById('container-h')
    const containerTarefas = document.getElementById('tarefas-container')

    try {
        listChores.forEach( element => {

                const tarefa = document.createElement('div')
    
            tarefa.innerHTML = `
            <div class="tar">
               <div class="first"> 
               <p class="titulo">${element.descrição}</p>
               <p class="data">${element.dataConclusão}</p>
               </div>
               <button class="trash"><img src="../img/pencil.png" alt="Lixeira" id="pencil${element.id}""></button>
               <button class="trash"><img src="./trashCan.png" alt="Lixeira" id="trashCan${element.id}""></button>
            </div>
            `
            containerTarefas.appendChild(tarefa)
            
            const lixeira = document.getElementById('trashCan' + element.id)
            lixeira.addEventListener('click', function (){
                excluirTarefa(element.id)
            })
            const lapis = document.getElementById('pencil' + element.id)
            lapis.addEventListener('click', function (){
                editarTarefa(element.id)
            })
        })
    
        container.appendChild(containerTarefas)
    } catch (error) {
        
    }

}

async function excluirTarefa(idTarefa){
    const url = `http://localhost:5080/tarefas/${idTarefa}`

    await fetch(url, {
        method: 'DELETE'
    })

    window.location.reload()
}
const editarTarefa = async (tarefa) => {
    const url = `http://localhost:5080/tarefas/${tarefa}`
    const response = await fetch(url)
    const data = await response.json()

    console.log(data.id);

    const editar = document.getElementById('editar_tarefa')
    editar.style.display = 'flex'

    const botao = document.getElementById('btn_editar')
    botao.addEventListener('click', async () => {
        const tituloInput = document.getElementById('tituloAtt').value
        const dataInput = document.getElementById('dataAtt').value
        
        if(tituloInput == '' || dataInput == '' || tituloInput == undefined || dataInput == undefined){
            alert('Verifique se seus argumentos suprem as necessidades e restrições.')
            return {status: false, status_code: 404, message: 'Argumentos inválidos.'}
        }else{
            try {
                const tarefaAtualizada = {
                    descrição: tituloInput,
                    dataConclusão: dataInput,
                    idUsuario: data.idUsuario
                }
                
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tarefaAtualizada),
                }
                await fetch(url, options)
                window.location.reload()
            } catch (error) {
                
            }
        }
    })

}
criarCardTL()