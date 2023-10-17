const url = "http://localhost:8080/avisos";
const url2 = "http://localhost:8080/sindico";

function show(avisos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data do Aviso</th>
            <th scope="col">Síndico</th>
        </tr>
    </thead>
    `;

    for (let aviso of avisos) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${aviso.id}</td>
            <td>${aviso.nome}</td>
            <td>${aviso.descricao}</td>
            <td>${formatter.format(aviso.data_aviso)}</td> 
            <td>${aviso.sindico.condomino.nome}</td>
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
    document.getElementById("data_aviso").value = "";
    document.getElementById("select_sindico").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

function formatarData(datas) {

    const data = new Date(datas.split('/').reverse().join('-'));
    const dataAmericana = data.toLocaleDateString('en-US');

    let data1 = new Date(dataAmericana);
    //let dataFormatada = "";
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
    const data_aviso = linha.cells[3].textContent;
    const sindico = linha.cells[4].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('data_aviso').value = formatDataUs(formatarData(data_aviso));
    document.getElementById('select_sindico').value = sindico;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const data_aviso = formatDataUs(document.getElementById("data_aviso").value);
    const sindico = document.getElementById("select_sindico").value;
    //const condomino = document.getElementById("select_sindico").value;
    //let teste = parseInt(1);
    //const sindico = document.getElementById("select_sindico").value  = teste;
    
    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + sindico);
    console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
    console.log("DATA AVISO ATUALIZADO: " + data_aviso);
    console.log("SINDICO ATUALIZADO: " + sindico);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0
        compararSindico();
        const data = {
            nome,
            descricao,
            data_aviso,
            sindico,
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
                alert("Aviso atualizado com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
                console.log("DATA AVISO ATUALIZADO: " + data_aviso);
                console.log("SINDICO ATUALIZADO: " + sindico);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("DESCRIÇÃO ATUALIZADO: " + descricao);
                console.log("DATA AVISO ATUALIZADO: " + data_aviso);
                console.log("SINDICO ATUALIZADO: " + sindico);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            nome,
            descricao,
            data_aviso,
            sindico
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
                alert("Aviso cadastrado com sucesso!");
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
                alert("Aviso deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar aviso. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

//filtrar o id do sindico

getAPI2(url2);

async function getAPI2(url2) {
    const response = await fetch(url2, { method: "GET" });

    var data1 = await response.json();
    console.log(data1);
    
    if (response) {
        compararSindico(data1);
    }
}


function compararSindico(sindicos){

    const sindicoSelect = document.getElementById("select_sindico").value;
    for (let sindico of sindicos) {
        let sindNome = sindico.nome;
        let sindCodigo = 0;
        if(sindNome == sindicoSelect){
            alert("Código do síndico selecionado: " + sindico.id);
            sindCodigo = sindico.id;
        }
    }
}

