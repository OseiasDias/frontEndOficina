import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios"; // Para fazer requisições HTTP
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { MdDelete, MdEditNote } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify"; // Para notificações
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toast
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { FaFilePdf, FaLock, FaPrint } from "react-icons/fa";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import { ImWhatsapp } from "react-icons/im";
import jsPDF from "jspdf";
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



export function TabelaVizualizarGatepasses() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a modal de exclusão
  const [selectedRecord, setSelectedRecord] = useState(null); // Estado para armazenar a passagem de portão selecionada
  const [showViewModal, setShowViewModal] = useState(false);  // Estado para controlar a exibição da modal de visualização
  const [selectedGatepass, setSelectedGatepass] = useState(null); // Estado para armazenar os dados do gatepass selecionado
  const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação

  const navigate = useNavigate(); // Hook do React Router para navegação

  // Função para abrir a modal de visualização e redirecionar para a página de visualização

  const handleView = (record) => {
    setSelectedGatepass(record); // Armazenar o record selecionado
    setShowViewModal(true); // Mostrar a modal de visualização
  };


  // Função para abrir a modal de confirmação de exclusão
  const handleDelete = (record) => {
    setSelectedRecord(record); // Definir o record selecionado para exclusão
    setShowDeleteModal(true); // Mostrar a modal de confirmação de exclusão
  };

  const handleViewEdit = (record) => {
    navigate(`/editarGatepass/${record.id}`);
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/gatepasses/${selectedRecord.id}`);
      // Após excluir, fechar a modal e atualizar os dados
      setRecords(records.filter((record) => record.id !== selectedRecord.id));
      setShowDeleteModal(false);

      // Exibir notificação de sucesso usando o toast
      toast.success('Gatepass excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir o gatepass:", error);
      setError("Erro ao excluir o gatepass.");
      // Exibir notificação de erro usando o toast
      toast.error('Erro ao excluir o gatepass!');
    }
  };

  // Colunas da tabela
  const columns = [
    { name: "Jobcard", selector: (row) => row.jobcard || "Sem informação" },
    { name: "Gatepass No.", selector: (row) => row.gatepass_no || "Sem informação" },
    { name: "Nome do Cliente", selector: (row) => row.customer_name || "Sem informação" },
    { name: "Sobrenome", selector: (row) => row.lastname || "Sem informação" },
    // { name: "Email", selector: (row) => row.email || "Sem informação" },
    { name: "Telefone", selector: (row) => row.mobile || "Sem informação" },
    { name: "Veículo", selector: (row) => row.vehicle_name || "Sem informação" },
    { name: "Tipo de Veículo", selector: (row) => row.veh_type || "Sem informação" },
    //{ name: "Chassi", selector: (row) => row.chassis || "Sem informação" },
    { name: "KM", selector: (row) => row.kms || "Sem informação" },
    //{ name: "Data de Saída", selector: (row) => row.out_date || "Sem informação" },
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
            <Dropdown.Item onClick={() => handleViewEdit(row)}>
              <FaLock fontSize={20} />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={23} />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/gatepasses`);

      // Verifique se a chave `data` existe e se é um array
      if (Array.isArray(response.data.data)) {
        setRecords(response.data.data); // Use response.data.data para acessar o array
        setOriginalRecords(response.data.data); // Armazene o array original para filtragem
        setOrdemData(response.data); // Armazenar os dados da ordem de reparação no estado

      } else {
        console.error("Os dados retornados não contêm um array de gatepasses:", response.data);
        throw new Error("Os dados retornados não contêm um array de gatepasses.");
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
    return (<div className='text-center'><h3 className='text-danger'>{error}</h3>
      <img src={imgErro} alt="Carregando" className="w-50 d-block mx-auto" />
    </div>);
  };


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
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por jobcard ou nome do cliente"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.jobcard.toLowerCase().includes(query) ||
                    item.customer_name.toLowerCase().includes(query)
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

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir esta passagem de portão?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container para mostrar as notificações */}
      <ToastContainer position="top-center" />

      {/* Modal de Visualização de Gatepass */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-between w-100"><h4 className="mt-3">Detalhes da Passagem de Portão</h4> <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGatepass && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Passagem de Portão</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Nº do catrão:</strong></td>
                    <td>{selectedGatepass.jobcard || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Número da Passagem de Portão:</strong></td>
                    <td>{selectedGatepass.gatepass_no || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Nome do Cliente:</strong></td>
                    <td>{selectedGatepass.customer_name || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Sobrenome:</strong></td>
                    <td>{selectedGatepass.lastname || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Telefone:</strong></td>
                    <td>{selectedGatepass.mobile || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Veículo:</strong></td>
                    <td>{selectedGatepass.vehicle_name || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>Tipo de Veículo:</strong></td>
                    <td>{selectedGatepass.veh_type || "Sem informação"}</td>
                  </tr>
                  <tr>
                    <td><strong>KM:</strong></td>
                    <td>{selectedGatepass.kms || "Sem informação"} KM</td>
                  </tr>
                  {/* Adicione outras colunas conforme necessário */}
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
          </div>  </Modal.Footer>
      </Modal>

    </div>
  );
}



const Ingresso = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          {/*Seccao em construcao */}
          <Construcao />
          <div className="flexAuto w-100 d-none">
            <TopoAdmin entrada="Ingresso" direccao="/addGetPass" icone={<IoIosAdd />} />

            <div className="vh-100 alturaPereita">

              <TabelaVizualizarGatepasses />

            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">

                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
                reservados.
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

export default Ingresso;
