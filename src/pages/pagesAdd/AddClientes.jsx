import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong, FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaCamera, FaEnvelope, FaGlobe, FaHome, FaIdCard, FaLock, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaRegEye, FaRegEyeSlash, FaTransgender, FaUser, FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export function FormularioCliente() {
  const [showPassword, setShowPassword] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    primeiroNome: '',
    sobrenome: '',
    dataNascimento: '',
    celular: '',
    email: '',
    senha: '',
    genero: '',
    nomeExibicao: '',
    nomeEmpresa: '',
    telefoneFixo: '',
    nif: '',
    pais: '',
    idProvincia: '',
    municipio: '',
    endereco: '',
    uploadArquivo: null,
    textoNota: '',
    arquivoNota: null,
    interna: false,
    compartilhado: false,
  });

  const [errors, setErrors] = useState({});


  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10);
    return password.length < 8 ? password + Math.random().toString(36).slice(-2) : password;
  };

  useEffect(() => {
    const senhaGerada = generateRandomPassword();
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      senha: senhaGerada,
    }));
    console.log('Senha gerada:', senhaGerada);
  }, []);

  const handleMudanca = (e) => {
    const { name, value, type, checked } = e.target;
    setDadosFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMudancaArquivo = (e) => {
    const { name, files } = e.target;
    setDadosFormulario((prev) => ({
      ...prev,
      [name]: files,
    }));
  };


  const validateForm = () => {
    const newErrors = {};
    const celularRegex = /^\d{9,}$/; // Apenas números, no mínimo 9 caracteres para o celular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!dadosFormulario.primeiroNome) {
      newErrors.primeiroNome = 'Primeiro nome é obrigatório.';
    }

    if (!dadosFormulario.sobrenome) {
      newErrors.sobrenome = 'Sobrenome é obrigatório.';
    }

    if (!dadosFormulario.celular) {
      newErrors.celular = 'Celular é obrigatório.';
    } else if (!celularRegex.test(dadosFormulario.celular)) {
      newErrors.celular = 'Celular deve ter pelo menos 9 dígitos.';
    }

    if (!dadosFormulario.email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(dadosFormulario.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!dadosFormulario.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    }

    if (dadosFormulario.uploadArquivo && dadosFormulario.uploadArquivo.length > 1) {
      newErrors.uploadArquivo = 'Você pode enviar apenas uma foto.';
    }

    if (!dadosFormulario.genero) {
      newErrors.genero = 'Gênero é obrigatório.';
    }


    // Validar nome de exibição
    if (!dadosFormulario.nomeExibicao) {
      errors.nomeExibicao = 'Nome de exibição é obrigatório.';
    }

    // Validar nome da empresa
    if (!dadosFormulario.nomeEmpresa) {
      errors.nomeEmpresa = 'Nome da empresa é obrigatório.';
    }

    // Validar telefone fixo (opcional, mas se informado, precisa ter um formato válido)
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (dadosFormulario.telefoneFixo && !telefoneRegex.test(dadosFormulario.telefoneFixo)) {
      errors.telefoneFixo = 'Telefone fixo inválido. Exemplo: (XX) 1234-5678';
    }

    // Validar NIF (opcional, mas se informado, precisa ter 9 dígitos)
    const nifRegex = /^\d{9}$/;
    if (dadosFormulario.nif && !nifRegex.test(dadosFormulario.nif)) {
      errors.nif = 'NIF inválido. Deve ter 9 dígitos.';
    }

    // Validar país
    if (!dadosFormulario.pais) {
      errors.pais = 'Selecione um país.';
    }

    // Validar endereço
    if (!dadosFormulario.endereco) {
      errors.endereco = 'Endereço é obrigatório.';
    }

    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;


  };

  const handleEnvio = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Se a validação falhar, não prosseguir com o envio.


  };


  return (
    <Form onSubmit={handleEnvio} encType="multipart/form-data">

      {/* Seção 1: Dados Pessoais */}

      <div className="col-md-12 mt-5">
        <h6>INFORMAÇÕES PESSOAIS</h6>
        <hr />
      </div>

      {/* Nome e Sobrenome */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="primeiroNome">
            <Form.Label>Primeiro nome <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>
              <Form.Control
                type="text"
                name="primeiroNome"
                value={dadosFormulario.primeiroNome}
                onChange={handleMudanca}
                placeholder="Introduza o primeiro nome"
                isInvalid={!!errors.primeiroNome}
                required
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
                value={dadosFormulario.sobrenome}
                onChange={handleMudanca}
                placeholder="Insira o sobrenome"
                isInvalid={!!errors.sobrenome}
                required
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
                value={dadosFormulario.celular}
                onChange={handleMudanca}
                placeholder="Digite o número de celular"
                isInvalid={!!errors.celular}
                required
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
                value={dadosFormulario.email}
                onChange={handleMudanca}
                placeholder="Digite o e-mail"
                isInvalid={!!errors.email}
                required
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
                type={showPassword ? "text" : "password"}
                name="senha"
                value={dadosFormulario.senha}
                onChange={handleMudanca}
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
                name="uploadArquivo"
                onChange={handleMudancaArquivo}
                disabled
              />
            </div>
            <Image src={dadosFormulario.uploadArquivo ? URL.createObjectURL(dadosFormulario.uploadArquivo[0]) : ''} thumbnail />
          </Form.Group>
        </Col>

        <Col md={6}>

          <Form.Group controlId="genero">
            <Form.Label>Gênero</Form.Label>
            <div className="input-group">
              <span className="input-group-text me-3"><FaTransgender fontSize={20} color="#0070fa" /></span>

              <Form.Check
                type="radio"
                label="Masculino"
                name="genero"
                value="0"
                onChange={handleMudanca}
              />
              <Form.Check className="ms-3"
                type="radio"
                label="Feminino"
                name="genero"
                value="1"
                onChange={handleMudanca}
              /></div>
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
          <Form.Group controlId="nomeExibicao">
            <Form.Label>Nome de exibição</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaUserCircle fontSize={20} color="#0070fa" /></span>
              <Form.Control
                type="text"
                name="nomeExibicao"
                value={dadosFormulario.nomeExibicao}
                onChange={handleMudanca}
                placeholder="Digite o nome de exibição"
              />
            </div>
            {errors.nomeExibicao && <Form.Text className="text-danger">{errors.nomeExibicao}</Form.Text>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="nomeEmpresa">
            <Form.Label>Nome da empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaBuilding fontSize={20} color="#0070fa" /></span>
              <Form.Control
                type="text"
                name="nomeEmpresa"
                value={dadosFormulario.nomeEmpresa}
                onChange={handleMudanca}
                placeholder="Digite o nome da empresa"
              />
            </div>
            {errors.nomeEmpresa && <Form.Text className="text-danger">{errors.nomeEmpresa}</Form.Text>}
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
                name="telefoneFixo"
                value={dadosFormulario.telefoneFixo}
                onChange={handleMudanca}
                placeholder="Digite o número de telefone fixo"
              />
            </div>
            {errors.telefoneFixo && <Form.Text className="text-danger">{errors.telefoneFixo}</Form.Text>}
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
                value={dadosFormulario.nif}
                onChange={handleMudanca}
                placeholder="Digite o NIF"
              />
            </div>
            {errors.nif && <Form.Text className="text-danger">{errors.nif}</Form.Text>}
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
              <Form.Control
                as="select"
                name="pais"
                value={dadosFormulario.pais}
                onChange={handleMudanca}
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
              </Form.Control>
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
                name="idProvincia"
                value={dadosFormulario.idProvincia}
                onChange={handleMudanca}
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
                value={dadosFormulario.municipio}
                onChange={handleMudanca}
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
                value={dadosFormulario.endereco}
                onChange={handleMudanca}
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

      <div className="d-fl ">
        <Row>

          <Col md={4}><Form.Group controlId={`nota-texto-`}><Form.Label>Nota</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
              <Form.Control as="textarea" name="textoNota" value="" />
            </div>
          </Form.Group></Col>
          <Col md={4}><Form.Group controlId={`nota-arquivos-`}><Form.Label>Arquivos</Form.Label>
            <Form.Control type="file" name="arquivoNota" multiple />
          </Form.Group>
          </Col>


          {/* Checkbox */}
          <Col md={4} className="mt-3">
            <Form.Check type="checkbox" label="Nota Interna" name="interna" />
            <Form.Check type="checkbox" label="Compartilhado com fornecedor" name="compartilhado" />
          </Col>
        </Row>


      </div>



      {/* Botão de Enviar */}
      <Button variant="primary" type="submit" className="mx-auto w-25 d-block links-acessos mt-4">Salvar</Button>
    </Form>
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