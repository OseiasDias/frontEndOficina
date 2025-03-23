import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import "../../css/StylesAdmin/homeAdministrador.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para redirecionamento
import imgN from "../../assets/not-found.png";
// Importar ToastContainer e toast do react-toastify
import imgErro from "../../assets/error.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Certifique-se de importar os estilos do toast

// Estilos personalizados para a tabela
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

 


export function TabelaVizualizarClient() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a modal de exclusão
  const [selectedCliente, setSelectedCliente] = useState(null); // Estado para armazenar o cliente selecionado

  const navigate = useNavigate(); // Hook do React Router para navegação

  // Função para abrir a modal de visualização e redirecionar para a página de visualização
  const handleView = (cliente) => {
    navigate(`/verClientes/${cliente.id}`);
  };

  // Função para abrir a modal de confirmação de exclusão
  const handleDelete = (cliente) => {
    setSelectedCliente(cliente); // Definir o cliente selecionado para exclusão
    setShowDeleteModal(true); // Mostrar a modal de confirmação de exclusão
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/clientes/${selectedCliente.id}`);
      // Após excluir, fechar a modal e atualizar os dados
      setRecords(records.filter((cliente) => cliente.id !== selectedCliente.id));
      setShowDeleteModal(false);

      // Exibir notificação de sucesso usando o toast
      toast.success('Cliente excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
      setError("Erro ao excluir o cliente.");
      // Exibir notificação de erro usando o toast
      toast.error('Erro ao excluir o cliente!');
    }
  };

  // Colunas da tabela
  const columns = [
    { name: "Nº Cliente", selector: (row) => row.numero_cliente || "Sem informação" },  // Nova coluna para numero_cliente
    { name: "Nome", selector: (row) => row.primeiro_nome || "Sem informação" },
    { name: "Sobrenome", selector: (row) => row.sobrenome || "Sem informação" },
    { name: "Email", selector: (row) => row.email || "Sem informação" },
    { name: "Celular", selector: (row) => row.celular || "Sem informação" },
    { name: "Endereço", selector: (row) => row.endereco || "Sem informação" },
    { name: "Estado", selector: (row) => row.estado === 1 ? "Ativo" : "Bloqueado" },
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

;

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes/`);
      if (Array.isArray(response.data)) {
        // Ordena os registros pela data de criação, do mais recente para o mais antigo
        const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecords(sortedData);
        setOriginalRecords(sortedData);
      } else {
        console.error("Os dados retornados não contêm um array de clientes:", response.data);
        throw new Error("Os dados retornados não contêm um array de clientes.");
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

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome ou email"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.primeiro_nome.toLowerCase().includes(query) ||
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

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir este cliente?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container para mostrar as notificações */}
      <ToastContainer position="top-center" />
    </div>
  );
}



const Clientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Clientes" direccao="/addClientes" icone={<IoIosAdd />}  />

            <div className="vh-100 alturaPereita ">
            <TabelaVizualizarClient />
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

export default Clientes;
