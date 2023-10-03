const url = "http://localhost:8080/entradaestoque";


function show(entradasestoque) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Ações</th> <!--Editar, excluir-->
        </tr>
    </thead>
    `;

    for (let entradaestoque of entradasestoque) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${entradaestoque.entradaEstoque_id}</td>
            <td>${entradaestoque.itemEstoque}</td>
            <td>${entradaestoque.entradaEstoque_descricao}</td>
            <td>${entradaestoque.quantidade}</td>
            <td>${entradaestoque.valor_unitario}</td>
            <td>${formatter.format(entradaestoque.data_entrada)}</td> 
            <td>${entradaestoque.fornecedor}</td>
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

