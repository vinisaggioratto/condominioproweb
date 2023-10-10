const url1 = "http://localhost:8080/condomino";
const url2 = "http://localhost:8080/pais";
const url3 = "http://localhost:8080/estados";

async function getAPI1(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let condomino of data) {
        let condominoNome = condomino.nome;

        // Selecione o elemento <select> pelo ID
        const selectCondominio = document.getElementById("select-condomino");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = condominoNome;
        optionElement.textContent = condominoNome;

        // Adicione a opção ao <select>
        selectCondominio.appendChild(optionElement);

        console.log(condominoNome);
    }
}
getAPI1(url1);


async function getAPI2(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let pais of data) {
        let paisNome = pais.nome;
        

        // Selecione o elemento <select> pelo ID
        const selectPais = document.getElementById("pais_nome");
        
        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = paisNome;
        optionElement.textContent = paisNome;

        // Adicione a opção ao <select>
        selectPais.appendChild(optionElement);
    }
}
getAPI2(url2);

async function getAPI3(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let estado of data) {
        let estadoNome = estado.nome;
        
        // Selecione o elemento <select> pelo ID
        const selectEstado = document.getElementById("estado_nome");
        
        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = estadoNome;
        optionElement.textContent = estadoNome;

        // Adicione a opção ao <select>
        selectEstado.appendChild(optionElement);
    }
}
getAPI3(url3);