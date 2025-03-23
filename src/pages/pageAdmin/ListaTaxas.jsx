import { useState, useEffect } from 'react';
import "../../css/StylesAdmin/homeAdministrador.css";
import { RiAddFill } from "react-icons/ri";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaFilePdf, FaIdCard, FaPercent, FaPrint, FaRegEye, FaRegFileAlt } from 'react-icons/fa';
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import { ImWhatsapp } from 'react-icons/im';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
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
const API_URL = import.meta.env.VITE_API_URL;

export function ListarTaxas() {
  const [showModal, setShowModal] = useState(false); // Modal de adicionar taxa
  const [novaTaxa, setNovaTaxa] = useState({ taxrate: "", tax_number: "", tax: "" }); // Dados da nova taxa
  const [taxas, setTaxas] = useState([]); // Lista de taxas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false); // Modal para visualização
  const [selectedCompra, setSelectedCompra] = useState(null); // Informações da compra selecionada
  const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação
  const navigate = useNavigate(); // Navegação após sucesso


  const handleVisualizar = (taxa) => {
    setSelectedCompra(taxa); // Preenche os dados da taxa selecionada
    setShowViewModal(true); // Abre a modal de visualização
  };


  // Buscar taxas da API
  const fetchTaxas = async () => {
    setLoading(true); // Inicia o carregamento
    setError(null); // Limpa o erro anterior, se houver

    try {
      const response = await axios.get(`${API_URL}/blogs/taxas`);
      setTaxas(response.data); // Preenche a lista com os dados recebidos
      setOrdemData(response.data);
    } catch (error) {
      console.error("Erro ao carregar as taxas:", error);
      setError("Erro ao carregar as taxas."); // Armazena o erro
      toast.error("Erro ao carregar as taxas.");
    } finally {
      setLoading(false); // Finaliza o carregamento, independentemente de sucesso ou erro
    }
  };

  // Chama a função de busca quando o componente é montado
  useEffect(() => {
    fetchTaxas();
  }, []);

  // Função para capturar os dados da nova taxa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaTaxa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para adicionar uma nova taxa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novaTaxa.taxrate.trim() && novaTaxa.tax_number.trim() && novaTaxa.tax.trim()) {
      setLoading(true); // Inicia o carregamento
      setError(null); // Limpa o erro anterior

      try {
        const response = await axios.post(`${API_URL}/taxas`, novaTaxa);
        setTaxas((prevTaxas) => [...prevTaxas, response.data]); // Atualiza a lista de taxas
        setNovaTaxa({ taxrate: "", tax_number: "", tax: "" }); // Limpar os campos
        setShowModal(false); // Fechar o modal
        toast.success("Taxa adicionada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar a taxa:", error);
        setError("Erro ao adicionar a taxa. Tente novamente."); // Armazena o erro
        toast.error("Erro ao adicionar a taxa. Tente novamente.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  // Função de busca para filtrar as taxas
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      fetchTaxas();
    } else {
      const filteredRecords = taxas.filter((item) =>
        item.taxrate.toLowerCase().includes(query) ||
        item.tax_number.toLowerCase().includes(query)
      );
      setTaxas(filteredRecords);
    }
  };

  // Colunas da tabela
  const columns = [
    {
      name: "Taxa",
      selector: (row) => row.taxrate,
      sortable: true,
    },
    {
      name: "Número da Taxa",
      selector: (row) => row.tax_number,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row) => row.tax + " Kz",
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleVisualizar(row)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
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
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#productDetailsTable"), {
      callback: function (doc) {
        doc.save(`${ordemData.jobno}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Confira a ordem de reparação: ${ordemData.jobno}\nDetalhes: ${ordemData.defeito_ou_servico}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
                    <h4 className="me-3">Lista de Taxas</h4>
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
                      placeholder="Pesquisar Taxas"
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={taxas}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  footer={<div>Exibindo {taxas.length} registros no total</div>}
                  className="pt-5"
                />
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização da Taxa */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
           <Modal.Title className='d-flex justify-content-between w-100 '><h4 className='mt-3'>Detalhes da Taxa</h4>
                      <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60}/>
                    </Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {selectedCompra && (
            <div>
              <h4 className="text-center text-underline">Detalhes da Taxa</h4>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Nome da Taxa:</strong></td>
                    <td>{selectedCompra.taxrate}</td>
                  </tr>
                  <tr>
                    <td><strong>Número da Taxa:</strong></td>
                    <td>{selectedCompra.tax_number}</td>
                  </tr>
                  <tr>
                    <td><strong>Valor da Taxa:</strong></td>
                    <td>{selectedCompra.tax} Kz</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end mt-4">
            {/* Botões: Imprimir, Gerar PDF, Editar e WhatsApp */}
            <div className="ms-2">
              <Button variant="outline-secondary" onClick={() => window.print()}>
                <FaPrint className="me-2" fontSize={20} />
                Imprimir
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="outline-danger" onClick={generatePDF}>
                <FaFilePdf className="me-2" fontSize={20} />
                Gerar PDF
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarOrdemReparacao/${ordemData.id}`)}>
                <MdEditNote fontSize={24} />
                Editar Ordem
              </Button>
            </div>
            <div className="ms-2">
              <Button variant="success" onClick={shareOnWhatsApp}>
                <ImWhatsapp />  Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>


      {/* Modal para adicionar taxa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar Nova Taxa</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário de adicionar taxas */}
          <Form onSubmit={handleSubmit}>
            {/* Nome do Imposto */}
            <Row className="form-group row-mb-0">
              <Form.Label>
                Nome do imposto <span className="text-danger">*</span>
              </Form.Label>

              <Col md={12}>
                <div className="input-group">
                  <span className="input-group-text"><FaRegFileAlt fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    required
                    name="taxrate"
                    placeholder="Enter Tax Name"
                    maxLength={20}
                    value={novaTaxa.taxrate} // Valor controlado
                    onChange={handleInputChange} // Atualiza o estado
                  />
                </div>
              </Col>
            </Row>

            {/* Número de Identificação Fiscal */}
            <Row className="form-group row-mb-0">
              <Form.Label>
                Número de identificação fiscal <span className="text-danger">*</span>
              </Form.Label>
              <Col md={12}>
                <div className="input-group">
                  <span className="input-group-text"><FaIdCard fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    required
                    name="tax_number"
                    placeholder="Insira o número fiscal"
                    maxLength={20}
                    value={novaTaxa.tax_number} // Valor controlado
                    onChange={handleInputChange} // Atualiza o estado
                  />
                </div>
              </Col>
            </Row>

            {/* Taxa de Imposto */}
            <Row className="form-group row-mb-0">
              <Form.Label>
                Taxas de imposto (%) <span className="text-danger">*</span>
              </Form.Label>
              <Col md={12}>
                <div className="input-group">
                  <span className="input-group-text"><FaPercent fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    required
                    name="tax"
                    placeholder="Insira a taxa de imposto"
                    value={novaTaxa.tax} // Valor controlado
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


const Taxas = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin entrada="" />

            <div className="vh-100 alturaPereita">
              <ListarTaxas />
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

export default Taxas;
