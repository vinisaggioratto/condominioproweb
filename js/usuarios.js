const url = "http://localhost:8080/usuario";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(usuarios) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Usuário</th>
            <th scope="col">Perfil</th>
        </tr>
    </thead>
    `;

    for (let usuario of usuarios) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${usuario.id}</td>
            <td>${usuario.login}</td>
            <td>${usuario.perfil}</td>
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
    document.getElementById("usuario").value = "";
    var inputusuario = document.querySelector('#usuario');
    inputusuario.disabled = false;
    document.getElementById("senha").value = "";
    document.getElementById("select_perfil").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const usuario = linha.cells[1].textContent;
    const perfil = linha.cells[2].textContent;

    document.getElementById('id').value = id;
    document.getElementById('usuario').value = usuario;
    var inputusuario = document.querySelector('#usuario');
    inputusuario.disabled = true;
    document.getElementById("senha").value = "";
    document.getElementById('select_perfil').value = perfil;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO 
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const login = document.getElementById("usuario").value;
    const password = document.getElementById("senha").value;
    const perfil = document.getElementById("select_perfil").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            login,
            password,
            perfil
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
                alert("Usuário atualizado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            login,
            password,
            perfil
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
                alert("Usuário cadastrado com sucesso!");
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
                alert("Usuário deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar usuário. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
