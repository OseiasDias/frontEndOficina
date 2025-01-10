import { useState, useEffect } from 'react'; 
import "../../css/StylesAdmin/homeAdministrador.css";
import { RiAddFill } from "react-icons/ri";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import imgErro from "../../assets/error.webp";
// Estilos customizados para a tabela
import "../../css/StylesAdmin/homeAdministrador.css";
import 'react-toastify/dist/ReactToastify.css';
import imgN from "../../assets/not-found.png"; // Imagem para mostrar enquanto carrega

// Estilos customizados para a tabela


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

export function ListarFacturas() {
  const [facturas, setFacturas] = useState([]); // Lista de faturas
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [error, setError] = useState(null); // Armazenamento de erro
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar faturas da API
  const fetchFacturas = async () => {
    try {
      setLoading(true); // Define o loading para verdadeiro enquanto carrega as faturas
      const response = await axios.get("http://127.0.0.1:8000/api/facturas");
      setFacturas(response.data.data); // Preenche a lista com os dados de faturas
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao carregar as faturas."); // Captura e define o erro
      toast.error("Erro ao carregar as faturas.");
    } finally {
      setLoading(false); // Define o loading para falso quando os dados forem carregados
    }
  };

  // Função para buscar clientes da API
  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clientes");
      setClientes(response.data.data || []); // Verifica se a resposta é válida e seta os clientes
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao carregar os clientes.");
      toast.error("Erro ao carregar os clientes.");
    }
  };

  // Função para adicionar uma nova fatura
  const handleAddFaturas = () => {
    navigate('/addFaturas'); // Redireciona para a rota /addFaturas
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchFacturas();
    fetchClientes(); // Chama a função de busca dos clientes
  }, []);

  // Função para buscar as faturas com base na pesquisa
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchFacturas(); // Se não houver pesquisa, carrega novamente as faturas
    } else {
      const filteredRecords = facturas.filter((item) =>
        item.numero_fatura.toLowerCase().includes(query) ||
        item.cliente_id.toString().includes(query) ||
        item.tipo_fatura.toLowerCase().includes(query)
      );
      setFacturas(filteredRecords);
    }
  };

  // Função para excluir uma fatura
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/facturas/${id}`);
      setFacturas(facturas.filter((item) => item.id !== id)); // Remove a fatura excluída
      toast.success("Fatura excluída com sucesso!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao excluir a fatura.");
      toast.error("Erro ao excluir a fatura.");
    }
  };

  // Função para obter o nome do cliente pelo ID
  const getClienteNome = (clienteId) => {
    if (!clientes || clientes.length === 0) return "Cliente não encontrado";  // Verifica se clientes está vazio
    const cliente = clientes.find((cliente) => cliente.id === clienteId);
    return cliente ? `${cliente.primeiro_nome} ${cliente.sobrenome}` : "Cliente não encontrado";
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Número da Fatura",
      selector: (row) => row.numero_fatura,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => getClienteNome(row.cliente_id), // Exibe o nome do cliente
      sortable: true,
    },
    {
      name: "Valor Pago",
      selector: (row) => row.valor_pago + " Kz",
      sortable: true,
    },
    {
      name: "Data",
      selector: (row) => row.data,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Tipo de Pagamento",
      selector: (row) => row.tipo_pagamento,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => handleDelete(row.id)}>
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Exibição de carregamento ou erro
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
    <div className="contain">
      <div className="d-flex">
        <div className="flexAuto w-100">
          <div className="vh-100 alturaPereita">
            <div className="homeDiv">
              <div className="search row d-flex justify-content-between">
                <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                  <button className="btn btn-primary links-acessos" onClick={handleAddFaturas}>
                    <RiAddFill />
                    &nbsp;Nova Fatura
                  </button>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <input
                    type="text"
                    className="w-100 my-2 zIndex"
                    placeholder="Pesquisar Faturas"
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <DataTable
                columns={columns}
                data={facturas}
                customStyles={customStyles}
                pagination
                paginationPerPage={10}
                footer={<div>Exibindo {facturas.length} registros no total</div>}
                className="pt-5"
              />
              <ToastContainer position="top-center" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const Faturas = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex">
        <SideBar />

        <div className="flexAuto w-100">
          <TopoAdmin entrada=" Faturas"  />

          <div className="vh-100 alturaPereita">
            <ListarFacturas />
          </div>
          <div className="div text-center np pt-2 mt-2 ppAr">
            <hr />
            <p className="text-center">
              Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
              <br />
              Desenvolvido por: <b>Oseias Dias</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faturas;
