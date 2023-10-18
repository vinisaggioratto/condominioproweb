const url = "http://localhost:8080/sindico";


function show(sindicos) {
    let tab =
        `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final Prevista</th>
            <th scope="col">Data Final</th>
            <th scope="col">Ativo</th>
        </tr>
    </thead>
    `;

    for (let sindico of sindicos) {
        /**/
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
        const formattedDate = formatter.format(date);
        console.log(formattedDate);
        let teste = sindico.nome;  
        let data_i = formatter.format(sindico.data_inicial);
        let data_fp = formatter.format(sindico.data_final_prevista);
        let data_f = formatter.format(sindico.data_final);

        tab +=
            `
        <tr onclick="preencherFormulario(this)">
            <td scope="row">${sindico.sindico_id}</td>
            <td>${teste}</td>
            <td>${data_i}</td>
            <td>${data_fp}</td>
            <td>${data_f}</td>
            <td>${sindico.ativo}</td>
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

//
function limparCampos() {
    document.getElementById("id").value = "";
    document.getElementById("select-condomino").value = "";
    document.getElementById("data_inicial").value = "";
    document.getElementById("data_final_prevista").value = "";
    document.getElementById("data_final").value = "";
    document.getElementById("select_cadastro2").value = "";
    document.getElementById('btn-cadastrar').textContent = 'Cadastrar';
}

//converte para o padrão americano funcionando
/**/

/*PESQUISAR A BIBLIOTECA MOMENT.JS 

VAI MOSTRAR A DATA COM O FUSOHORARIO CORRETO.
const data = moment(data_inicial, 'DD/MM/YYYY').utcOffset('-03:00');
const dataAmericana = data.format('YYYY-MM-DD');

*/
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
    const condomino = linha.cells[1].textContent;
    const data_inicial = linha.cells[2].textContent;
    const data_final_prevista = linha.cells[3].textContent;
    const data_final = linha.cells[4].textContent;
    const select_cadastro = linha.cells[5].textContent;

    console.log("Data inicial valor original: " + data_inicial);

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);
    console.log(formattedDate);


    document.getElementById('id').value = id;
    document.getElementById('select-condomino').value = condomino;
    document.getElementById('data_inicial').value = formatDataUs(formatarData(data_inicial));
    document.getElementById('data_final_prevista').value = formatDataUs(formatarData(data_final_prevista));
    document.getElementById('data_final').value = formatDataUs(formatarData(data_final));
    document.getElementById('select_cadastro2').value = select_cadastro;
    document.getElementById('btn-cadastrar').textContent = 'Atualizar';
}

//ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO
document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("select-condomino").value;
    const data_inicial = formatDataUs(document.getElementById("data_inicial").value);
    const data_final_prevista = formatDataUs(document.getElementById("data_final_prevista").value);
    const data_final = formatDataUs(document.getElementById("data_final").value);
    const ativo = document.getElementById("select_cadastro2").value;

    console.log("Dados para envio:")
    console.log("-----");
    console.log("ID ATUALIZADO: " + id);
    console.log("NOME ATUALIZADO: " + condomino_nome);
    console.log("CPF ATUALIZADO: " + data_inicial);
    console.log("TELEFONE ATUALIZADO: " + data_final_prevista);
    console.log("ESP. ATUALIZADO: " + data_final);
    console.log("RUA ATUALIZADO: " + ativo);

    console.log("-----");

    if (id > 0) { //ENVIA PARA ATUALIZAR OS DADOS SE O ID FOR MAIOR QUE 0

        const data = {
            ativo,
            nome,
            data_final,
            data_final_prevista,
            data_inicial,
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
                alert("Síndico atualizado com sucesso!");
                getAPI(url);
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + data_inicial);
                console.log("TELEFONE ATUALIZADO: " + data_final_prevista);
                console.log("ESP. ATUALIZADO: " + data_final);
                console.log("RUA ATUALIZADO: " + ativo);

                console.log("-----");
            } else {
                alert("Erro ao atualizar os dados.");
                console.log("-----");
                console.log("ID ATUALIZADO: " + id);
                console.log("NOME ATUALIZADO: " + nome);
                console.log("CPF ATUALIZADO: " + data_inicial);
                console.log("TELEFONE ATUALIZADO: " + data_final_prevista);
                console.log("ESP. ATUALIZADO: " + data_final);
                console.log("RUA ATUALIZADO: " + ativo);

                console.log("-----");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    } else { //ENVIA OS DADOS DO FORMULÁRIO PARA CADASTRO
        const data = {
            ativo,
            nome,
            data_final,
            data_final_prevista,
            data_inicial
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
                alert("Síndico cadastrado com sucesso!");
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
                alert("Fornecedor deletado com sucesso!");
                getAPI(url);
            } else {
                alert("Erro ao deletar fornecedor. Confira se não existe vínculo.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
})

