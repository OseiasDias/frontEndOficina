import { useState, useEffect } from "react";
import { Modal, Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {  CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaCalendarAlt, FaBlog, FaEye, FaHome } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate /*useLocation*/ } from "react-router-dom";
import logo from "../assets/img/lgo.png";
import ModalFazerAgendamento from "./ModalFazerAgendamento";
import ModalCadastrarVeiculo from "./ModalCadastrarVeiculo.jsx";
import "../css/barraMenuCliente.css";
import minhaFoto from "../assets/img/minha.jpg";
import { IoMdHelpCircleOutline } from "react-icons/io";



function BarraMenuCliente() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showAgendamentoModal, setShowAgendamentoModal] = useState(false);
  const [showConsultarModal, setShowConsultarModal] = useState(false);
  const [formData, setFormData] = useState({ placa: "" });
  const [formErrors, setFormErrors] = useState({});
  const [nome, setNome] = useState("");
  //const [foto, setFoto] = useState(null);

  const userId = localStorage.getItem("userId");
 // const location = useLocation();
 // const id_cliente = location.state?.id_cliente;

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/clientes/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setNome(data.nome);
         // setFoto(data.foto);
        })
        .catch((error) =>
          console.error("Erro ao buscar dados do cliente:", error)
        );
    }
  }, [userId]);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleShowVehicleModal = () => setShowVehicleModal(true);
  const handleCloseVehicleModal = () => setShowVehicleModal(false);

  const handleShowAgendamentoModal = () => setShowAgendamentoModal(true);
  const handleCloseAgendamentoModal = () => setShowAgendamentoModal(false);

  const handleShowConsultarModal = () => setShowConsultarModal(true);
  const handleCloseConsultarModal = () => setShowConsultarModal(false);

  const validatePlaca = () => {
    const errors = {};
    if (!formData.placa) {
      errors.placa = "Placa é obrigatória";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.placa)) {
      errors.placa =
        "A Placa deve conter apenas letras, números e os caracteres / . -";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConsultarEstado = (e) => {
    e.preventDefault();
    if (validatePlaca()) {
      console.log("Placa consultada:", formData.placa);
      handleCloseConsultarModal();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados do localStorage
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="container-fluid menuCliente position-fixed w-100"
      >
        <Navbar.Brand href="#home">
          <Link to="/HomeCliente">
            <img src={logo} className="logoMotor" alt="imagem de uma moto" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className="linksProprios"
              onClick={(event) => {
                event.preventDefault(); // Previne o comportamento padrão
                navigate("/homeCliente");
              }}
            >
              <FaHome fontSize={20} className="iconesMenu" />
              Home {userId}
            </Nav.Link>

            <div className="dd d-flex">
              <NavDropdown
                title={
                  <>
                    <CgMenuGridO
                      fontSize={22}
                      className="iconesMenu iconeMenuNove"
                    />{" "}
                    Minhas Opções
                  </>
                }
                className="basic-nav-dropCliente"
                id="basic-nav-dropdow"
              >
                <Nav.Link
                  className="linksProprios colorirLink"
                  onClick={handleShowAgendamentoModal}
                >
                  <FaCalendarAlt fontSize={20} className="iconesMenu" />
                  Agendar Manutenção
                </Nav.Link>
                <Nav.Link
                  className="linksProprios colorirLink"
                  onClick={handleShowVehicleModal}
                >
                  <IoCarSportSharp fontSize={20} className="iconesMenu" />
                  Cadastro de Veiculos
                </Nav.Link>
                <Nav.Link
                  className="linksProprios colorirLink"
                  onClick={handleShowConsultarModal}
                >
                  <MdContentPasteSearch fontSize={20} className="iconesMenu" />
                  Consultar o estado
                </Nav.Link>
              </NavDropdown>
            </div>

            <Nav.Link
              className="linksProprios"
              onClick={(event) => {
                event.preventDefault(); // Previne o comportamento padrão
                navigate("/blogAcess");
              }}
            >
              <FaBlog fontSize={20} className="iconesMenu" />
              Blog
            </Nav.Link>

            <div className="fotoGrupo outraDrop d-flex">
              <NavDropdown
                title={
                  <>
                    <strong className="pe-1">
                      <img
                        src={minhaFoto} // Usa a foto do cliente ou uma imagem padrão
                        width={55}
                        height={50}
                        className="fotoPerfil me-2"
                        alt="foto perfil"
                      />
                      <span className="nomeFull">{nome}</span>
                    </strong>
                  </>
                }
                className="basic-nav-dropClient"
                id="basic-nav-dropdow"
              >
                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={(event) => {
                    event.preventDefault(); // Previne o comportamento padrão
                    navigate("/perfilCliente");
                  }}
                >
                  <CgProfile className="iconesMenu" fontSize={18} />
                  Perfil
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="#action/3.1"
                  onClick={(event) => {
                    event.preventDefault(); // Previne o comportamento padrão
                    navigate("/pedidoAjuda");
                  }}
                >
                  <IoMdHelpCircleOutline className="iconesMenu" fontSize={18} />
                  Ajuda
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShowLogoutModal}>
                  <IoIosLogOut className="iconesMenu" fontSize={18} /> Sair
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modais de logout e ações adicionais */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <div className="bordarModal">
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Saída</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza de que deseja sair?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseLogoutModal}>
              Não
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Sim
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showVehicleModal} onHide={handleCloseVehicleModal} centered>
        <div className="bordarModal">
          <Modal.Header closeButton>
            <Modal.Title>Opções de Veículo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-between">
            <Button
              variant="primary"
              className="me-1"
              onClick={() => setShowVehicleModal(true)}
            >
              <IoIosAddCircle /> Cadastrar Veículo
            </Button>
            <Button
              variant="secondary"
              className="ms-1"
              onClick={() => navigate("/verVeiculos")}
            >
              <FaEye /> Ver Meus Veículos
            </Button>
          </Modal.Body>
        </div>
      </Modal>

      <ModalCadastrarVeiculo
        show={showVehicleModal}
        onHide={() => setShowVehicleModal(false)}
      />

      <Modal
        show={showAgendamentoModal}
        onHide={handleCloseAgendamentoModal}
        centered
      >
        <div className="bordarModal">
          <Modal.Header closeButton>
            <Modal.Title>Opções de Agendamento</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-between">
            <Button
              variant="primary"
              className="me-1"
              onClick={() => setShowAgendamentoModal(true)}
            >
              <IoIosAddCircle /> Marcar Manutenção
            </Button>
            <Button
              variant="secondary"
              className="ms-1"
              onClick={() => navigate("/verAgendamento")}
            >
              <FaEye /> Ver Agendamentos
            </Button>
          </Modal.Body>
        </div>
      </Modal>

      <ModalFazerAgendamento
        show={showAgendamentoModal}
        onHide={() => setShowAgendamentoModal(false)}
      />

      <Modal show={showConsultarModal} onHide={handleCloseConsultarModal}>
        <div className="bordarModal">
          <Modal.Header closeButton>
            <Modal.Title>Consultar o estado do veículo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleConsultarEstado}>
              <Form.Group controlId="formPlaca">
                <Form.Label>Placa</Form.Label>
                <Form.Control
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  isInvalid={!!formErrors.placa}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.placa}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Consultar
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default BarraMenuCliente;
