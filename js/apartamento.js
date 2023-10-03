const url = "http://localhost:8080/apartamentos";


function show(apartamentos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Número</th>
            <th scope="col">Andar</th>
            <th scope="col">Bloco</th>
            <th scope="col">Status</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let apartamento of apartamentos) {
        tab +=
            `
        <tr>
            <td scope="row">${apartamento.apartamento_id}</td>
            <td>${apartamento.numero}</td>
            <td>${apartamento.andar}</td>
            <td>${apartamento.bloco}</td>
            <td>${apartamento.status}</td>
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

