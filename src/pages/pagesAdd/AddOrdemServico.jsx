import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiAddLargeFill } from 'react-icons/ri';
import "../../css/StylesAdmin/homeAdministrador.css";
import { Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaCar, FaCircle, FaClipboard, FaCogs, FaDollarSign, FaExclamationCircle, FaFileSignature, FaHome, FaRegFileAlt, FaTint, FaTools, FaUpload, FaUser } from "react-icons/fa";
import { FormularioCliente } from "./AddClientes.jsx";
import { FormularioVeiculo } from "./AddVeiculos.jsx";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import logoMarca from "../../assets/lgo.png";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import axios from 'axios';



const OrdemDeReparacaoForm = () => {

  //LOGICA DE CADASTRAR ORDEM DE REPARACAO
  const [formData, setFormData] = useState({
    numero_trabalho: 'OR0032',
    cliente_id: '',
    veiculo_id: '',
    data_inicial_entrada: '',
    categoria_reparo: '',
    km_entrada: '',
    cobrar_reparo: '',
    filial: '',
    status: 'pendente',
    garantia_dias: '',
    data_final_saida: '',
    detalhes: '',
    defeito_ou_servico: '',
    observacoes: '',
    laudo_tecnico: '',
    imagens: '',
    lavagem: false,
    cobrar_lavagem: '',
    status_test_mot: false,
    cobrar_test_mot: ''
  });




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Verificar se o tipo é checkbox, caso contrário, capturar o valor normalmente
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked,  // Armazena o valor booleano da checkbox
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,  // Armazena o valor normal de outros campos
      }));
    }
  };

  //========================(FIM DA LOGICA DE CADASTRO OR)===========================



  //LOGICA PARA MODAIS

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showCorModal, setShowCorModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [categorias, setCategorias] = useState([]);


  // Função para abrir a modal
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowCorModal = () => setShowCorModal(true);
  const handleCloseCorModal = () => setShowCorModal(false);


  // Funções para adicionar/remover categorias
  const handleAddCategoria = () => {
    if (novaCategoria.nome) {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria({ nome: '' });
    }
  };

  const handleRemoveCategoria = (nome) => {
    setCategorias(categorias.filter((categoria) => categoria.nome !== nome));
  };
  // Estado para controlar a visibilidade das taxas

  // Funções para lidar com as mudanças nas checkboxes
  /*const handleWashBayChange = (e) => {
    setWashBayChecked(e.target.checked);
  };*/

  //========================(FIM DA LOGICA DE MOdails)===========================









  //LOGICA PARA OPERACOES DO CLIENTES
  const [clientes, setClientes] = useState([]);  // Para carregar clientes via API
  const [veiculos, setVeiculos] = useState([]);  // Para carregar veículos via API
  const [filteredClientes, setFilteredClientes] = useState([]);  // Filtragem do cliente
  //const [washBayChecked, setWashBayChecked] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  /* useEffect(() => {
     // Carregar a data atual do sistema
     const currentDate = new Date();
     const formattedDate = currentDate.toISOString().slice(0, 16);
     setFormData(prevState => ({ ...prevState, data: formattedDate }));
 
     // Carregar dados de clientes e veículos via API
     fetchClientes();
     fetchVeiculos();
   }, []);*/

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:mm
    setFormData(prevState => ({
      ...prevState,
      data_inicial_entrada: formattedDate // Define a data atual no campo de entrada
    }));

    // Carregar clientes via API
    fetch('http://127.0.0.1:8000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setFilteredClientes(data); // Exibe todos os clientes inicialmente
        setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setError('Erro ao carregar clientes');
        setLoading(false);
      });
  }, []);


  /*const fetchClientes = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/clientes');
    const data = await response.json();
    setClientes(data);
  };*/

  // Função para pesquisa de cliente
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Filtra clientes com base no nome ou celular
    const filtered = clientes.filter(cliente => {
      const clienteInfo = `${cliente.primeiro_nome} ${cliente.sobrenome} ${cliente.celular}`;
      return clienteInfo.toLowerCase().includes(searchTerm);
    });

    setFilteredClientes(filtered);

    // Atualiza o nome do cliente no estado
    setFormData({
      ...formData,
      clienteNome: e.target.value
    });
  };

  const handleClienteSelect = (cliente) => {
    setFormData({
      ...formData,
      cliente_id: cliente.id,
      clienteNome: `${cliente.primeiro_nome} ${cliente.sobrenome}`,
    });
    setFilteredClientes([]); // Limpar a lista de resultados ao selecionar um cliente

    // Requisição para pegar os veículos do cliente selecionado
    fetch(`http://127.0.0.1:8000/api/veiculos/cliente/${cliente.id}`)
      .then((response) => response.json())
      .then((data) => {
        setVeiculos(data);  // Armazena os veículos no estado
      })
      .catch((error) => {
        console.error('Erro ao carregar os veículos:', error);
        setVeiculos([]); // Limpa os veículos em caso de erro
      });
  };

  //========================(FIM DA LOGICA DO CLIENTES)===========================



  //LOGICA PARA OPERACOES DO VEICULOS

  /*
   const fetchVeiculos = async () => {
     const response = await fetch('http://127.0.0.1:8000/api/veiculos');
     const data = await response.json();
     setVeiculos(data);
   };*/




  //========================(FIM DA OPERACAO DO VEICULOS)===========================

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/ordens-de-reparo/',
        formData
      );
      console.log('Ordem de Reparação criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar a ordem de reparação:', error);
    }
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
      <Form id="ServiceAdd-Form" onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="numero_trabalho">
              <Form.Label>Nº Ordem de Reparação <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><AiOutlineFieldNumber fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="numero_trabalho"
                  value={formData.numero_trabalho}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Label>Data e Hora de Entrada <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
              <Form.Control
                type="datetime-local"
                name="data_inicial_entrada"
                value={formData.data_inicial_entrada}
                onChange={handleChange}
                required


              />
            </div>
          </Col>
        </Row>


        <Row className="mt-3">
          {/* Campo Cliente */}
          <Col md={6}>
            <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
            <div className="d-flex">
              <div className="input-group d-flex">
                <span className="input-group-text"><FaUser fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="clienteSearch"
                  placeholder="Pesquisar Cliente"
                  value={formData.clienteNome}
                  onChange={handleSearch} // Permite a pesquisa
                />
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={() => handleOpenModal('cliente')}  // Passa o conteúdo específico para a modal
              >
                <RiAddLargeFill />
              </Button>
            </div>

            {/* Exibição da lista de resultados */}
            {filteredClientes.length > 0 && (
              <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredClientes.map(cliente => (
                  <div
                    key={cliente.id}
                    className={`list-group-item text-justify list-group-item-action ${formData.cliente_id === cliente.id ? 'list-group-item-primary' : ''}`}
                    onClick={() => handleClienteSelect(cliente)} // Atualiza o cliente selecionado
                    style={{ cursor: 'pointer' }}
                  >
                    {`${cliente.primeiro_nome} ${cliente.sobrenome} - ${cliente.celular}`}
                  </div>
                ))}
              </div>
            )}
          </Col>

          {/* Campo Veículo */}
          <Col md={6}>
            <Form.Label>Veículo <span className="text-danger">*</span></Form.Label>
            <div className="d-flex">
              <div className="input-group">
                <span className="input-group-text"><FaCar fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  as="select"
                  name="veiculo_id"
                  value={formData.veiculo_id}
                  onChange={handleChange}
                  required
                  disabled={!formData.cliente_id} // Desabilita o campo se não houver cliente selecionado
                >
                  <option value="">Selecionar Veículo</option>
                  {formData.cliente_id && veiculos.length > 0 ? (
                    veiculos.map(veiculo => (
                      <option key={veiculo.id} value={veiculo.id}>
                        {`${veiculo.marca_veiculo} ${veiculo.modelo_veiculo} - ${veiculo.numero_placa}`}
                      </option>
                    ))
                  ) : (
                    <option value="">Nenhum veículo disponível</option>
                  )}
                </Form.Control>
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={() => handleOpenModal('veiculo')}  // Passa o conteúdo específico para a modal
              >
                <RiAddLargeFill />
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="repair_cat">
              <Form.Label>Categoria de reparo <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaTools fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="select"
                    name="categoria_reparo"
                    value={formData.categoria_reparo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione a Categoria</option>
                    <option value="breakdown">Pane</option>
                    <option value="booked vehicle">Veículo Agendado</option>
                    <option value="repeat job">Reparo Repetido</option>
                    <option value="customer waiting">Aguardando Cliente</option>
                    <option value="preventive maintenance">Manutenção Preventiva</option>
                    <option value="electrical issues">Problemas Elétricos</option>
                    <option value="engine overhaul">Reparo de Motor</option>
                    <option value="suspension and steering">Suspensão e Direção</option>
                    <option value="transmission repair">Reparo de Transmissão</option>
                  </Form.Control>
                </div>
                <Button
                  className="links-acessos px-2 border-radius-zero"
                  onClick={handleShowCorModal}  // Abre a modal ao clicar no botão
                >
                  <RiAddLargeFill />
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="km_entrada">
              <Form.Label>KM de Entrada <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="number"
                  name="km_entrada"
                  value={formData.km_entrada}
                  onChange={handleChange}
                  placeholder="Digite o KM de Entrada"

                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="cobrar_reparo">
              <Form.Label>Valor do Reparo (kz) <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaDollarSign fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="cobrar_reparo"
                  placeholder="Insira a valor da reparação"

                  value={formData.cobrar_reparo}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="filial">
              <Form.Label>Filial <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHome fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="filial"
                  value={formData.filial}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="status">
              <Form.Label>Status <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCircle fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pendente">Pendente</option>
                  <option value="em andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="garantia_dias">
              <Form.Label>Garantia (Dias) <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaFileSignature fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="number"
                  name="garantia_dias"
                  placeholder="Digite a garantia em dias"

                  value={formData.garantia_dias}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="data_final_saida">
              <Form.Label>Data Final de Saída <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="datetime-local"
                  name="data_final_saida"
                  value={formData.data_final_saida}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <h6 className="mt-5">DETALHES ADICIONAIS</h6>
        <hr />

        <Row className="my-5">
          <Col xs={12} md={6}>
            <Form.Group controlId="detalhes">
              <Form.Label>Detalhes do Reparo</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaClipboard fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  rows={7}
                  name="detalhes"
                  placeholder="Digite a Descrição do veículo ou produto"

                  value={formData.detalhes}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="defeito_ou_servico">
              <Form.Label>Defeito ou Serviço <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaExclamationCircle fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  rows={7}
                  name="defeito_ou_servico"
                  value={formData.defeito_ou_servico}
                  onChange={handleChange}
                  placeholder="Descreva o defeito ou serviço realizado"

                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="observacoes">
              <Form.Label>Observações</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaRegFileAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  rows={7}
                  name="observacoes"
                  placeholder="Adicione observações adicionais"
                  value={formData.observacoes}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="laudo_tecnico">
              <Form.Label>Analíse Técnica</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCogs fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  rows={7}
                  name="laudo_tecnico"
                  placeholder="Analíse Técnica"

                  value={formData.laudo_tecnico}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="my-5">
          <Col xs={12} md={6}>
            <Form.Group controlId="imagens">
              <Form.Label>Imagens</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUpload fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="file"
                  name="imagens"
                  multiple
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <h6>DETALHES ADICIONAIS</h6>
        <hr />

        <Row className="mb-3 d-flex">
          <Col xs={12} md={6}>
            <Form.Group controlId="lavagem" className="d-flex bordando">
              <Form.Label className="me-3">Lavagem</Form.Label>
              <Form.Check
                type="checkbox"
                name="lavagem"
                checked={formData.lavagem}
                placeholder="Insira as preço de lavagem"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {formData.lavagem && (
            <Col xs={12} md={6}>
              <Form.Group controlId="cobrar_lavagem">
                <Form.Label>Preço da Lavagem (kz)</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaTint fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    type="number"
                    placeholder="Digite o valor da lavagem"
                    step="0.01"
                    name="cobrar_lavagem"
                    value={formData.cobrar_lavagem}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="status_test_mot" className="d-flex bordando">
              <Form.Label className="me-3">Teste MOT</Form.Label>
              <Form.Check
                type="checkbox"
                name="status_test_mot"
                checked={formData.status_test_mot}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {formData.status_test_mot && (
            <Col xs={12} md={6}>
              <Form.Group controlId="cobrar_test_mot">
                <Form.Label>Preço do Teste MOT (kz)</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaTint fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Preço do Teste MOT"
                    name="cobrar_test_mot"
                    value={formData.cobrar_test_mot}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row>
          <Col xs={12} className="text-center">
            <Button variant="primary" type="submit" size="lg" className="mt-5 links-acessos px-3 w-25 d-block mx-auto">
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="modails">
        <Modal show={showModal} onHide={handleCloseModal} centered size="xl" scrollable >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar {modalContent === 'cliente' ? 'Cliente' : 'Veículo'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Aqui você pode renderizar conteúdo dinâmico dependendo do tipo de modal */}
            {modalContent === 'cliente' && (
              <div className="topifincando">
                <FormularioCliente />
              </div>
            )}
            {modalContent === 'veiculo' && (
              <div className="topifincando">
                <FormularioVeiculo />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="p-0">
            <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60} />


          </Modal.Footer>
        </Modal>
        <Modal show={showCorModal} onHide={handleCloseCorModal} scrollable centered>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Categoria de Reparo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Nome da categoria */}
              <div className="d-flex mb-3">
                <Form.Group controlId="novaCategoriaNome" className="w-100">
                  <Form.Label>Nome da Categoria</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="nome"
                      value={novaCategoria.nome}
                      onChange={handleChange}
                      placeholder="Digite o nome da categoria"
                    />
                    <Button variant="primary" onClick={handleAddCategoria} className="btnAddCor links-acessos">
                      Adicionar
                    </Button>
                  </div>
                </Form.Group>
              </div>



            </Form>

            {/* Lista de categorias atuais */}
            <hr />
            <h6>Categorias Atuais</h6>
            <ul className="list-group">
              {categorias.map((categoria) => (
                <li
                  key={categoria.codigo}
                  className="p-3 border linhaRem d-flex justify-content-between align-items-center"
                >
                  {/* Nome e código da categoria */}
                  <span>{categoria.nome} - {categoria.codigo}</span>

                  {/* Ícone para remover a categoria */}
                  <MdDeleteForever
                    className="text-danger"
                    fontSize={20}
                    onClick={() => handleRemoveCategoria(categoria.codigo)}
                    style={{ cursor: 'pointer' }}
                  />
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer className="p-0">
            <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60} />

          </Modal.Footer>
        </Modal>
      </div>

    </>
  );
};











const AddFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="  Adicionar Ordem de Reparação" leftSeta={<FaArrowLeftLong />} leftR="/listarOrdemServico" />
            <div className="vh-100 alturaPereita">
              <OrdemDeReparacaoForm />
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

export default AddFuncionarios;
