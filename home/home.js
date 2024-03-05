'use strict'

const idUsuario = localStorage.getItem('idUser')

async function criarCard(){
    //pegar usuario do back pelo id
    const pegarTeste = `http://localhost:5080/usuario/${idUsuario}`
    const teste = await fetch(pegarTeste)
    const user = await teste.json()

    console.log(user)

    //pegar as tarefas (todas)
    const url = 'http://localhost:5080/tarefas'
    const tasks = await fetch(url)
    const listTasks = await tasks.json()

    const tarContainer = document.getElementById('tarefas-container')

    listTasks.forEach(tarefa => {
        if(user.id == tarefa.idUsuario){
            const card = document.createElement('div')
            card.className = 'tar'
            const titulo = document.createElement('p')
            titulo.className = 'titulo'
            const data = document.createElement('p')
            data.className = 'data'
            const botoes = document.createElement('div')
            botoes.className = 'botoes'
            const comentB = document.createElement('button')
            comentB.className = 'trash'
            const comentI = document.createElement('img')
            comentI.src = '../img/coment.png'
            const pencilB = document.createElement('button')
            pencilB.className = 'trash'
            const pencilI = document.createElement('img')
            pencilI.src = '../img/pencil.png'
            const trashB = document.createElement('button')
            trashB.className = 'trash'
            const trashI = document.createElement('img')
            trashI.src = './trashCan.png'

            comentB.appendChild(comentI)
            pencilB.appendChild(pencilI)
            trashB.appendChild(trashI)

            pencilB.onclick = editarTarefa

            trashB.onclick = excluirTarefa

            titulo.textContent = `${tarefa.descrição}`
            data.textContent = `${tarefa.dataConclusão}`
            

            botoes.append(comentB, pencilB, trashB)
            card.append(titulo, data, botoes)

            tarContainer.appendChild(card)
        }else{
            const card = document.createElement('div')
            card.className = 'tar'
            const titulo = document.createElement('p')
            titulo.className = 'titulo'
            const data = document.createElement('p')
            data.className = 'data'
            const botoes = document.createElement('div')
            botoes.className = 'botoes'
            const comentB = document.createElement('button')
            comentB.className = 'trash'
            const comentI = document.createElement('img')
            comentI.src = '../img/coment.png'

            comentB.appendChild(comentI)
           
            comentB.onclick = excluirTarefa

            titulo.textContent = `${tarefa.descrição}`
            data.textContent = `${tarefa.dataConclusão}`
            

            botoes.append(comentB)
            card.append(titulo, data, botoes)

            tarContainer.appendChild(card)
        }
    })
    
}

criarCard()

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
