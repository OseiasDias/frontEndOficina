import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"; // Para notificações
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toast
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiAddLargeFill, RiArrowDownSLine } from "react-icons/ri";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCar } from "react-icons/fa";

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

export default function ListarMarcasVeiculos() {
  const [showModal, setShowModal] = useState(false); // Estado para controlar se o modal está visível ou não
  const [novoMarca, setNovoMarca] = useState(""); // Estado para a nova marca
  const [tipoSelecionado, setTipoSelecionado] = useState(""); // Estado para o tipo de veículo selecionado
  const [tiposVeiculos, setTiposVeiculos] = useState([]); // Tipos de veículos
  const [marcasVeiculos, setMarcasVeiculos] = useState([]); // Marcas de veículos

  // Buscar tipos de veículos da API
  const fetchTiposVeiculos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tipos-veiculos");
      setTiposVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao carregar os tipos de veículos:", error);
    }
  };

  // Buscar marcas de veículos da API
  const fetchMarcasVeiculos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/marcas");
      setMarcasVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as marcas de veículos:", error);
    }
  };

  // Chama as funções de busca quando o componente é montado
  useEffect(() => {
    fetchTiposVeiculos();
    fetchMarcasVeiculos();
  }, []);

  // Função para capturar o novo nome da marca
  const handleNovoMarcaChange = (e) => setNovoMarca(e.target.value);

  // Função para capturar o tipo de veículo selecionado
  const handleTipoSelecionadoChange = (e) => setTipoSelecionado(e.target.value);

  // Função para adicionar uma nova marca
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novoMarca.trim() && tipoSelecionado) {
      try {
        const newMarca = {
          nome: novoMarca,
          tipo_veiculo_id: tipoSelecionado,
        };
        const response = await axios.post("http://127.0.0.1:8000/api/marcas", newMarca);
        setMarcasVeiculos((prevMarcas) => [...prevMarcas, response.data]); // Atualiza a lista de marcas
        setNovoMarca(""); // Limpar o campo de entrada
        setTipoSelecionado(""); // Limpar o tipo selecionado
        setShowModal(false); // Fechar o modal
        toast.success("Marca adicionada com sucesso!"); // Exibe a notificação
      } catch (error) {
        console.error("Erro ao adicionar a marca:", error);
        toast.error("Erro ao adicionar a marca. Tente novamente.");
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  // Função de busca para filtrar as marcas
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchMarcasVeiculos();
    } else {
      const filteredRecords = marcasVeiculos.filter((item) =>
        item.nome.toLowerCase().includes(query)
      );
      setMarcasVeiculos(filteredRecords);
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Marca",
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: "Tipo de Veículo",
      selector: (row) => row.tipo_veiculo.tipo,
      sortable: true,
    },
    {
      name: "Ações",
      cell: () => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item className="text-danger">
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
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada=" Marcas de Veículos" icone={<IoIosAdd />} />
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    <h4 className="me-5">Lista de Marcas de Veículos</h4>
                    <RiAddLargeFill
                      className="links-acessos arranjarBTN p-2 border-radius-zero"
                      fontSize={35}
                      onClick={() => setShowModal(true)} // Abre o modal
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="w-100 my-2 zIndex"
                      placeholder="Pesquisa Marcas de Veículos"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={marcasVeiculos}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {marcasVeiculos.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para adicionar marca */}
      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar Marca de Veículo</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="novoMarca">
              <Form.Label>Marca do Veículo</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaCar fontSize={20} color="#0070fa" />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Digite a marca"
                  value={novoMarca}
                  onChange={handleNovoMarcaChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="tipoSelecionado" className="my-3">
              <Form.Label>Selecione o Tipo de Veículo</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <RiArrowDownSLine fontSize={20} color="#0070fa" />
                </span>
                <Form.Control
                  as="select"
                  value={tipoSelecionado}
                  onChange={handleTipoSelecionadoChange}
                >
                  <option value="">Selecione um Tipo</option>
                  {tiposVeiculos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.tipo}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary" className="my-3 links-acessos mx-auto d-block px-5">
                Adicionar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
