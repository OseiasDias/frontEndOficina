import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from "react"; // Corrigido: useEffect importado corretamente
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importando o estilo do Toast
import { FaCar } from "react-icons/fa";
import axios from "axios";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import imgN from "../../assets/not-found.png";
import logoMarca from "../../assets/lgo.png";

import imgErro from "../../assets/error.webp";

// Estilos personalizados para a tabela
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

// eslint-disable-next-line react/prop-types
export function TabelaVizualizarTiposVeiculos({setShowModal}) {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a modal de exclusão
  const [selectedTipo, setSelectedTipo] = useState(null); // Estado para armazenar o tipo de veículo selecionado

  // Função para abrir a modal de visualização (caso deseje adicionar uma visualização detalhada)


  // Função para abrir a modal de confirmação de exclusão
  const handleDelete = (tipo) => {
    setSelectedTipo(tipo); // Definir o tipo de veículo selecionado para exclusão
    setShowDeleteModal(true); // Mostrar a modal de confirmação de exclusão
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tipos-veiculos/${selectedTipo.id}`);
      // Após excluir, fechar a modal e atualizar os dados
      setRecords(records.filter((tipo) => tipo.id !== selectedTipo.id));
      setShowDeleteModal(false);

      // Exibir notificação de sucesso usando o toast
      toast.success('Tipo de veículo excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir o tipo de veículo:", error);
      setError("Erro ao excluir o tipo de veículo.");
      // Exibir notificação de erro usando o toast
      toast.error('Erro ao excluir o tipo de veículo!');
    }
  };

  // Colunas da tabela para tipos de veículos
  const columns = [
    { name: "Tipo", selector: (row) => row.tipo || "Sem informação" },
       {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
         
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdEditNote fontSize={23} />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={23} />
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
      const response = await axios.get("http://127.0.0.1:8000/api/tipos-veiculos");
      if (Array.isArray(response.data)) {
        setRecords(response.data);
        setOriginalRecords(response.data);
      } else {
        console.error("Os dados retornados não contêm um array de tipos de veículos:", response.data);
        throw new Error("Os dados retornados não contêm um array de tipos de veículos.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Usando useEffect corretamente para buscar dados quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }
  
 
  if (error) {
    return (<div className='text-center'><h3 className='text-danger'>{error}</h3>
      <img src={imgErro} alt="Carregando" className="w-50 d-block mx-auto" />
    </div>);
  };

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
   
        <div className="col-12 col-md-6 col-lg-6 d-flex mt-2">
          <h4 className="me-5">Listar Tipos de Veículos</h4>
          <RiAddLargeFill
            className="links-acessos arranjarBTN p-2 border-radius-zero"
            fontSize={35}
            onClick={() => setShowModal(true)} // Aqui abrimos o modal ao clicar
          />
        
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por tipo"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) => item.tipo.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        className="paddingTopTable"
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir este tipo de veículo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container para mostrar as notificações */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default function ListarTiposVeiculos() {
  const [showModal, setShowModal] = useState(false); // Estado para controlar se o modal está visível ou não
  const [novoTipo, setNovoTipo] = useState(""); // Estado para o novo tipo

  const handleNovoTipoChange = (e) => setNovoTipo(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoTipo.trim()) {
      // Aqui você pode adicionar lógica para adicionar o novo tipo
      setNovoTipo(""); // Limpar após envio
      setShowModal(false); // Fechar a modal após o envio
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100 ">
            <TopoAdmin entrada=" Tipos de Veículos" icone={<IoIosAdd />} />
            <div className="vh-100 alturaPereita">
              <TabelaVizualizarTiposVeiculos setShowModal={setShowModal} /> {/* Passando a função de abrir o modal */}
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

      {/* Modal de Adicionar Tipo de Veículo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar Tipo de Veículo</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="novoTipo">
              <div className="d-flex justify-content-between">
                <div className="input-group">
                  <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    placeholder="Digite o novo tipo"
                    value={novoTipo}
                    onChange={handleNovoTipoChange}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="ml-2 links-acessos border-radius-zero"
                >
                  Adicionar
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="p-0">
                                              <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60}/>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

