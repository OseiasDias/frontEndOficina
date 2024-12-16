import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

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
    style: {},
  },
};

export default function TabelaVizualizarVeiculos() {

  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);  // Modal de visualização
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Dados do veículo selecionado
  const [clientDetails, setClientDetails] = useState(null); // Dados do cliente


  const handleEdit = (id) => {
    navigate(`/editarVeiculo/${id}`);
  };

  const columns = [
    { name: "Marca", selector: (row) => row.marca },
    { name: "Modelo", selector: (row) => row.modelo },
    { name: "Ano", selector: (row) => row.ano },
    { name: "Placa", selector: (row) => row.placa },
    {
      name: "Cliente",
      selector: (row) =>
        row.id_cliente
          ? `${row.id_cliente} - ${row.clienteNome || "Nome não encontrado"}`
          : "ID de Cliente não disponível",
    },
    { name: "Status de Reparação", selector: (row) => row.status_reparacao },
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
            <Dropdown.Item onClick={() => handleEdit(row.id_veiculo)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_veiculo)}
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

 

  // Função para visualizar os detalhes do veículo
  const handleVisualizar = async (vehicle) => {
    setSelectedVehicle(vehicle);  // Armazena os dados do veículo selecionado
    setShowVisualizarModal(true);  // Exibe a modal de visualização

    if (vehicle.id_cliente) {
      // Buscar os dados do cliente associado ao veículo
      try {
        const response = await fetch(`http://localhost:5000/api/clientes/${vehicle.id_cliente}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do cliente");
        }
        const clientData = await response.json();
        setClientDetails(clientData); // Armazena os dados do cliente
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
        toast.error("Erro ao carregar os dados do cliente.");
        setClientDetails(null);
      }
    }
  };

  
  const openDeleteModal = (id) => {
    setVehicleIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/veiculos/${vehicleIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_veiculo !== vehicleIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_veiculo !== vehicleIdToDelete));

      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModal(false);
      toast.success("Veículo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      toast.error("Erro ao excluir veículo.");
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/veiculos");
      if (!response.ok) throw new Error("Erro ao buscar dados dos veículos");
      const vehicles = await response.json();
  
      // Ordenar os veículos por ID descendente
      const sortedVehicles = vehicles.sort((a, b) => b.id_veiculo - a.id_veiculo);
  
      const vehiclesWithClientNames = await Promise.all(
        sortedVehicles.map(async (vehicle) => {
          if (vehicle.id_cliente) {
            try {
              const clientResponse = await fetch(`http://localhost:5000/api/clientes/${vehicle.id_cliente}`);
              if (clientResponse.ok) {
                const clientData = await clientResponse.json();
                return {...vehicle, clienteNome: clientData.nome };
              }
            } catch {
              console.warn("Erro ao buscar o cliente para o veículo", vehicle.id_veiculo);
            }
          }
          return {...vehicle, clienteNome: "Cliente não encontrado" };
        })
      );
  
      setRecords(vehiclesWithClientNames);
      setOriginalRecords(vehiclesWithClientNames);
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
          <h4>Lista de Veículos</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por marca, modelo ou placa"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.modelo.toLowerCase().includes(query) ||
                  item.marca.toLowerCase().includes(query) ||
                  item.placa.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        noDataComponent={<p>Nenhum veículo encontrado.</p>}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal para visualização do veículo */}
      <Modal show={showVisualizarModal} scrollable onHide={() => setShowVisualizarModal(false)} centered size="xl">
  <Modal.Header closeButton>
    <Modal.Title>{selectedVehicle ? selectedVehicle.marca || "Sem informação" : "Carregando..."}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedVehicle ? (
      <>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <p><strong>Marca:</strong> {selectedVehicle.marca || "Sem informação"}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <p><strong>Modelo:</strong> {selectedVehicle.modelo || "Sem informação"}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <p><strong>Placa:</strong> {selectedVehicle.placa || "Sem informação"}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <p><strong>Status de Reparação:</strong> {selectedVehicle.status_reparacao || "Sem informação"}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-12 my-2">
            <p><span className="fw-bold">Motivo de Visita:</span> {selectedVehicle.motivo_visita || "Sem informação"}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-12 my-2">
            <p><span className="fw-bold">Analise Diagnostica:</span> {selectedVehicle.analise_diagnostica || "Sem informação"}</p>
          </div>
        </div>

        {/* Dados do cliente */}
        {clientDetails && (
          <>
            <hr />
            <h6>Detalhes do Cliente</h6>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Nome:</strong> {clientDetails.nome || "Sem informação"}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Email:</strong> {clientDetails.email || "Sem informação"}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Endereço:</strong> {clientDetails.endereco || "Sem informação"}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Telefone:</strong> {clientDetails.telefone || "Sem informação"}</p>
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <p>Carregando dados do veículo...</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
      Fechar
    </Button>
  </Modal.Footer>
</Modal>

      {/* Modal para confirmar exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este veículo?</Modal.Body>
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
