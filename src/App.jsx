import SpinnerFill from "./components/Spinner.jsx"; // Importe o seu componente de spinner
import { useState, useEffect } from "react";
import Home from "../src/pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeCliente from "./pages/HomeCliente.jsx";
import Blog from "./pages/Blog.jsx";
import PerfilCliente from '../src/pages/PerfilCliente.jsx';
import { Helmet } from "react-helmet";
import MeusVeiculos from "./pages/MeusVeiculos.jsx";
import BlogAcess from "./pages/BlogAcess.jsx";
import VerAgendamento from "./pages/VerAgendamento.jsx";
import VerVeiculos from "./pages/VerVeiculos.jsx";
import HomeAdministrador from "./pages/pageAdmin/HomeAdministrador.jsx";
import LoginAdmin from "./components/compenentesAdmin/LoginAdmin.jsx";
import PaginaLoginSuperAdmin from './pages/pageAdmin/PaginaLoginSuperAdmin.jsx';
import { Navigate } from 'react-router-dom';
import './App.css';
import Clientes from './pages/pageAdmin/Clientes.jsx';
import Estoque from './pages/pageAdmin/Estoque.jsx';
import Agendamento from './pages/pageAdmin/Agendamento.jsx';
import Ajuda from "./pages/Ajuda.jsx";
import Funcionarios from "./pages/pageAdmin/Funcionarios.jsx";
import Veiculos from "./pages/pageAdmin/Veiculos.jsx";
import Blogger from "./pages/pageAdmin/Blogger.jsx";
import Servicos from "./pages/pageAdmin/Servicos.jsx";
import Pagamento from "./pages/pageAdmin/Pagamento.jsx";
import AddClientes from "./pages/pagesAdd/AddClientes.jsx";
import AddFuncionarios from "./pages/pagesAdd/AddFuncionarios.jsx";
import AddBlog from "./pages/pageAdmin/AddBlog.jsx";
import AddServicos from "./pages/pageAdmin/AddServicos.jsx";
import AddVeiculos from "./pages/pagesAdd/AddVeiculos.jsx";
import AddEstoque from "./pages/pagesAdd/AddEstoque.jsx";
import PagamentoActive from "./pages/pageAdmin/PagamentoActive.jsx";
import Faturas from "./pages/pageAdmin/Faturas.jsx";
import PerfilFuncionario from "./pages/pageAdmin/PerfilFuncionario.jsx";
import AgendamentoHistorico from "./pages/pageAdmin/AgendamentoHistorico.jsx";
import AdiarAgendamento from "./pages/pageAdmin/AdiarAgendemento.jsx";
import EditarBlogger from "./pages/pageAdmin/EditarBlogger.jsx";
import EditarVeiculo from "./pages/pageAdmin/EditarVeiculo.jsx";
import Deficnicoes from "./pages/pageAdmin/Definicoes.jsx";
import Fornecedor from "./pages/pageAdmin/Fornecedor.jsx";
import Compra from "./pages/pageAdmin/Compra.jsx";
import Produto from "./pages/pageAdmin/Produto.jsx";
import EquipeSuporte from "./pages/pageAdmin/EquipeSuporte.jsx";
import CartaoTrabalho from "./pages/pageAdmin/Cartaotrabalho.jsx";
import Ingresso from "./pages/pageAdmin/Ingresso.jsx";
import Vendas from "./pages/pageAdmin/Vendas.jsx";
import Taxas from "./pages/pageAdmin/ListaTaxas.jsx";
import MetodoPagamento from "./pages/pageAdmin/MetodoPagamento.jsx";
import Rendas from "./pages/pageAdmin/Rendas.jsx";
import Dispesas from "./pages/pageAdmin/Dispesas.jsx";
import Conformidade from "./pages/pageAdmin/Conformidade.jsx";
import Relatorios from "./pages/pageAdmin/Relatorios.jsx";
import TemplatesEmail from "./pages/pageAdmin/TemplateEmail.jsx";
import CamposPersonalizados from "./pages/pageAdmin/CamposPersonalizados.jsx";
import BibiliotecaObservacao from "./pages/pageAdmin/BibiliotecaObservacoes.jsx";
import Galhos from "./pages/pageAdmin/Galhos.jsx";
import ContacaoPage from "./pages/pageAdmin/CotacaoPage.jsx";
import AddFornecedor from "./pages/pagesAdd/AddFornecedor.jsx";
import AddProdutos from "./pages/pagesAdd/AddProduto.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCompras from "./pages/pagesAdd/AddCompras.jsx";
import AddEquipeSuporte from "./pages/pagesAdd/AddEquipeSuporte.jsx";
import ListarTiposVeiculos from "./pages/pagesListas/ListarTiposVeiculos.jsx";
import ListarMarcasVeiculos from "./pages/pagesListas/ListarMarcasVeiculos.jsx";
import ListarCorVeiculos from './pages/pagesListas/ListarCorVeiculos.jsx';
import ListarOrdemServico from "./pages/pagesListas/ListarOrdemServico.jsx";
import AddOrdemServico from "./pages/pagesAdd/AddOrdemServico.jsx";
import AddCotacao from './pages/pagesAdd/AddCotacao.jsx';
import AddFaturas from './pages/pagesAdd/AddFaturas.jsx';
import AddGetPass from './pages/pagesAdd/AddGetPass.jsx';
import AddRenda from './pages/pagesAdd/AddRenda.jsx';
import AddDispesas from './pages/pagesAdd/AddDispesas.jsx';
import AddPecas from "./pages/pagesAdd/AddPecas.jsx";
import AddGalho from "./pages/pagesAdd/AddFilial.jsx";





