const url = "http://localhost:8080/login";


function show(usuarios) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Usuário</th>
            <th scope="col">Condômino</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let usuario of usuarios) {
        tab +=
            `
        <tr>
            <td scope="row">${usuario.login_id}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.condomino}</td>
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

