const url1 = "http://localhost:8080/condomino";


async function getAPI2(url) {
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

    if (response) {
        show(data);
    }
}

getAPI2(url1);