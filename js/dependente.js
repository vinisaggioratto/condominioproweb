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
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("rg").value = "";
    document.getElementById("telefone_celular").value = "";
    document.getElementById("select_morador").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById("select_tipo_dep").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

