import { useState, useEffect } from 'react'; 
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { RiAddFill } from "react-icons/ri";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

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

export function ListarDespesas() {
  const [despesas, setDespesas] = useState([]); // Lista de despesas

  // Buscar despesas da API
  const fetchDespesas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/despesas");
      setDespesas(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar as despesas:", error);
      toast.error("Erro ao carregar as despesas.");
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchDespesas();
  }, []);

  // Função para capturar os dados da nova despesa




  // Função de busca para filtrar as despesas
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchDespesas();
    } else {
      const filteredRecords = despesas.filter((item) =>
        item.rotulo_principal.toLowerCase().includes(query) || item.rotulo_despesa.toLowerCase().includes(query)
      );
      setDespesas(filteredRecords);
    }
  };

  // Função para excluir uma despesa
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/despesas/${id}`);
      setDespesas(despesas.filter((item) => item.id !== id)); // Remove a despesa excluída
      toast.success("Despesa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a despesa:", error);
      toast.error("Erro ao excluir a despesa.");
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Rótulo Principal",
      selector: (row) => row.rotulo_principal,
      sortable: true,
    },
    {
      name: "Entrada de Despesa",
      selector: (row) => row.entrada_despesa + " Kz",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Data de Recebimento",
      selector: (row) => row.data_recebimento,
      sortable: true,
    },
    {
      name: "Rótulo da Despesa",
      selector: (row) => row.rotulo_despesa,
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

  return (
    <>
      <div className="contain">
        <div className="d-flex">
          <div className="flexAuto w-100">
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                  
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="w-100 my-2 zIndex"
                      placeholder="Pesquisar Despesas"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={despesas}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {despesas.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </>
  );
}

const Despesas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Lista de Despesas" direccao="/addDispesas" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarDespesas />
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
    </>
  );
};

export default Despesas;
