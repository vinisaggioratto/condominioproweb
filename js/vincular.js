const url = "http://localhost:8080/vincular";


function show(vincular) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Apartamento</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Data de Saída</th>
        </tr>
    </thead>
    `;

    for (let vinc of vincular) {

        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        tab +=
            `

        <tr onclick="preencherFormulario(this)">
            <td scope="row">${vinc.id}</td>
            <td>${vinc.condomino.nome}</td>
            <td>${vinc.apartamento.numero}</td>
            <td>${formatter.format(vinc.data_entrada)}</td> 
            <td>${formatter.format(vinc.data_saida)}</td> 
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
    document.getElementById("select-condomino").value = "";
    document.getElementById("select_apartamento").value = "";
    document.getElementById("data_entrada").value = "";
    document.getElementById("data_saida").value = "";
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
    const select_condomino = linha.cells[1].textContent;
    const select_apartamento = linha.cells[2].textContent;
    const data_entrada = linha.cells[3].textContent;
    const data_saida = linha.cells[4].textContent;

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    console.log(formattedDate);

    document.getElementById('id').value = id;
    document.getElementById('select-condomino').value = select_condomino;
    document.getElementById('select_apartamento').value = select_apartamento;
    document.getElementById('data_entrada').value = formatDataUs(formatarData(data_entrada));
    document.getElementById('data_saida').value = formatDataUs(formatarData(data_saida));
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const condomino = document.getElementById("select-condomino").value;
    const apartamento = document.getElementById("select_apartamento").value;
    const data_entrada = document.getElementById("data_entrada").value;
    const data_saida = document.getElementById("data_saida").value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("CONDOMINO ATUALIZADO: " + condomino);
    console.log("APARTAMENTO ATUALIZADO: " + apartamento);
    console.log("DATA ENTRADA ATUALIZADO: " + data_entrada);
    console.log("DATA SAÍDA ATUALIZADO: " + data_saida);
    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            condomino,
            apartamento,
            data_entrada,
            data_saida,
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
                alert("Vinculação atualizada com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("CONDOMINO ATUALIZADO: " + condomino);
                console.log("APARTAMENTO ATUALIZADO: " + apartamento);
                console.log("DATA ENTRADA ATUALIZADO: " + data_entrada);
                console.log("DATA SAÍDA ATUALIZADO: " + data_saida);
                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("CONDOMINO ATUALIZADO: " + condomino);
                console.log("APARTAMENTO ATUALIZADO: " + apartamento);
                console.log("DATA ENTRADA ATUALIZADO: " + data_entrada);
                console.log("DATA SAÍDA ATUALIZADO: " + data_saida);
                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            condomino,
            apartamento,
            data_entrada,
            data_saida
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
                alert("Vinculação cadastrada com sucesso!");
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
                alert("Vinculação deletada com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})
