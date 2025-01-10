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

export function ListarServicos() {
  const [servicos, setServicos] = useState([]); // Lista de serviços

  // Buscar serviços da API
  const fetchServicos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/servicos");
      setServicos(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar os serviços:", error);
      toast.error("Erro ao carregar os serviços.");
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchServicos();
  }, []);

  // Função para capturar os dados da nova despesa
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchServicos();
    } else {
      const filteredRecords = servicos.filter((item) =>
        item.nome_servico.toLowerCase().includes(query) || item.descricao.toLowerCase().includes(query)
      );
      setServicos(filteredRecords);
    }
  };

  // Função para excluir um serviço
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/servicos/${id}`);
      setServicos(servicos.filter((item) => item.id !== id)); // Remove o serviço excluído
      toast.success("Serviço excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o serviço:", error);
      toast.error("Erro ao excluir o serviço.");
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Nome do Serviço",
      selector: (row) => row.nome_servico,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: (row) => row.descricao,
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
      <div className="cont">
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
                      placeholder="Pesquisar Serviços"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={servicos}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {servicos.length} registros no total</div>}
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

const Servicos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Lista de Serviços" direccao="/addServico" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarServicos />
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

export default Servicos;
