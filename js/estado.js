const url = "http://localhost:8080/estados";

let id_pais = 0;

function show(estados) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Estado</th>
            <th scope="col">País</th>
        </tr>
    </thead>
    `;

    for (let estado of estados) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${estado.estado_id}</td>
            <td>${estado.nome}</td>
            <td>${estado.pais.nome}</td>
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

//PEGAR O ID DO PAIS
function teste(){
const url22 = "http://localhost:8080/pais";

async function pegarPais(url) {
    const response = await fetch(url, { method: "GET" });

    var data1 = await response.json();

    let valor = document.getElementById("pais_nome").value;

    for (let pais of data1) {
        let paisNome = pais.nome;
        if(paisNome == valor){
            let paisId = pais.pais_id;
            console.log("Nome correspondente: " + paisNome + " - ID: " + paisId)
            document.getElementById("texto_oculto").value = paisId;
        }

    }
}
pegarPais(url22);
}




//LIMPAR CAMPOS
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("pais_nome").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const estado = linha.cells[1].textContent;

    console.log(id_pais);
    document.getElementById('id').value = id;
    document.getElementById('nome').value = estado;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const pais = document.getElementById("pais_nome").value;
    const testeSalvar = document.getElementById("texto_oculto").value;
    console.log("ID - " + id)

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome,
            pais
            //testeSalvar
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
                alert("Estado atualizado com sucesso!");
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
            pais
            //testeSalvar
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
                alert("Estado cadastrado com sucesso!");
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
                alert("Estado deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar estado. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
