const url = "http://localhost:8080/fornecedores";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(fornecedores) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf/Cnpj</th>
            <th scope="col">Telefone</th>
            <th scope="col">Especialidade</th>
            <th scope="col">Rua</th>
            <th scope="col">Bairro</th>
            <th scope="col">Número</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
        </tr>
    </thead>
    `;

    for (let fornecedor of fornecedores) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${fornecedor.fornecedor_id}</td>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cpf_cnpj}</td>
            <td>${fornecedor.telefone_celular}</td>
            <td>${fornecedor.especialidade}</td>
            <td>${fornecedor.rua}</td>
            <td>${fornecedor.bairro}</td>
            <td>${fornecedor.numero}</td>
            <td>${fornecedor.cidade.nome}</td>
            <td>${fornecedor.estado.nome}</td>
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
    document.getElementById("nome").value = "";
    document.getElementById("cpf_cnpj").value = "";
    document.getElementById("telefone_celular").value = "";
    document.getElementById("especialidade").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("cidade_nome").value = "";
    document.getElementById("estado_nome").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;
    const cpf_cnpj = linha.cells[2].textContent;
    const telefone_celular = linha.cells[3].textContent;
    const especialidade = linha.cells[4].textContent;
    const rua = linha.cells[5].textContent;
    const bairro = linha.cells[6].textContent;
    const numero = linha.cells[7].textContent;
    const cidade = linha.cells[8].textContent;
    const estado = linha.cells[9].textContent;


    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf_cnpj').value = cpf_cnpj;
    document.getElementById('telefone_celular').value = telefone_celular;
    document.getElementById('especialidade').value = especialidade;
    document.getElementById('rua').value = rua;
    document.getElementById('bairro').value = bairro;
    document.getElementById('numero').value = numero;
    document.getElementById('cidade_nome').value = cidade;
    document.getElementById('estado_nome').value = estado;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const cpf_cnpj = document.getElementById("cpf_cnpj").value;
    const telefone_celular = document.getElementById("telefone_celular").value;
    const especialidade = document.getElementById("especialidade").value;
    const rua = document.getElementById("rua").value;
    const bairro = document.getElementById("bairro").value;
    const numero = document.getElementById("numero").value;
    const cidade = document.getElementById("cidade_nome").value;
    const estado = document.getElementById("estado_nome").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            bairro,
            cidade,
            cpf_cnpj,
            especialidade,
            estado,
            nome,
            numero,
            rua,
            telefone_celular,
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
                alert("Fornecedor atualizado com sucesso!");
                getAPI(url);

            } else {
                alert("Erro ao atualizar os dados.");

            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            bairro,
            cidade,
            cpf_cnpj,
            especialidade,
            estado,
            nome,
            numero,
            rua,
            telefone_celular
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
                alert("Fornecedor cadastrado com sucesso!");
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
                alert("Fornecedor deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar fornecedor. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})