import "../../css/StylesAdmin/homeAdministrador.css";
import {
  FaGlobe, FaMapMarkerAlt, FaMapPin, FaHome, FaCamera,
  FaEnvelope, FaUser, FaCalendarAlt, FaVenusMars, FaMobileAlt, FaPhone, FaBuilding, FaSuitcase,
  FaRegCalendarAlt, FaUniversity, FaIdCard, FaCreditCard
} from "react-icons/fa";
import { InputGroup, Form, Button, Row, Col, Modal, Image, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineFieldNumber } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API_URL;



const FormularioFuncionario = () => {
  const [formData, setFormData] = useState({
    numero_funcionario: "",
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    bilheteIdentidade: '',
    nomeBanco: '',
    iban: '',
    foto: '',
    genero: 'masculino',
    celular: '',
    telefoneFixo: '',
    filial: '',
    cargo: '',
    dataAdmissao: '',
    pais: '',
    estado: '',
    cidade: '',
    endereco: '',
    bloqueado: false,
  });



  //LOGICA PARA GERAR NUMERO FUNCIONARIO


  // eslint-disable-next-line no-unused-vars
  const [ultimoId, setUltimoId] = useState(null);

  // Função para pegar o último ID da ordem
  const fetchUltimoId = async () => {
    try {
      const response = await axios.get(`${API_URL}/funcionariosUltimo/ultimo-id`);
      const id = response.data.ultimo_id;
      setUltimoId(id);
      gerarNumeroOrdem(id); // Gerar o número da ordem após obter o último ID
    } catch (error) {
      console.error('Erro ao buscar último ID:', error);
    }
  };

  // Gerar o número da ordem no formato "OR0{ultimoId}"
  const gerarNumeroOrdem = (id) => {
    if (id !== null) {
      const numeroFuncionario = `FN00${id}`;
      setFormData(prevState => ({
        ...prevState,
        numero_funcionario: numeroFuncionario
      }));
    }
  };

  // UseEffect para buscar o último ID assim que o componente for montado
  useEffect(() => {
    fetchUltimoId();
  }, []);

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };


  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [novoCargo, setNovoCargo] = useState('');
  const [cargos, setCargos] = useState([
    'Mecânico',
    'Assistente de Mecânica',
    'Supervisor de Oficina',
    'Gerente de Oficina',
    'Atendente',
    'Técnico de Diagnóstico',
    'Chefe de Oficina',
    'Líder de Equipe',
    'Estagiário de Mecânica'
  ]);

  const handleAlteracaoNovoCargo = (event) => {
    setNovoCargo(event.target.value);
  };

  const handleAdicionarCargo = () => {
    if (novoCargo) {
      setCargos([...cargos, novoCargo]);
      setMostrarModal(false);
    }
  };

  const [errors, setErrors] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const hoje = new Date().toISOString().split("T")[0];

    if (!formData.nome) newErrors.nome = "Nome é obrigatório.";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(formData.nome)) newErrors.nome = "Nome inválido.";
    if (!formData.email) newErrors.email = "E-mail é obrigatório.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido.";
    if (!formData.telefoneFixo) newErrors.telefoneFixo = "Telefone é obrigatório.";
    if (!/^\d{9,}$/.test(formData.telefoneFixo)) newErrors.telefoneFixo = "Telefone inválido.";
    if (formData.dataNascimento && formData.dataNascimento > hoje) newErrors.dataNascimento = "Data de nascimento inválida.";
    if (!formData.genero) newErrors.genero = "Gênero é obrigatório.";
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/funcionarios`, formData);
      console.log('Funcionario cadastrado:', response.data);
      toast.success('Funcionário cadastrado com sucesso!');

      setTimeout(() => {
        setIsLoading(false);
        navigate('/funcionariosList');
      }, 4000);
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      toast.error('Erro ao cadastrar funcionário.');
      setIsLoading(false);
    }
  };

 

  useEffect(() => {
    // Definindo a data do sistema no formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData({
      ...formData,
      dataAdmissao: currentDate, // define a data de admissão como a data atual
    });
  }, []);


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Form id="formulario_adicionar_funcionario" method="post" className="form-horizontal upperform employeeAddForm" onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <div className="col-md-12 mt-5">
          <h6>INFORMAÇÕES PESSOAIS</h6>
          <hr />
        </div>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="numero_funcionario">
              <Form.Label>Nº Funcionário <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><AiOutlineFieldNumber fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="numero_funcionario"
                  value={formData.numero_funcionario} // Ligar ao valor correto
                  onChange={handleInputChange} // Lidar com a mudança no estado
                  required
                  disabled // Desabilitado para não permitir edição direta
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="dataNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">

          <Col md={6}>
            <Form.Group controlId="nome">
              <Form.Label>Primeiro nome <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Introduza o primeiro nome"
                  maxLength="50"
                />
              </div>
              {errors.nome && <div className="text-danger">{errors.nome}</div>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sobrenome">
              <Form.Label>Último nome <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                  placeholder="Insira o último nome"
                  maxLength="50"
                />
              </div>
              {errors.sobrenome && <div className="text-danger">{errors.sobrenome}</div>}
            </Form.Group>
          </Col>
        </Row>





        {/* Outros campos omitidos para concisão */}



        <Row className="mb-3">

          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>E-mail <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Digite o e-mail"
                  maxLength="50"
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="genero">
              <Form.Label>Gênero</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaVenusMars fontSize={20} color="#0070fa" />
                </span>

                <Form.Select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="ms-3"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Novo Campo - Bilhete de Identidade */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="bilheteIdentidade">
              <Form.Label>Bilhete de Identidade <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaIdCard fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="bilheteIdentidade"
                  value={formData.bilheteIdentidade}
                  onChange={handleChange}
                  required
                  placeholder="Digite o Bilhete de Identidade"
                  maxLength="20"
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nomeBanco">
              <Form.Label>Nome do Banco </Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUniversity fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nomeBanco"
                  value={formData.nomeBanco}
                  onChange={handleChange}
                  placeholder="Digite o nome do seu banco"
                  maxLength="100"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Novo Campo - Nome do Banco */}


        <Row>

          <Col md={6}>
            <Form.Group controlId="iban">
              <Form.Label>IBAN </Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCreditCard fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  placeholder="Digite o número do IBAN"
                  maxLength="34"
                />
              </div>
            </Form.Group>
          </Col>




          <Col>
            <Form.Group controlId="uploadArquivo">
              <Form.Label>Foto</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCamera fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  disabled
                  placeholder="Escolher a foto"
                />
              </div>
              <Image src={formData.uploadArquivo ? URL.createObjectURL(formData.uploadArquivo[0]) : ''} thumbnail />
            </Form.Group>
          </Col>

        </Row>

        <Row>


        </Row>

        {/* Informações de Contato */}
        <div className="col-md-12 col-lg-12 col-xl-12 mt-3 col-xxl-12 col-sm-12 col-xs-12 space">
          <h6>INFORMAÇÕES DE CONTATO</h6>
          <hr />
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="celular">
              <Form.Label>Número do celular <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaMobileAlt fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  placeholder="Digite o número de celular"
                  maxLength="16"
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="telefoneFixo">
              <Form.Label>Número do telefone fixo</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaPhone fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="telefoneFixo"
                  value={formData.telefoneFixo}
                  onChange={handleChange}
                  placeholder="Digite o telefone fixo"
                  maxLength="16"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Informações Profissionais */}
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 col-xs-12 space">
          <h6>INFORMAÇÕES PROFISSIONAIS</h6>
          <hr />
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="filial">
              <Form.Label>Filial <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaBuilding fontSize={20} color="#0070fa" /></span>

                <Form.Select
                  as="select"
                  name="filial"
                  value={formData.filial}
                  onChange={handleChange}
                  required
                >
                  <option value="1">Filial Principal</option>
                  <option value="1">Filial Central</option>


                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="cargo">
              <Form.Label>Cargo <span className="text-danger">*</span></Form.Label>

              <InputGroup>
                <div className="input-group">
                  <span className="input-group-text"><FaSuitcase fontSize={20} color="#0070fa" /></span>

                  <Form.Select
                    as="select"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}

                  >
                    <option value="">Selecione o cargo</option>
                    {cargos.map((cargo, index) => (
                      <option key={index} value={cargo}>
                        {cargo}
                      </option>
                    ))}
                  </Form.Select>

                  <Button variant="outline-secondary" onClick={() => setMostrarModal(true)}>
                    Adicionar
                  </Button>
                </div>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
        
          <Col md={6}>
            <Form.Group controlId="dataAdmissao">
              <Form.Label>Data de Admissão <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaRegCalendarAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="date"
                  name="dataAdmissao"
                  value={formData.dataAdmissao}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>


        {/* Endereço */}
        <div className="col-md-12 mt-3">
          <h6>ENDEREÇO</h6>
          <hr />
        </div>

        <Row>
          <Col md={6}>
            <Form.Group controlId="pais">
              <Form.Label className="fw-900">País <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaGlobe fontSize={20} color="#0070fa" /></span>
                <Form.Select
                  as="select"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  required


                >
                  <option value="">Selecione o país</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Antártica">Antártica</option>
                  <option value="Antígua e Barbuda">Antígua e Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armênia">Armênia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Austrália">Austrália</option>
                  <option value="Áustria">Áustria</option>
                  <option value="Azerbaijão">Azerbaijão</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrein">Bahrein</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Bielorrússia">Bielorrússia</option>
                  <option value="Bélgica">Bélgica</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermudas">Bermudas</option>
                  <option value="Butão">Butão</option>
                  <option value="Bolívia">Bolívia</option>
                  <option value="Bósnia e Herzegovina">Bósnia e Herzegovina</option>
                  <option value="Botsuana">Botsuana</option>
                  <option value="Ilha Bouvet">Ilha Bouvet</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Território Britânico do Oceano Índico">Território Britânico do Oceano Índico</option>
                  <option value="Brunei">Brunei</option>
                  <option value="Bulgária">Bulgária</option>
                  <option value="Burquina Faso">Burquina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Camboja">Camboja</option>
                  <option value="Camarões">Camarões</option>
                  <option value="Canadá">Canadá</option>
                  <option value="Cabo Verde">Cabo Verde</option>
                  <option value="Ilhas Cayman">Ilhas Cayman</option>
                  <option value="República Centro-Africana">República Centro-Africana</option>
                  <option value="Chade">Chade</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Ilha Christmas">Ilha Christmas</option>
                  <option value="Ilhas Cocos (Keeling)">Ilhas Cocos (Keeling)</option>
                  <option value="Colômbia">Colômbia</option>
                  <option value="Comores">Comores</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo (República Democrática)">Congo (República Democrática)</option>
                  <option value="Ilhas Cook">Ilhas Cook</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Costa do Marfim">Costa do Marfim</option>
                  <option value="Croácia">Croácia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Chipre">Chipre</option>
                  <option value="República Tcheca">República Tcheca</option>
                  <option value="Dinamarca">Dinamarca</option>
                  <option value="Djibuti">Djibuti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="República Dominicana">República Dominicana</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Equador">Equador</option>
                  <option value="Egito">Egito</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Guiné Equatorial">Guiné Equatorial</option>
                  <option value="Eritreia">Eritreia</option>
                  <option value="Estônia">Estônia</option>
                  <option value="Etiópia">Etiópia</option>
                  <option value="Territórios Externos da Austrália">Territórios Externos da Austrália</option>
                  <option value="Ilhas Falkland">Ilhas Falkland</option>
                  <option value="Ilhas Faroé">Ilhas Faroé</option>
                  <option value="Ilhas Fiji">Ilhas Fiji</option>
                  <option value="Finlândia">Finlândia</option>
                  <option value="França">França</option>
                  <option value="Guiana Francesa">Guiana Francesa</option>
                  <option value="Polinésia Francesa">Polinésia Francesa</option>
                  <option value="Territórios Franceses do Sul">Territórios Franceses do Sul</option>
                  <option value="Gabão">Gabão</option>
                  <option value="Gâmbia">Gâmbia</option>
                  <option value="Geórgia">Geórgia</option>
                  <option value="Alemanha">Alemanha</option>
                  <option value="Gana">Gana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Grécia">Grécia</option>
                  <option value="Groenlândia">Groenlândia</option>
                  <option value="Granada">Granada</option>
                  <option value="Guadalupe">Guadalupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey e Alderney">Guernsey e Alderney</option>
                  <option value="Guiné">Guiné</option>
                  <option value="Guiné-Bissau">Guiné-Bissau</option>
                  <option value="Guiana">Guiana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Ilhas Heard e McDonald">Ilhas Heard e McDonald</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungria">Hungria</option>
                  <option value="Islândia">Islândia</option>
                  <option value="Índia">Índia</option>
                  <option value="Indonésia">Indonésia</option>
                  <option value="Irã">Irã</option>
                  <option value="Iraque">Iraque</option>
                  <option value="Irlanda">Irlanda</option>
                  <option value="Israel">Israel</option>
                  <option value="Itália">Itália</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japão">Japão</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordânia">Jordânia</option>
                  <option value="Cazaquistão">Cazaquistão</option>
                  <option value="Quênia">Quênia</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Coreia do Norte">Coreia do Norte</option>
                  <option value="Coreia do Sul">Coreia do Sul</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Quirguistão">Quirguistão</option>
                  <option value="Laos">Laos</option>
                  <option value="Letônia">Letônia</option>
                  <option value="Líbano">Líbano</option>
                  <option value="Lesoto">Lesoto</option>
                  <option value="Libéria">Libéria</option>
                  <option value="Líbia">Líbia</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lituânia">Lituânia</option>
                  <option value="Luxemburgo">Luxemburgo</option>
                  <option value="Macau">Macau</option>
                  <option value="Macedônia">Macedônia</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malásia">Malásia</option>
                  <option value="Maldivas">Maldivas</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Ilha de Man">Ilha de Man</option>
                  <option value="Ilhas Marshall">Ilhas Marshall</option>
                  <option value="Martinica">Martinica</option>
                  <option value="Mauritânia">Mauritânia</option>
                  <option value="Maurício">Maurício</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="México">México</option>
                  <option value="Micronésia">Micronésia</option>
                  <option value="Moldávia">Moldávia</option>
                  <option value="Mônaco">Mônaco</option>
                  <option value="Mongólia">Mongólia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Marrocos">Marrocos</option>
                  <option value="Moçambique">Moçambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namíbia">Namíbia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Antilhas Neerlandesas">Antilhas Neerlandesas</option>
                  <option value="Países Baixos">Países Baixos</option>
                  <option value="Nova Caledônia">Nova Caledônia</option>
                  <option value="Nova Zelândia">Nova Zelândia</option>
                  <option value="Nicarágua">Nicarágua</option>
                  <option value="Níger">Níger</option>
                  <option value="Nigéria">Nigéria</option>
                  <option value="Niue">Niue</option>
                  <option value="Ilha Norfolk">Ilha Norfolk</option>
                  <option value="Ilhas Mariana do Norte">Ilhas Mariana do Norte</option>
                  <option value="Noruega">Noruega</option>
                  <option value="Omã">Omã</option>
                  <option value="Paquistão">Paquistão</option>
                  <option value="Palau">Palau</option>
                  <option value="Território Palestino Ocupado">Território Palestino Ocupado</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Papua-Nova Guiné">Papua-Nova Guiné</option>
                  <option value="Paraguai">Paraguai</option>
                  <option value="Peru">Peru</option>
                  <option value="Filipinas">Filipinas</option>
                  <option value="Ilha Pitcairn">Ilha Pitcairn</option>
                  <option value="Polônia">Polônia</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Porto Rico">Porto Rico</option>
                  <option value="Catar">Catar</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Romênia">Romênia</option>
                  <option value="Rússia">Rússia</option>
                  <option value="Ruanda">Ruanda</option>
                  <option value="Santa Helena">Santa Helena</option>
                  <option value="São Cristóvão e Nevis">São Cristóvão e Nevis</option>
                  <option value="Santa Lúcia">Santa Lúcia</option>
                  <option value="São Pedro e Miquelon">São Pedro e Miquelon</option>
                  <option value="São Vicente e Granadinas">São Vicente e Granadinas</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="São Tomé e Príncipe">São Tomé e Príncipe</option>
                  <option value="Arábia Saudita">Arábia Saudita</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Sérvia">Sérvia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Serra Leoa">Serra Leoa</option>
                  <option value="Cingapura">Cingapura</option>
                  <option value="Eslováquia">Eslováquia</option>
                  <option value="Eslovênia">Eslovênia</option>
                  <option value="Territórios Menores do Reino Unido">Territórios Menores do Reino Unido</option>
                  <option value="Ilhas Solomon">Ilhas Solomon</option>
                  <option value="Somália">Somália</option>
                  <option value="África do Sul">África do Sul</option>
                  <option value="Geórgia do Sul">Geórgia do Sul</option>
                  <option value="Sudão do Sul">Sudão do Sul</option>
                  <option value="Espanha">Espanha</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudão">Sudão</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard e Jan Mayen">Svalbard e Jan Mayen</option>
                  <option value="Eswatini">Eswatini</option>
                  <option value="Suécia">Suécia</option>
                  <option value="Suíça">Suíça</option>
                  <option value="Síria">Síria</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajiquistão">Tajiquistão</option>
                  <option value="Tanzânia">Tanzânia</option>
                  <option value="Tailândia">Tailândia</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad e Tobago">Trinidad e Tobago</option>
                  <option value="Tunísia">Tunísia</option>
                  <option value="Turquia">Turquia</option>
                  <option value="Turcomenistão">Turcomenistão</option>
                  <option value="Ilhas Turks e Caicos">Ilhas Turks e Caicos</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ucrânia">Ucrânia</option>
                  <option value="Emirados Árabes Unidos">Emirados Árabes Unidos</option>
                  <option value="Reino Unido">Reino Unido</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                  <option value="Ilhas Menores dos EUA">Ilhas Menores dos EUA</option>
                  <option value="Uruguai">Uruguai</option>
                  <option value="Uzbequistão">Uzbequistão</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Cidade do Vaticano">Cidade do Vaticano</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnã">Vietnã</option>
                  <option value="Ilhas Virgens (Britânicas)">Ilhas Virgens (Britânicas)</option>
                  <option value="Ilhas Virgens (EUA)">Ilhas Virgens (EUA)</option>
                  <option value="Wallis e Futuna">Wallis e Futuna</option>
                  <option value="Saara Ocidental">Saara Ocidental</option>
                  <option value="Iémen">Iémen</option>
                  <option value="Iugoslávia">Iugoslávia</option>
                  <option value="Zâmbia">Zâmbia</option>
                  <option value="Zimbábue">Zimbábue</option>
                </Form.Select>

              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="estado">
              <Form.Label className="fw-900">Província/Estado</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  placeholder="Digite o nome do estado"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="cidade">
              <Form.Label className="fw-900">Cidade</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaMapPin fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Digite a cidade"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="endereco">
              <Form.Label className="fw-900">Endereço <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHome fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Digite o endereço completo"
                  maxLength="100"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Modal para Adicionar Cargo */}
        {/* Modal de adicionar novo cargo */}
        <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Novo Cargo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="novoCargo">
              <Form.Label>Nome do Cargo</Form.Label>
              <Form.Control
                type="text"
                value={novoCargo}
                onChange={handleAlteracaoNovoCargo}
                placeholder="Digite o nome do cargo"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarModal(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleAdicionarCargo}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Botão Enviar */}
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
            <TopoAdmin entrada="  Adicionar Funcionarios" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />
            <div className="vh-100 alturaPereita">
              <FormularioFuncionario />
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
