const url = "http://localhost:8080/fornecedores";


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
    const cpfcnpj = linha.cells[2].textContent;
    const telefone_celular = linha.cells[3].textContent;
    const especialidade = linha.cells[4].textContent;
    const rua = linha.cells[5].textContent;
    const bairro = linha.cells[6].textContent;
    const numero = linha.cells[7].textContent;
    const cidade = linha.cells[8].textContent;
    const estado = linha.cells[9].textContent;


    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf_cnpj').value = cpfcnpj;
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
    const cpfcnpj = document.getElementById("cpf_cnpj").value;
    const telefone_celular = document.getElementById("telefone_celular").value;
    const especialidade = document.getElementById("especialidade").value;
    const rua = document.getElementById("rua").value;
    const bairro = document.getElementById("bairro").value;
    const numero = document.getElementById("numero").value;
    const cidade = document.getElementById("cidade_nome").value;
    const estado = document.getElementById("estado_nome").value;
    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + nome);
    console.log("CPF ATUALIZADO: " + cpfcnpj);
    console.log("TELEFONE ATUALIZADO: " + telefone_celular);
    console.log("ESP. ATUALIZADO: " + especialidade);
    console.log("RUA ATUALIZADO: " + rua);
    console.log("BAIRRO ATUALIZADO: " + bairro);
    console.log("NUMERO ATUALIZADO: " + numero);
    console.log("CIDADE ATUALIZADO: " + cidade);
    console.log("ESTADO ATUALIZADO: " + estado);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome,
            cpfcnpj,
            telefone_celular,
            especialidade,
            rua,
            bairro,
            numero,
            cidade,
            estado
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
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + cpfcnpj);
                console.log("TELEFONE ATUALIZADO: " + telefone_celular);
                console.log("ESP. ATUALIZADO: " + especialidade);
                console.log("RUA ATUALIZADO: " + rua);
                console.log("BAIRRO ATUALIZADO: " + bairro);
                console.log("NUMERO ATUALIZADO: " + numero);
                console.log("CIDADE ATUALIZADO: " + cidade);
                console.log("ESTADO ATUALIZADO: " + estado);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + cpfcnpj);
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
            nome,
            cpfcnpj,
            telefone_celular,
            especialidade,
            rua,
            bairro,
            numero,
            cidade,
            estado
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

