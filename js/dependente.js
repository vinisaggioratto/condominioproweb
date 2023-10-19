const url = "http://localhost:8080/dependentes";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(dependentes) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Morador</th>
            <th scope="col">Cond. Vinculado</th>
            <th scope="col">Tipo Dep.</th>
        </tr>
    </thead>
    `;

    for (let dependente of dependentes) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${dependente.dependente_id}</td>
            <td>${dependente.nome}</td>
            <td>${dependente.cpf}</td>
            <td>${dependente.rg}</td>
            <td>${dependente.telefone_celular}</td>
            <td>${dependente.morador}</td>
            <td>${dependente.condomino.nome}</td>
            <td>${dependente.tipoDependente.descricao}</td>
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

    document.getElementById('cpf').value = "";
    var inputcpf = document.querySelector('#cpf');
    inputcpf.disabled = false;

    document.getElementById('rg').value = "";
    document.getElementById("telefone_celular").value = "";
    document.getElementById("select_morador").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById("select_tipo_dep").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;
    const cpf = linha.cells[2].textContent;
    const rg = linha.cells[3].textContent;
    const telefone_celular = linha.cells[4].textContent;
    const select_morador = linha.cells[5].textContent;
    const select_condomino = linha.cells[6].textContent;
    const select_tipo_dep = linha.cells[7].textContent;

    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf').value = cpf;
    var inputcpf = document.querySelector('#cpf');
    inputcpf.disabled = true;
    document.getElementById('rg').value = rg;
    document.getElementById('telefone_celular').value = telefone_celular;
    document.getElementById('select_morador').value = select_morador;
    document.getElementById('select-condomino').value = select_condomino;
    document.getElementById('select_tipo_dep').value = select_tipo_dep;

    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const telefone_celular = document.getElementById("telefone_celular").value;
    const morador = document.getElementById("select_morador").value;
    const condomino = document.getElementById("select-condomino").value;
    const tipoDependente = document.getElementById("select_tipo_dep").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome,
            cpf,
            rg,
            telefone_celular,
            morador,
            condomino,
            tipoDependente
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
                alert("Dependente atualizado com sucesso!");
                getAPI(url);

            } else {
                alert("Erro ao atualizar os dados.");

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
            morador,
            condomino,
            tipoDependente
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
                alert("Dependente cadastrado com sucesso!");
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
                alert("Dependente deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar dependente. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

