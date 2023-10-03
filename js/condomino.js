const url = "http://localhost:8080/condomino";


function show(condominos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Proprietário</th>
            <th scope="col">Morador</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let condomino of condominos) {
        tab +=
            `
        <tr>
            <td scope="row">${condomino.condomino_id}</td>
            <td>${condomino.nome}</td>
            <td>${condomino.cpf}</td>
            <td>${condomino.rg}</td>
            <td>${condomino.telefone_celular}</td>
            <td>${condomino.proprietario}</td>
            <td>${condomino.morador}</td>
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

