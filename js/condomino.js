const url = "http://localhost:8080/condomino";


function show(condominos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Proprietário</th>
            <th scope="col">Morador</th>
        </tr>
    </thead>
    `;

    for (let condomino of condominos) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${condomino.condomino_id}</td>
            <td>${condomino.nome}</td>
            <td>${condomino.cpf}</td>
            <td>${condomino.rg}</td>
            <td>${condomino.telefone_celular}</td>
            <td>${condomino.proprietario}</td>
            <td>${condomino.morador}</td>
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
    document.getElementById('cpf').value = "";
    var inputcpf = document.querySelector('#cpf');
    inputcpf.disabled = false;
    document.getElementById("rg").value = "";
    document.getElementById("telefone_celular").value = "";
    document.getElementById("proprietario").value = "";
    document.getElementById("morador").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;
    const cpf = linha.cells[2].textContent;
    const rg = linha.cells[3].textContent;
    const telefone_celular = linha.cells[4].textContent;
    const proprietario = linha.cells[5].textContent;
    const morador = linha.cells[6].textContent;

    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf').value = cpf;
    var inputcpf = document.querySelector('#cpf');
    inputcpf.disabled = true;
    document.getElementById('rg').value = rg;
    document.getElementById('telefone_celular').value = telefone_celular;
    document.getElementById('proprietario').value = proprietario;
    document.getElementById('morador').value = morador;

    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const telefone_celular = document.getElementById("telefone_celular").value;
    const proprietario = document.getElementById("proprietario").value;
    const morador = document.getElementById("morador").value;


    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + nome);
    console.log("CPF ATUALIZADO: " + cpf);
    console.log("RG ATUALIZADO: " + rg);
    console.log("TELEFONE ATUALIZADO: " + telefone_celular);
    console.log("PROPRIETARIO ATUALIZADO: " + proprietario);
    console.log("MORADOR ATUALIZADO: " + morador);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome,
            cpf,
            rg,
            telefone_celular,
            proprietario,
            morador
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
                alert("Condômino atualizado com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + cpf);
                console.log("RG ATUALIZADO: " + rg);
                console.log("TELEFONE ATUALIZADO: " + telefone_celular);
                console.log("PROPRIETARIO ATUALIZADO: " + proprietario);
                console.log("MORADOR ATUALIZADO: " + morador);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + cpf);
                console.log("RG ATUALIZADO: " + rg);
                console.log("TELEFONE ATUALIZADO: " + telefone_celular);
                console.log("PROPRIETARIO ATUALIZADO: " + proprietario);
                console.log("MORADOR ATUALIZADO: " + morador);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            nome,
            cpf,
            rg,
            telefone_celular,
            proprietario,
            morador
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
                alert("Condômino cadastrado com sucesso!");
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
                alert("Condômino deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar condômino. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

