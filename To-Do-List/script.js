// acicionando ação para o botao adiconar
const localStorageKey = 'to-do-lis-gn'

function localStorageJason(){
    return JSON.parse(localStorage.getItem(localStorageKey) || "[]")//função criada para não repetir esse codigo
}


//implementao a ação onclick que vai adicionar oque escrever no input
function newTask()
{
    let input = document.getElementById('add-item-task')

    //teste para verificar se o campo esta vazio ou se ja tem um item como o mesmo valor

    if(!input.value)
    {
        alert('INSIRA UMA TAREFA PARA ADICIONAR A LISTA')
    }
    else
    {
        //aqui incrementa no local storage
        let values = localStorageJason()
        values.push({
            name:input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    showValues()
    input.value=''
}


//função que mostra os itens
function showValues()
{
    let values = localStorageJason()
    let list = document.getElementById('to-do-list')
    list.innerHTML =''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']} <button onclick = 'removeItem("${values[i]['name']}")'>Excluir</button></li>`
    }
}
// configurando botão para excuir tarefa
function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()
