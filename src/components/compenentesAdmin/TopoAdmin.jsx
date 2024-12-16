import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline, IoPowerOutline } from "react-icons/io5";
import { FaUserShield, FaUser } from "react-icons/fa";
import '../../css/StylesAdmin/topoAdmin.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, Button } from 'react-bootstrap'; // Importar componentes para modal



// eslint-disable-next-line react/prop-types
export default function TopoAdmin({ entrada, direccao, icone, leftSeta, leftR }) {
  const navigate = useNavigate();

  // Estado para controlar a visibilidade da modal
  const [showModal, setShowModal] = useState(false);
  const [navigateTo, setNavigateTo] = useState(''); // Para armazenar a rota para navegação após a confirmação

  // Função para abrir a modal de confirmação
  const handleShowModal = (destination) => {
    setNavigateTo(destination); // Armazena a rota de navegação
    setShowModal(true); // Exibe a modal
  };

  // Função para fechar a modal sem realizar a ação
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para confirmar a saída (redirecionar para a rota armazenada)
  const handleConfirmExit = () => {

    navigate(navigateTo); // Navega para a rota que foi armazenada
    localStorage.clear(); // Limpa o localStorage

    setShowModal(false); // Fecha a modal
  };

  // Função para navegar diretamente para a página de perfil ou outras páginas
  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="topoAdministrador mt-4 d-flex justify-content-between">
      <h4 className="tituloSh formatTexto">
        <span onClick={() => handleNavigate(leftR)} className='cursor-point'>
          {leftSeta}
          <span>{entrada}</span>
        </span>{" "}
     
        <> &nbsp;&nbsp;&nbsp;</>
        {direccao && (
          <span className="definirCor" onClick={() => handleNavigate(direccao)}>
            {icone}
          </span>
        )}
      </h4>

      <div className="escolhas d-flex">
        <Dropdown className="distancia userCorR mx-1 ">
          <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
            <IoMdAdd fontSize={22} style={{ cursor: "pointer" }} color="#044697" />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="opAdmin">
            <Dropdown.Item onClick={() => handleNavigate("/addClientes")} className="colorir">
              <IoMdAdd />&nbsp;&nbsp;Clientes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigate("/addFuncionarios")} className="colorir">
              <IoMdAdd />&nbsp;Funcionarios
            </Dropdown.Item>
           {/** <Dropdown.Item onClick={() => handleNavigate("/perfil")} className="colorir">
              <IoMdAdd />&nbsp;&nbsp;Agendamentos
            </Dropdown.Item>*/} 
            <Dropdown.Item onClick={() => handleNavigate("/addBlogs")} className="colorir">
              <IoMdAdd />&nbsp;Blog
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigate("/addEstoque")} className="colorir">
              <IoMdAdd />&nbsp;Estoque
            </Dropdown.Item>
            
            <Dropdown.Item onClick={() => handleNavigate("/pagamentoList")} className="colorir">
              <IoMdAdd />&nbsp;Pagamentos
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigate("/addServicos")} className="colorir">
              <IoMdAdd />&nbsp;&nbsp;Serviços
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleNavigate("/addVeiculos")} className="colorir">
              <IoMdAdd />&nbsp;Veiculos
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="distancia mx-1 ">
          <IoSettingsOutline fontSize={22} />
        </div>

        <Dropdown className="distancia userCor mx-1">
          <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
            <FaUserShield fontSize={22} style={{ cursor: "pointer" }} color="#fff" />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="opAdmin">
            <Dropdown.Item onClick={() => handleNavigate("/perfil")} className="colorir">
              <FaUser />&nbsp;Perfil
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleShowModal("/acessoAdministrador")} className="colorir"> {/* Chama a modal */}
              <IoPowerOutline />&nbsp;Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você realmente quer sair?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmExit}>
            Sim, Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
