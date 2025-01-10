import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
 //import { useNavigate } from "react-router-dom";  Importando o hook useNavigate

// Definição de estilos personalizados para a tabela
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

export default function TabelaAgendamento() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);  // Modal de Visualização
  const [showExcluirModal, setShowExcluirModal] = useState(false);  // Modal de Exclusão
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal de Confirmação de Status
  const [agendamentoIdToDelete, setAgendamentoIdToDelete] = useState(null);
  const [agendamentoToConfirm, setAgendamentoToConfirm] = useState(null); // Agendamento para Confirmar/Cancelar
  const [agendamentoDetails, setAgendamentoDetails] = useState(null); // Detalhes do agendamento para a modal de visualização

  // const navigate = useNavigate();  Inicializa o hook para navegação

  // Definição das colunas da tabela
  const columns = [
    { name: "Data", selector: (row) => new Date(row.data).toLocaleDateString() },
    { name: "Cliente", selector: (row) => row.nome_cliente || "Carregando..." },
    {
      name: "Veículo",
      selector: (row) => row.veiculo
        ? `${row.veiculo.marca} ${row.veiculo.modelo} (${row.veiculo.ano})`
        : "Carregando...",
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status === 1) {
          return "Confirmado";
        } else if (row.status === 0) {
          return "Cancelado";
        }
        return "Sem status"; // Caso não tenha status definido
      }
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
            <Dropdown.Item onClick={() => openConfirmModal(row.id_agendamento, row.status)}>
              <ImCancelCircle />
              &nbsp;&nbsp;{row.status === 1 ? "Cancelar" : "Confirmar"}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_agendamento)}  // Habilitando a exclusão na tabela
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

  // Função para abrir a modal de visualização com os dados do agendamento
  const handleVisualizar = async (row) => {
    try {
      const clienteResponse = await fetch(`http://127.0.0.1:8000/api/clientes/${row.id_cliente}`);
      const veiculoResponse = await fetch(`http://127.0.0.1:8000/api/veiculos/${row.id_veiculo}`);
      const servicoResponse = await fetch(`http://127.0.0.1:8000/api/servicos/${row.id_servico}`);

      const clienteData = await clienteResponse.json();
      const veiculoData = await veiculoResponse.json();
      const servicoData = await servicoResponse.json();

      setAgendamentoDetails({
        agendamento: row,
        cliente: clienteData,
        veiculo: veiculoData,
        servico: servicoData,
      });

      setShowVisualizarModal(true);
    } catch (err) {
      console.error("Erro ao carregar os detalhes do agendamento:", err);
      toast.error("Erro ao carregar os detalhes.");
    }
  };

  const openConfirmModal = (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1; // Inverte o status (0 = cancelado, 1 = confirmado)
    setAgendamentoToConfirm({ id, novoStatus });
    setShowConfirmModal(true);  // Exibe a modal de confirmação
  };
  /*
  const handleConfirmCancel = async () => {
    if (!agendamentoToConfirm) return;
  
    const { id, novoStatus } = agendamentoToConfirm;
  
    // Mapeia o novoStatus para uma string (Confirmado ou Cancelado)
    const statusString = novoStatus === 1 ? "Confirmado" : "Cancelado";
  
    try {
      // Faz a atualização do status na API
      const response = await fetch(`http://localhost:5000/api/agendamentos/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novoStatus: statusString }), // Envia o novo status
      });
  
      if (!response.ok) throw new Error("Erro ao atualizar status do agendamento");
  
      // Atualiza o estado da tabela local
      const updatedRecords = records.map((agendamento) =>
        agendamento.id_agendamento === id
          ? { ...agendamento, status: novoStatus } // Atualiza o status
          : agendamento
      );
  
      setRecords(updatedRecords); // Atualiza os registros na tabela
      toast.success(`Agendamento ${statusString} com sucesso!`);
      setShowConfirmModal(false); // Fecha a modal
    } catch (err) {
      toast.error("Erro ao atualizar status do agendamento.");
    }
  };*/

  const openDeleteModal = (id) => {
    setAgendamentoIdToDelete(id);  // Define o agendamento a ser excluído
    setShowExcluirModal(true);  // Abre a modal de exclusão
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/agendamentos/${agendamentoIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_agendamento !== agendamentoIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_agendamento !== agendamentoIdToDelete));

      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowExcluirModal(false); // Fecha a modal de exclusão
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir agendamento.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/agendamentos");
      if (!response.ok) throw new Error("Erro ao buscar dados dos agendamentos");
      const data = await response.json();

      const dataWithDetails = await Promise.all(
        data.map(async (agendamento) => {
          // Fetch de cliente e veículo de acordo com as novas rotas
          const clienteResponse = await fetch(`http://127.0.0.1:8000/api/clientes/${agendamento.id_cliente}`);
          const veiculoResponse = await fetch(`http://127.0.0.1:8000/api/veiculos/${agendamento.id_veiculo}`);

          const clienteData = await clienteResponse.json();
          const veiculoData = await veiculoResponse.json();

          return {
            ...agendamento,
            nome_cliente: clienteData.nome_exibicao || "Sem nome",
            veiculo: {
              marca: veiculoData.marca_veiculo || "Sem marca",
              modelo: veiculoData.modelo_veiculo || "Sem modelo",
              ano: veiculoData.ano_modelo || "Sem ano",
              placa: veiculoData.numero_placa || "Sem placa",
            },
          };
        })
      );

      // Filtra os agendamentos para exibir apenas os que não passaram da data atual
      const today = new Date();
      const upcomingAgendamentos = dataWithDetails.filter((agendamento) => {
        const agendamentoDate = new Date(agendamento.data);
        return agendamentoDate >= today;
      });

      setRecords(upcomingAgendamentos);
      setOriginalRecords(upcomingAgendamentos);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Carrega os dados assim que o componente for montado
  }, []);

  return (
    <div className="cont">
      <ToastContainer />
    

      {loading ? (
            <div className="text-center">
            <h4>Carregando...</h4>
            <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
          </div>
      ) : error ? (
        <div className='text-center'><h3 className='text-danger'>{error}</h3>
      <img src={imgErro} alt="Carregando" className="w-50 d-block mx-auto" />
    </div>
      ) : (
        <DataTable
        
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
        />
      )}

      {/* Modal de Visualização */}
      <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Visualizar Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {agendamentoDetails ? (
            <>
              <div className="row">
                <p><strong>Cliente:</strong> {agendamentoDetails.cliente.nome_exibicao}</p>
                <p><strong>Veículo:</strong> {`${agendamentoDetails.veiculo.marca} ${agendamentoDetails.veiculo.modelo} (${agendamentoDetails.veiculo.ano})`}</p>
                <p><strong>Placa:</strong> {agendamentoDetails.veiculo.placa}</p>
                <p><strong>Serviço:</strong> {agendamentoDetails.servico.descricao}</p>
                <p><strong>Data:</strong> {new Date(agendamentoDetails.agendamento.data).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {agendamentoDetails.agendamento.status === 1 ? "Confirmado" : "Cancelado"}</p>
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showExcluirModal} onHide={() => setShowExcluirModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir este agendamento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExcluirModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Status */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{agendamentoToConfirm?.novoStatus === 1 ? "Confirmar" : "Cancelar"} Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja {agendamentoToConfirm?.novoStatus === 1 ? "confirmar" : "cancelar"} este agendamento?
          </Modal.Body>
          <Modal.Footer>
        </Modal.Footer>
      </Modal>


      {/* Modal de Confirmação de Status 
<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>{agendamentoToConfirm?.novoStatus === 1 ? "Confirmar" : "Cancelar"} Agendamento</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Tem certeza de que deseja {agendamentoToConfirm?.novoStatus === 1 ? "confirmar" : "cancelar"} este agendamento?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Fechar</Button>
    <Button variant="primary" onClick={handleConfirmCancel}>
      {agendamentoToConfirm?.novoStatus === 1 ? "Confirmar" : "Cancelar"}
    </Button>
  </Modal.Footer>
</Modal>*/}

    </div>
  );
}
