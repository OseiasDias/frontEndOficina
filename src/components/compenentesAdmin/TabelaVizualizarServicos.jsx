import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginTop: "60px",
    },
  },
  cells: {
    style: {
      whiteSpace: 'nowrap', // Impede que o texto quebre em múltiplas linhas
    },
  },
};

export default function TabelaServicos() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false); // Modal para visualização
  const [servicosIdToDelete, setServicosIdToDelete] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // Para armazenar os detalhes do serviço

  const columns = [
    { name: "Nome do Serviço", selector: (row) => row.nome_servico, sortable: true },
    { name: "Descrição", selector: (row) => row.descricao, sortable: true },
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
            <Dropdown.Item onClick={() => handleEdit(row.id_servico)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_servico)}
              className="text-danger"
            >
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleVisualizar = (service) => {
    setSelectedService(service);  // Armazena os dados do serviço selecionado
    setShowVisualizarModal(true); // Abre a modal para visualização
  };

  const handleEdit = (id) => {
    console.log("Editar Serviço com ID:", id);
  };

  const openDeleteModal = (id) => {
    setServicosIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/servicos/${servicosIdToDelete}`, {
        method: "DELETE",
      });
      const updatedRecords = records.filter((record) => record.id_servico !== servicosIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_servico !== servicosIdToDelete));
      setShowModal(false);
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir Serviço:", error);
      toast.error("Erro ao excluir Serviço.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/servicos");
      if (!response.ok) throw new Error("Erro ao buscar dados dos serviços");
      const data = await response.json();
      setRecords(data);
      setOriginalRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Serviços</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome ou descrição"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome_servico.toLowerCase().includes(query) || item.descricao.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <div className="table-responsive"> {/* Adiciona a responsividade à tabela */}
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          noDataComponent={<p>Nenhum serviço encontrado.</p>}
          footer={<div>Exibindo {records.length} registros no total</div>}
        />
      </div>

      {/* Modal para visualização do serviço */}
      <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedService ? selectedService.nome_servico : "Carregando..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService ? (
            <>
              <p><strong>Nome do Serviço:</strong> {selectedService.nome_servico}</p>
              <p><strong>Descrição:</strong> {selectedService.descricao}</p>
              {/* Adicione outros dados do serviço conforme necessário */}
            </>
          ) : (
            <p>Carregando dados do serviço...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este serviço?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
