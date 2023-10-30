const url1 = "http://localhost:8080/cidades";
const url2 = "http://localhost:8080/estados";
const url3 = "http://localhost:8080/pais";
const url4 = "http://localhost:8080/apartamentos";
const url5 = "http://localhost:8080/usuario";
const url6 = "http://localhost:8080/fornecedores";
const url7 = "http://localhost:8080/condomino";
const url8 = "http://localhost:8080/dependentes";
const url9 = "http://localhost:8080/sindico";
const url10 = "http://localhost:8080/tipodependentes";
const url11 = "http://localhost:8080/veiculos";
const url12 = "http://localhost:8080/entradafinanceiro";
const url13 = "http://localhost:8080/saidasfinanceiro";
const url14 = "http://localhost:8080/manutencoes";
const url15 = "http://localhost:8080/licencas";
const url16 = "http://localhost:8080/avisos";
const url17 = "http://localhost:8080/ocorrencias";
const url18 = "http://localhost:8080/vincular";
const url19 = "http://localhost:8080/entradaestoque";
const url20 = "http://localhost:8080/saidasestoque";
const url21 = "http://localhost:8080/itensestoque";
////////////////////////////////////////////////////////////////
//CIDADE
function getAPI1(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="3" style="text-align: center;">CIDADES CADASTRADAS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
            </tr>
        </thead>
        `;

        for (let cidade of data) {
            tab +=
                `
            <tr>
            <td scope="row">${cidade.id}</td>
            <td>${cidade.nome}</td>
            <td>${cidade.estado.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadCidades() {
    getAPI1(url1);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//CIDADE
function getAPI2(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="3" style="text-align: center;">ESTADOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Estado</th>
            <th scope="col">País</th>
            </tr>
        </thead>
        `;

        for (let estado of data) {
            tab +=
                `
            <tr>
            <td scope="row">${estado.id}</td>
            <td>${estado.nome}</td>
            <td>${estado.pais.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadEstados() {
    getAPI2(url2);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//PAISES
function getAPI3(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="2" style="text-align: center;">PAÍSES CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">País</th>
            </tr>
        </thead>
        `;

        for (let pais of data) {
            tab +=
                `
            <tr>
            <td scope="row">${pais.id}</td>
            <td>${pais.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadPais() {
    getAPI3(url3);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//APARTAMENTOS
function getAPI4(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="5" style="text-align: center;">APARTAMENTOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Número</th>
            <th scope="col">Andar</th>
            <th scope="col">Bloco</th>
            <th scope="col">Status</th>
            </tr>
        </thead>
        `;

        for (let apartamento of data) {
            tab +=
                `
            <tr>
            <td scope="row">${apartamento.id}</td>
            <td>${apartamento.numero}</td>
            <td>${apartamento.andar}</td>
            <td>${apartamento.bloco}</td>
            <td>${apartamento.status}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadApto() {
    getAPI4(url4);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//USUARIOS
function getAPI5(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="3" style="text-align: center;">USUÁRIOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Usuário</th>
            <th scope="col">Perfil</th>
            </tr>
        </thead>
        `;

        for (let usuario of data) {
            tab +=
                `
            <tr>
            <td scope="row">${usuario.id}</td>
            <td>${usuario.login}</td>
            <td>${usuario.perfil}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadUsuarios() {
    getAPI5(url5);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//FORNECEDORES
function getAPI6(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="10" style="text-align: center;">FORNECEDORES CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf/Cnpj</th>
            <th scope="col">Telefone</th>
            <th scope="col">Especialidade</th>
            <th scope="col">Rua</th>
            <th scope="col">Bairro</th>
            <th scope="col">Número</th>
            <th scope="col">Cidade</th>
            <th scope="col">Estado</th>
            </tr>
        </thead>
        `;

        for (let fornecedor of data) {
            tab +=
                `
            <tr>
            <td scope="row">${fornecedor.id}</td>
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cpf_cnpj}</td>
            <td>${fornecedor.telefone_celular}</td>
            <td>${fornecedor.especialidade}</td>
            <td>${fornecedor.rua}</td>
            <td>${fornecedor.bairro}</td>
            <td>${fornecedor.numero}</td>
            <td>${fornecedor.cidade.nome}</td>
            <td>${fornecedor.estado.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadFornecedores() {
    getAPI6(url6);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//CONDÔMINOS
function getAPI7(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="7" style="text-align: center;">CONDÔMINOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Proprietário</th>
            <th scope="col">Morador</th>
            </tr>
        </thead>
        `;

        for (let condomino of data) {
            tab +=
                `
            <tr>
            <td scope="row">${condomino.id}</td>
            <td>${condomino.nome}</td>
            <td>${condomino.cpf}</td>
            <td>${condomino.rg}</td>
            <td>${condomino.telefone_celular}</td>
            <td>${condomino.proprietario}</td>
            <td>${condomino.morador}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadCondomino() {
    getAPI7(url7);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//DEPENDENTES
function getAPI8(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="8" style="text-align: center;">DEPENDENTES CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Rg</th>
            <th scope="col">Telefone</th>
            <th scope="col">Morador</th>
            <th scope="col">Cond. Vinculado</th>
            <th scope="col">Tipo Dep.</th>
            </tr>
        </thead>
        `;

        for (let dependente of data) {
            tab +=
                `
            <tr>
            <td scope="row">${dependente.id}</td>
            <td>${dependente.nome}</td>
            <td>${dependente.cpf}</td>
            <td>${dependente.rg}</td>
            <td>${dependente.telefone_celular}</td>
            <td>${dependente.morador}</td>
            <td>${dependente.condomino.nome}</td>
            <td>${dependente.tipoDependente.descricao}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadDependentes() {
    getAPI8(url8);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//SÍNDICOS
function getAPI9(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="6" style="text-align: center;">SÍNDICOS CADASTRADOS</th>
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

        for (let sindico of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);
            tab +=
                `
            <tr>
            <td scope="row">${sindico.id}</td>
            <td>${sindico.nome}</td>
            <td>${formatter.format(sindico.data_inicial)}</td>
            <td>${formatter.format(sindico.data_final_prevista)}</td>
            <td>${formatter.format(sindico.data_final)}</td>
            <td>${sindico.ativo}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadSindicos() {
    getAPI9(url9);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//TIPO DEPENDENTES
function getAPI10(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="2" style="text-align: center;">TIPO DE DEPENDENTES CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Tipo de Dependente</th>
            </tr>
        </thead>
        `;

        for (let tipodependente of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);
            tab +=
                `
            <tr>
            <td scope="row">${tipodependente.id}</td>
            <td>${tipodependente.descricao}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadTipoDep() {
    getAPI10(url10);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//VEICULOS
function getAPI11(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="7" style="text-align: center;">VEÍCULOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Placa</th>
            <th scope="col">Marca</th>
            <th scope="col">Cor</th>
            <th scope="col">Ativo</th>
            <th scope="col">Modelo</th>
            <th scope="col">Condômino</th>
            </tr>
        </thead>
        `;

        for (let veiculo of data) {
            tab +=
                `
            <tr>
            <td scope="row">${veiculo.id}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.marca}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.ativo}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.condomino.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadVeiculos() {
    getAPI11(url11);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//ENTRADAS FINANCEIRAS
function getAPI12(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="6" style="text-align: center;">ENTRADAS FINANCEIRAS CADASTRADAS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Parcelamento</th>
            </tr>
        </thead>
        `;

        for (let financeiroentrada of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${financeiroentrada.id}</td>
            <td>${financeiroentrada.condomino.nome}</td>
            <td>${financeiroentrada.descricao}</td>
            <td>${Math.round(financeiroentrada.valor).toFixed(2)}</td>
            <td>${formatter.format(financeiroentrada.data_operacao)}</td> 
            <td>${financeiroentrada.parcelamento}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadEntradasFinanceiras() {
    getAPI12(url12);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//SAIDAS FINANCEIRAS
function getAPI13(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="7" style="text-align: center;">SAÍDAS FINANCEIRAS CADASTRADAS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data do Pagamento</th>
            <th scope="col">Nota Fiscal</th>
            <th scope="col">Parcelamento</th>
            </tr>
        </thead>
        `;

        for (let saidasfinanceiro of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${saidasfinanceiro.id}</td>
            <td>${saidasfinanceiro.fornecedor.nome}</td>
            <td>${saidasfinanceiro.descricao}</td>
            <td>${Math.round(saidasfinanceiro.valor).toFixed(2)}</td>
            <td>${formatter.format(saidasfinanceiro.data_operacao)}</td> 
            <td>${saidasfinanceiro.nota_fiscal}</td>
            <td>${saidasfinanceiro.parcelamento}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadSaidasFinanceiras() {
    getAPI13(url13);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//MANUTENÇÕES
function getAPI14(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="7" style="text-align: center;">MANUTENÇÕES CADASTRADAS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Manutenção</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Data Inicial</th>
            <th scope="col">Data Final</th>
            <th scope="col">Fornecedor</th>
            </tr>
        </thead>
        `;

        for (let manutencao of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${manutencao.id}</td>
            <td>${manutencao.nome}</td>
            <td>${manutencao.descricao}</td>
            <td>${Math.round(manutencao.valor).toFixed(2)}</td>
            <td>${formatter.format(manutencao.data_inicial)}</td> 
            <td>${formatter.format(manutencao.data_final)}</td> 
            <td>${manutencao.fornecedor.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadManutencoes() {
    getAPI14(url14);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//LICENÇAS
function getAPI15(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="8" style="text-align: center;">MANUTENÇÕES CADASTRADAS</th>
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

        for (let licenca of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${licenca.id}</td>
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
    });
}
function loadLicencas() {
    getAPI15(url15);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//AVISOS
function getAPI16(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="5" style="text-align: center;">AVISOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Data do Aviso</th>
            <th scope="col">Síndico</th>
            </tr>
        </thead>
        `;

        for (let aviso of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${aviso.id}</td>
            <td>${aviso.nome}</td>
            <td>${aviso.descricao}</td>
            <td>${formatter.format(aviso.data_aviso)}</td> 
            <td>${aviso.sindico.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadAvisos() {
    getAPI16(url16);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//AVISOS
function getAPI17(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="6" style="text-align: center;">OCORRÊNCIAS CADASTRADAS</th>
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

        for (let ocorrencia of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
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
    });
}
function loadOcorrencias() {
    getAPI17(url17);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//CONDOMINO > APARTAMENTO
function getAPI18(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="5" style="text-align: center;">VÍNCULOS CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Condômino</th>
            <th scope="col">Apartamento</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Data de Saída</th>
            </tr>
        </thead>
        `;

        for (let vinc of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${vinc.id}</td>
            <td>${vinc.condomino.nome}</td>
            <td>${vinc.apartamento.numero}</td>
            <td>${formatter.format(vinc.data_entrada)}</td> 
            <td>${formatter.format(vinc.data_saida)}</td> 
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadCondApto() {
    getAPI18(url18);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//ENTRADA ESTOQUE
function getAPI19(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="7" style="text-align: center;">ENTRADAS DE ESTOQUE CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Fornecedor</th>
            </tr>
        </thead>
        `;

        for (let entradaestoque of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${entradaestoque.id}</td>
            <td>${entradaestoque.itemEstoque.descricao}</td>
            <td>${entradaestoque.nome}</td>
            <td>${entradaestoque.quantidade}</td>
            <td>${entradaestoque.valor_unitario}</td>
            <td>${formatter.format(entradaestoque.data_entrada)}</td> 
            <td>${entradaestoque.fornecedor.nome}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadEntradaEstoque() {
    getAPI19(url19);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//SAIDA ESTOQUE
function getAPI20(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="4" style="text-align: center;">SAÍDAS DE ESTOQUE CADASTRADAS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Data de Saída</th>
            </tr>
        </thead>
        `;

        for (let saidaestoque of data) {
            const date = new Date();
            const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
            const formattedDate = formatter.format(date);

            tab +=
                `
            <tr>
            <td scope="row">${saidaestoque.id}</td>
            <td>${saidaestoque.itemEstoque.descricao}</td>
            <td>${saidaestoque.quantidade}</td>
            <td>${formatter.format(saidaestoque.data_saida)}</td> 
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadSaidaEstoque() {
    getAPI20(url20);
    event.preventDefault();
}
////////////////////////////////////////////////////////////////
//ITEM ESTOQUE
function getAPI21(url) {
    const response = fetch(url, { method: "GET" });
    response.then(function (result) {
        return result.json();
    }).then(function (data) {
        let tab =
            `
            <thead>
            <th colspan="3" style="text-align: center;">ITEM DE ESTOQUE CADASTRADOS</th>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Item</th>
            <th scope="col">Quantidade em Estoque</th>
            </tr>
        </thead>
        `;

        for (let items of data) {

            tab +=
                `
            <tr>
            <td scope="row">${items.id}</td>
            <td>${items.descricao}</td>
            <td>${items.estoque}</td>
            </tr>
            `;
        }
        document.getElementById("bodytabela").innerHTML = tab;
    });
}
function loadItemEstoque() {
    getAPI21(url21);
    event.preventDefault();
}



