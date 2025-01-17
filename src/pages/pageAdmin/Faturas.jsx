import { useState, useEffect } from 'react';
import "../../css/StylesAdmin/homeAdministrador.css";
import { RiAddFill } from "react-icons/ri";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import imgErro from "../../assets/error.webp";
import logoMarca from "../../assets/lgo.png";
import "../../css/StylesAdmin/homeAdministrador.css";
import 'react-toastify/dist/ReactToastify.css';
import imgN from "../../assets/not-found.png"; // Imagem para mostrar enquanto carrega
import { IoMdEye } from 'react-icons/io';
import { Modal } from "react-bootstrap"; // Importando o Modal

// Estilos customizados para a tabela


const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#044697',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bolder',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  cells: {
    style: {
      padding: '8px',
      fontSize: '14px',
    },
  },
};

export function ListarFacturas() {
  const [facturas, setFacturas] = useState([]); // Lista de faturas
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Armazenamento de erro
  const [selectedFatura, setSelectedFatura] = useState(null); // Fatura selecionada para visualização
  const [selectedClient, setSelectedClient] = useState(null); 
  const [showModal, setShowModal] = useState(false); // Controle da visibilidade da moda
  const navigate = useNavigate(); // Hook para navegação
  const [veiculoDetalhes, setVeiculoDetalhes] = useState(null); // Dados do veículo
  const [ordemServicoDetalhes, setOrdemServicoDetalhes] = useState(null); // Detalhes da ordem de serviço


  // Função para obter os dados da ordem de serviço
  const getOrdemDeServicoDetalhes = async (ordemServicoId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ordens-de-servico/${ordemServicoId}`);
      return response.data;  // Retorna os detalhes da ordem de serviço
    } catch (error) {
      console.error('Erro ao buscar ordem de serviço:', error);
      return null;  // Retorna null em caso de erro
    }
  };

  const fetchOrdemDeServicoDetalhes = async (ordemServicoId) => {
    const ordemServicoData = await getOrdemDeServicoDetalhes(ordemServicoId);
    setOrdemServicoDetalhes(ordemServicoData); // Atualiza o estado com os dados da ordem de serviço
  };


  // Função para buscar faturas da API
  const fetchFacturas = async () => {
    try {
      setLoading(true); // Define o loading para verdadeiro enquanto carrega as faturas
      const response = await axios.get("http://127.0.0.1:8000/api/facturas");
      setFacturas(response.data.data); // Preenche a lista com os dados de faturas
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao carregar as faturas."); // Captura e define o erro
      toast.error("Erro ao carregar as faturas.");
    } finally {
      setLoading(false); // Define o loading para falso quando os dados forem carregados
    }
  };

  // Função para buscar clientes da API
  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clientes");
      setClientes(response.data.data || []); // Verifica se a resposta é válida e seta os clientes
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao carregar os clientes.");
      toast.error("Erro ao carregar os clientes.");
    }
  };

  // Função para obter os dados do veículo
  const getVeiculoDetalhes = async (veiculoId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/veiculos/${veiculoId}`);
      const veiculo = response.data;  // Veículo encontrado
      return veiculo; // Retorna todos os detalhes do veículo
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      return null; // Retorna null caso haja erro
    }
  };

  // Função para buscar os dados do cliente pelo ID
  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/clientes/${id}`);
      setSelectedClient(response.data); // Armazena os dados do cliente
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Erro ao carregar os dados do cliente.");
    }
  };

  // Função para buscar o veículo e exibir detalhes
  const fetchVeiculoDetalhes = async (veiculoId) => {
    const veiculoData = await getVeiculoDetalhes(veiculoId);
    setVeiculoDetalhes(veiculoData);
  };
  const handleView = async (fatura) => {
    setSelectedFatura(fatura);
    setShowModal(true); // Exibe a modal
    // Chama as funções para buscar os detalhes do veículo e da ordem de serviço
    await fetchVeiculoDetalhes(fatura.veiculo_id);
    fetchClientById(fatura.cliente_id); // Carr
    await fetchOrdemDeServicoDetalhes(fatura.ordem_servico_id);
  };


  // Função para adicionar uma nova fatura
  const handleAddFaturas = () => {
    navigate('/addFaturas'); // Redireciona para a rota /addFaturas
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchFacturas();
    fetchClientes(); // Chama a função de busca dos clientes
  }, []);

  // Função para buscar as faturas com base na pesquisa
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchFacturas(); // Se não houver pesquisa, carrega novamente as faturas
    } else {
      const filteredRecords = facturas.filter((item) =>
        item.numero_fatura.toLowerCase().includes(query) ||
        item.cliente_id.toString().includes(query) ||
        item.tipo_fatura.toLowerCase().includes(query)
      );
      setFacturas(filteredRecords);
    }
  };

  // Função para excluir uma fatura
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/facturas/${id}`);
      setFacturas(facturas.filter((item) => item.id !== id)); // Remove a fatura excluída
      toast.success("Fatura excluída com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao excluir a fatura.");
      toast.error("Erro ao excluir a fatura.");
    }
  };

  // Função para obter o nome do cliente pelo ID
  // Função para obter o nome do cliente pelo ID
  const getClienteNome = (clienteId) => {
    // Verifica se a lista de clientes existe e se há pelo menos um cliente na lista
    if (!clientes || clientes.length === 0) {
      return "Cliente não encontrado";
    }
  
    // Procura o cliente pelo id
    const cliente = clientes.find((cliente) => cliente.id === clienteId);
  
    // Caso o cliente não seja encontrado, retorna "Cliente não encontrado"
    if (!cliente) {
      return "Cliente não encontrado";
    }
  
    // Retorna o nome completo do cliente (primeiro nome e sobrenome)
    return `${cliente.primeiro_nome} ${cliente.sobrenome}`;
  };


  // Fechar a modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFatura(null);

  };


  // Colunas da tabela
  const columns = [
    {
      name: "Número da Fatura",
      selector: (row) => row.numero_fatura,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => getClienteNome(row.cliente_id), // Exibe o nome do cliente
      sortable: true,
    },
    {
      name: "Valor Pago",
      selector: (row) => row.valor_pago + " Kz",
      sortable: true,
    },
    {
      name: "Data",
      selector: (row) => row.data,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Tipo de Pagamento",
      selector: (row) => row.tipo_pagamento,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row)}>
              <IoMdEye fontSize={20} /> Visualizar
            </Dropdown.Item>
            <Dropdown.Item>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => handleDelete(row.id)}>
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Exibição de carregamento ou erro
  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }
  if (error) {
    return (<div className='text-center'><h3 className='text-danger'>{error}</h3>
      <img src={imgErro} alt="Carregando" className="w-50 d-block mx-auto" />
    </div>);
  };

  return (
    <div className="contain">
      <div className="d-flex">
        <div className="flexAuto w-100">
          <div className="vh-100 alturaPereita">
            <div className="homeDiv">
              <div className="search row d-flex justify-content-between">
                <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                  <button className="btn btn-primary links-acessos" onClick={handleAddFaturas}>
                    <RiAddFill />
                    &nbsp;Nova Fatura
                  </button>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    className="w-100 my-2 zIndex"
                    placeholder="Pesquisar Faturas"
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <DataTable
                columns={columns}
                data={facturas}
                customStyles={customStyles}
                pagination
                paginationPerPage={10}
                footer={<div>Exibindo {facturas.length} registros no total</div>}
                className="pt-5"
              />
              <ToastContainer position="top-center" autoClose={3000} />

              {/* Modal de visualização da fatura */}
              <Modal show={showModal} onHide={handleCloseModal} scrollable size="xl">
                <Modal.Header closeButton>
                  <Modal.Title>Detalhes da Fatura</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                {selectedClient && (
                    <div>
                      <p><strong>Nome do Cliente:</strong> {selectedClient.primeiro_nome} {selectedClient.sobrenome}</p>
                      <p><strong>Email:</strong> {selectedClient.email}</p>
                      <p><strong>Telefone:</strong> {selectedClient.celular}</p>
                    </div>
                  )}
                  {selectedFatura && (
                    <div>
                      <p><strong>Número da Fatura:</strong> {selectedFatura.numero_fatura}</p>
              
                      <p><strong>Ordem de Serviço:</strong> {selectedFatura.ordem_servico_id}</p>
                      <p><strong>Valor Pago:</strong> {selectedFatura.valor_pago} Kz</p>
                      <p><strong>Desconto:</strong> {selectedFatura.desconto} Kz</p>
                      <p><strong>Data:</strong> {selectedFatura.data}</p>
                      <p><strong>Filial:</strong> {selectedFatura.filiais}</p>
                      <p><strong>Status:</strong> {selectedFatura.status}</p>
                      <p><strong>Tipo de Pagamento:</strong> {selectedFatura.tipo_pagamento}</p>
                      <p><strong>Valor Total:</strong> {selectedFatura.valor_total} Kz</p>
                      <p><strong>Detalhes:</strong> {selectedFatura.detalhes}</p>
                      <p><strong>Tipo de Fatura:</strong> {selectedFatura.tipo_fatura}</p>

                      {/* Exibindo os detalhes do veículo */}
                      {veiculoDetalhes && (
                        <div>
                          <h5>Detalhes do Veículo</h5>
                          <p><strong>Marca:</strong> {veiculoDetalhes.marca_veiculo}</p>
                          <p><strong>Modelo:</strong> {veiculoDetalhes.modelo_veiculo}</p>
                          <p><strong>Ano Modelo:</strong> {veiculoDetalhes.ano_modelo}</p>
                          <p><strong>Placa:</strong> {veiculoDetalhes.numero_placa}</p>
                          <p><strong>Cor:</strong> {veiculoDetalhes.cor}</p>
                          <p><strong>Motor:</strong> {veiculoDetalhes.motor}</p>
                          <p><strong>Tamanho do Motor:</strong> {veiculoDetalhes.tamanho_motor}</p>
                          <p><strong>Combustível:</strong> {veiculoDetalhes.combustivel}</p>
                          <p><strong>Caixa de Velocidade:</strong> {veiculoDetalhes.caixa_velocidade}</p>
                          <p><strong>Leitura do Odômetro:</strong> {veiculoDetalhes.leitura_odometro} km</p>
                          <p><strong>Descrição:</strong> {veiculoDetalhes.descricao}</p>
                        </div>
                      )}

                      {/* Exibindo os detalhes da ordem de serviço */}
                      {ordemServicoDetalhes && (
                        <div>
                          <h5>Detalhes da Ordem de Serviço</h5>
                          <p><strong>Número da Ordem de Serviço:</strong> {ordemServicoDetalhes.numero_ordem_servico}</p>
                          <p><strong>Data de Criação:</strong> {ordemServicoDetalhes.data_criacao}</p>
                          <p><strong>Status da Ordem:</strong> {ordemServicoDetalhes.status_ordem}</p>
                          <p><strong>Descrição do Serviço:</strong> {ordemServicoDetalhes.descricao_servico}</p>
                          <p><strong>Valor Total:</strong> {ordemServicoDetalhes.valor_total_ordem} Kz</p>
                        </div>
                      )}
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer className='p-0'>
                                              <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60}/>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const Faturas = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex">
        <SideBar />

        <div className="flexAuto w-100">
          <TopoAdmin entrada=" Faturas" />

          <div className="vh-100 alturaPereita">
            <ListarFacturas />
          </div>
          <div className="div text-center np pt-2 mt-2 ppAr">
            <hr />
            <p className="text-center">
              Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
              <br />
              Desenvolvido por: <b>Oseias Dias</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faturas;
