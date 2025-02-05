import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong, FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Spinner } from 'react-bootstrap';
import { FaRegEye, FaUser } from 'react-icons/fa';
import { FaBuilding, FaCamera, FaEnvelope, FaGlobe, FaHome, FaIdCard, FaLock, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaRegAddressCard, FaRegEyeSlash, FaTransgender } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AiOutlineFieldNumber } from "react-icons/ai";

export function FormularioCliente() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    primeiro_nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    senha: '',
    bilhete_identidade: '',
    foto: '',
    genero: 'masculino',
    nome_empresa: '',
    nif: '',
    telefone_fixo: '',
    pais: '',
    provincia: '',
    municipio: '',
    endereco: '',
    nota: '',
    arquivo_nota: '',
    interna: false,
    compartilhado: false,
    numero_cliente: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //LOGICA PARA GERAR O NUMERO DA ORDEM DE REPARACAO


  // eslint-disable-next-line no-unused-vars
  const [ultimoId, setUltimoId] = useState(null);

  // Função para pegar o último ID da ordem
  const fetchUltimoId = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientesUltimos/last-id');
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
      const numeroCliente = `CLI00${id}`;
      setFormData(prevState => ({
        ...prevState,
        numero_cliente: numeroCliente
      }));
    }
  };

  // UseEffect para buscar o último ID assim que o componente for montado
  useEffect(() => {
    fetchUltimoId();
  }, []);




  // Função para lidar com mudanças no formulário



  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

  };

  // Gerador de senha
  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10);
    return password.length < 8 ? password + Math.random().toString(36).slice(-2) : password;
  };

  // Função de validação do formulário
  const validateForm = () => {
    const newErrors = {};
    const celularRegex = /^\d{9,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.primeiro_nome) newErrors.primeiroNome = 'Primeiro nome é obrigatório.';
    if (!formData.sobrenome) newErrors.sobrenome = 'Sobrenome é obrigatório.';
    if (!formData.celular) newErrors.celular = 'Celular é obrigatório.';
    else if (!celularRegex.test(formData.celular)) newErrors.celular = 'Celular deve ter pelo menos 9 dígitos.';
    if (!formData.email) newErrors.email = 'E-mail é obrigatório.';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'E-mail inválido.';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória.';
    if (!formData.genero) newErrors.genero = 'Gênero é obrigatório.';
    if (!formData.nome_empresa) newErrors.nomeEmpresa = 'Nome da empresa é obrigatório.';
    if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida o formulário
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setIsLoading(true);
    // Envia os dados para o backend
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clientes/', formData);
      console.log('Cliente cadastrado com sucesso:', response.data);
      toast.success("Cliente cadastrado com sucesso!");

      setTimeout(() => {
       
        navigate('/clienteList');
        setIsLoading(false);
         // Redireciona para /clienteList
      }, 4000); // 4000 milissegundos = 4 segundos

    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      toast.error("Erro ao cadastrar cliente,Talvez esses dados já existem. Tente novamente.");
    }
  };

  // Gerar a senha automaticamente ao abrir o formulário
  useEffect(() => {
    if (!formData.senha) {
      setFormData((prevState) => ({
        ...prevState,
        senha: generateRandomPassword()
      }));
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Dados Pessoais */}
        <div className="col-md-12 mt-5">
          <h6>INFORMAÇÕES PESSOAIS</h6>
          <hr />
        </div>

        {/* Nome e Sobrenome */}
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="numero_trabalho">
              <Form.Label>Nº do Cliente <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><AiOutlineFieldNumber fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="numero_trabalho"
                  value={formData.numero_cliente}
                  onChange={handleChange}
                  required
                  disabled // Desabilitado para não permitir edição direta
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="primeiroNome">
              <Form.Label>Primeiro nome <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="primeiro_nome"
                  value={formData.primeiro_nome}
                  onChange={handleChange}
                  required
                  placeholder="Introduza o primeiro nome"
                  isInvalid={!!errors.primeiroNome}
                />
                <Form.Control.Feedback type="invalid">{errors.primeiroNome}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="sobrenome">
              <Form.Label>Sobrenome <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                  placeholder="Insira o sobrenome"
                  isInvalid={!!errors.sobrenome}
                />
                <Form.Control.Feedback type="invalid">{errors.sobrenome}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Celular */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="celular">
              <Form.Label>Celular <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaPhone fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  placeholder="Digite o número de celular"
                  isInvalid={!!errors.celular}
                />
                <Form.Control.Feedback type="invalid">{errors.celular}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>

          {/* E-mail */}
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>E-mail <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Digite o e-mail"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Senha */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="senha">
              <Form.Label>Senha gerada <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaLock fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha gerada automaticamente"
                  isInvalid={!!errors.senha}
                  disabled
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>




          {/* Outros campos omitidos para concisão */}

          <Col md={6}>
            <Form.Group c controlId="formBilheteIdentidade">
              <Form.Label>Bilhete de Identidade</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaRegAddressCard fontSize={20} color="#0070fa" /></span>

                <Form.Control

                  type="text"
                  name="bilhete_identidade"
                  value={formData.bilhete_identidade}
                  onChange={handleChange}
                  placeholder="Digite o número do Bilhete de Identidade"


                  isInvalid={!!errors.bilhete_identidade}
                />
                <Form.Control.Feedback className="ajusteError" type="invalid">{errors.bilhete_identidade}</Form.Control.Feedback>

              </div>

            </Form.Group>
          </Col>
        </Row>

        {/* Confirmação de Senha e Data de Nascimento */}
        <Row>
          <Col>
            <Form.Group controlId="uploadArquivo">
              <Form.Label>Foto</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaCamera fontSize={20} color="#0070fa" /></span>
                <Form.Control

                  type="file"
                  name="foto"
                  onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}


                  disabled
                />
              </div>
              <Image src={formData.uploadArquivo ? URL.createObjectURL(formData.uploadArquivo[0]) : ''} thumbnail />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="genero">
              <Form.Label>Gênero</Form.Label>
              <div className="input-group">
                <span className="input-group-text me-3"><FaTransgender fontSize={20} color="#0070fa" /></span>

                <Form.Select

                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  required
                  as="select"

                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>

        </Row>

        {/* Seção 2: Informações de Empresa e Contato */}
        <Row className="mt-3">
          <Col>
            <h6>INFORMAÇÕES DE EMPRESA E CONTATO</h6>
            <hr />
          </Col>
        </Row>

        {/* Nome de Exibição e Nome da Empresa */}
        <Row>


          <Col md={6}>
            <Form.Group controlId="nomeEmpresa">
              <Form.Label>Nome da empresa</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaBuilding fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nome_empresa"
                  value={formData.nome_empresa}
                  onChange={handleChange}


                  placeholder="Digite o nome da empresa"
                />
              </div>
              {errors.nomeEmpresa && <Form.Text className="text-danger">{errors.nomeEmpresa}</Form.Text>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nif">
              <Form.Label>NIF</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaIdCard fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nif"
                  value={formData.nif}
                  onChange={handleChange}
                  placeholder="Digite o NIF"
                />
              </div>
              {errors.nif && <Form.Text className="text-danger">{errors.nif}</Form.Text>}
            </Form.Group>
          </Col>
        </Row>

        {/* Telefone Fixo e NIF */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="telefoneFixo">
              <Form.Label>Telefone fixo</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaPhoneAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="telefone_fixo"
                  value={formData.telefone_fixo}
                  onChange={handleChange}


                  placeholder="Digite o número de telefone fixo"
                />
              </div>
              {errors.telefoneFixo && <Form.Text className="text-danger">{errors.telefoneFixo}</Form.Text>}
            </Form.Group>
          </Col>


        </Row>

        {/* Endereço */}
        <Row className="mt-3">
          <Col>
            <h6>ENDEREÇO</h6>
            <hr />
          </Col>
        </Row>

        {/* País, Província e Município */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="pais">
              <Form.Label>País <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaGlobe fontSize={20} color="#0070fa" /></span>
                <Form.Select
                  as="select"
                  name="pais"  // Adicionei o nome "pais" aqui para garantir que seja tratado corretamente
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
                  <option value="Zimbábue">Zimbábue</option>            {/* Adicione mais opções conforme necessário */}
                </Form.Select>
              </div>
              {errors.pais && <Form.Text className="text-danger">{errors.pais}</Form.Text>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="idProvincia">
              <Form.Label>Província</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaMapLocationDot fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  placeholder="Digite a província"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Município e Endereço */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="municipio">
              <Form.Label>Município</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  placeholder="Digite o município"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="endereco">
              <Form.Label>Endereço <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHome fontSize={20} color="#0070fa" /></span>
                <Form.Control
                  as="textarea"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Digite o endereço"
                  required
                />
              </div>
              {errors.endereco && <Form.Text className="text-danger">{errors.endereco}</Form.Text>}
            </Form.Group>
          </Col>
        </Row>
        {/* Notas */}
        <div className="die mt-5">
          <div className="itemNota d-flex justify-content-between bordarDiv">
            <h6 className="baixarTexto pb-3">ADICIONAR NOTAS</h6>

          </div>

        </div>
        <div className="d-fl">
          <Row>

            {/* Campo Nota */}
            <Col md={4}>
              <Form.Group controlId={`nota-texto`}>
                <Form.Label>Nota</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMapMarkerAlt fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="textarea"
                    name="nota"
                    value={formData.nota}
                    onChange={handleChange}
                    placeholder="Digite a nota aqui..."
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Campo Arquivo Nota */}
            <Col md={4}>
              <Form.Group controlId={`nota-arquivos`}>
                <Form.Label>Arquivos</Form.Label>
                <Form.Control
                  type="file"
                  name="arquivo_nota"
                  onChange={(e) => setFormData({ ...formData, arquivo_nota: e.target.files[0] })}
                  multiple
                  disabled
                // Atualiza o estado com os arquivos selecionados
                />
              </Form.Group>
            </Col>

            {/* Checkbox de Notas */}
            <Col md={4} className="mt-3">
              <Form.Check

                type="checkbox"
                name="interna"
                checked={formData.interna || false}
                onChange={handleChange}
                label="interna"

              />
              <Form.Check

                type="checkbox"
                name="compartilhado"
                checked={formData.compartilhado || false}
                onChange={handleChange}

                label="Compartilhado com fornecedor"
              />
            </Col>


          </Row>
        </div>
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
}













const AddClientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="  Adicionar Clientes" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/clienteList" />

            <div className="vh-100 alturaPereita">
              <FormularioCliente />

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

export default AddClientes;