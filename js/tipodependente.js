const url = "http://localhost:8080/tipodependentes";


function show(tipodependentes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Tipo de Dependente</th>
        </tr>
    </thead>
    `;

    for (let tipodependente of tipodependentes) {

        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${tipodependente.tipoDepend_id}</td>
            <td>${tipodependente.descricao}</td>
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
    document.getElementById("descricao").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;

    document.getElementById('id').value = id;
    document.getElementById('descricao').value = nome;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const descricao = document.getElementById("descricao").value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            descricao,
            id
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
                alert("Tipo de dependente atualizado com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + cpf_cnpj);
                console.log("TELEFONE ATUALIZADO: " + telefone_celular);
                console.log("ESP. ATUALIZADO: " + especialidade);
                console.log("RUA ATUALIZADO: " + rua);
                console.log("BAIRRO ATUALIZADO: " + bairro);
                console.log("NUMERO ATUALIZADO: " + numero);
                console.log("CIDADE ATUALIZADO: " + cidade);
                console.log("ESTADO ATUALIZADO: " + estado);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            descricao
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
                alert("Tipo de dependente cadastrado com sucesso!");
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
                alert("Tipo de dependente deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar fornecedor. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
