const url = "http://localhost:8080/cidades";

function show(cidades) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
        </tr>
    </thead>
    `;

    for (let cidade of cidades) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${cidade.cidade_id}</td>
            <td>${cidade.nome}</td>
            <td>${cidade.estado.nome}</td>
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
    document.getElementById("estado_nome").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const cidade = linha.cells[1].textContent;
    var estado = linha.cells[2].textContent;


    console.log(id);
    document.getElementById('id').value = id;
    document.getElementById('nome').value = cidade;
    document.getElementById('estado_nome').value = estado;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
    //teste();
}


/*
//PEGAR O ID DO ESTADO
function teste(){
    const url1 = "http://localhost:8080/estados";
    
    async function pegarEstado(url) {
        const response = await fetch(url, { method: "GET" });
    
        let data = await response.json();
    
        let valor = document.getElementById("estado_nome").value;
    
        for (let estado of data) {
            let estadoNome = estado.nome;
            if(estadoNome == valor){
                let estadoId = estado.estado_id;
                console.log("Nome correspondente: " + estadoNome + " - ID: " + estadoId)
                document.getElementById("idestado").value = estadoId;
            } 
        }
    }
    pegarEstado(url1);
    }
*/

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO 
//ESTÁ COM ERRO NÃO CADASTRA NEM ALTERA
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const estado = document.getElementById("estado_nome").value;
    console.log("ID - " + id)

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome,
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
                alert("Cidade atualizada com sucesso!");
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
                alert("Cidade cadastrada com sucesso!");
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
                alert("Cidade deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar cidade. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})