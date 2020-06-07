// Javascript object notation - JSON
// IBGE servicos API, JSON formatter e colar o link da API
// addEventListener vai ficar ouvindo um evento toda hora e atualizar sempre que receber alguma mudança
document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)
// se colocar o () no getCities ela sera executada imediatamente, se ficar sem, so ira ser executada quando for trocado algo no document
populateUFs();

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        //.then( (res) => { return  res.json()}) ou...
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }

        })
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    // Pegando a posição que foi selecionada
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        //.then( (res) => { return  res.json()}) ou...
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;

        })
}

// Itens de coleta  
// Pegar todos os li's
const itemsToCollet = document.querySelectorAll(".items-grid li");
for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)

}


// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

// Pegando itens selecionados
let selectedItems = []

function handleSelectedItem(event) {

    // adicionar ou removar uma class com Javascript
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    // Pegando somente o numero do id, devido a ter usado o data-id no html
    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        //const itemFound = item == itemId
        //return itemFound
        return item == itemId
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemDifferent = item != itemId
            return itemDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}