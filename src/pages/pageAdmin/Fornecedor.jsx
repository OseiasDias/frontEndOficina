import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { MdDelete, MdEditNote } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgN from "../../assets/not-found.png";

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

export function TabelaVizualizarFornecedores() {
  const [records, setRecords] = useState([]);
  //const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  const navigate = useNavigate();

  const handleView = (fornecedor) => {
    navigate(`/verFornecedor/${fornecedor.id}`);
  };

  const handleDelete = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/distribuidores/${selectedFornecedor.id}`);
      setRecords(records.filter((fornecedor) => fornecedor.id !== selectedFornecedor.id));
      setShowDeleteModal(false);
      toast.success('Fornecedor excluído com sucesso!');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao excluir o fornecedor.");
      toast.error('Erro ao excluir o fornecedor!');
    }
  };

  const columns = [
    { name: "Primeiro Nome", selector: (row) => row.primeiro_nome || "Sem informação" },
    { name: "Último Nome", selector: (row) => row.ultimo_nome || "Sem informação" },
    { name: "Nome da Empresa", selector: (row) => row.nome_empresa || "Sem informação" },
    { name: "E-mail", selector: (row) => row.email || "Sem informação" },
    { name: "Celular", selector: (row) => row.celular || "Sem informação" },
  
   
    { name: "Endereço", selector: (row) => row.endereco || "Sem informação" },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row)}>
              <IoEye fontSize={20} />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/distribuidores/");
      if (Array.isArray(response.data)) {
        setRecords(response.data);
        //setOriginalRecords(response.data);
      } else {
        console.error("Erro ao carregar dados dos fornecedores", response.data);
        throw new Error("Erro ao carregar dados dos fornecedores.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

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
  
  if (error) return <div>{error}</div>;

  return (
    <div className="homeDiv">
      <DataTable
        className="paddingTopTable"
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
      />
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir este fornecedor?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" />
    </div>
  );
}



const Fornecedor = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar /> 

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Fornecedores" direccao="/addFornecedorPage" icone={<IoIosAdd />} leftR="/FornecedorList" />

            <div className="vh-100 alturaPereita">

              <TabelaVizualizarFornecedores />         
              
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

export default Fornecedor;

