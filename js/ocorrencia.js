const url = "http://localhost:8080/ocorrencias";

//PEGAR OS DADOS DO DB E MOSTRAR NA TABELA INICIAL
function show(ocorrencias) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data Ocorrência</th>
            <th scope="col">Síndico</th>
            <th scope="col">Condômino</th>
        </tr>
    </thead>
    `;

    for (let ocorrencia of ocorrencias) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${ocorrencia.id}</td>
            <td>${ocorrencia.nome}</td>
            <td>${ocorrencia.descricao}</td>
            <td>${formatter.format(ocorrencia.data_ocorrencia)}</td> 
            <td>${ocorrencia.sindico.nome}</td>
            <td>${ocorrencia.condomino.nome}</td>
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
    document.getElementById("descricao").value = "";
    document.getElementById("data_ocorrencia").value = "";
    document.getElementById("select_sindico").value = "";
    var inputsindico = document.querySelector('#select_sindico');
    inputsindico.disabled = false;
    document.getElementById("select-condomino").value = "";
    var inputcondomino = document.querySelector('#select-condomino');
    inputcondomino.disabled = false;
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//FORMATAR DATA BÁSICO
function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
    return dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
}

//FORMATADOR DE DATAS PADRÃO AMERICANO QUE EXIBE OS NUMEROS 0 - COMPLEMENTA O formatarData:
function formatDataUs(stringData) {
    const partes_data = stringData.split("-");
    let dia = partes_data[2].padStart(2, "0");
    let mes = partes_data[1].padStart(2, "0");
    let ano = partes_data[0];
    const data = new Date(`${ano}-${mes}-${dia}`);
    data.setDate(data.getDate() + 1);
    const diaFormatado = String(data.getDate()).padStart(2, "0");
    const mesFormatado = String(data.getMonth() + 1).padStart(2, "0");
    const anoFormatado = data.getFullYear();
    const data_formatada = `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
    return data_formatada;
}

//PEGAR DADOS DA LINHA DA TABELA E MOSTRAR NO FORMULÁRIO
function preencherFormulario(linha) {
    const id = linha.cells[0].textContent;
    const nome = linha.cells[1].textContent;
    const descricao = linha.cells[2].textContent;
    const data_ocorrencia = linha.cells[3].textContent;
    const select_sindico = linha.cells[4].textContent;
    const select_condomino = linha.cells[5].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('data_ocorrencia').value = formatDataUs(formatarData(data_ocorrencia));
    document.getElementById('select_sindico').value = select_sindico;
    var inputsindico = document.querySelector('#select_sindico');
    inputsindico.disabled = true;
    document.getElementById('select-condomino').value = select_condomino;
    var inputcondomino = document.querySelector('#select-condomino');
    inputcondomino.disabled = true;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const data_ocorrencia = formatDataUs(document.getElementById("data_ocorrencia").value);
    const sindico = document.getElementById("select_sindico").value;
    const condomino = document.getElementById("select-condomino").value;

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0
        const data = {
            nome,
            descricao,
            data_ocorrencia,
            sindico,
            condomino,
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
                alert("Ocorrência atualizada com sucesso!");
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
            descricao,
            data_ocorrencia,
            sindico,
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
                alert("Ocorrência cadastrada com sucesso!");
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
                alert("Ocorrência deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar ocorrência. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

