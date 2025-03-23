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
import Construcao from '../../components/compenentesAdmin/Construcao';


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

const API_URL = import.meta.env.VITE_API_URL;



export function ListarDespesas() {
  const [despesas, setDespesas] = useState([]); // Lista de despesas
  const [loading, setLoading] = useState(true); // Variável de estado para carregamento
  const [error, setError] = useState(null); // Variável de estado para erro
  const [showViewModal, setShowViewModal] = useState(false); // Controle da visibilidade do modal
  const [selectedDespesa, setSelectedDespesa] = useState(null); // Despesa selecionada para visualização
  const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação
  const navigate = useNavigate(); // Navegação após sucesso

  // Buscar despesas da API
  const fetchDespesas = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Reseta qualquer erro anterior
    try {
      const response = await axios.get(`${API_URL}/despesas`);
      setDespesas(response.data); // Preenche a lista com os dados recebidos
      setOrdemData(response.data);

    } catch (error) {
      console.error("Erro ao carregar as despesas:", error);
      setError("Erro ao carregar as despesas."); // Define a mensagem de erro
      toast.error("Erro ao carregar as despesas.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchDespesas();
  }, []);

  // Função de busca para filtrar as despesas
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchDespesas();
    } else {
      const filteredRecords = despesas.filter((item) =>
        item.rotulo_principal.toLowerCase().includes(query) ||
        item.rotulo_despesa.toLowerCase().includes(query)
      );
      setDespesas(filteredRecords);
    }
  };

  // Função para excluir uma despesa
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/despesas/${id}`);
      setDespesas(despesas.filter((item) => item.id !== id)); // Remove a despesa excluída
      toast.success("Despesa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      toast.error("Erro ao excluir a despesa.");
    }
  };

  // Função para abrir o modal e setar a despesa selecionada
  const handleVisualizar = (despesa) => {
    setSelectedDespesa(despesa);
    setShowViewModal(true);
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Fatura",
      selector: (row) => row.fatura,
      sortable: true,
    },
    {
      name: "Valor Pendente",
      selector: (row) => row.valor_pendente + " Kz",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Rótulo Principal",
      selector: (row) => row.rotulo_principal,
      sortable: true,
    },
    {
      name: "Entrada de Despesa",
      selector: (row) => row.entrada_despesa + " Kz",
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
        doc.save(`${ordemData.jobno}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Confira a ordem de reparação: ${ordemData.jobno}\nDetalhes: ${ordemData.defeito_ou_servico}`;
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
                      placeholder="Pesquisar Despesas"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={despesas}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {despesas.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização da Despesa */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-between w-100"><h4 className="mt-3">Detalhes da Despesa</h4> <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60} />
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {selectedDespesa && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Despesa</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Fatura:</strong></td>
                    <td>{selectedDespesa.fatura}</td>
                  </tr>
                  <tr>
                    <td><strong>Valor Pendente:</strong></td>
                    <td>{selectedDespesa.valor_pendente} Kz</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{selectedDespesa.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Rótulo Principal:</strong></td>
                    <td>{selectedDespesa.rotulo_principal}</td>
                  </tr>
                  <tr>
                    <td><strong>Data de Recebimento:</strong></td>
                    <td>{selectedDespesa.data_recebimento}</td>
                  </tr>
                  <tr>
                    <td><strong>Tipo de Pagamento:</strong></td>
                    <td>{selectedDespesa.tipo_pagamento === "1" ? "Pagamento à Vista" : "Outros"}</td>
                  </tr>
                  <tr>
                    <td><strong>Galho:</strong></td>
                    <td>{selectedDespesa.galho}</td>
                  </tr>
                  <tr>
                    <td><strong>Entrada de Despesa:</strong></td>
                    <td>{selectedDespesa.entrada_despesa} Kz</td>
                  </tr>
                  <tr>
                    <td><strong>Rótulo da Despesa:</strong></td>
                    <td>{selectedDespesa.rotulo_despesa}</td>
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
              <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarDespesa/${ordemData.id}`)}>
                <MdEditNote fontSize={24} />
                Editar Despesa
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="success" onClick={shareOnWhatsApp}>
                <ImWhatsapp />  Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Despesas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

           {/*Seccao em construcao */}
                    <Construcao />
          <div className="flexAuto w-100 d-none">
            <TopoAdmin entrada="Lista de Despesas" direccao="/addDispesas" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarDespesas />
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

export default Despesas;
