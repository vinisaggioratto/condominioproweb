const url = "http://localhost:8080/saidasfinanceiro";


function show(saidasfinanceiras) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Nota Fiscal</th>
            <th scope="col">Parcelamento</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let saidasfinanceiro of saidasfinanceiras) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${saidasfinanceiro.saidaPag_id}</td>
            <td>${saidasfinanceiro.fornecedor}</td>
            <td>${saidasfinanceiro.saidaPag_descricao}</td>
            <td>${saidasfinanceiro.valor}</td>
            <td>${formatter.format(saidasfinanceiro.data_operacao)}</td> 
            <td>${saidasfinanceiro.nota_fiscal}</td>
            <td>${saidasfinanceiro.parcelamento}</td>
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

