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
        </tr>
    </thead>
    `;

    for (let veiculo of veiculos) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${veiculo.veiculo_id}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.marca}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.ativo}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.condomino.nome}</td>
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
    document.getElementById("id").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("ativo").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("select-condomino").value = "";
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const placa = linha.cells[1].textContent;
    const marca = linha.cells[2].textContent;
    const cor = linha.cells[3].textContent;
    const ativo = linha.cells[4].textContent;
    const modelo = linha.cells[5].textContent;
    const condomino = linha.cells[6].textContent;

    document.getElementById('id').value = id;
    document.getElementById('placa').value = placa;
    document.getElementById('marca').value = marca;
    document.getElementById('cor').value = cor;
    document.getElementById('ativo').value = ativo;
    document.getElementById('modelo').value = modelo;
    document.getElementById('select-condomino').value = condomino;

    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const cor = document.getElementById('cor').value;
    const ativo = getElementById('ativo').value;
    const modelo = document.getElementById('modelo').value;
    const condomino = document.getElementById('select-condomino').value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("PLACA ATUALIZADO: " + placa);
    console.log("MARCAR ATUALIZADO: " + marca);
    console.log("COR ATUALIZADO: " + cor);
    console.log("ATIVO ATUALIZADO: " + ativo);
    console.log("MODELO ATUALIZADO: " + modelo);
    console.log("CONDOMINO ATUALIZADO: " + condomino);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            placa,
            marca,
            cor,
            ativo,
            modelo,
            condomino
        };

        try {
            const response = await fetch(url + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });
            if (response.ok) {
                alert("Veículo atualizado com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("PLACA ATUALIZADO: " + placa);
                console.log("MARCAR ATUALIZADO: " + marca);
                console.log("COR ATUALIZADO: " + cor);
                console.log("ATIVO ATUALIZADO: " + ativo);
                console.log("MODELO ATUALIZADO: " + modelo);
                console.log("CONDOMINO ATUALIZADO: " + condomino);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("PLACA ATUALIZADO: " + placa);
                console.log("MARCAR ATUALIZADO: " + marca);
                console.log("COR ATUALIZADO: " + cor);
                console.log("ATIVO ATUALIZADO: " + ativo);
                console.log("MODELO ATUALIZADO: " + modelo);
                console.log("CONDOMINO ATUALIZADO: " + condomino);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            placa,
            marca,
            cor,
            ativo,
            modelo,
            condomino
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
                alert("Veículo cadastrado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao cadastrar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
});

//DELETAR
document.getElementById("btn-excluir").addEventListener("click", async () => {

    //EXIBE UM ALERTA PEDINDO CONFIRMAÇÃO PARA EXCLUIR OS DADOS.

    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {

        try {
            const id = document.getElementById("id").value;
            console.log(id);
            console.log("ID PREENCHIDO");

            const response = await fetch(url + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                alert("Veículo deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar veículo. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
