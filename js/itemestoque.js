const url = "http://localhost:8080/itensestoque";


function show(itensestoque) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Quantidade em Estoque</th>
            <th scope="col">Ações</th> <!--Editar, excluir-->
        </tr>
    </thead>
    `;

    for (let itemestoque of itensestoque) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${itemestoque.itemEstoque_id}</td>
            <td>${itemestoque.itemEstoque_descricao}</td>
            <td>${itemestoque.estoque}</td>
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

