/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import logoMarca from "../../assets/lgo.png";

import DataTable from 'react-data-table-component';
import { Dropdown } from 'react-bootstrap';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { IoCall, IoEye } from 'react-icons/io5';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgErro from "../../assets/error.webp";
import imgN from "../../assets/not-found.png";
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import { IoIosAdd } from 'react-icons/io';
import { FaUserGear } from 'react-icons/fa6';
import { FaEnvelopeOpenText, FaMapMarkerAlt } from 'react-icons/fa';

import { FaPrint, FaFilePdf } from 'react-icons/fa';  // Importar os ícones de imprimir e PDF
import { jsPDF } from "jspdf";  // Importar a biblioteca jsPDF para geração de PDF
import Construcao from '../../components/compenentesAdmin/Construcao';

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

const API_URL = import.meta.env.VITE_API_URL;



// Componente principal para visualizar a tabela de produtos
export function TabelaVizualizarProdutos() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // Estado para controlar a modal de visualização
  const [selectedProduto, setSelectedProduto] = useState(null);

  const navigate = useNavigate();

  // Função para abrir a modal de visualização e redirecionar para a página de visualização
  const handleView = (produto) => {
    setSelectedProduto(produto);  // Armazena o produto selecionado
    setShowViewModal(true); // Abre a modal
  };

  // Função para abrir a modal de confirmação de exclusão
  const handleDelete = (produto) => {
    setSelectedProduto(produto);
    setShowDeleteModal(true);
  };

  // Função para confirmar a exclusão
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/produtos/${selectedProduto.id}`);
      setRecords(records.filter((produto) => produto.id !== selectedProduto.id));
      setShowDeleteModal(false);
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      setError('Erro ao excluir o produto.');
      toast.error('Erro ao excluir o produto!');
    }
  };


  const [fabricantes, setFabricantes] = useState([]);
  const [distribuidores, setDistribuidores] = useState([]);
  const [produtos, setProdutos] = useState([]); // Supondo que você também tenha um estado para os produtos
  
  useEffect(() => {
    // Função assíncrona para realizar as requisições
    const fetchData = async () => {
      try {
        // Requisição para obter os fabricantes e distribuidores paralelamente
        const [fabricantesResponse, distribuidoresResponse] = await Promise.all([
          axios.get(`${API_URL}/fabricantes/`),
          axios.get(`${API_URL}/distribuidores/`)
        ]);

        // Armazenar os dados no estado
        setFabricantes(fabricantesResponse.data);
        setDistribuidores(distribuidoresResponse.data);

      } catch (error) {
        // Caso haja erro em uma das requisições
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData(); // Chama a função assíncrona para obter os dados
  }, []); 

  // Função para obter o nome do fabricante a partir do id
  const getFabricanteNome = (id) => {
    const fabricante = fabricantes.find(fab => fab.id === id);
    return fabricante ? fabricante.nome : "Sem informação";
  };

  // Função para obter o nome do fornecedor/distribuidor a partir do id
  const getFornecedorNome = (id) => {
    if (!id) return "Sem informação"; // Se o id não for válido ou não existir
  
    const fornecedor = distribuidores.find(dist => dist.id === id);
    
    if (fornecedor) {
      return `${fornecedor.primeiro_nome} ${fornecedor.ultimo_nome}`;
    } else {
      return "Sem informação"; // Caso o fornecedor não seja encontrado
    }
  };
  

  const columns = [
    {
      name: "Número do Produto",
      selector: (row) => row.id ? `P00${row.id}` : "Sem informação"
    },
    { name: "Nome", selector: (row) => row.nome || "Sem informação" },
    { name: "Fabricante", selector: (row) => getFabricanteNome(row.fabricante_id) },
    { name: "Preço", selector: (row) => `${row.preco || "0.00"} Kz` },
    { name: "Unidade de Medida", selector: (row) => row.unidade_medida || "Sem informação" },
    { name: "Fornecedor", selector: (row) => getFornecedorNome(row.fornecedor_id) },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row)}>
              <IoEye fontSize={20} /> Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdEditNote fontSize={23} /> Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>
              <MdDelete fontSize={23} /> Apagar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  // Função para gerar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#productDetailsTable"), {
      callback: function (doc) {
        doc.save(`${selectedProduto.nome}.pdf`);  // Salva o PDF com o nome do produto
      },
      x: 10,
      y: 10,
    });
  };

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/produtos/`);
      if (Array.isArray(response.data)) {
        setRecords(response.data);
        setOriginalRecords(response.data);
      } else {
        throw new Error("Os dados retornados não contêm um array de produtos.");
      }
    } catch (error) {
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchData quando o componente é montado
  useEffect(() => {
    fetchData();
  }, []);

  // Exibe uma tela de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  // Exibe erro se ocorrer durante a busca dos dados



  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-danger">{error}</h3>
        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
      </div>
    );
  }

  /**INFORMACAO DA MODAL PRODUTO */


  return (
    <div className="homeDiv">
      {/* Barra de pesquisa */}
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6"></div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome ou número do produto"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter(
                  (item) =>
                    item.id.toLowerCase().includes(query) ||
                    item.nome.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      {/* Exibe a tabela de dados */}
      <DataTable
        className="paddingTopTable"
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de Visualização de Produto */}
      <Modal show={showViewModal} scrollable onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className='d-flex justify-content-between w-100 '><h4 className='mt-3'>Detalhes do Produto</h4>
            <img src={logoMarca} className="d-block mx-3" alt="logo da Biturbo" width={160} height={60} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduto && (
            <div>
              <div className="topBarraVe w-100 d-flex">
                <div className="divFoto">
                  <FaUserGear className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                </div>

                <div className="divInfo mt-2 pt-4 ms-3 text-black">
                  <p className="ajusteParagrafo">
                    <span className="me-2">
                      <b>Número de produto: </b>{selectedProduto.id}
                    </span>
                  </p>
                  <p className="ajusteParagrafo">
                    <span className="me-2">
                      <b>Nome do Produto: </b>{selectedProduto.nome}
                    </span>
                  </p>
                </div>
              </div>
              <hr />
              <h4 className="text-center text-underline">Detalhes do Produto</h4>

              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Código do Produto:</strong></td>
                    <td>P00{selectedProduto.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Data de Compra:</strong></td>
                    <td>{selectedProduto.data_compra}</td>
                  </tr>
                  <tr>
                    <td><strong>Nome:</strong></td>
                    <td>{selectedProduto.nome}</td>
                  </tr>
                  <tr>
                    <td><strong>Categoria:</strong></td>
                    <td>{selectedProduto.galho}</td>
                  </tr>
                  <tr>
                    <td><strong>Fabricante:</strong></td>
                    <td>{selectedProduto.fabricante}</td>
                  </tr>
                  <tr>
                    <td><strong>Preço:</strong></td>
                    <td>{selectedProduto.preco} Kz</td>
                  </tr>
                  <tr>
                    <td><strong>Unidade de Medida:</strong></td>
                    <td>{selectedProduto.unidade_medida}</td>
                  </tr>
                  <tr>
                    <td><strong>Fornecedor:</strong></td>
                    <td>{selectedProduto.fornecedor}</td>
                  </tr>

                  <tr>
                    <td><strong>Garantia:</strong></td>
                    <td>{selectedProduto.garantia}</td>
                  </tr>
                  <tr>
                    <td><strong>Nota:</strong></td>
                    <td className='text-justify'>{selectedProduto.nota}</td>
                  </tr>
                  <tr>
                    <td><strong>Nota Interna:</strong></td>
                    <td>{selectedProduto.interna === 1 ? 'Sim' : 'Não'}</td>
                  </tr>
                  <tr>
                    <td><strong>Compartilhada:</strong></td>
                    <td>{selectedProduto.compartilhada === 1 ? 'Sim' : 'Não'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          {/* Botões de Ação */}


          {/* Ícones de Imprimir e Gerar PDF */}
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
          <Button variant="primary" className='links-acessos ms-2' onClick={() => navigate(`/editarProduto/${selectedProduto.id}`)}><MdEditNote fontSize={24} />
            Editar Produto</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja excluir este produto?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container para notificações */}
      <ToastContainer position="top-center" />
    </div>
  );
}





// Componente para a página de produtos, que inclui o sidebar e o topo da página
const Produtos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          {/*Seccao em construcao */}
         <Construcao />
          <div className="flexAuto w-100 d-none">
            <TopoAdmin entrada="Produtos" direccao="/addProdutos" icone={<IoIosAdd />} leftR="/ProdutosList" />

            <div className="vh-100 alturaPereita">
              <TabelaVizualizarProdutos />
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

export default Produtos;
