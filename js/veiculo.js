const url = "http://localhost:8080/veiculos";


function show(veiculos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Placa</th>
            <th scope="col">Marca</th>
            <th scope="col">Cor</th>
            <th scope="col">Ativo</th>
            <th scope="col">Modelo</th>
            <th scope="col">Condômino</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let veiculo of veiculos) {
        tab +=
            `
        <tr>
            <td scope="row">${veiculo.veiculo_id}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.marca}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.ativo}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.condomino}</td>
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

