import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd, IoMdEye } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Hook do React Router para navegação

import axios from "axios"; // Para fazer requisições HTTP
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
//import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify"; // Para notificações
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toast
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#044697',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bolder',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  cells: {
    style: {
      padding: '8px',
      fontSize: '14px',
    },
  },
};


const API_URL = import.meta.env.VITE_API_URL;



export function TabelaVizualizarOrdensServico() {
  const [records, setRecords] = useState([]); // Dados das ordens de serviço
  const [originalRecords, setOriginalRecords] = useState([]); // Dados originais
  const [loading, setLoading] = useState(true); // Indicador de carregamento
  const [error, setError] = useState(null); // Para capturar erros
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal para confirmação de exclusão
  const [selectedOrder, setSelectedOrder] = useState(null); // Ordem selecionada para exclusão
  const [clientes, setClientes] = useState({}); // Estado para armazenar os nomes dos clientes

  const navigate = useNavigate();

  // Função para buscar os nomes dos clientes (com base no cliente_id)
  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes/`);  // Suponha que a API retorne todos os clientes
      const clientesMap = response.data.reduce((acc, cliente) => {
        acc[cliente.id] = cliente.primeiro_nome + " " + cliente.sobrenome;
        return acc;
      }, {});
      setClientes(clientesMap);  // Armazenar os nomes dos clientes
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setError("Erro ao carregar os clientes.");
    }
  };

  // Função para buscar as ordens de serviço da API
 // Função para buscar as ordens de serviço da API
const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ordens-de-reparo/`);
    if (Array.isArray(response.data)) {
      // Ordenando as ordens de serviço pela data ou id em ordem decrescente
      const sortedOrders = response.data.sort((a, b) => {
        // Primeiro ordenando pelo id (se estiver usando id incremental)
        // Se quiser usar a data, pode trocar para a comparação com a data_inicial_entrada
        return b.id - a.id; // Para ordem decrescente
        // Para ordenar pela data, faça o seguinte:
        // return new Date(b.data_inicial_entrada) - new Date(a.data_inicial_entrada);
      });

      setRecords(sortedOrders); // Atualizando os registros com a ordem correta
      setOriginalRecords(sortedOrders); // Também atualizando os registros originais para o filtro
    } else {
      console.error("Os dados retornados não contêm um array de ordens de serviço:", response.data);
      throw new Error("Os dados retornados não contêm um array de ordens de serviço.");
    }
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    setError("Erro ao carregar os dados.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchClientes();  // Carregar os clientes
    fetchData();  // Carregar as ordens de serviço
  }, []);

  // Função para exibir detalhes da ordem de serviço /verOR/
  const handleView = (order) => {
    navigate(`/verOR/${order.id}`); // Corrigido para usar crase no template string
  };

  // Função para excluir a ordem de serviço
  const handleDelete = (order) => {
    setSelectedOrder(order); // Define a ordem selecionada
    setShowDeleteModal(true); // Abre o modal de confirmação
  };

  // Função de confirmação de exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/ordens-de-reparo/${selectedOrder.id}`);
      setRecords(records.filter((order) => order.id !== selectedOrder.id)); // Remove da lista
      setShowDeleteModal(false);
      toast.success('Ordem de reparo excluída com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir a ordem de reparo:", error);
      setError("Erro ao excluir a ordem de reparo.");
      toast.error('Erro ao excluir a ordem de reparo!');
    }
  };

  // Colunas da tabela para ordens de serviço
  const columns = [
    { name: "Nº de OR", selector: (row) => row.numero_trabalho || "Sem informação" }, // Alterado para 'numero_trabalho'
    {
      name: "Cliente", 
      selector: (row) => clientes[row.cliente_id] || "Cliente não encontrado"  // Alterado para 'cliente_id'
    },
    { name: "Data/Hora de Entrada", selector: (row) => row.data_inicial_entrada || "Sem informação" },
    // eslint-disable-next-line no-constant-binary-expression
    { name: "KM de Entrada", selector: (row) => `${row.km_entrada} KM` || "Sem informação" }, // Corrigido para interpolação correta
    { name: "Status", selector: (row) => row.status || "Sem informação" },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleView(row)}>
              <IoMdEye fontSize={20} /> Visualizar
            </Dropdown.Item>
            {/*<Dropdown.Item onClick={() => handleDelete(row)}>
              <IoMdCreate fontSize={23} /> Editar
            </Dropdown.Item>
            */}
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={23} /> Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Função de busca para filtrar ordens de serviço
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter(
        (item) =>
          item.numero_trabalho.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query) ||
          item.categoria_reparo.toLowerCase().includes(query) ||
          item.detalhes.toLowerCase().includes(query)
      );
      setRecords(filteredRecords);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }
  if (error) {
    return (
      <div className='text-center'>
        <h3 className='text-danger'>{error}</h3>
        <img src={imgErro} alt="Carregando" className="w-50 d-block mx-auto" />
      </div>
    );
  };

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6"></div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisar por Job ou Status"
            onChange={handleSearch}
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
        keyField="id" // Certifique-se de que "id" seja único para cada registro
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir esta ordem de reparo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}





const OrdemServico = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Ordem de Serviço"  direccao="/addOrdemServico" icone={<IoIosAdd />} />

            <div className="vh-100">
              <TabelaVizualizarOrdensServico />
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

export default OrdemServico;
