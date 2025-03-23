import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLockFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom"; 
// Importando o hook useNavigate

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

const API_URL = import.meta.env.VITE_API_URL;




export default function TabelaVizualizarFuncionarios() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal de exclusão
  const [clientIdToDelete, setClientIdToDelete] = useState(null); // ID do funcionário a ser excluído
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal de confirmação de bloqueio/desbloqueio
  const [clientToEdit, setClientToEdit] = useState(null); // ID do cliente e a ação a ser tomada (bloquear/reativar)
  const navigate = useNavigate(); // Hook para navegação

  // Função para bloquear ou desbloquear o funcionário
  const handleEdit = async () => {
    if (!clientToEdit) return;

    const { id, novoStatus } = clientToEdit;
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novoStatus }), // Passa "Ativo" ou "Bloqueado"
      });

      if (!response.ok) throw new Error("Erro ao atualizar status do funcionário");

      //const updatedClient = await response.json();

      // Atualiza o estado local após o bloqueio/desbloqueio
      const updatedRecords = records.map((record) =>
        record.id_usuario === id
          ? { ...record, estado: novoStatus === "Bloqueado" ? 0 : 1 } // Mapeia "Bloqueado" para 'false' e "Ativo" para 'true'
          : record
      );
      setRecords(updatedRecords);

      toast.success(`Funcionário ${novoStatus === "Bloqueado" ? "bloqueado" : "reativado"} com sucesso!`);
      setShowConfirmModal(false); // Fecha a modal após a ação
    } catch (err) {
      console.error("Erro ao bloquear/desbloquear funcionário:", err);
      toast.error("Erro ao atualizar status do funcionário.");
    }
  };

  // Função para abrir a modal de confirmação de bloqueio/desbloqueio
  const openConfirmModal = (id, estadoAtual) => {
    const novoStatus = estadoAtual ? "Bloqueado" : "Ativo"; // Se está Ativo (estado = true), vai ser Bloqueado, e vice-versa.
    setClientToEdit({ id, novoStatus });
    setShowConfirmModal(true); // Exibe a modal de confirmação
  };

  // Função para redirecionar para a página de visualização do funcionário
  const handleView = (id) => {
    navigate(`/perfilFuncionario/${id}`);  // Redireciona para o perfil do funcionário com o id
  };

  // Função para abrir a modal de exclusão
  const openDeleteModal = (id) => {
    setClientIdToDelete(id);
    setShowModal(true); // Exibe a modal de confirmação de exclusão
  };

  // Função para excluir o funcionário
  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/usuarios/${clientIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_usuario !== clientIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_usuario !== clientIdToDelete));
      
      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModal(false);
      toast.success("Funcionário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      toast.error("Erro ao excluir funcionário.");
    }
  };

  // Função para buscar os dados dos funcionários
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs/usuarios`);
      if (!response.ok) throw new Error("Erro ao buscar dados");
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

  // Colunas da tabela
  const columns = [
    { name: "Nome", selector: (row) => row.nome },
    { name: "Email", selector: (row) => row.email },
    { name: "Telefone", selector: (row) => row.telefone },
    { name: "Endereço", selector: (row) => row.endereco },
    { name: "Gênero", selector: (row) => row.genero },
    { name: "Estado", selector: (row) => (row.estado ? "Ativo" : "Bloqueado") },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row.id_usuario)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => openConfirmModal(row.id_usuario, row.estado)}>
              <TbLockFilled />
              &nbsp;&nbsp;{row.estado ? "Bloquear" : "Reativar"}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_usuario)}
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

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Funcionários</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome.toLowerCase().includes(query)
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
        noDataComponent={<p>Nenhum funcionário encontrado.</p>}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de confirmação de bloqueio/desbloqueio */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Ação</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Tem certeza que deseja {clientToEdit ? (clientToEdit.novoStatus === "Bloqueado" ? "bloquear" : "reativar") : ""} este funcionário?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este funcionário?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000}  />
    </div>
  );
}
 