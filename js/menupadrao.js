document.write(`

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="menu">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main_nav">

                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Cadastros </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="apartamento.html"> Apartamento </a></li>
                            <li><a class="dropdown-item" href="#"> Endereço &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="cidade.html">Cidade</a></li>
                                    <li><a class="dropdown-item" href="estados.html">Estado</a></li>
                                    <li><a class="dropdown-item" href="pais.html">País</a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="usuarios.html"> Usuário </a></li>
                            <li><a class="dropdown-item" href="fornecedores.html"> Fornecedores </a>
                            <li><a class="dropdown-item" href="#"> Pessoas &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="condomino.html"> Condômino </a></li>
                                    <li><a class="dropdown-item" href="dependentes.html"> Dependentes </a></li>
                                    <li><a class="dropdown-item" href="sindico.html"> Síndico </a></li>
                                    <li><a class="dropdown-item" href="tipodependente.html"> Tipo de dependente </a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="veiculos.html"> Veículos </a>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Financeiro </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="entradafinanceiro.html"> Entradas </a></li>
                            <li><a class="dropdown-item" href="saidafinanceiro.html"> Saídas </a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Manutenções </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="manutencao.html"> Manutenções </a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Síndico </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="licencas.html"> Licenças </a></li>
                            <li><a class="dropdown-item" href="avisos.html"> Avisos </a></li>
                            <li><a class="dropdown-item" href="ocorrencias.html"> Ocorrências </a></li>
                            <li><a class="dropdown-item" href="vincularcondominoapto.html"> Vincular condômino/apto </a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Estoque </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="entradaestoque.html"> Entrada </a></li>
                            <li><a class="dropdown-item" href="saidaestoque.html"> Saída </a></li>
                            <li><a class="dropdown-item" href="itens.html"> Itens </a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown"> <!--MENU RELATÓRIOS-->
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Relatórios </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"> Cadastros &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Endereço &raquo; </a>
                                        <ul class="submenu dropdown-menu">
                                            <li><a class="dropdown-item" href="relatorio.html">Cidade</a></li>
                                            <li><a class="dropdown-item" href="relatorio.html" 
                                                carregarRelatorioEstado(url2)>Estado</a></li>
                                            <li><a class="dropdown-item" href="relatorio.html" 
                                                onclick="carregarRelatorioPais(url1)">País</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Apartamentos </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Usuários </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Fornecedores </a></li>
                                    <li><a class="dropdown-item" href="#">Pessoas &raquo; </a>
                                        <ul class="submenu dropdown-menu">
                                            <li><a class="dropdown-item" href="relatorio.html">Condôminos</a></li>
                                            <li><a class="dropdown-item" href="relatorio.html">Dependentes</a></li>
                                            <li><a class="dropdown-item" href="relatorio.html">Síndicos</a></li>
                                            <li><a class="dropdown-item" href="relatorio.html">Tipo de dependentes</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item" href="#"> Veículos </a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="#"> Financeiro &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="relatorio.html"> Entradas </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Saídas </a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="#"> Manutenções &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="relatorio.html"> Manutenções </a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="#"> Síndico &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="relatorio.html"> Licenças </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Avisos </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Ocorrências </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Condômino/Apartamento </a></li>
                                </ul>
                            </li>
                            <li><a class="dropdown-item" href="#"> Estoque &raquo; </a>
                                <ul class="submenu dropdown-menu">
                                    <li><a class="dropdown-item" href="relatorio.html"> Entrada </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Saída </a></li>
                                    <li><a class="dropdown-item" href="relatorio.html"> Itens </a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Ajuda </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="versaosistema.html"> Versão do sistema </a></li>
                            <li><a class="dropdown-item" href="documentacao.html"> Documentação </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div> 
    </nav>
`
);