import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiAddLargeFill } from 'react-icons/ri';
import "../../css/StylesAdmin/homeAdministrador.css";
import { Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaCar, FaCircle, FaClipboard, FaCogs, FaDollarSign, FaExclamationCircle, FaFileAlt, FaFileSignature, FaHome, FaRegFileAlt, FaStickyNote, FaTint, FaTools, FaUpload, FaUser } from "react-icons/fa";
import { FormularioCliente } from "./AddClientes.jsx";
import { FormularioVeiculo } from "./AddVeiculos.jsx";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import logoMarca from "../../assets/lgo.png";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";





const ServiceAddForm = () => {


  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    numero_trabalho: 'TRAB0011',
    data: '',
    cliente_id: '',
    veiculo_id: '',
    categoria_reparo: '',
    km_entrada: '',
    cobrar_reparo: '',
    filial: 'Filial A',
    status: 'pendente',
    garantia_dias: '',
    data_final_saida: '',
    detalhes: '',
    defeito_ou_servico: '',
    observacoes: '',
    laudo_tecnico: '',
    imagens: [],
    lavagem: false,
    cobrar_lavagem: '',
    status_test_mot: false,
    cobrar_test_mot: '',
  });
  
  const [clientes, setClientes] = useState([]);  // Para carregar clientes via API
  const [veiculos, setVeiculos] = useState([]);  // Para carregar veículos via API
  const [filteredClientes, setFilteredClientes] = useState([]);  // Filtragem do cliente
  const [washBayChecked, setWashBayChecked] = useState(false);

  useEffect(() => {
    // Carregar a data atual do sistema
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setFormData(prevState => ({ ...prevState, data: formattedDate }));

    // Carregar dados de clientes e veículos via API
    fetchClientes();
    fetchVeiculos();
  }, []);

  const fetchClientes = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/clientes');
    const data = await response.json();
    setClientes(data);
  };

  const fetchVeiculos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/veiculos');
    const data = await response.json();
    setVeiculos(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // Adicionando todos os campos do estado ao FormData
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Enviar os dados para a API
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ordens-de-reparo', {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Ordem de reparação criada com sucesso', result);
      } else {
        console.error('Erro ao criar ordem de reparação', result);
      }
    } catch (error) {
      console.error('Erro de conexão com a API', error);
    }
  };

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
  const handleWashBayChange = (e) => {
    setWashBayChecked(e.target.checked);
  };






  // Função para abrir a modal com conteúdo específico


  // Função para fechar a modal

  /**LOGICA IMPORTADA */


  // Função de mudança nos campos do formulário


  // Função para pesquisa de cliente
 




  // Função para selecionar um cliente da lista




  /**LOGICA IMPORTADA */

 

  // Função de mudança nos campos do formulário
 
  // Função para pesquisa de cliente
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

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





  // Função para selecionar um cliente da lista
  const handleClienteSelect = (cliente) => {
    setFormData({
      ...formData,
      id_cliente: cliente.id,
      clienteNome: `${cliente.primeiro_nome} ${cliente.sobrenome}`, // Atualiza o nome do cliente no estado
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



  // Função de envio do formulário
  // Função para enviar o formulário (criar o agendamento)

  const [error, setError] = useState(null);



  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setFormData(prevState => ({
      ...prevState,
      data: formattedDate
    }));

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

  //PEGAR DATA DO SISTEMA




  return (
    <div className="row">
      <div className="col-md-12 col-xs-12">
        <div className="panel panel-default">

          <div className="col-md-12 mt-5">
            <h6>PASSO - 1: ADICIONAR DETALHES DO SERVIÇO...</h6>
            <hr />
          </div>
          <Form id="ServiceAdd-Form" onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="jobno">
                  <Form.Label>Nº Ordem de Reparação <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><AiOutlineFieldNumber fontSize={20} color="#0070fa" /></span>
                    <Form.Control type="text" value={formData.numero_trabalho} readOnly />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Label>Data e Hora <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    type="datetime-local"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
                <div className="d-flex">
                  <div className="input-group d-flex">

                    <span className="input-group-text"><FaUser fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                      type="text"
                      name="clienteSearch"
                      placeholder="Pesquisar Cliente"
                      value={formData.clienteNome} // Exibe o nome do cliente selecionado
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
                {filteredClientes.length > 0 ? (
                  <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {filteredClientes.map(cliente => (
                      <div
                        key={cliente.id}
                        className={`list-group-item text-justify list-group-item-action ${formData.id_cliente === cliente.id ? 'list-group-item-primary' : ''}`}
                        onClick={() => handleClienteSelect(cliente)}
                        style={{ cursor: 'pointer' }}
                      >
                        {`${cliente.primeiro_nome} ${cliente.sobrenome} - ${cliente.celular}`}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="s"></div>
                )}
              </Col>
              <Col md={6}>
                <Form.Label>Veículo <span className="text-danger">*</span></Form.Label>
                <div className="d-flex"><div className="input-group">
                  <span className="input-group-text"><FaCar fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    as="select"
                    name="id_veiculo"
                    value={formData.id_veiculo}
                    onChange={handleChange}
                    required
                    disabled={!formData.id_cliente} // Desabilita o campo se não houver cliente selecionado
                  >
                    <option value="">Selecionar Veículo</option>
                    {/* Verifica se há veículos associados ao cliente */}
                    {formData.id_cliente && veiculos.length > 0 ? (
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
                  </Button></div>
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
                      <Form.Control as="select" required>
                        <option value="">- Selecione categoria de reparo -</option>
                        <option value="breakdown">Breakdown</option>
                        <option value="booked vehicle">Booked Vehicle</option>
                        <option value="repeat job">Repeat Job</option>
                        <option value="customer waiting">Customer Waiting</option>
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
                    <Form.Control type="number" name="km_entrada" required placeholder="Digite o KM de Entrada" />
                  </div>
                </Form.Group>
              </Col>


            </Row>

            <Row className="mb-3">


              <Col xs={12} md={6}>
                <Form.Group controlId="charge_required">
                  <Form.Label>Taxa de serviço (kz) <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaDollarSign fontSize={20} color="#0070fa" /></span>

                    <Form.Control
                      type="text"
                      name="charge"
                      placeholder="Insira a taxa de serviço"
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="branch">
                  <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaHome fontSize={20} color="#0070fa" /></span>

                    <Form.Control as="select" required>
                      <option value="1">Main Branch</option>
                    </Form.Control>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>

              <Col xs={12} md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaCircle fontSize={20} color="#0070fa" /></span>

                    <Form.Control as="select" required>
                      <option value="">Selecione o Status</option>
                      <option value="pendente">Pendente</option>
                      <option value="em andamento">Em Andamento</option>
                      <option value="concluido">Concluído</option>
                    </Form.Control>
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="garantia_dias">
                  <Form.Label>Garantia de Quantos Dias? <span className="text-danger">*</span></Form.Label>

                  <div className="input-group">
                    <span className="input-group-text"><FaFileSignature fontSize={20} color="#0070fa" /></span>
                    <Form.Control type="number" name="garantia_dias" required placeholder="Digite a garantia em dias" />

                  </div></Form.Group>
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
                <Form.Group controlId="details">
                  <Form.Label>Descrição do veículo ou produto</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaClipboard fontSize={20} color="#0070fa" /></span>

                    <Form.Control as="textarea" placeholder="Digite a Descrição do veículo ou produto" rows={7} name="details" maxLength="100" />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="defeito_ou_servico">
                  <Form.Label>Defeito ou Serviço <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaExclamationCircle fontSize={20} color="#0070fa" /></span>
                    <Form.Control as="textarea" rows={7} name="defeito_ou_servico" required placeholder="Descreva o defeito ou serviço realizado" />

                  </div></Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="observacoes">
                  <Form.Label>Observações</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaRegFileAlt fontSize={20} color="#0070fa" /></span>


                    <Form.Control as="textarea" rows={7} name="observacoes" placeholder="Adicione observações adicionais" />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} >
                <Form.Group controlId="laudo_tecnico">
                  <Form.Label>Laudo Técnico</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaCogs fontSize={20} color="#0070fa" /></span>

                    <Form.Control as="textarea" rows={7} name="laudo_tecnico" placeholder="Informe o laudo técnico" />
                  </div>
                </Form.Group>
              </Col>
            </Row>


            <Row className="my-5">

              <Col xs={12} md={6}>
                <Form.Group controlId="images">
                  <Form.Label>Selecione várias imagens</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaUpload fontSize={20} color="#0070fa" /></span>

                    <Form.Control
                      type="file"
                      name="image[]"
                      multiple
                      data-max-file-size="5M"
                    /></div>
                </Form.Group>
              </Col>


            </Row>

            <h6>DETALHES ADCIONAS</h6>
            <hr />
            <Row className="mb-3 d-flex">
              <Col xs={12} md={6}>
                <Form.Group controlId="washBay" className="d-flex  bordando">
                  <Form.Label className="me-3">Lavagem</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="washbay"
                    checked={washBayChecked}
                    onChange={handleWashBayChange}
                    style={{ height: "20px", width: "20px", marginRight: "5px" }}
                  />

                </Form.Group>
              </Col>

              {/* Carga da baía de lavagem */}
              {washBayChecked && (
                <Col xs={12} md={6}>
                  <Form.Group controlId="washBayCharge">
                    <Form.Label>Preço de lavagem (kz)</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text"><FaTint fontSize={20} color="#0070fa" /></span>

                      <Form.Control
                        type="text"
                        name="washBayCharge"
                        placeholder="Insira as preço de lavagem"
                        maxLength="10"
                      />
                    </div>
                  </Form.Group>
                </Col>
              )}
            </Row>



            {/* Teste MOT */}




            <div className="note-row">
              <div className="d-flex justify-content-between">
                <h6 className="baixarTexto text-uppercase">Adicionar Notas</h6>


              </div>
              <Row className="mb-3">
                <Col xs={12}>

                  <hr />



                  <Row className="align-items-center mb-2">
                    {/* Nota Texto */}
                    <Col xs={12} md={4}>
                      <h6>Nota</h6>
                      <div className="input-group">
                        <span className="input-group-text">< FaStickyNote fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          as="textarea"
                          value=""
                          onChange=""
                          placeholder="Escreva uma nota"
                        />
                      </div>
                    </Col>

                    {/* Arquivos */}
                    <Col xs={6} md={4}>
                      <h6>Arquivos</h6>
                      <div className="input-group">
                        <span className="input-group-text">< FaFileAlt fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="file"

                          multiple
                        />
                      </div>
                    </Col>

                    {/* Checkboxes em coluna única */}
                    <Col xs={12} md={4}>
                      <h6>Opções</h6>
                      <Form.Check
                        type="checkbox"
                        checked=""
                        label="Nota Interna"

                        className="d-block mb-2"
                      />
                      <Form.Check
                        type="checkbox"
                        checked=""
                        label="Compartilhado com fornecedor"

                        className="d-block"
                      />
                    </Col>


                  </Row>


                </Col>
              </Row>
            </div>

            <Row>
              <Col xs={12} className="text-center">
                <Button variant="primary" type="submit" size="lg" className="mt-5 links-acessos px-3 w-25 d-block mx-auto">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Modal */}
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
        </div>
      </div>
    </div >
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
              <ServiceAddForm />
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
