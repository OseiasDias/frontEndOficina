import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
  const [viewMode, setViewMode] = useState("all"); // "all", "past", "upcoming" (para filtragem)

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
        return row.status || "Sem status"; // Caso não tenha status definido
      }
    },
    { name: "Descrição", selector: (row) => row.descricao || "Sem descrição" },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleVisualizarHistorico(row)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
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
  const handleVisualizarHistorico = async (row) => {
    try {
      const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${row.id_cliente}`);
      const veiculoResponse = await fetch(`http://localhost:5000/api/veiculos/${row.id_veiculo}`);

      const clienteData = await clienteResponse.json();
      const veiculoData = await veiculoResponse.json();

      setAgendamentoDetails({
        agendamento: row,
        cliente: clienteData,
        veiculo: veiculoData
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

  const handleConfirmCancel = async () => {
    if (!agendamentoToConfirm) return;

    const { id, novoStatus } = agendamentoToConfirm;

    // Mapeia o novoStatus para uma string (Confirmado ou Cancelado)
    const statusString = novoStatus === 1 ? "Confirmado" : "Cancelado";

    try {
      const response = await fetch(`http://localhost:5000/api/agendamentos/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novoStatus: statusString }), // Ajuste o campo para "novoStatus"
      });

      if (!response.ok) throw new Error("Erro ao atualizar status do agendamento");

      const updatedAgendamentos = records.map((agendamento) =>
        agendamento.id_agendamento === id
          ? { ...agendamento, status: novoStatus === "Cancelado" ? 0 : 1 }
          : agendamento
      );

      setRecords(updatedAgendamentos);

      toast.success(`Agendamento ${statusString} com sucesso!`);
      setShowConfirmModal(false); // Fecha a modal
    } catch (err) {
      toast.error("Erro ao atualizar status do agendamento.");
    }
  };

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
      const response = await fetch("http://localhost:5000/api/agendamentos");
      if (!response.ok) throw new Error("Erro ao buscar dados dos agendamentos");
      const data = await response.json();

      const dataWithDetails = await Promise.all(
        data.map(async (agendamento) => {
          const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${agendamento.id_cliente}`);
          const veiculoResponse = await fetch(`http://localhost:5000/api/veiculos/${agendamento.id_veiculo}`);

          const clienteData = await clienteResponse.json();
          const veiculoData = await veiculoResponse.json();

          return {
            ...agendamento,
            nome_cliente: clienteData.nome,
            veiculo: {
              marca: veiculoData.marca,
              modelo: veiculoData.modelo,
              ano: veiculoData.ano,
              placa: veiculoData.placa || "Sem placa"
            },
          };
        })
      );

      setRecords(dataWithDetails);
      setOriginalRecords(dataWithDetails);  // Atualiza o estado original também
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterAgendamentos = () => {
    const today = new Date();
    if (viewMode === "upcoming") {
      return records.filter(agendamento => new Date(agendamento.data) >= today);
    } else if (viewMode === "past") {
      return records.filter(agendamento => new Date(agendamento.data) < today);
    } else {
      return records; // Exibe todos
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRecords = filterAgendamentos();

  return (
    <div className="agendamentos-container">
      <ToastContainer />

      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="filter-buttons">
            <Button onClick={() => setViewMode("all")} className="mx-1">Todos</Button>
            <Button onClick={() => setViewMode("upcoming")} className="mx-1">Futuros</Button>
            <Button onClick={() => setViewMode("past")} className="mx-1">Passados</Button>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa nome do cliente ou marca do veículo"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();

              if (!query) {
                setRecords(originalRecords); // Se não houver filtro, exibe todos os registros
              } else {
                const filteredRecords = originalRecords.filter((item) => {
                  // Filtrando por status (convertendo para string)
                  const statusMatch = item.status !== undefined && item.status.toString().includes(query);

                  // Filtrando por nome do cliente
                  const clienteMatch = item.nome_cliente && item.nome_cliente.toLowerCase().includes(query);

                  // Filtrando por marca do veículo (se o veículo existir)
                  const veiculoMarcaMatch = item.veiculo && item.veiculo.marca.toLowerCase().includes(query);

                  // Retorna true se algum dos critérios de pesquisa for atendido
                  return statusMatch || clienteMatch || veiculoMarcaMatch;
                });

                setRecords(filteredRecords); // Atualiza os registros com os itens filtrados
              }
            }}
          />

        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredRecords}  // Agora usa a lista filtrada
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        noDataComponent={<p>Nenhum agendamento encontrado.</p>}
        footer={<div>Exibindo {filteredRecords.length} registros no total</div>}
      />

      {/* Modal Visualizar */}
      {showVisualizarModal && (
        <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)} scrollable centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Agendamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <>
              <div className="row">
                <p className="col-12 col-md-6 col-lg-4"><strong>Nome:</strong> {agendamentoDetails.cliente.nome || "Sem nome"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Email:</strong> {agendamentoDetails.cliente.email || "Sem email"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Telefone:</strong> {agendamentoDetails.cliente.telefone || "Sem telefone"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Endereço:</strong> {agendamentoDetails.cliente.endereco || "Sem endereço"}</p>

                <p className="col-12 col-md-6 col-lg-4"><strong>Marca:</strong> {agendamentoDetails.veiculo.marca || "Sem marca"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Modelo:</strong> {agendamentoDetails.veiculo.modelo || "Sem modelo"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Ano:</strong> {agendamentoDetails.veiculo.ano || "Sem ano"}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Placa:</strong> {agendamentoDetails.veiculo.placa || "Sem placa"}</p>

                <p className="col-12 col-md-6 col-lg-4"><strong>Data:</strong> {new Date(agendamentoDetails.agendamento.data).toLocaleDateString()}</p>
                <p className="col-12 col-md-6 col-lg-4"><strong>Status:</strong> {agendamentoDetails.agendamento.status || "Sem status"}</p>
                <p className="col-12 col-md-12 col-lg-12"><strong>Descrição:</strong> {agendamentoDetails.agendamento.descricao || "Sem descrição"}</p>
              </div>
            </> </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal Confirmar/Cancelar */}
      {showConfirmModal && (
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Cancelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja {agendamentoToConfirm?.novoStatus === 1 ? "confirmar" : "cancelar"} este agendamento?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Fechar</Button>
            <Button variant="primary" onClick={handleConfirmCancel}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal Excluir */}
      {showExcluirModal && (
        <Modal show={showExcluirModal} onHide={() => setShowExcluirModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Agendamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza que deseja excluir este agendamento?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowExcluirModal(false)}>Fechar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}