import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { MdDelete, MdEditNote } from "react-icons/md";
import imgErro from "../../assets/error.webp";
import { IoEye } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import imgN from "../../assets/not-found.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf, FaPrint } from "react-icons/fa";
import { jsPDF } from "jspdf";  // Importar a biblioteca jsPDF para geração de PDF
import logoMarca from "../../assets/lgo.png";
import Construcao from "../../components/compenentesAdmin/Construcao";


const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

const API_URL = import.meta.env.VITE_API_URL;




export function TabelaVizualizarCompras() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // Modal de visualização
  const [selectedCompra, setSelectedCompra] = useState(null); // Compra selecionada
  const navigate = useNavigate();

  // Função para visualizar compra
  const handleView = (compra) => {
    setSelectedCompra(compra); // Definir a compra selecionada
    setShowViewModal(true); // Mostrar a modal de visualização
  };

  // Função para deletar compra
  const handleDelete = (compra) => {
    setSelectedCompra(compra); // Definir a compra selecionada para exclusão
    setShowDeleteModal(true); // Mostrar a modal de confirmação de exclusão
  };

  // Função para confirmar exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/compras/${selectedCompra.id}`);
      setRecords(records.filter((compra) => compra.id !== selectedCompra.id));
      setShowDeleteModal(false);
      toast.success('Compra excluída com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir a compra:", error);
      setError("Erro ao excluir a compra.");
      toast.error('Erro ao excluir a compra!');
    }
  };

  // Função para gerar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#productDetailsTable"), {
      callback: function (doc) {
        doc.save(`${selectedCompra.numero_compra}.pdf`);  // Salva o PDF com o nome do produto
      },
      x: 10,
      y: 10,
    });
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Número da Compra",
      selector: (row) => row.id ? `CMP-00${row.id}` : "Sem informação"
    },
    { name: "Data da Compra", selector: (row) => new Date(row.data_compra).toLocaleDateString() || "Sem informação" },
    { name: "Celular", selector: (row) => row.celular || "Sem informação" },
    { name: "Email", selector: (row) => row.email || "Sem informação" },
    { name: "Endereço", selector: (row) => row.endereco || "Sem informação" },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row)}>
              <IoEye fontSize={20} />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdEditNote fontSize={23} />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={23} />
              &nbsp;&nbsp;Apagar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/compras`);
      if (Array.isArray(response.data)) {
        setRecords(response.data);
        setOriginalRecords(response.data);
      } else {
        throw new Error("Os dados retornados não contêm um array de compras.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6"></div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por número de compra ou email"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.numero_compra.toLowerCase().includes(query) ||
                    item.email.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        className="paddingTopTable"
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de Visualização de Compra */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className='d-flex justify-content-between w-100 '><h4 className='mt-3'>Detalhes da Compra</h4>
            <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompra && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Compra</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Número da Compra:</strong></td>
                    <td>{selectedCompra.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Data de Compra:</strong></td>
                    <td>{new Date(selectedCompra.data_compra).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Filial:</strong></td>
                    <td>{selectedCompra.filial_id}</td> {/* Exibir o nome ou id da filial */}
                  </tr>
                  <tr>
                    <td><strong>Distribuidor:</strong></td>
                    <td>{selectedCompra.distribuidor_id}</td> {/* Exibir o nome ou id do distribuidor */}
                  </tr>
                  <tr>
                    <td><strong>Celular:</strong></td>
                    <td>{selectedCompra.celular}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{selectedCompra.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Endereço:</strong></td>
                    <td>{selectedCompra.endereco}</td>
                  </tr>
                  <tr>
                    <td><strong>Fabricante:</strong></td>
                    <td>{selectedCompra.fabricante_id}</td> {/* Exibir o nome ou id do fabricante */}
                  </tr>
                  <tr>
                    <td><strong>Produto:</strong></td>
                    <td>{selectedCompra.produto_id}</td> {/* Exibir o nome ou id do produto */}
                  </tr>
                  <tr>
                    <td><strong>Quantidade:</strong></td>
                    <td>{selectedCompra.quantidade}</td>
                  </tr>
                  <tr>
                    <td><strong>Preço Unitário (Kz):</strong></td>
                    <td>{selectedCompra.preco}</td>
                  </tr>
                  <tr>
                    <td><strong>Preço Total (Kz):</strong></td>
                    <td>{selectedCompra.preco_total}</td>
                  </tr>
                  <tr>
                    <td><strong>Texto da Nota:</strong></td>
                    <td>{selectedCompra.texto_nota}</td>
                  </tr>
                  <tr>
                    <td><strong>Nota Interna:</strong></td>
                    <td>{selectedCompra.interna ? 'Sim' : 'Não'}</td>
                  </tr>
                  <tr>
                    <td><strong>Compartilhada com Fornecedor:</strong></td>
                    <td>{selectedCompra.compartilhada ? 'Sim' : 'Não'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}


        </Modal.Body>
        <Modal.Footer>
          {/* Ícones de Imprimir e Gerar PDF */}
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
          <Button variant="primary" className='links-acessos ms-2' onClick={() => navigate(`/editarCompra/${selectedCompra.id}`)}>
            <MdEditNote fontSize={24} />
            Editar Compra
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir esta compra?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}


const Compras = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex">
        <SideBar />
            {/*Seccao em construcao */}
                 <Construcao />
        <div className="flexAuto w-100 d-none">
          <TopoAdmin entrada="Compras" direccao="/addCompras" icone={<IoIosAdd />} leftR="/ComprasList" />
          <div className="vh-100 alturaPereita">
            <TabelaVizualizarCompras />
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

export default Compras;
