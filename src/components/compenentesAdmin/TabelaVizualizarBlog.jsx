import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Importando useNavigate



const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697", // Cor de fundo dos cabeçalhos
      color: "#fff", // Cor do texto
      fontSize: "16px", // Tamanho da fonte
      fontWeight: "bolder", // Peso da fonte
      paddingTop: "10px", // Padding superior
      paddingBottom: "10px", // Padding inferior
      marginTop: "60px", // Margem superior (pode não ser necessário, depende do layout)
    },
  },
  cells: {
    style: {
      whiteSpace: "nowrap", // Impede quebra de linha dentro das células
     // Esconde o conteúdo que ultrapassa a célula
      textOverflow: "ellipsis", // Adiciona reticências ao conteúdo que não cabe
    },
  },

};


export default function TabelaBlog() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);  // Modal para visualização
  const [blogIdToDelete, setBlogIdToDelete] = useState(null);
  const [blogDetails, setBlogDetails] = useState(null);  // Detalhes do blog para exibir no modal de visualização
  const navigate = useNavigate(); // Hook para navegação

  const columns = [
    { name: "Data", selector: (row) => new Date(row.data_publicacao).toLocaleDateString(), sortable: true },
    { name: "Título", selector: (row) => row.titulo, sortable: true },

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
            <Dropdown.Item onClick={() => handleEdit(row.id_blog)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_blog)}
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

  // Função para abrir o modal de visualização
  const handleVisualizar = async (row) => {
    try {
      // Carrega os detalhes do blog
      const response = await fetch(`http://localhost:5000/api/blogs/${row.id_blog}`);
      if (!response.ok) throw new Error("Erro ao carregar os detalhes do blog.");
      const blogData = await response.json();

      // Armazena os detalhes do blog no estado
      setBlogDetails(blogData);

      // Exibe o modal de visualização
      setShowVisualizarModal(true);
    } catch (error) {
      console.error("Erro ao carregar o blog:", error);
      toast.error("Erro ao carregar os detalhes do blog.");
    }
  };

  // Função para redirecionar para a página de edição do blog
  const handleEdit = (id) => {
    navigate(`/editarBlog/${id}`); // Navega para a rota de edição passando o id do blog
  };

  const openDeleteModal = (id) => {
    setBlogIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/blogs/${blogIdToDelete}`, {
        method: "DELETE",
      });
      const updatedRecords = records.filter((record) => record.id_blog !== blogIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_blog !== blogIdToDelete));
      setShowModal(false);
      toast.success("Blog excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir blog:", error);
      toast.error("Erro ao excluir blog.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      if (!response.ok) throw new Error("Erro ao buscar dados dos blogs");
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
          <h4>Lista de Blogs</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por título ou conteúdo"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.titulo.toLowerCase().includes(query) || item.conteudo.toLowerCase().includes(query)
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
          noDataComponent={<p>Nenhum blog encontrado.</p>}
          footer={<div>Exibindo {records.length} registros no total</div>}
        />
      </div>

      {/* Modal para visualizar o blog */}
      <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)} scrollable centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{blogDetails ? blogDetails.titulo : "Carregando..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {blogDetails ? (
            <>
              <p><strong>Autor:</strong> {blogDetails.autor || "BI-TURBO MOTORS"}</p>
              <p><strong>Data de Publicação:</strong> {new Date(blogDetails.data_publicacao).toLocaleDateString()}</p>
              <p><strong>Conteúdo:</strong> {blogDetails.conteudo || "Sem conteúdo"}</p>
            </>
          ) : (
            <p>Carregando dados do blog...</p>
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
        <Modal.Body>Tem certeza que deseja excluir este blog?</Modal.Body>
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
