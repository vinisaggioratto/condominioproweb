const url = "http://localhost:8080/manutencoes";


function show(manutencoes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Manutenção</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final</th>
            <th scope="col">Fornecedor</th>
        </tr>
    </thead>
    `;

    for (let manutencao of manutencoes) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${manutencao.manutencao_id}</td>
            <td>${manutencao.manutencao_nome}</td>
            <td>${manutencao.manutencao_descricao}</td>
            <td>${manutencao.valor}</td>
            <td>${formatter.format(manutencao.data_inicial)}</td> 
            <td>${formatter.format(manutencao.data_final)}</td> 
            <td>${manutencao.fornecedor}</td>
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

