const url = "http://localhost:8080/ocorrencias";


function show(ocorrencias) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data Ocorrência</th>
            <th scope="col">Síndico</th>
            <th scope="col">Condômino</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let ocorrencia of ocorrencias) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${ocorrencia.ocorrencia_id}</td>
            <td>${ocorrencia.ocorrencia_nome}</td>
            <td>${ocorrencia.ocorrencia_descricao}</td>
            <td>${formatter.format(ocorrencia.data_ocorrencia)}</td> 
            <td>${ocorrencia.sindico}</td>
            <td>${ocorrencia.condomino}</td>
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

