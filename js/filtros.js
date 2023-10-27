const url1 = "http://localhost:8080/condomino";
const url2 = "http://localhost:8080/pais";
const url3 = "http://localhost:8080/estados";
const url4 = "http://localhost:8080/cidades";
const url5 = "http://localhost:8080/tipodependentes";
const url6 = "http://localhost:8080/fornecedores";
const url7 = "http://localhost:8080/sindico";
const url8 = "http://localhost:8080/apartamentos";
const url9 = "http://localhost:8080/itensestoque";



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

async function getAPI4(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let cidade of data) {
        let cidadeNome = cidade.nome;

        // Selecione o elemento <select> pelo ID
        const selectCidade = document.getElementById("cidade_nome");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = cidadeNome;
        optionElement.textContent = cidadeNome;

        // Adicione a opção ao <select>
        selectCidade.appendChild(optionElement);
    }
}
getAPI4(url4);

async function getAPI5(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let tipoDependente of data) {
        let tipoDep = tipoDependente.descricao;

        // Selecione o elemento <select> pelo ID
        const selectTipoDep = document.getElementById("select_tipo_dep");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = tipoDep;
        optionElement.textContent = tipoDep;

        // Adicione a opção ao <select>
        selectTipoDep.appendChild(optionElement);
    }
}
getAPI5(url5);

async function getAPI6(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let fornecedor of data) {
        let fornec = fornecedor.nome;

        // Selecione o elemento <select> pelo ID
        const selectFornecedor = document.getElementById("select_fornecedor");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = fornec;
        optionElement.textContent = fornec;

        // Adicione a opção ao <select>
        selectFornecedor.appendChild(optionElement);
    }
}
getAPI6(url6);

async function getAPI7(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let sindico of data) {
        //SÓ MOSTRA OS SINDICOS ATIVOS
        if (sindico.ativo == "Sim") {
            let sindicos = sindico.nome;

            // Selecione o elemento <select> pelo ID
            const selectSindico = document.getElementById("select_sindico");

            // Crie uma opção com o nome do condomínio
            const optionElement = document.createElement("option");
            optionElement.value = sindicos;
            optionElement.textContent = sindicos;

            // Adicione a opção ao <select>
            selectSindico.appendChild(optionElement);
        }
    }
}
getAPI7(url7);

async function getAPI8(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let apartamento of data) {
        let apto = apartamento.numero;

        // Selecione o elemento <select> pelo ID
        const selectApto = document.getElementById("select_apartamento");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = apto;
        optionElement.textContent = apto;

        // Adicione a opção ao <select>
        selectApto.appendChild(optionElement);
    }
}
getAPI8(url8);

async function getAPI9(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();

    for (let itemEstoque of data) {
        let item = itemEstoque.descricao;

        // Selecione o elemento <select> pelo ID
        const select_item_estoque = document.getElementById("select_item_estoque");

        // Crie uma opção com o nome do condomínio
        const optionElement = document.createElement("option");
        optionElement.value = item;
        optionElement.textContent = item;

        // Adicione a opção ao <select>
        select_item_estoque.appendChild(optionElement);
    }
}
getAPI9(url9);
