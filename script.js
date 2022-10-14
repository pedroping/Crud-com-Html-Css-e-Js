const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const btnSalvar = document.querySelector('#btnSalvar')

let itens, id

const getItensDB = () => JSON.parse(localStorage.getItem('database')) ?? []
const setItensDB = () => localStorage.setItem('database', JSON.stringify(itens))

function loadItens(){
    itens = getItensDB()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

loadItens()

function insertItem(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr);
}

function editItem(index){
    openModal(true, index);
}

function deleteItem(index){
    itens.splice(index, 1);
    setItensDB()
    loadItens()
}

function openModal(edit = false, index = 0){
    modal.classList.add('active')

    if (edit) { 
      sNome.value = itens[index].nome
      sEmail.value = itens[index].email
      id = index
    } else {
      sNome.value = ''
      sEmail.value = ''
    }
    
}

btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sEmail.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].email = sEmail.value
    } else {
      itens.push({'nome': sNome.value, 'email': sEmail.value})
    }
  
    setItensDB()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  
  function loadItens() {
    itens = getItensDB()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }