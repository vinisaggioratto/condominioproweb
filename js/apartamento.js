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

        </tr>
    </thead>
    `;

    for (let apartamento of apartamentos) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${apartamento.id}</td>
            <td>${apartamento.numero}</td>
            <td>${apartamento.andar}</td>
            <td>${apartamento.bloco}</td>
            <td>${apartamento.status}</td>
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
    document.getElementById("numero").value = "";
    document.getElementById("andar").value = "";
    document.getElementById("bloco").value = "";
    document.getElementById("id").value = "",
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar'
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const numero = linha.cells[1].textContent;
    const andar = linha.cells[2].textContent;
    const bloco = linha.cells[3].textContent;
    var stats = linha.cells[4].textContent;

    document.getElementById('id').value = id;
    document.getElementById('numero').value = numero;
    document.getElementById('andar').value = andar;
    document.getElementById('bloco').value = bloco;
    document.getElementById('select-cadastro').value = stats;

    document.getElementById('btn-cadastrar').textContent = 'Atualizar'
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const numero = document.getElementById("numero").value;
    const andar = document.getElementById("andar").value;
    const bloco = document.getElementById("bloco").value;
    const status = document.getElementById("select-cadastro").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            numero,
            andar,
            bloco,
            status
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
                alert("Apartamento atualizado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA FAZER UM NOVO CADASTRO
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
                alert("Apartamento cadastrado com sucesso!");
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
                alert("Apartamento deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar apartamento. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})




