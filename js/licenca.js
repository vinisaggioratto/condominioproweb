const url = "http://localhost:8080/licencas";


function show(licencas) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Número</th>
            <th scope="col">Emissor</th>
            <th scope="col">Data de Emissão</th>
            <th scope="col">Data de Validade</th>
            <th scope="col">Válido</th>
        </tr>
    </thead>
    `;

    for (let licenca of licencas) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${licenca.licenca_id}</td>
            <td>${licenca.nome}</td>
            <td>${licenca.descricao}</td>
            <td>${licenca.numero}</td>
            <td>${licenca.emissor}</td>
            <td>${formatter.format(licenca.data_emissao)}</td> 
            <td>${formatter.format(licenca.data_validade)}</td> 
            <td>${licenca.valido}</td>
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
    document.getElementById("descricao").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("emissor").value = "";
    document.getElementById("data_emissao").value = "";
    document.getElementById("data_validade").value = "";
    document.getElementById("valido").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
    return dataFormatada = (data1.getFullYear() + "-" + ((data1.getMonth() + 1)) + "-" + (data1.getDate()));
}

//NOVO FORMATADOR DE DATAS PADRÃO AMERICANO:
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
    const numero = linha.cells[3].textContent;
    const emissor = linha.cells[4].textContent;
    const data_emissao = linha.cells[5].textContent;
    const data_validade = linha.cells[6].textContent;
    const valido = linha.cells[7].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    console.log(formattedDate);

    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('numero').value = numero;
    document.getElementById('emissor').value = emissor;
    document.getElementById('data_emissao').value = formatDataUs(formatarData(data_emissao));
    document.getElementById('data_validade').value = formatDataUs(formatarData(data_validade));
    document.getElementById('valido').value = valido;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const numero = document.getElementById("numero").value;
    const emissor = document.getElementById("emissor").value;
    const data_emissao = formatDataUs(document.getElementById("data_emissao").value);
    const data_validade = formatDataUs(document.getElementById("data_validade").value);
    const valido = document.getElementById("valido").value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + nome);
    console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
    console.log("NUMERO ATUALIZADO: " + numero);
    console.log("EMISSOR ATUALIZADO: " + emissor);
    console.log("DATA EMISSAO ATUALIZADO: " + data_emissao);
    console.log("DATA VALIDADE ATUALIZADO: " + data_validade);
    console.log("VALIDO ATUALIZADO: " + valido);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            nome,
            descricao,
            numero,
            emissor,
            data_emissao,
            data_validade,
            valido,
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
                alert("Licença atualizada com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
                console.log("NUMERO ATUALIZADO: " + numero);
                console.log("EMISSOR ATUALIZADO: " + emissor);
                console.log("DATA EMISSAO ATUALIZADO: " + data_emissao);
                console.log("DATA VALIDADE ATUALIZADO: " + data_validade);
                console.log("VALIDO ATUALIZADO: " + valido);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
                console.log("NUMERO ATUALIZADO: " + numero);
                console.log("EMISSOR ATUALIZADO: " + emissor);
                console.log("DATA EMISSAO ATUALIZADO: " + data_emissao);
                console.log("DATA VALIDADE ATUALIZADO: " + data_validade);
                console.log("VALIDO ATUALIZADO: " + valido);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            nome,
            descricao,
            numero,
            emissor,
            data_emissao,
            data_validade,
            valido
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
                alert("Licença cadastrada com sucesso!");
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
                alert("Licença deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar licença. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

