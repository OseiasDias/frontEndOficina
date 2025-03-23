import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "../../css/StylesAdmin/tbvCliente.css";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

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



export default function TabelaVizualizarClientes() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para redirecionar para a página de visualização do cliente
  const handleView = (id) => {
    console.log(`Visualizar cliente com ID: ${id}`);
    // Aqui você pode redirecionar para uma página de visualização, se necessário.
  };

  // Colunas da tabela
  const columns = [
    { name: "Nome", selector: (row) => row.nome_exibicao || "Sem informação" },
    { name: "Sobrenome", selector: (row) => row.sobrenome || "Sem informação" },
    { name: "Email", selector: (row) => row.email || "Sem informação" },
    { name: "Telefone Fixo", selector: (row) => row.telefone_fixo || "Sem informação" },
    { name: "Gênero", selector: (row) => row.genero || "Sem informação" },
    { name: "Endereço", selector: (row) => row.endereco || "Sem informação" },
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
            <Dropdown.Item onClick={() => handleView(row.id_usuario)}>
              <FaRegEye />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleView(row.id_usuario)}>
              <FaRegEye />
              &nbsp;&nbsp;Apagar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      console.log("Resposta da API:", response.data); // Inspecionar a estrutura da resposta

      // Verifique se a resposta contém um array
      if (response.data && Array.isArray(response.data.data)) {
        setRecords(response.data.data);
        setOriginalRecords(response.data.data);
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

  // UseEffect para chamar a função fetchData ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Clientes</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome ou sobrenome"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.nome_exibicao.toLowerCase().includes(query) ||
                    item.sobrenome.toLowerCase().includes(query) // Adicionando pesquisa por sobrenome
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
        footer={<div>Exibindo {records.length} registros no total</div>}
      />
    </div>
  );
}
