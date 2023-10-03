const url = "http://localhost:8080/fornecedores";


function show(fornecedores) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf/Cnpj</th>
            <th scope="col">Telefone</th>
            <th scope="col">Especialidade</th>
            <th scope="col">Rua</th>
            <th scope="col">Bairro</th>
            <th scope="col">Número</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let fornecedor of fornecedores) {
        tab +=
            `
        <tr>
            <td scope="row">${fornecedor.fornecedor_id}</td>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cpfCnpj}</td>
            <td>${fornecedor.telefone_celular}</td>
            <td>${fornecedor.especialidade}</td>
            <td>${fornecedor.rua}</td>
            <td>${fornecedor.bairro}</td>
            <td>${fornecedor.numero}</td>
            <td>${fornecedor.cidade}</td>
            <td>${fornecedor.estado}</td>
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

