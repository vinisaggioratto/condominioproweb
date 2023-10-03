const url = "http://localhost:8080/apartamentos";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
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


//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO

document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const numero = document.getElementById("numero").value;
    const andar = document.getElementById("andar").value;
    const bloco = document.getElementById("bloco").value;
    const status = document.getElementById("select-cadastro").value;

    const data = {
        numero,
        andar,
        bloco,
        status
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Dados cadastrados com sucesso!");
            getAPI(url);
        } else {
            alert("Erro ao cadastrar os dados.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});


//LIMPAR OS CAMPOS


function limparCampos() {
    document.getElementById("numero").value = "";
    document.getElementById("andar").value = "";;
    document.getElementById("bloco").value = "";;
}

