// Javascript object notation - JSON
// IBGE servicos API, JSON formatter e colar o link da API
// addEventListener vai ficar ouvindo um evento toda hora e atualizar sempre que receber alguma mudança
document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)
// se colocar o () no getCities ela sera executada imediatamente, se ficar sem, so ira ser executada quando for trocado algo no document


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

populateUFs();


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    // Pegando a posição que foi selecionada
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
        //.then( (res) => { return  res.json()}) ou...
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }

            citySelect.disabled = false;

        })
}