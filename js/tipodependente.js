const url = "http://localhost:8080/tipodependentes";


function show(tipodependentes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Tipo de Dependente</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let tipodependente of tipodependentes) {

        tab +=
            `
        <tr>
            <td scope="row">${tipodependente.tipoDepend_id}</td>
            <td>${tipodependente.tipoDepend_descricao}</td>
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

