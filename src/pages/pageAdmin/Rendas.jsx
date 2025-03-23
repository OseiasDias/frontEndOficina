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

const API_URL = import.meta.env.VITE_API_URL;



export function ListarRendas() {
  const [rendas, setRendas] = useState([]); // Lista de rendas
  const [loading, setLoading] = useState(true); // Variável de estado para carregamento
  const [error, setError] = useState(null); // Variável de estado para erro
  const [showViewModal, setShowViewModal] = useState(false); // Controle da visibilidade do modal
  const [selectedRenda, setSelectedRenda] = useState(null); // Renda selecionada para visualização
  const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação
  const navigate = useNavigate(); // Navegação após sucesso

  // Buscar rendas da API
  const fetchRendas = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Reseta qualquer erro anterior
    try {
      const response = await axios.get(`${API_URL}/rendas`);
      setRendas(response.data); // Preenche a lista com os dados recebidos
      setOrdemData(response.data);

    } catch (error) {
      console.error("Erro ao carregar as rendas:", error);
      setError("Erro ao carregar as rendas."); // Define a mensagem de erro
      toast.error("Erro ao carregar as rendas.");
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchRendas();
  }, []);

  // Função de busca para filtrar as rendas
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchRendas();
    } else {
      const filteredRecords = rendas.filter((item) =>
        item.rotulo_principal.toLowerCase().includes(query) ||
        item.rotulo_renda.toLowerCase().includes(query)
      );
      setRendas(filteredRecords);
    }
  };

  // Função para excluir uma renda
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/rendas/${id}`);
      setRendas(rendas.filter((item) => item.id !== id)); // Remove a renda excluída
      toast.success("Renda excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a renda:", error);
      toast.error("Erro ao excluir a renda.");
    }
  };

  // Função para abrir o modal e setar a renda selecionada
  const handleVisualizar = (renda) => {
    setSelectedRenda(renda);
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
      name: "Entrada de Renda",
      selector: (row) => row.entrada_renda + " Kz",
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
                      placeholder="Pesquisar Rendas"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={rendas}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {rendas.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização da Renda */}

      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
            <Modal.Title className="d-flex justify-content-between w-100"><h4 className="mt-3">Detalhes da Renda</h4> <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60} />
                    </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRenda && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Renda</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Fatura:</strong></td>
                    <td>{selectedRenda.fatura}</td>
                  </tr>
                  <tr>
                    <td><strong>Valor Pendente:</strong></td>
                    <td>{selectedRenda.valor_pendente} Kz</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{selectedRenda.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Rótulo Principal:</strong></td>
                    <td>{selectedRenda.rotulo_principal}</td>
                  </tr>
                  <tr>
                    <td><strong>Data de Recebimento:</strong></td>
                    <td>{selectedRenda.data_recebimento}</td>
                  </tr>
                  <tr>
                    <td><strong>Tipo de Pagamento:</strong></td>
                    <td>{selectedRenda.tipo_pagamento === "1" ? "Pagamento à Vista" : "Outros"}</td>
                  </tr>
                  <tr>
                    <td><strong>Galho:</strong></td>
                    <td>{selectedRenda.galho}</td>
                  </tr>
                  <tr>
                    <td><strong>Entrada de Renda:</strong></td>
                    <td>{selectedRenda.entrada_renda} Kz</td>
                  </tr>
                  <tr>
                    <td><strong>Rótulo da Renda:</strong></td>
                    <td>{selectedRenda.rotulo_renda}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end mt-4">
            {/* Botões: Imprimir, Gerar PDF, Editar e WhatsApp */}
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
              <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarOrdemReparacao/${ordemData.id}`)}>
                <MdEditNote fontSize={24} />
                Editar Ordem
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



const Rendas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <h4 className='me-3'></h4>

            <TopoAdmin entrada="Lista de Rendas" direccao="/addRenda" icone={<RiAddFill />} leftR="/ProdutosList" />


            <div className="vh-100 alturaPereita">
              <ListarRendas />
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

export default Rendas;
