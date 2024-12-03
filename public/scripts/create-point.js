function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let SelectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    //Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //Existe itens selecionados, se sim pegar os itens

    //   const alreadySelected = SelectedItems.findIndex( item => item === itemId)

    const alreadySelected = SelectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })


    //se já estiver selecionado
    if (alreadySelected >= 0) {
        //tirar da seleção
        //const filteredItems = SelectedItems.filter( item => item != itemId)

        const filteredItems = SelectedItems.filter(item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        SelectedItems = filteredItems

    } else {
        //se não tiver selecionado, adicionar a seleção
        SelectedItems.push(itemId)
    }
    //Atualizar os campos selecionados
    collectedItems.value = SelectedItems
}