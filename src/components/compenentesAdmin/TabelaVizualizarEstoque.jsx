import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { FaBox } from "react-icons/fa";

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

export default function TabelaEstoque() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false); // Modal para visualização
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemDetails, setItemDetails] = useState(null); // Para armazenar os detalhes do item
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal para atualizar
  const [quantityToUpdate, setQuantityToUpdate] = useState(""); // Quantidade para atualizar
  const [itemToUpdate, setItemToUpdate] = useState(null); // Item a ser atualizado

  const sortedRecords = [...records].sort((a, b) => new Date(b.data_reposicao) - new Date(a.data_reposicao));

  const columns = [
    { name: "Nome da Peça", selector: (row) => row.nome_peca },
    { name: "Quantidade", selector: (row) => row.quantidade },
    { name: "Data de Reposição", selector: (row) => new Date(row.data_reposicao).toLocaleDateString() },
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
            <Dropdown.Item onClick={() => handleEdit(row)}>
              <GrUpgrade />
              &nbsp;&nbsp;Actualizar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_item)}
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
  const handleVisualizar = (row) => {
    setItemDetails(row);  // Armazena os detalhes do item no estado
    setShowVisualizarModal(true);  // Exibe a modal de visualização
  };

  const handleEdit = (row) => {
    setItemToUpdate(row); // Armazena o item a ser atualizado
    setQuantityToUpdate(row.quantidade); // Preenche o campo com a quantidade atual
    setShowUpdateModal(true); // Exibe o modal de atualização
  };

  const openDeleteModal = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/estoque/${itemIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_item !== itemIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_item !== itemIdToDelete));

      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModal(false);
      toast.success("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      toast.error("Erro ao excluir item.");
    }
  };

  const handleUpdate = async () => {
    try {
      // Criando a URL com o ID do item
      const updateUrl = `http://localhost:5000/api/estoque/atualizarQuantidade/${itemToUpdate.id_item}`;

      // Realizando a requisição PUT com a nova quantidade
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantidade: quantityToUpdate, // Passando a nova quantidade
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a quantidade do item.");
      }

      // Atualizando os registros localmente após sucesso
      const updatedRecords = records.map((record) =>
        record.id_item === itemToUpdate.id_item
          ? { ...record, quantidade: quantityToUpdate }
          : record
      );
      setRecords(updatedRecords);
      setOriginalRecords(updatedRecords);

      // Fechando o modal de atualização
      setShowUpdateModal(false);

      // Exibindo a mensagem de sucesso
      toast.success("Quantidade de estoque atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a quantidade:", error);
      toast.error("Erro ao atualizar a quantidade.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/estoque");
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

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Produtos em Estoque</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome da peça"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome_peca.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sortedRecords}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        noDataComponent={<p>Nenhum item encontrado.</p>}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal para visualização do item */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Quantidade em Estoque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-description">
            <p>
              <strong>Atualize a quantidade de estoque para a peça abaixo</strong>.
              Certifique-se de que a quantidade está correta antes de confirmar a atualização.
            </p>
            <p className="text-muted">
              Este ajuste reflete o estoque disponível e impacta diretamente o processo de vendas e reabastecimento.
            </p>
          </div>

          <Form>
            <Form.Group>
              <Form.Label><strong>Quantidade Atual:</strong> <p className="d-inline">{itemToUpdate ? itemToUpdate.quantidade : "Carregando..."}</p></Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label><strong>Nova Quantidade</strong></Form.Label>
              <div className="input-group my-2">
                <span className="input-group-text "><FaBox fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="number"
                  value={quantityToUpdate}
                  onChange={(e) => setQuantityToUpdate(e.target.value)}
                  min="0"
                  required
                  placeholder="Digite a nova quantidade"
                />
              </div>
            </Form.Group>  
          </Form>

          <div className="modal-footer-description">
            <p className="text-danger">
              <strong>Nota:</strong> Ao confirmar, os dados serão atualizados no sistema e refletirão na lista de estoque.
            </p>  
          </div>
        </Modal.Body> 
   
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Atualizar Estoque
          </Button>   
        </Modal.Footer>
      </Modal>

      {/* Modal de Atualização 
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Quantidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={quantityToUpdate}
                onChange={(e) => setQuantityToUpdate(e.target.value)}
                min="0"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>*/}

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Quantidade em Estoque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-description">
            <p>
              <strong>Atualize a quantidade de estoque para a peça abaixo</strong>.
              Certifique-se de que a quantidade está correta antes de confirmar a atualização.
            </p>
            <p className="text-muted">
              Este ajuste reflete o estoque disponível e impacta diretamente o processo de vendas e reabastecimento.
            </p>
          </div>

          <Form>
            <Form.Group>
              <Form.Label><strong>Quantidade Atual:</strong> <p className="d-inline">{itemToUpdate ? itemToUpdate.quantidade : "Carregando..."}</p></Form.Label>

            </Form.Group>

            <Form.Group>
              <Form.Label><strong>Nova Quantidade</strong></Form.Label>
              <div className="input-group my-2">
                <span className="input-group-text "><FaBox fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="number"
                  value={quantityToUpdate}
                  onChange={(e) => setQuantityToUpdate(e.target.value)}
                  min="0"
                  required
                  placeholder="Digite a nova quantidade"

                />
              </div>
            </Form.Group>

          </Form>

          <div className="modal-footer-description">
            <p className="text-danger">
              <strong>Nota:</strong> Ao confirmar, os dados serão atualizados no sistema e refletirão na lista de estoque.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Atualizar Estoque
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este item?</Modal.Body>
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
    </div >
  );
}
