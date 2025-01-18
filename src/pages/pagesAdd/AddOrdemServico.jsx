import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiAddLargeFill } from 'react-icons/ri';
import "../../css/StylesAdmin/homeAdministrador.css";
import { Form, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaCar, FaCircle, FaClipboard, FaCogs, FaDollarSign, FaExclamationCircle, FaFileAlt, FaFileSignature,  FaHome, FaRegFileAlt, FaStickyNote, FaTint, FaTools, FaUpload, FaUser} from "react-icons/fa";
import { FormularioCliente } from "./AddClientes.jsx";
import { FormularioVeiculo } from "./AddVeiculos.jsx";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import logoMarca from "../../assets/lgo.png";



const ServiceAddForm = () => {


  // eslint-disable-next-line no-unused-vars
  const [formValues, setFormValues] = useState({
    jobno: 'J000005', // Ordem de Reparação
    cust_id: '', // Nome do cliente
    vhi: '', // Nome do veículo
    data_inicial_entrada: '',
    repair_cat: '',
    km_entrada: '',
    charge: '',
    branch: '1', // Galho
    status: '',
    garantia_dias: '',
    data_final_saida: '',
    details: '',
    defeito_ou_servico: '',
    observacoes: '',
    laudo_tecnico: '',
    images: [],
    washBay: false,
    washBayCharge: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showCorModal, setShowCorModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [categorias, setCategorias] = useState([]);

  // Funções para lidar com o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

 

  

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
  const [washBayChecked, setWashBayChecked] = useState(false);

  // Funções para lidar com as mudanças nas checkboxes
  const handleWashBayChange = (e) => {
    setWashBayChecked(e.target.checked);
  };

 


 

  // Função para abrir a modal com conteúdo específico


  // Função para fechar a modal




  

  // Função para adicionar uma nova categoria
 

  // Função para remover uma categoria
 






  return (
    <div className="row">
      <div className="col-md-12 col-xs-12">
        <div className="panel panel-default">

          <div className="col-md-12 mt-5">
            <h6>PASSO - 1: ADICIONAR DETALHES DO SERVIÇO...</h6>
            <hr />
          </div>
          <Form id="ServiceAdd-Form" method="post"  encType="multipart/form-data">
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="jobno">
                  <Form.Label>Nº Ordem de Reparação <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><AiOutlineFieldNumber fontSize={20} color="#0070fa" /></span>
                    <Form.Control type="text" value="OR000005" readOnly />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="cust_id">
                  <Form.Label>Nome do cliente <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex">
                    <div className="input-group">
                      <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>

                      <Form.Control as="select" required>
                        <option value="">Selecione o Cliente</option>
                        <option value="Abracoa">Abraão Odair Kanepa</option>
                      </Form.Control>
                    </div>
                    <Button
                      className="links-acessos px-2 border-radius-zero"
                      onClick={() => handleOpenModal('cliente')}  // Passa o conteúdo específico para a modal
                    >
                      <RiAddLargeFill />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="vhi">
                  <Form.Label>Nome do veículo <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex">
                    <div className="input-group">
                      <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                      <Form.Control as="select" required>
                        <option value="">Selecione o nome do veículo</option>
                      </Form.Control>
                    </div>
                    <Button
                      className="links-acessos px-2 border-radius-zero"
                      onClick={() => handleOpenModal('veiculo')}  // Passa o conteúdo específico para a modal
                    >
                      <RiAddLargeFill />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="data_inicial_entrada">
                  <Form.Label>Data Inicial de Entrada <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>
                    <Form.Control
                      type="datetime-local"
                      name="data_inicial_entrada"
                      required
                    />
                  </div>
                </Form.Group>
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
                    <span className="input-group-text"><FaFileSignature  fontSize={20} color="#0070fa" /></span>
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
                          <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60}/>
              

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
              <img src={logoMarca} className="d-block mx-auto" alt="logo da Biturbo" width={160} height={60}/>

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
