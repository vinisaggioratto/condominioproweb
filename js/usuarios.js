const url = "http://localhost:8080/login";


function show(usuarios) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Usuário</th>
            <th scope="col">Condômino</th>
        </tr>
    </thead>
    `;

    for (let usuario of usuarios) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${usuario.login_id}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.condomino.nome}</td>
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
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const usuario = linha.cells[1].textContent;
    var condomino = linha.cells[2].textContent;


    console.log(id);
    document.getElementById('id').value = id;
    document.getElementById('usuario').value = usuario;
    document.getElementById('select-condomino').value = condomino;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
    //teste();
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO 
//ESTÁ COM ERRO NÃO CADASTRA NEM ALTERA
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const condomino = document.getElementById("select-condomino").value;
    console.log("ID - " + id)

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            usuario,
            senha,
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
            usuario,
            senha,
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


//EXIBE UM ALERTA PEDINDO CONFIRMAÇÃO PARA EXCLUIR OS DADOS.
    //FUNCIONANDO
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
                alert("Usuário deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar cidade. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
