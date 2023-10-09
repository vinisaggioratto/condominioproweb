const url = "http://localhost:8080/cidades";

function show(cidades) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
        </tr>
    </thead>
    `;

    for (let cidade of cidades) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${cidade.cidade_id}</td>
            <td>${cidade.nome}</td>
            <td>${cidade.estado.nome}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });

    var data = await response.json();
    console.log(data);
    
    if (response) {
        show(data);
    }
}

getAPI(url);

function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";;
    document.getElementById("estado_nome").value = "";;
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const cidade = linha.cells[1].textContent;

    console.log(id);
    document.getElementById('id').value = id;
    document.getElementById('nome').value = cidade;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}
