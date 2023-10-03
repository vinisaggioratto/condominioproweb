const url = "http://localhost:8080/avisos";


function show(avisos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data do Aviso</th>
            <th scope="col">Síndico</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    `;

    for (let aviso of avisos) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr>
            <td scope="row">${aviso.aviso_id}</td>
            <td>${aviso.aviso_nome}</td>
            <td>${aviso.aviso_descricao}</td>
            <td>${formatter.format(aviso.data_aviso)}</td> 
            <td>${aviso.sindico}</td>
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

