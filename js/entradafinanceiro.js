const url = "http://localhost:8080/entradafinanceiro";


function show(financeiroentradas) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Parcelamento</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let financeiroentrada of financeiroentradas) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${financeiroentrada.recebCond_id}</td>
            <td>${financeiroentrada.condomino}</td>
            <td>${financeiroentrada.recebCond_descricao}</td>
            <td>${financeiroentrada.valor}</td>
            <td>${formatter.format(financeiroentrada.data_operacao)}</td> 
            <td>${financeiroentrada.parcelamento}</td>
            <td><i class="bi bi-pencil-square"></i><i class="bi bi-trash3-fill"></i></td>
        </tr>
        `; /*<td>${financeiroentrada.data_operacao}</td> */
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

