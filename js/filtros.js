const url1 = "http://localhost:8080/condomino";
const url2 = "http://localhost:8080/pais";

async function getAPI2(url) {
    const response = await fetch(url, { method: "GET" });

    var dataa = await response.json();

    for (let condomino of dataa) {
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

getAPI2(url1);


async function getAPI3(url) {
    const response = await fetch(url, { method: "GET" });

    var data1 = await response.json();

    for (let pais of data1) {
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

getAPI3(url2);
