import { useState, useEffect } from 'react'; 
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { RiAddFill } from "react-icons/ri";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdOutlinePayments } from "react-icons/md";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import logoMarca from "../../assets/lgo.png";

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

export function ListarMetodosPagamento() {
  const [showModal, setShowModal] = useState(false); // Modal de adicionar pagamento
  const [novoMetodo, setNovoMetodo] = useState({ payment_method_name: "" }); // Dados do novo método de pagamento
  const [metodosPagamento, setMetodosPagamento] = useState([]); // Lista de métodos de pagamento
  const [loading, setLoading] = useState(true); // Variável de carregamento
  const [error, setError] = useState(null); // Variável de erro

  // Buscar métodos de pagamento da API
  const fetchMetodosPagamento = async () => {
    setLoading(true); // Ativa o carregamento
    setError(null); // Reseta qualquer erro anterior
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/payment-methods");
      setMetodosPagamento(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar os métodos de pagamento:", error);
      setError("Erro ao carregar os métodos de pagamento."); // Define a mensagem de erro
      toast.error("Erro ao carregar os métodos de pagamento.");
    } finally {
      setLoading(false); // Desativa o carregamento após a resposta
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchMetodosPagamento();
  }, []);

  // Função para capturar os dados do novo método de pagamento
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoMetodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para adicionar um novo método de pagamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novoMetodo.payment_method_name.trim()) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/payment-methods", novoMetodo);
        setMetodosPagamento((prevMetodos) => [...prevMetodos, response.data]); // Atualiza a lista de métodos
        setNovoMetodo({ payment_method_name: "" }); // Limpar os campos
        setShowModal(false); // Fechar o modal
        toast.success("Método de pagamento adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar o método de pagamento:", error);
        toast.error("Erro ao adicionar o método de pagamento. Tente novamente.");
      }
    } else {
      toast.error("Por favor, preencha o nome do método de pagamento.");
    }
  };

  // Função de busca para filtrar os métodos de pagamento
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchMetodosPagamento();
    } else {
      const filteredRecords = metodosPagamento.filter((item) =>
        item.payment_method_name.toLowerCase().includes(query)
      );
      setMetodosPagamento(filteredRecords);
    }
  };

  // Função para excluir um método de pagamento
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/payment-methods/${id}`);
      setMetodosPagamento(metodosPagamento.filter((item) => item.id !== id)); // Remove o método excluído
      toast.success("Método de pagamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o método de pagamento:", error);
      toast.error("Erro ao excluir o método de pagamento.");
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Método de Pagamento",
      selector: (row) => row.payment_method_name,
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

  // Exibe a tela de carregamento
  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  // Exibe mensagem de erro
  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-danger">{error}</h3>
        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
      </div>
    );
  }

  return (
    <>
      <div className="contain">
        <div className="d-flex">
          <div className="flexAuto w-100">
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    <h4 className='me-3'>Lista de Métodos de Pagamento</h4>
                    <RiAddFill
                      className="links-acessos arranjarBTN p-2 border-radius-zero"
                      fontSize={35}
                      onClick={() => setShowModal(true)} // Abre o modal
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="w-100 my-2 zIndex"
                      placeholder="Pesquisar Métodos"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={metodosPagamento}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {metodosPagamento.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para adicionar método de pagamento */}
      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar Novo Método de Pagamento</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário de adicionar método de pagamento */}
          <Form onSubmit={handleSubmit}>
            {/* Nome do método de pagamento */}
            <Row className="form-group row-mb-0">
              <Form.Label>
                Nome do Método de Pagamento <span className="text-danger">*</span>
              </Form.Label>

              <Col md={12}>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlinePayments fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    required
                    name="payment_method_name"
                    placeholder="Digite o método de pagamento"
                    maxLength={50}
                    value={novoMetodo.payment_method_name} // Valor controlado
                    onChange={handleInputChange} // Atualiza o estado
                  />
                </div>
              </Col>
            </Row>

            {/* Botão Enviar */}
            <Row className="form-group row-mb-0">
              <Col className="my-2 mx-0">
                <Button type="submit" variant="success" className="px-5 mt-2 mx-auto d-block links-acessos">
                  Adicionar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='p-0'>
                        <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60}/>
            
        </Modal.Footer>
      </Modal>
    </>
  );
}


const MetodosPagamento = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin entrada="" />

            <div className="vh-100 alturaPereita">
              <ListarMetodosPagamento />
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

export default MetodosPagamento;
