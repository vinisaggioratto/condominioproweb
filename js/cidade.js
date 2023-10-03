const url = "http://localhost:8080/cidades";


function show(cidades) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let cidade of cidades) {
        tab +=
            `
        <tr>
            <td scope="row">${cidade.cidade_id}</td>
            <td>${cidade.cidade_nome}</td>
            <td>${cidade.estado}</td>
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

