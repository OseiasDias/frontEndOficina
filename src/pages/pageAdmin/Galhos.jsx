/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline, MdEditNote } from 'react-icons/md';
import { FaFilePdf, FaPrint, FaRegEye } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ImWhatsapp } from 'react-icons/im';
import logoMarca from '../../assets/lgo.png';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import SideBar from '../../components/compenentesAdmin/SideBar';
import { RiAddFill } from 'react-icons/ri';
import jsPDF from 'jspdf';
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



export function ListarFiliais() {
  const [filiais, setFiliais] = useState([]); // Lista de filiais
  const [loading, setLoading] = useState(true); // Variável de estado para carregamento
  const [error, setError] = useState(null); // Variável de estado para erro
  const [showViewModal, setShowViewModal] = useState(false); // Controle da visibilidade do modal
  const [selectedFilial, setSelectedFilial] = useState(null); // Filial selecionada para visualização
  const navigate = useNavigate(); // Navegação após sucesso

  // Buscar filiais da API
  const fetchFiliais = async () => {
    setLoading(true);  // Ativa o estado de carregamento
    setError(null);    // Reseta qualquer erro anterior
    try {
      const response = await axios.get(`${API_URL}/filiais`);
      setFiliais(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error('Erro ao carregar as filiais:', error);
      setError('Erro ao carregar as filiais.'); // Define a mensagem de erro
      toast.error('Erro ao carregar as filiais.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchFiliais();
  }, []);

  // Função de busca para filtrar as filiais
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchFiliais();
    } else {
      const filteredRecords = filiais.filter((item) =>
        item.nome_filial.toLowerCase().includes(query) ||
        item.numero_contato.toLowerCase().includes(query)
      );
      setFiliais(filteredRecords);
    }
  };

  // Função para excluir uma filial
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/filiais/${id}`);
      setFiliais(filiais.filter((item) => item.id !== id)); // Remove a filial excluída
      toast.success('Filial excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a filial:', error);
      toast.error('Erro ao excluir a filial.');
    }
  };

  // Função para abrir o modal e setar a filial selecionada
  const handleVisualizar = (filial) => {
    setSelectedFilial(filial);
    setShowViewModal(true);
  };

  // Colunas da tabela
  const columns = [
    {
      name: 'Nome da Filial',
      selector: (row) => row.nome_filial,
      sortable: true,
    },
    {
      name: 'Contato',
      selector: (row) => row.numero_contato,
      sortable: true,
    },
    {
      name: 'Localização',
      selector: (row) => `${row.municipio}, ${row.provincia}`,
      sortable: true,
    },
    {
      name: 'Ações',
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
  const generatePDF = () => {
      const doc = new jsPDF();
      doc.html(document.querySelector("#productDetailsTable"), {
        callback: function (doc) {
          doc.save(`${item.jobno}.pdf`);
        },
        x: 10,
        y: 10,
      });
    };

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
                      placeholder="Pesquisar Filiais"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={filiais}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {filiais.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização da Filial */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-between w-100">
            <h4 className="mt-3">Detalhes da Filial</h4>
            <img src={logoMarca} className="d-block mx-3" alt="logo da empresa" width={160} height={60} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFilial && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Filial</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Nome da Filial:</strong></td>
                    <td>{selectedFilial.nome_filial}</td>
                  </tr>
                  <tr>
                    <td><strong>Contato:</strong></td>
                    <td>{selectedFilial.numero_contato}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{selectedFilial.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Endereço:</strong></td>
                    <td>{selectedFilial.endereco}</td>
                  </tr>
                  <tr>
                    <td><strong>Localização:</strong></td>
                    <td>{`${selectedFilial.municipio}, ${selectedFilial.provincia}, ${selectedFilial.pais_id}`}</td>
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
              <Button  className='links-acessos' onClick={() => window.location.href = `/editarFilial/${selectedFilial.id}`}>
                <MdEditNote fontSize={24} />
                Editar Filial
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="success" onClick={() => {
                const message = `Confira a filial: ${selectedFilial.nome_filial}\nContato: ${selectedFilial.numero_contato}`;
                const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}>
                <ImWhatsapp /> Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}



const Filiais = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

             {/*Seccao em construcao */}
              <Construcao />
          <div className="flexAuto w-100 d-none">
            <TopoAdmin entrada="Lista de Filiais" direccao="/addGalho" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarFiliais />
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

export default Filiais;
