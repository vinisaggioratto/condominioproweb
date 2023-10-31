const url = "http://localhost:8080/itensestoque";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(itensestoque) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Quantidade em Estoque</th>
        </tr>
    </thead>
    `;

    for (let items of itensestoque) {

        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${items.id}</td>
            <td>${items.descricao}</td>
            <td>${items.estoque}</td>
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
    document.getElementById("descricao").value = "";
    document.getElementById("estoque").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar'
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const descricao = linha.cells[1].textContent;
    const estoque = linha.cells[2].textContent;

    document.getElementById('id').value = id;
    document.getElementById('descricao').value = descricao;
    document.getElementById('estoque').value = estoque;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar'
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const descricao = document.getElementById("descricao").value;
    const estoque = document.getElementById("estoque").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            descricao,
            estoque
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
                alert("Item de estoque atualizado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            descricao,
            estoque
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
                alert("Item de estoque cadastrado com sucesso!");
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
                    alert("Item de estoque deletado com sucesso!");
                    getAPI(url);
                } else {
                    alert("Erro ao deletar item do estoque. Confira se não existe vínculo.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
    })

