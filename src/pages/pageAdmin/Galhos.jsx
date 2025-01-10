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

export function ListarFiliais() {
  const [filiais, setFiliais] = useState([]); // Lista de filiais

  // Buscar filiais da API
  const fetchFiliais = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/filiais");
      setFiliais(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar as filiais:", error);
      toast.error("Erro ao carregar as filiais.");
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchFiliais();
  }, []);

  // Função de busca para filtrar as filiais
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchFiliais();
    } else {
      const filteredRecords = filiais.filter((item) =>
        item.nome_filial.toLowerCase().includes(query) || 
        item.endereco.toLowerCase().includes(query) ||
        item.numero_contato.includes(query) ||
        item.email.toLowerCase().includes(query)
      );
      setFiliais(filteredRecords);
    }
  };

  // Função para excluir uma filial
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/filiais/${id}`);
      setFiliais(filiais.filter((item) => item.id !== id)); // Remove a filial excluída
      toast.success("Filial excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a filial:", error);
      toast.error("Erro ao excluir a filial.");
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Nome da Filial",
      selector: (row) => row.nome_filial,
      sortable: true,
    },
    {
      name: "Número de Contato",
      selector: (row) => row.numero_contato,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Endereço",
      selector: (row) => row.endereco,
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
      <div className="contai">
        <div className="d-flex">
          <div className="flexAuto w-100">
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    {/* Botão de adicionar filial */}
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="w-100 my-2 zIndex"
                      placeholder="Pesquisar Filiais"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={filiais}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {filiais.length} registros no total</div>}
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

const Filiais = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Lista de Filiais" direccao="/addGalho" icone={<RiAddFill />} leftR="/ProdutosList" />
            <div className="vh-100 alturaPereita">
              <ListarFiliais />
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

export default Filiais;
