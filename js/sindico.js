const url = "http://localhost:8080/sindico";


function show(sindicos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final Prevista</th>
            <th scope="col">Data Final</th>
            <th scope="col">Ativo</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let sindico of sindicos) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);

        tab +=
            `
        <tr>
            <td scope="row">${sindico.sindico_id}</td>
            <td>${sindico.condomino}</td>
            <td>${formatter.format(sindico.data_inicial)}</td>
            <td>${formatter.format(sindico.data_final_prevista)}</td>
            <td>${formatter.format(sindico.data_final)}</td>
            <td>${sindico.ativo}</td>
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

