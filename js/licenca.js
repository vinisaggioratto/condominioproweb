const url = "http://localhost:8080/licencas";


function show(licencas) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Número</th>
            <th scope="col">Emissor</th>
            <th scope="col">Data de Emissão</th>
            <th scope="col">Data de Validade</th>
            <th scope="col">Válido</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let licenca of licencas) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${licenca.licenca_id}</td>
            <td>${licenca.licenca_nome}</td>
            <td>${licenca.licenca_descricao}</td>
            <td>${licenca.numero}</td>
            <td>${licenca.emissor}</td>
            <td>${formatter.format(licenca.data_emissao)}</td> 
            <td>${formatter.format(licenca.data_validade)}</td> 
            <td>${licenca.valido}</td>
            <td><i class="bi bi-pencil-square"></i><i class="bi bi-trash3-fill"></i></td>
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
    document.getElementById("numero").value = "";
    document.getElementById("andar").value = "";;
    document.getElementById("bloco").value = "";;
}

