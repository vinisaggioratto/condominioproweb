const url = "http://localhost:8080/dependentes";


function show(dependentes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Morador</th>
            <th scope="col">Cond. Vinculado</th>
            <th scope="col">Tipo Dep.</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let dependente of dependentes) {
        tab +=
            `
        <tr>
            <td scope="row">${dependente.dependente_id}</td>
            <td>${dependente.nome}</td>
            <td>${dependente.cpf}</td>
            <td>${dependente.rg}</td>
            <td>${dependente.telefone_celular}</td>
            <td>${dependente.morador}</td>
            <td>${dependente.condomino}</td>
            <td>${dependente.tipoDependente}</td>
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

