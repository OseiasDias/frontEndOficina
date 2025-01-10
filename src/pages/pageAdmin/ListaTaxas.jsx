import { useState, useEffect } from 'react';
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import {  RiAddFill } from "react-icons/ri";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaIdCard, FaPercent, FaRegFileAlt } from 'react-icons/fa';
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

export function ListarTaxas() {
  const [showModal, setShowModal] = useState(false); // Modal de adicionar taxa
  const [novaTaxa, setNovaTaxa] = useState({ taxrate: "", tax_number: "", tax: "" }); // Dados da nova taxa
  const [taxas, setTaxas] = useState([]); // Lista de taxas

  // Buscar taxas da API
  const fetchTaxas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/taxas");
      setTaxas(response.data); // Preenche a lista com os dados recebidos
    } catch (error) {
      console.error("Erro ao carregar as taxas:", error);
      toast.error("Erro ao carregar as taxas.");
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
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/taxas", novaTaxa);
        setTaxas((prevTaxas) => [...prevTaxas, response.data]); // Atualiza a lista de taxas
        setNovaTaxa({ taxrate: "", tax_number: "", tax: "" }); // Limpar os campos
        setShowModal(false); // Fechar o modal
        toast.success("Taxa adicionada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar a taxa:", error);
        toast.error("Erro ao adicionar a taxa. Tente novamente.");
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
      selector: (row) => row.tax+" Kz",
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
      <div className="contain">
        <div className="d-flex">
          <div className="flexAuto w-100">
            <div className="vh-100 alturaPereita">
              <div className="homeDiv">
                <div className="search row d-flex justify-content-between">
                  <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
                    <h4 className='me-3'>Lista de Taxas</h4>
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
