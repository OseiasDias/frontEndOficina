import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { RiAddLargeFill, RiArrowDownSLine } from "react-icons/ri";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import imgN from "../../assets/not-found.png";

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

export  function ListarMarcasVeiculos() {
  const [showModal, setShowModal] = useState(false);
  const [novoMarca, setNovoMarca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [tiposVeiculos, setTiposVeiculos] = useState([]);
  const [marcasVeiculos, setMarcasVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar tipos de veículos da API
  const fetchTiposVeiculos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tipos-veiculos");
      setTiposVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao carregar os tipos de veículos:", error);
      setError("Erro ao carregar os tipos de veículos.");
    }
  };

  // Buscar marcas de veículos da API
  const fetchMarcasVeiculos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/marcas");
      setMarcasVeiculos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as marcas de veículos:", error);
      setError("Erro ao carregar as marcas de veículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposVeiculos();
    fetchMarcasVeiculos();
  }, []);

  const handleNovoMarcaChange = (e) => setNovoMarca(e.target.value);
  const handleTipoSelecionadoChange = (e) => setTipoSelecionado(e.target.value);

  // Função para adicionar uma nova marca
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novoMarca.trim() && tipoSelecionado) {
      try {
        setLoading(true);
        const newMarca = {
          nome: novoMarca,
          tipo_veiculo_id: tipoSelecionado,
        };
        const response = await axios.post("http://127.0.0.1:8000/api/marcas", newMarca);
        setMarcasVeiculos((prevMarcas) => [...prevMarcas, response.data]);
        setNovoMarca(""); 
        setTipoSelecionado(""); 
        setShowModal(false); 
        toast.success("Marca adicionada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar a marca:", error);
        toast.error("Erro ao adicionar a marca. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

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

  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="contai">
        <div className="d-flex">
      
          <div className="flexAuto w-100">
        
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    <h4 className="me-5">Lista de Marcas de Veículos</h4>
                    <RiAddLargeFill
                      className="links-acessos arranjarBTN p-2 border-radius-zero"
                      fontSize={35}
                      onClick={() => setShowModal(true)} 
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




const ListarMarca = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
          <TopoAdmin entrada=" Marcas de Veículos" icone={<IoIosAdd />} />
            <div className="vh-100 alturaPereita ">
            <ListarMarcasVeiculos />
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

export default ListarMarca;
