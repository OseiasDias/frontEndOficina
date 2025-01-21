import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Modal, Spinner } from 'react-bootstrap';
import { MdAttachMoney, MdBusiness, MdCategory, MdDateRange, MdDeleteForever, MdImage, MdNote, MdOutlineFileCopy, MdSecurity, MdStraighten, MdTextFields } from "react-icons/md";
import logoMarca from "../../assets/lgo.png";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importando react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Estilos do toast
import { RiAddLargeLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'; // Certifique-se de importar o useNavigate

import { AddFornecedor } from "../pagesAdd/AddFornecedor.jsx";

function FormularioProduto() {
  const [showUnidadeModal, setShowUnidadeModal] = useState(false); // Modal para unidades

  //const [unidadeMedida, setUnidadeMedida] = useState(""); // Estado para o select
 
  //const handleShowCorModal = () => setShowCorModal(true);

  //const handleShowUnidadeModal = () => setShowUnidadeModal(true);
  const handleCloseUnidadeModal = () => setShowUnidadeModal(false);

  

  const handleAddUnidade = () => {
    if (novaUnidade) {
      setUnidades([...unidades, { id: unidades.length + 1, nome: novaUnidade }]);
      setNovaUnidade(""); // Limpar o campo de entrada
      handleCloseUnidadeModal(); // Fechar a modal após adicionar
    }
  };

  const handleRemoveUnidade = (id) => {
    setUnidades(unidades.filter((unidade) => unidade.id !== id));
  };

  const [novaUnidade, setNovaUnidade] = useState(""); // Estado para adicionar nova unidade
  const [produto, setProduto] = useState({
    dataCompra: "",
    nome: "",
    galho: "",
    fabricante: "",
    preco: "",
    unidadeMedida: "",
    fornecedor: "",
    garantia: "",
    imagem: null,
    nota: "",
    notaArquivos: null,
    interna: false,
    compartilhada: false
  });
  

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: checked,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);




  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProduto(prev => ({ ...prev, [name]: files[0] }));
  };
  // Função para o envio do formulário
  const navigate = useNavigate(); // Usando o useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validação do formulário (caso necessário)
    // if (!validateForm()) return;
  
    // Montagem dos dados para envio
    const formData = new FormData();
    formData.append("data_compra", produto.dataCompra);
    formData.append("nome", produto.nome);
    formData.append("galho", produto.galho);
    formData.append("fabricante_id", produto.fabricante); // Ajuste para `fabricante_id`
    formData.append("preco", produto.preco); // O preço é enviado como string
    formData.append("unidade_medida", produto.unidadeMedida);
    formData.append("distribuidor_id", produto.fornecedor); // Aqui você está usando `fornecedor` como distribuidor_id, ajuste conforme a lógica da API
    formData.append("garantia", produto.garantia);
    formData.append("nota", produto.nota);
    formData.append("interna", produto.interna ? 1 : 0); // Envia 1 para true e 0 para false
    formData.append("compartilhada", produto.compartilhada ? 1 : 0); // Envia 1 para true e 0 para false
  
    // Se houver uma imagem, adiciona ao FormData
    if (produto.imagem) {
      formData.append('imagem', produto.imagem); // Aqui a imagem será enviada como arquivo
    }
  
    // Se houver arquivos de nota, adicione-os (ajustado para múltiplos arquivos)
    if (produto.notaArquivos) {
      Array.from(produto.notaArquivos).forEach((file) => {
        formData.append('nota_arquivos[]', file);
      });
    }
  
    // Configuração de loading
    setIsLoading(true);
  
    // Envio dos dados via axios
    axios.post('http://127.0.0.1:8000/api/produtos/', formData)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        toast.success("Produto cadastrado com sucesso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
  
        setTimeout(() => {
          // Limpar os campos do formulário após o tempo do toast
          setProduto({
            dataCompra: "",
            nome: "",
            galho: "",
            fabricante: "",
            preco: "",
            unidadeMedida: "",
            fornecedor: "",
            garantia: "",
            imagem: null,
            nota: "",
            notaArquivos: null,
            interna: false,
            compartilhada: false
          });
  
          // Fechar a modal, se necessário
          setShowFabricanteModal(false);
  
          // Redirecionamento após sucesso do cadastro
          navigate('/produtosPage'); // Isso irá redirecionar para /produtosPage
        }, 5000); // 5000ms corresponde ao tempo de autoClose do toast
      })
      .catch((error) => {
        // Tratamento de erro
        if (error.response) {
          toast.error(`Erro ao cadastrar produto: ${error.response.data.message || "Tente novamente."}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        } else {
          toast.error("Erro ao cadastrar produto. Tente novamente.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
        setIsLoading(false); // Corrigido o estado de loading para false após erro
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };
  





  /**CONFIGURAÇÕES DA MODAL FABRICANTE */
  const [showFabricanteModal, setShowFabricanteModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [fabricantes, setFabricantes] = useState([]);
  const [novoFabricante, setNovoFabricante] = useState('');
  const [fabricanteToDelete, setFabricanteToDelete] = useState(null);

  const [showFornecedorModal, setShowFornecedorModal] = useState(false);

  const handleCloseFornecedorModal = () => setShowFornecedorModal(false);
  const handleShowFornecedorModal = () => setShowFornecedorModal(true);
  // Função para abrir a modal principal
  const handleOpenFabricanteModal = () => setShowFabricanteModal(true);

  // Função para fechar a modal principal
  const handleCloseFabricanteModal = () => setShowFabricanteModal(false);

  // Função para buscar todos os fabricantes
  const fetchFabricantes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/fabricantes/');
      setFabricantes(response.data);
    } catch (error) {
      console.error('Erro ao buscar fabricantes:', error);
    }
  };

  // Função para adicionar um novo fabricante
  const handleAddFabricante = async () => {
    if (novoFabricante.trim() === '') {
      toast.error('O nome do fabricante não pode estar vazio.');
      return;
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/api/fabricantes/', { nome: novoFabricante });
      setNovoFabricante(''); // Limpa o campo de input
      fetchFabricantes(); // Recarrega a lista de fabricantes
      toast.success('Fabricante adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar fabricante,Talvez esse fabricante ja existe:', error);
      toast.error('Erro ao adicionar fabricante,Talvez esse fabricante ja existe:');
    }
  };
  
  // Função para abrir a modal de confirmação de exclusão
  const handleOpenConfirmDeleteModal = (fabricanteId) => {
    setFabricanteToDelete(fabricanteId);
    setShowConfirmDeleteModal(true);
  };

  // Função para fechar a modal de confirmação de exclusão
  const handleCloseConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

  // Função para remover um fabricante
  const handleRemoveFabricante = async () => {
    if (!fabricanteToDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/fabricantes/${fabricanteToDelete}`);
      fetchFabricantes(); // Recarrega a lista de fabricantes
      setShowConfirmDeleteModal(false);
    

      toast.success('Fabricante excluído com sucesso!!');
    } catch (error) {
      console.error('Erro ao remover fabricante:', error);
      toast.error('Erro ao excluir fabricante!');
    }
  };

  // Carregar os fabricantes ao abrir a modal principal
  useEffect(() => {
    if (showFabricanteModal) {
      fetchFabricantes();
    }
  }, [showFabricanteModal]);
  /**FIM DA CONFIGURAÇÃO DA MODAL FABRICANTE */


  /**CONFIGURAÇAO DA LISTAGEM DO FABRICANTE NO SELECT */




  // Chama a função fetchFabricantes assim que o componente for montado
  useEffect(() => {
    fetchFabricantes();
  }, []);



  /**FIM DA CONFIGURAÇÃO DE LISTAGEM */

  /**CONFIGURAÇÕES DA MODAL UNIDADE */

  const [showUnidadeMedidaModalUnidade, setShowUnidadeMedidaModalUnidade] = useState(false);
  const [showConfirmDeleteModalUnidade, setShowConfirmDeleteModalUnidade] = useState(false);
  const [novaUnidadeMedidaUnidade, setNovaUnidadeMedidaUnidade] = useState('');
  const [unidadeMedidaToDeleteUnidade, setUnidadeMedidaToDeleteUnidade] = useState(null);

  // Função para buscar todas as unidades de medida


  // Função para adicionar uma nova unidade de medida
  const handleAddUnidadeMedidaUnidade = async () => {
    if (novaUnidadeMedidaUnidade.trim() === '') {
      toast.error('O nome da unidade de medida não pode estar vazio.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/unidade-medidas/', { unidade: novaUnidadeMedidaUnidade });
      setNovaUnidadeMedidaUnidade('');
      fetchUnidadesMedidaUnidade(); // Recarrega a lista de unidades de medida
      toast.success('Unidade de medida adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar unidade de medida:', error);
      toast.error('Erro ao adicionar unidade de medida!');
    }
  };

  // Função para abrir a modal de confirmação de exclusão
  const handleOpenConfirmDeleteModalUnidade = (unidadeMedidaIdUnidade) => {
    setUnidadeMedidaToDeleteUnidade(unidadeMedidaIdUnidade);
    setShowConfirmDeleteModalUnidade(true);
  };

  // Função para fechar a modal de confirmação de exclusão
  const handleCloseConfirmDeleteModalUnidade = () => setShowConfirmDeleteModalUnidade(false);

  // Função para remover uma unidade de medida
  const handleRemoveUnidadeMedidaUnidade = async () => {
    if (!unidadeMedidaToDeleteUnidade) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/unidade-medidas/${unidadeMedidaToDeleteUnidade}`);
      fetchUnidadesMedidaUnidade(); // Recarrega a lista de unidades de medida
      setShowConfirmDeleteModalUnidade(false);
      toast.success('Unidade de medida excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao remover unidade de medida:', error);
      toast.error('Erro ao excluir unidade de medida!');
    }
  };

  // Carregar as unidades de medida ao abrir a modal principal
  useEffect(() => {
    if (showUnidadeMedidaModalUnidade) {
      fetchUnidadesMedidaUnidade();
    }
  }, [showUnidadeMedidaModalUnidade]);

  /*CONFIGURAÇOES PRA O SELECT UNIDADE */

  const [unidades, setUnidades] = useState([]);


  // Função para abrir a modal principal
  const handleOpenUnidadeMedidaModalUnidade = () => setShowUnidadeMedidaModalUnidade(true);

  // Função para fechar a modal principal
  const handleCloseUnidadeMedidaModalUnidade = () => setShowUnidadeMedidaModalUnidade(false);

  // Função para buscar todas as unidades de medida
  const fetchUnidadesMedidaUnidade = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/unidade-medidas/');
      console.log('Unidades de Medida:', response.data);  // Verifique se os dados estão sendo retornados corretamente
      setUnidades(response.data);  // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar unidades de medida:', error);
      toast.error('Erro ao carregar unidades de medida');
    }
  };

  // Função para lidar com a mudança do select


  // Carregar as unidades de medida ao montar o componente
  useEffect(() => {
    fetchUnidadesMedidaUnidade();
  }, []);


  /**CONFIGURACAO DO SELECT UNIDADES */

  const [fornecedores, setFornecedores] = useState([]);


  // Função para buscar os fornecedores
  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/distribuidores/');
      console.log('Fornecedores:', response.data);  // Verifique os dados no console
      setFornecedores(response.data);  // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      toast.error('Erro ao carregar fornecedores');
    }
  };

  // Função para lidar com a mudança do select

  // Carregar os fornecedores ao montar o componente
  useEffect(() => {
    fetchFornecedores();
  }, []);


  return (
    <>

    

      <Form id="produtoForm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="col-md-12 mt-5">
          <h6>INFORMAÇÕES DO PRODUTO</h6>
          <hr />
        </div>

        <Row>
          {/* Número do Produto */}


          {/* Data de Compra */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="dataCompra">
              <Form.Label className="fortificarLetter">Data de Compra <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdDateRange fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="date"
                  name="dataCompra"
                  value={produto.dataCompra}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="garantia">
              <Form.Label className="fortificarLetter">Garantia</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdSecurity fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="garantia"
                  value={produto.garantia}
                  onChange={handleChange}
                  placeholder="Insira a garantia do produto"
                  maxLength="20"
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Nome */}
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="nome">
              <Form.Label className="fortificarLetter">Nome do produto<span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdTextFields fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nome"
                  value={produto.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome do produto"
                  maxLength="30"
                  required
                />
              </div>
            </Form.Group>
          </Col>

          {/* Galho */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="galho">
              <Form.Label className="fortificarLetter">Galho <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdCategory fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  as="select"
                  name="galho"
                  value={produto.galho}
                  onChange={handleChange}
                >
                  <option value="1">Galho Principal</option>
                  <option value="Galho Central">Galho Central</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Fabricante */}
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="fabricante">
              <Form.Label>Nome do Fabricante <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text">
                    <MdBusiness fontSize={22} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="select"
                    name="fabricante"
                    value={produto.fabricante}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--Selecione o nome da fabricação--</option>
                    {fabricantes.map((fabricante) => (
                      <option key={fabricante.id} value={fabricante.id}>
                        {fabricante.nome}
                      </option>
                    ))}
                  </Form.Control>
                </div>

                <Button
                  onClick={handleOpenFabricanteModal}
                  className="btn btn-primary ms-3 links-acessos d-flex px-4 pt-2"
                >
                  <RiAddLargeLine size={19} className="me-2" />  /  <MdDeleteForever className="ms-2" size={19} />
                </Button>
              </div>
            </Form.Group>
          </Col>

          {/* Preço */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="preco">
              <Form.Label className="fortificarLetter">Preço ($) <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdAttachMoney fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="preco"
                  value={produto.preco}
                  onChange={handleChange}
                  placeholder="Digite o preço do produto"
                  maxLength="10"
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Unidade de Medida */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="unidadeMedida">
              <Form.Label className="fortificarLetter">
                Unidade de Medida <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text">
                    <MdStraighten fontSize={22} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="select"
                    name="unidadeMedida"
                    value={produto.unidadeMedida}
                    onChange={handleChange}
                  >
                    <option value="">- Selecionar Unidade -</option>
                    {unidades.length > 0 ? (
                      unidades.map((unidade) => (
                        <option key={unidade.id} value={unidade.id}>
                          {unidade.unidade}
                        </option>
                      ))
                    ) : (
                      <option>Carregando...</option>
                    )}
                  </Form.Control>
                </div>
                <button
                  onClick={handleOpenUnidadeMedidaModalUnidade}
                  className="btn btn-primary ms-3 links-acessos d-flex px-4 pt-2"
                >
                  <RiAddLargeLine size={19} className="me-2" />  /  <MdDeleteForever className="ms-2" size={19} />
                </button>
              </div>
            </Form.Group>
          </Col>

          {/* Selecione o fornecedor */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="fornecedor">
              <Form.Label className="fortificarLetter">
                Fornecedor <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text">
                    <MdBusiness fontSize={22} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="select"
                    name="fornecedor"
                    value={produto.fornecedor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">- Selecionar Fornecedor -</option>
                    {fornecedores.length > 0 ? (
                      fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {`${fornecedor.primeiro_nome} ${fornecedor.ultimo_nome} - ${fornecedor.nome_empresa}`}
                        </option>
                      ))
                    ) : (
                      <option>Carregando...</option>
                    )}
                  </Form.Control>
                </div>
                <Button className="btn btn-primary ms-3 links-acessos" onClick={handleShowFornecedorModal}>+</Button>

                <Modal show={showFornecedorModal} scrollable size="xl" onHide={handleCloseFornecedorModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Adicionar Fornecedor Agora</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <AddFornecedor />
                  </Modal.Body>
                  <Modal.Footer className="p-0">
                    <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60} />
                  </Modal.Footer>
                </Modal>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Cor */}
          

          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="imagem">
              <Form.Label className="fortificarLetter">Imagem</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdImage fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="file"
                  name="imagem"
                  onChange={handleImageChange}
                  disabled
                />
              </div>
              {produto.imagem && (
                <img
                  src={URL.createObjectURL(produto.imagem)}
                  alt="Imagem do produto"
                  style={{ width: 100, marginTop: '10px' }}
                />
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Notas */}
         {/* Notas */}
      <Form.Group>
        <div className="d-flex justify-content-between">
          <h6 className="mt-5">Adicionar Notas</h6>
        </div>
        <hr />
        <div className="nota d-flex">
          <Row>
            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId={`nota-texto`}>
                <Form.Label className="fortificarLetter">Notas</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><MdNote fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    as="textarea"
                    name="nota"  // Agora estamos controlando "nota" como uma string
                    value={produto.nota}  // Valor da nota
                    onChange={handleChange}  // Atualiza o estado da nota
                    maxLength="100"
                  />
                </div>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Form.Group controlId={`nota-arquivos`}>
                <Form.Label className="fortificarLetter">Arquivos</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><MdOutlineFileCopy fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="file"
                    name={`nota-arquivos`}
                    onChange=""  // Se precisar de manipulação de arquivos, adicione aqui
                    multiple
                    disabled
                  />
                </div>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={4} className="pt-4">
              {/* Checkbox para Nota Interna */}
              <Form.Check
                type="checkbox"
                label="Nota Interna"
                name="interna"
                checked={produto.interna}
                onChange={handleCheckboxChange}
              />

              {/* Checkbox para Compartilhado com Fornecedor */}
              <Form.Check
                type="checkbox"
                label="Compartilhado com fornecedor"
                name="compartilhada"
                checked={produto.compartilhada}
                onChange={handleCheckboxChange}
              />
            </Col>
          </Row>
        </div>
      </Form.Group>


        {/* Botão de Enviar */}
         {/* Botão de envio */}
         <Button
            variant="primary"
            type="submit"
            className="mt-5 w-25 d-block mx-auto links-acessos px-5"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Cadastrar"
            )}
          </Button>
      </Form>
      <ToastContainer position="top-center" />


      <div className="modaisl">

    

        {/* Modal para adicionar nova unidade */}
        <Modal show={showUnidadeModal} onHide={handleCloseUnidadeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar unidade de medida</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex">
                <Form.Group className="mb-3 w-100">
                  <Form.Control
                    type="text"
                    value={novaUnidade}
                    onChange={(e) => setNovaUnidade(e.target.value)}
                    placeholder="Digite a unidade de medida"
                    maxLength="30"
                  />
                </Form.Group>

                <Button className="h-25 ms-2" onClick={handleAddUnidade}>
                  Enviar
                </Button>
              </div>
            </Form>

            <table className="table unitproductname mt-3">
              <tbody>
                {unidades.map((unidade) => (
                  <tr key={unidade.id} className="delete-1 data_unit_name row mx-1 border my-2">
                    <td className="text-start col-6 ">{unidade.nome}</td>
                    <td className="text-end col-6">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveUnidade(unidade.id)}
                      >
                        <MdDeleteForever fontSize={26} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>


        {/* Modal para adicionar nova unidade */}
        {/* Modal para adicionar/remover fabricante */}

        {/* Modal Principal */}
        <Modal show={showFabricanteModal} size="lg" scrollable onHide={handleCloseFabricanteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Nome do Fabricante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex">
                <Form.Group className="mb-3 w-100">
                  <Form.Control
                    type="text"
                    value={novoFabricante}
                    onChange={(e) => setNovoFabricante(e.target.value)}
                    placeholder="Nome do Fabricante"
                    maxLength="30"
                  />
                </Form.Group>
                <Button className="h-25 ms-2 links-acessos" onClick={handleAddFabricante}>
                  Adicionar
                </Button>
              </div>
            </Form>

           

            <table className="table unitproductname mt-3 table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {fabricantes.map((fabricante) => (
                  <tr key={fabricante.id}>
                    <td className="pt-3">{fabricante.nome}</td>
                    <td className="text-end">
                      <Button
                        variant="danger"
                        onClick={() => handleOpenConfirmDeleteModal(fabricante.id)}
                      >
                        <MdDeleteForever fontSize={22} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer className="p-0">

            <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60} />

          </Modal.Footer>
        </Modal>

        {/* Modal de Confirmação de Exclusão */}
        <Modal
          show={showConfirmDeleteModal}
          onHide={handleCloseConfirmDeleteModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Essa ação não pode ser desfeita.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleRemoveFabricante}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>

        {/**MODAL UNIDADES */}


        {/* Modal Principal */}
        <Modal show={showUnidadeMedidaModalUnidade} size="lg" scrollable onHide={handleCloseUnidadeMedidaModalUnidade}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Unidade de Medida</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="d-flex">
                <Form.Group className="mb-3 w-100">
                  <Form.Control
                    type="text"
                    value={novaUnidadeMedidaUnidade}
                    onChange={(e) => setNovaUnidadeMedidaUnidade(e.target.value)}
                    placeholder="Nome da Unidade de Medida"
                    maxLength="30"
                  />
                </Form.Group>
                <Button className="h-25 ms-2 links-acessos" onClick={handleAddUnidadeMedidaUnidade}>
                  Adicionar
                </Button>
              </div>
            </Form>
         
          

            <table className="table unitproductname mt-3 table-striped">
              <thead>
                <tr>
                  <th>Unidade</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidade) => (
                  <tr key={unidade.id}>
                    <td className="pt-3">{unidade.unidade}</td>
                    <td className="text-end">
                      <Button
                        variant="danger"
                        onClick={() => handleOpenConfirmDeleteModalUnidade(unidade.id)}
                      >
                        <MdDeleteForever fontSize={22} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer className="p-0">
            <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60} />
          </Modal.Footer>
        </Modal>

        {/* Modal de Confirmação de Exclusão */}
        <Modal
          show={showConfirmDeleteModalUnidade}
          onHide={handleCloseConfirmDeleteModalUnidade}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <p>Essa ação não pode ser desfeita.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmDeleteModalUnidade}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleRemoveUnidadeMedidaUnidade}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </>
  );
}















export default function AddProdutos() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="  Adicionar Produtos" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/produtosPage" />

            <div className="vh-100 alturaPereita">
              <FormularioProduto />
            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">

                Copycenter © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
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




