import { useState, useEffect } from 'react';
import "../../css/StylesAdmin/homeAdministrador.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { FaFilePdf, FaPrint, FaRegEye } from 'react-icons/fa';
import { Modal, Button } from "react-bootstrap";
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import { RiAddFill } from 'react-icons/ri';
import { ImWhatsapp } from 'react-icons/im';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import Accordion from 'react-bootstrap/Accordion';


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

export function ListarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]); // Lista de agendamentos
  const [loading, setLoading] = useState(true); // Variável de estado para carregamento
  const [error, setError] = useState(null); // Variável de estado para erro
  const [showViewModal, setShowViewModal] = useState(false); // Controle da visibilidade do modal
  const [selectedAgendamento, setSelectedAgendamento] = useState(null); // Agendamento selecionado para visualização
  const navigate = useNavigate(); // Navegação após sucesso

  // Buscar agendamentos da API
  const fetchAgendamentos = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Reseta qualquer erro anterior
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/agendamentos");
      setAgendamentos(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar os agendamentos:", error);
      setError("Erro ao carregar os agendamentos."); // Define a mensagem de erro
      toast.error("Erro ao carregar os agendamentos.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Função de busca para filtrar os agendamentos
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchAgendamentos();
    } else {
      const filteredRecords = agendamentos.filter((item) =>
        item.cliente.nome_exibicao.toLowerCase().includes(query) ||
        item.data.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      );
      setAgendamentos(filteredRecords);
    }
  };

  // Função para excluir um agendamento
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/agendamentos/${id}`);
      setAgendamentos(agendamentos.filter((item) => item.id !== id)); // Remove o agendamento excluído
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o agendamento:", error);
      toast.error("Erro ao excluir o agendamento.");
    }
  };

  // Função para abrir o modal e setar o agendamento selecionado
  const handleVisualizar = (agendamento) => {
    setSelectedAgendamento(agendamento);
    setShowViewModal(true);
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Data do Agendamento",
      selector: (row) => new Date(row.data).toLocaleString(),
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente.nome_exibicao,
      sortable: true,
    },
    {
      name: "Serviço",
      selector: (row) => row.servico ? row.servico.nome_servico : "Não informado",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: (row) => {
        const descricao = row.descricao || "";
        return descricao.length > 60 ? descricao.substring(0, 60) + '...' : descricao;
      },
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleVisualizar(row)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
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

  // Exibe a tela de carregamento
  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-danger">{error}</h3>
        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
      </div>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#productDetailsTable"), {
      callback: function (doc) {
        doc.save(`${selectedAgendamento.id}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Confira o agendamento: Cliente: ${selectedAgendamento.cliente.nome_exibicao}\nData: ${new Date(selectedAgendamento.data).toLocaleString()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="contai">
        <div className="d-flex">
          <div className="flexAuto w-100">
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    {/* Espaço vazio para futuras funcionalidades */}
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="w-100 my-2 zIndex"
                      placeholder="Pesquisar Agendamentos"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={agendamentos}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {agendamentos.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização do Agendamento */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Detalhes do Agendamento</Accordion.Header>
              <Accordion.Body>
                {selectedAgendamento && (


                  <div>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td><strong>Cliente:</strong></td>
                          <td>{selectedAgendamento.cliente.nome_exibicao}</td>
                        </tr>
                        <tr>
                          <td><strong>Data:</strong></td>
                          <td>{new Date(selectedAgendamento.data).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td><strong>Serviço:</strong></td>
                          <td>{selectedAgendamento.servico ? selectedAgendamento.servico.nome_servico : "Não informado"}</td>
                        </tr>
                        <tr>
                          <td><strong>Status:</strong></td>
                          <td>{selectedAgendamento.status}</td>
                        </tr>
                        <tr>
                          <td><strong>Descrição:</strong></td>
                          <td>{selectedAgendamento.descricao}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end mt-4">
            <div className="ms-2">
              <Button variant="outline-secondary" onClick={() => window.print()}>
                <FaPrint className="me-2" fontSize={20} />
                Imprimir
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="outline-danger" onClick={generatePDF}>
                <FaFilePdf className="me-2" fontSize={20} />
                Gerar PDF
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarAgendamento/${selectedAgendamento.id}`)}>
                <MdEditNote fontSize={24} />
                Editar Agendamento
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="success" onClick={shareOnWhatsApp}>
                <ImWhatsapp /> Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Agendamentos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Lista de Agendamentos" direccao="/addAgendamento" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarAgendamentos />
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
    </>
  );
};

export default Agendamentos;
