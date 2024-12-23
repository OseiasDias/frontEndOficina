import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { IoIosAdd } from "react-icons/io";



import "../../css/StylesAdmin/homeAdministrador.css";

import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Dropdown } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEye } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para redirecionamento

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

export function TabelaVizualizarBlogs() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a modal de exclusão
  const [selectedBlog, setSelectedBlog] = useState(null); // Estado para armazenar o blog selecionado

  const navigate = useNavigate(); // Hook do React Router para navegação

  // Função para abrir a modal de visualização e redirecionar para a página de visualização
  const handleView = (blog) => {
    // Redireciona para a rota de visualização passando o ID
    navigate(`/verBlog/${blog.id}`);
  };

  // Função para abrir a modal de confirmação de exclusão
  const handleDelete = (blog) => {
    setSelectedBlog(blog); // Definir o blog selecionado para exclusão
    setShowDeleteModal(true); // Mostrar a modal de confirmação de exclusão
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blogs/${selectedBlog.id}`);
      // Após excluir, fechar a modal e atualizar os dados
      setRecords(records.filter((blog) => blog.id !== selectedBlog.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao excluir o blog:", error);
      setError("Erro ao excluir o blog.");
    }
  };

  // Colunas da tabela
  const columns = [
    { name: "Título", selector: (row) => row.titulo || "Sem título" },
    { name: "Conteúdo", selector: (row) => row.conteudo.slice(0, 50) + "..." || "Sem conteúdo" },
    {
      name: "Foto",
      selector: (row) => (
        row.foto ? (
          <img
            src={`http://127.0.0.1:8000/storage/${row.foto}`} // Ajuste para caminho correto da foto
            alt="Foto do Blog"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ) : (
          "Sem foto"
        )
      ),
    },
    { name: "Data de Publicação", selector: (row) => new Date(row.data_publicacao).toLocaleDateString() || "Sem data" },
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
            <Dropdown.Item onClick={() => handleView(row)}>
              <AiOutlineEdit fontSize={20} />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={20} />
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
      const response = await axios.get("http://127.0.0.1:8000/api/blogs");
      if (Array.isArray(response.data)) {
        setRecords(response.data);
        setOriginalRecords(response.data);
      } else {
        console.error("Os dados retornados não contêm um array de blogs:", response.data);
        throw new Error("Os dados retornados não contêm um array de blogs.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          {/* Você pode adicionar filtros ou outras funcionalidades aqui */}
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por título ou conteúdo"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.titulo.toLowerCase().includes(query) ||
                    item.conteudo.toLowerCase().includes(query)
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir este blog?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


const Blog = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Blogs" icone={<IoIosAdd />} direccao="/addBlogs" />

            <div className="vh-100 alturaPereita">
            <TabelaVizualizarBlogs />
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

export default Blog;
