const url = "http://localhost:8080/pais";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(pais) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">País</th>
        </tr>
    </thead>
    `;

    for (let p of pais) {
        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${p.id}</td>
            <td>${p.nome}</td>
        </tr>
        `;
    }

    document.getElementById("bodytabela").innerHTML = tab;
}

//CARREGA OS DADOS DO BACKEND E DISPONIBILIZA PARA SER EXIBIDO NA TABELA
async function getAPI(url) {
    const response = await fetch(url, { method: "GET" });

    data = await response.json();

    if (response) {
        show(data);
    }
}

getAPI(url);

//LIMPAR OS CAMPOS
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar'
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const pais = linha.cells[1].textContent;

    document.getElementById('id').value = id;
    document.getElementById('nome').value = pais;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar'
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            id,
            nome
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
                alert("País atualizado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao atualizar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            nome
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
                alert("País cadastrado com sucesso!");
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

    
                const response = await fetch(url + "/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
    
                if (response.ok) {
                    alert("Apartamento deletado com sucesso!");
                    getAPI(url);
                } else {
                    alert("Erro ao deletar apartamento. Confira se não existe vínculo.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
    })