// eslint-disable-next-line react/prop-types
const ProtectedRouteAdmin = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo de verificação de autenticação

  return isAuthenticated ? children : <Navigate to="/acessoAdministrador" />;
};




// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo de verificação de autenticação

  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um carregamento de dados
    const fetchData = async () => {
      // Simula um atraso
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); // Dados carregados
    };

    fetchData();
  }, []);




  return (
    <div className="App">
      {loading ? (
        <>
          <SpinnerFill />
        </>
      ) : (
        <div>
          <Helmet>
            <title>Bi-Turbo Motores</title>
            <meta name="description" content="Oficina mecâncica" />
          </Helmet>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/HomeCliente" element={
                <ProtectedRoute>
                  <HomeCliente />
                </ProtectedRoute>}
              />
              <Route path="/Blog" element={
                <Blog />
              } />
              <Route path="/perfilCliente" element={
                <ProtectedRoute>
                  <PerfilCliente />
                </ProtectedRoute>
              } />
              <Route path="/meusVeiculos" element={
                <ProtectedRoute>
                  <MeusVeiculos />
                </ProtectedRoute>
              } />
              <Route path="/blogAcess" element={
                <ProtectedRoute>
                  <BlogAcess />
                </ProtectedRoute>
              } />
              <Route path="/verAgendamento" element={
                <ProtectedRoute>
                  <VerAgendamento />
                </ProtectedRoute>
              } />
              <Route path="/veiculosPage" element={

                <ProtectedRoute>
                  <VerVeiculos />
                </ProtectedRoute>
              } />
              <Route path="/pedidoAjuda" element={
                <ProtectedRoute>
                  <Ajuda />
                </ProtectedRoute>
              } />

              {/**Routas para o Administrador */}
              <Route path="/homeAdministrador" element={
                <ProtectedRouteAdmin>
                  <HomeAdministrador />
                </ProtectedRouteAdmin>

              } />
              <Route path="/acessoAdministrador" element={<LoginAdmin />} />

              <Route path="/clienteList" element={
                <ProtectedRouteAdmin>
                  <Clientes />
                </ProtectedRouteAdmin>

              } />
              <Route path="/funcionariosList" element={

                <ProtectedRouteAdmin>
                  <Funcionarios />
                </ProtectedRouteAdmin>


              } />
              <Route path="/estoqueList" element={
                <ProtectedRouteAdmin>
                  <Estoque />
                </ProtectedRouteAdmin>
              }

              />
              <Route path="/veiculosPageItens" element={


                <ProtectedRouteAdmin>
                  <Veiculos />
                </ProtectedRouteAdmin>

              }

              />
              <Route path="/agendamentoList" element={

                <ProtectedRouteAdmin>
                  <Agendamento />
                </ProtectedRouteAdmin>
              }

              />
              <Route path="/blogList" element={



                <ProtectedRouteAdmin>
                  <Blogger />
                </ProtectedRouteAdmin>



              } />
              <Route path="/servicosList" element={



                <ProtectedRouteAdmin>
                  <Servicos />
                </ProtectedRouteAdmin>

              }

              />
              <Route path="/pagamentoList" element={

                <ProtectedRouteAdmin>
                  <Pagamento />
                </ProtectedRouteAdmin>


              } />
              <Route path="/faturaList" element={

                <ProtectedRouteAdmin>
                  <Faturas />
                </ProtectedRouteAdmin>


              } />
              <Route path="/agendamentoHistorico" element={


                <ProtectedRouteAdmin>
                  <AgendamentoHistorico />
                </ProtectedRouteAdmin>
              } />
              <Route path="/agendamentoAdiar/:id" element={


                <ProtectedRouteAdmin>
                  <AdiarAgendamento />
                </ProtectedRouteAdmin>
              } />
              <Route path="/editarBlog/:idBlog" element={

                <ProtectedRouteAdmin>
                  <EditarBlogger />
                </ProtectedRouteAdmin>
              } />
              <Route path="/editarVeiculo/:idVeiculo" element={
                <ProtectedRouteAdmin>
                  <EditarVeiculo />
                </ProtectedRouteAdmin>
              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addClientes" element={

                <ProtectedRouteAdmin>
                  <AddClientes />
                </ProtectedRouteAdmin>

              } />
              <Route path="/addFuncionarios" element={



                <ProtectedRouteAdmin>
                  <AddFuncionarios />
                </ProtectedRouteAdmin>

              }

              />
              <Route path="/addBlogs" element={

                <ProtectedRouteAdmin>
                  <AddBlog />
                </ProtectedRouteAdmin>

              } />
              <Route path="/addServicos" element={



                <ProtectedRouteAdmin>
                  <AddServicos />
                </ProtectedRouteAdmin>

              } />
              <Route path="/addEstoque" element={



                <ProtectedRouteAdmin>
                  <AddEstoque />
                </ProtectedRouteAdmin>

              } />
              <Route path="/addVeiculos" element={

                <ProtectedRouteAdmin>
                  <AddVeiculos />
                </ProtectedRouteAdmin>
              } />


              {/**Routes Perfil Funcionarios 
               */}
              <Route path="/pageDefinicoes" element={


                <ProtectedRouteAdmin>
                  <Deficnicoes />
                </ProtectedRouteAdmin>
              } />


              <Route path="/perfilFuncionario/:id" element={

                <ProtectedRouteAdmin>
                  <PerfilFuncionario />
                </ProtectedRouteAdmin>


              } />





              {/* <Route path="/addFaturas" element={<AddFaturas />} /> */}



              <Route path="/pagarConta/:id" element={

                <ProtectedRouteAdmin>
                  <PagamentoActive />
                </ProtectedRouteAdmin>
              } />


              {/**Novas Rotas */}

              <Route path="/fornecedorPage" element={

                <ProtectedRouteAdmin>
                  <Fornecedor />
                </ProtectedRouteAdmin>} />

              <Route path="/produtosPage" element={

                <ProtectedRouteAdmin>
                  <Produto />
                </ProtectedRouteAdmin>} />


              <Route path="/comprasPage" element={

                <ProtectedRouteAdmin>
                  <Compra />
                </ProtectedRouteAdmin>} />


              <Route path="/equipeSuportePage" element={

                <ProtectedRouteAdmin>
                  <EquipeSuporte />
                </ProtectedRouteAdmin>} />



              <Route path="/cartaoTrabalhoPage" element={

                <ProtectedRouteAdmin>
                  <CartaoTrabalho />
                </ProtectedRouteAdmin>} />


              <Route path="/ingressoPage" element={

                <ProtectedRouteAdmin>
                  <Ingresso />
                </ProtectedRouteAdmin>} />


              <Route path="/cotacaoPage" element={

                <ProtectedRouteAdmin>
                  <ContacaoPage />
                </ProtectedRouteAdmin>} />

              <Route path="/vendasPage" element={

                <ProtectedRouteAdmin>
                  <Vendas />
                </ProtectedRouteAdmin>} />
              <Route path="/listaTaxaPage" element={

                <ProtectedRouteAdmin>
                  <Taxas />
                </ProtectedRouteAdmin>} />


              <Route path="/metodoPagamentoPage" element={

                <ProtectedRouteAdmin>
                  <MetodoPagamento />
                </ProtectedRouteAdmin>} />

              <Route path="/rendasPage" element={

                <ProtectedRouteAdmin>
                  <Rendas />
                </ProtectedRouteAdmin>} />

              <Route path="/dispesasPage" element={

                <ProtectedRouteAdmin>
                  <Dispesas />
                </ProtectedRouteAdmin>} />


              <Route path="/conformidadePage" element={

                <ProtectedRouteAdmin>
                  <Conformidade />
                </ProtectedRouteAdmin>} />


              <Route path="/relatoriosPage" element={

                <ProtectedRouteAdmin>
                  <Relatorios />
                </ProtectedRouteAdmin>} />


              <Route path="/templatesEmailPages" element={

                <ProtectedRouteAdmin>
                  <TemplatesEmail />
                </ProtectedRouteAdmin>} />

              <Route path="/camposPersonalizadosPage" element={

                <ProtectedRouteAdmin>
                  <CamposPersonalizados />
                </ProtectedRouteAdmin>} />

              <Route path="/bibiliotecaObservacaoPage" element={

                <ProtectedRouteAdmin>
                  <BibiliotecaObservacao />
                </ProtectedRouteAdmin>} />


              <Route path="/galhosPage" element={

                <ProtectedRouteAdmin>
                  <Galhos />
                </ProtectedRouteAdmin>} />

              {/** Rotas de Adicionar Entidades */}


              <Route path="/addFornecedorPage" element={

                <ProtectedRouteAdmin>
                  <AddFornecedor />
                </ProtectedRouteAdmin>} />


              <Route path="/addProdutos" element={

                <ProtectedRouteAdmin>
                  <AddProdutos />
                </ProtectedRouteAdmin>} />


              <Route path="/addCompras" element={

                <ProtectedRouteAdmin>
                  <AddCompras />
                </ProtectedRouteAdmin>} />



              {/**Routes de Add de Entidades */}
              <Route path="/addClientes" element={

                <ProtectedRouteAdmin>
                  <AddClientes />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addEquipeSuporte" element={

                <ProtectedRouteAdmin>
                  <AddEquipeSuporte />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addVeiculos" element={

                <ProtectedRouteAdmin>
                  <AddVeiculos />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/tipoVeiculosPage" element={

                <ProtectedRouteAdmin>
                  <ListarTiposVeiculos />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/listarTiposVeiculos" element={

                <ProtectedRouteAdmin>
                  <ListarMarcasVeiculos />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/listarCorVeiculos" element={

                <ProtectedRouteAdmin>
                  <ListarCorVeiculos />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/listarOrdemServico" element={

                <ProtectedRouteAdmin>
                  <ListarOrdemServico />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addOrdemServico" element={

                <ProtectedRouteAdmin>
                  <AddOrdemServico />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addCotacao" element={

                <ProtectedRouteAdmin>
                  <AddCotacao />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/addFaturas" element={

                <ProtectedRouteAdmin>
                  <AddFaturas />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/addGetPass" element={

                <ProtectedRouteAdmin>
                  <AddGetPass />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/addRenda" element={

                <ProtectedRouteAdmin>
                  <AddRenda />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/addDispesas" element={

                <ProtectedRouteAdmin>
                  <AddDispesas />
                </ProtectedRouteAdmin>

              } />


              {/**Routes de Add de Entidades */}
              <Route path="/addPecas" element={

                <ProtectedRouteAdmin>
                  <AddPecas />
                </ProtectedRouteAdmin>

              } />

              {/**Routes de Add de Entidades */}
              <Route path="/addGalho" element={

                <ProtectedRouteAdmin>
                  <AddGalho />
                </ProtectedRouteAdmin>

              } />




































              {/**Routas para o Super Administrador */}

              <Route path="/acessoSuperAdministrador" element={<PaginaLoginSuperAdmin />} />
              <Route path="/paginaCliente" element={<Clientes />} />
              <Route path="/paginaAdministrador" element={<Agendamento />} />
              <Route path="/paginaEstoque" element={<Estoque />} />



            </Routes>
          </Router>
          {/** <ConnectionStatus /> */}
        </div>

      )}
    </div>
  );
};


export default App;

