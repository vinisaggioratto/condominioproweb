const url = "http://localhost:8080/veiculos";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
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
            <td scope="row">${veiculo.id}</td>
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

//CARREGA OS DADOS DO BACKEND E DISPONIBILIZA PARA SER EXIBIDO NA TABELA
async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });
    var data = await response.json();
    
    if (response) {
        show(data);
    }
}

getAPI(url);

//LIMPAR OS CAMPOS
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("ativo").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
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
    const ativo = document.getElementById('ativo').value;
    const modelo = document.getElementById('modelo').value;
    const condomino = document.getElementById('select-condomino').value;

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

            } else {
                alert("Erro ao atualizar os dados.");

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

//DELETAR OS DADOS SELECIONADOS
document.getElementById("btn-excluir").addEventListener("click", async () => {

    //EXIBE UM ALERTA PEDINDO CONFIRMAÇÃO PARA EXCLUIR OS DADOS.

    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {

        try {
            const id = document.getElementById("id").value;

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
