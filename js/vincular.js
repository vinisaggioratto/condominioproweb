const url = "http://localhost:8080/vincular";


function show(vincular) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Apartamento</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Data de Saída</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let vinc of vincular) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${vinc.id}</td>
            <td>${vinc.condomino}</td>
            <td>${vinc.apartamento}</td>
            <td>${formatter.format(vinc.data_entrada)}</td> 
            <td>${formatter.format(vinc.data_saida)}</td> 
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

