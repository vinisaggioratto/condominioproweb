const url = "http://localhost:8080/pais";


function show(pais) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">País</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let p of pais) {
        tab +=
            `
        <tr>
            <td scope="row">${p.pais_id}</td>
            <td>${p.pais_nome}</td>
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

