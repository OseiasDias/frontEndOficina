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
import logoMarca from "../../assets/lgo.png";


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

export function ListarServicos() {
  const [servicos, setServicos] = useState([]); // Lista de serviços
  const [loading, setLoading] = useState(true); // Variável de estado para carregamento
  const [error, setError] = useState(null); // Variável de estado para erro
  const [showViewModal, setShowViewModal] = useState(false); // Controle da visibilidade do modal
  const [selectedServico, setSelectedServico] = useState(null); // Serviço selecionado para visualização
  const navigate = useNavigate(); // Navegação após sucesso

  // Buscar serviços da API
  const fetchServicos = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Reseta qualquer erro anterior
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/servicos");
      setServicos(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar os serviços:", error);
      setError("Erro ao carregar os serviços."); // Define a mensagem de erro
      toast.error("Erro ao carregar os serviços.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchServicos();
  }, []);

  // Função de busca para filtrar os serviços
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchServicos();
    } else {
      const filteredRecords = servicos.filter((item) =>
        item.nome_servico.toLowerCase().includes(query) ||
        item.descricao.toLowerCase().includes(query)
      );
      setServicos(filteredRecords);
    }
  };

  // Função para excluir um serviço
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/servicos/${id}`);
      setServicos(servicos.filter((item) => item.id !== id)); // Remove o serviço excluído
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o serviço:", error);
      toast.error("Erro ao excluir o serviço.");
    }
  };

  // Função para abrir o modal e setar o serviço selecionado
  const handleVisualizar = (servico) => {
    setSelectedServico(servico);
    setShowViewModal(true);
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Nome do Serviço",
      selector: (row) => row.nome_servico,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: (row) => row.descricao,
      sortable: true,
    },
    {
      name: "Preço",
      selector: (row) => `${row.preco} Kz`,
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
      </div>
    );
  }

  // Exibe mensagem de erro
  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-danger">{error}</h3>
      </div>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#productDetailsTable"), {
      callback: function (doc) {
        doc.save(`${selectedServico.nome_servico}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Confira o serviço: ${selectedServico.nome_servico}\nDescrição: ${selectedServico.descricao}`;
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
                      placeholder="Pesquisar Serviços"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={servicos}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {servicos.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização do Serviço */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
           <Modal.Title className="d-flex justify-content-between w-100"><h4 className="mt-3">Detalhes do Serviço</h4> <img src={logoMarca}  className="d-block mx-3" alt="logo da Biturbo" width={160} height={60}/>
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedServico && (
            <div>
              <h4 className="text-center text-underline">Detalhes do Serviço</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Nome do Serviço:</strong></td>
                    <td>{selectedServico.nome_servico}</td>
                  </tr>
                  <tr>
                    <td><strong>Descrição:</strong></td>
                    <td>{selectedServico.descricao}</td>
                  </tr>
                  <tr>
                    <td><strong>Preço:</strong></td>
                    <td>{selectedServico.preco} Kz</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
              <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarServico/${selectedServico.id}`)}>
                <MdEditNote fontSize={24} />
                Editar Serviço
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

const Servicos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Lista de Serviços" direccao="/addServico" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarServicos />
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

export default Servicos;
