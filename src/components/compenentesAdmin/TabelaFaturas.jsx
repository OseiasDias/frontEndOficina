import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { GiMoneyStack } from "react-icons/gi";
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
    },
  },
};

export default function TabelaFaturas() {
  const navigate = useNavigate(); // Inicializar o hook useNavigate
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);

  const columns = [
    { name: "Marca", selector: (row) => row.marca },
    { name: "Modelo", selector: (row) => row.modelo },
    { name: "Ano", selector: (row) => row.ano },
    { name: "Placa", selector: (row) => row.placa },
    {
      name: "Cliente",
      selector: (row) =>
        row.id_cliente
          ? `C00${row.id_cliente} - ${row.clienteNome || "Nome não encontrado"}`
          : "ID de Cliente não disponível",
    },
    { name: "Status de Reparação", selector: (row) => row.status_reparacao },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleEdit(row.id_veiculo)}>
              <GiMoneyStack  />
              &nbsp;&nbsp;Pagar
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

  const handleEdit = (id) => {
    navigate(`/pagarConta/${id}`); // Redireciona para a rota de edição
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

      const vehiclesWithClientNames = await Promise.all(
        vehicles.map(async (vehicle) => {
          if (vehicle.id_cliente) {
            try {
              const clientResponse = await fetch(`http://localhost:5000/api/clientes/${vehicle.id_cliente}`);
              if (clientResponse.ok) {
                const clientData = await clientResponse.json();
                return { ...vehicle, clienteNome: clientData.nome };
              }
            } catch {
              console.warn("Erro ao buscar o cliente para o veículo", vehicle.id_veiculo);
            }
          }
          return { ...vehicle, clienteNome: "Cliente não encontrado" };
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
          <h4>Lista de Reparações a Pagar</h4>
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
