import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Form, Button, Row, Col, Modal, Image } from 'react-bootstrap';

import "../../css/StylesAdmin/homeAdministrador.css";
//import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
//import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import "../../css/StylesAdmin/homeAdministrador.css";
import { FaGlobe, FaMapMarkerAlt, FaMapPin, FaHome, FaCamera, FaLock, FaRegEye, FaRegEyeSlash, FaEnvelope, FaUser, FaCalendarAlt, FaVenusMars, FaMobileAlt, FaPhone, FaBuilding, FaSuitcase, FaTag, FaRegCalendarAlt } from "react-icons/fa";
import { InputGroup } from 'react-bootstrap';
import { useEffect } from 'react';


const FormularioFuncionario = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    sobrenome: '',
    genero: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    celular: '',
    filial: '1',
    dataAdmissao: '2024-11-25',
    cargo: '',
    dataSaida: '',
    // senha: '',
    dataNascimento: '',
    nomeExibicao: '',
    telefoneFixo: '',
    pais: '',
    estado: '',
    cidade: '',
    endereco: '',
    imagem: null,
  });

  const handleAlteracao = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleMudancaArquivo = (e) => {
    setDadosFormulario({ ...dadosFormulario, imagem: e.target.files[0] });
  };

  const handleEnvio = (e) => {
    e.preventDefault();
    console.log(dadosFormulario);
  };

  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoCargo, setNovoCargo] = useState('');
  const [cargos, setCargos] = useState([
    'Gerente',
    'Assistente',
    'Analista',
    'Desenvolvedor',
    'Coordenador',
  ]);

  const handleAlteracaoNovoCargo = (e) => {
    setNovoCargo(e.target.value);
  };

  const handleAdicionarCargo = () => {
    if (novoCargo) {
      setCargos([...cargos, novoCargo]);
      setNovoCargo('');
      setMostrarModal(false);
    } else {
      alert("Por favor, insira um nome para o cargo.");
    }
  };

  const handleMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const [showPassword, setShowPassword] = useState(false); // Para alternar a visibilidade da senha
  //const [errors, setErrors] = useState({}); // Para lidar com erros de validação

  // Função para gerar uma senha aleatória
  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10);  // Gera uma senha aleatória de pelo menos 8 caracteres
    return password.length < 8 ? password + Math.random().toString(36).slice(-2) : password;  // Garantir que a senha tenha no mínimo 8 caracteres
  };

  // Gera a senha ao carregar o componente
  useEffect(() => {
    const senhaGerada = generateRandomPassword();
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      senha: senhaGerada,
    }));
    console.log('Senha gerada:', senhaGerada); // Exibe a senha gerada no console
  }, []); // Executa apenas uma vez, quando o componente for montado



  return (
    <Form
      id="formulario_adicionar_funcionario"
      method="post"
      action="https://biturbomotors.com/garage/employee/store"
      encType="multipart/form-data"
      className="form-horizontal upperform employeeAddForm"
      onSubmit={handleEnvio}
    >
      {/* Dados Pessoais */}
      <div className="col-md-12 mt-5">
        <h6>INFORMAÇÕES PESSOAIS</h6>
        <hr />
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="nome">
            <Form.Label>Primeiro nome <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaUser fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="nome"
                value={dadosFormulario.nome}
                placeholder="Introduza o primeiro nome"
                maxLength="50"
                onChange={handleAlteracao}
              />
            </div>
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
                value={dadosFormulario.sobrenome}
                placeholder="Insira o último nome"
                maxLength="50"
                onChange={handleAlteracao}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="dataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="date"
                name="dataNascimento"
                value={dadosFormulario.dataNascimento}
                onChange={handleAlteracao}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>E-mail <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="email"
                name="email"
                value={dadosFormulario.email}
                placeholder="Digite o e-mail"
                maxLength="50"
                onChange={handleAlteracao}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

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
              />
            </div>
            <Image src={dadosFormulario.uploadArquivo ? URL.createObjectURL(dadosFormulario.uploadArquivo[0]) : ''} thumbnail />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="genero">
            <Form.Label>Gênero</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaVenusMars fontSize={20} color="#0070fa" /></span>

              <div className="d-flex ms-3">
                <Form.Check
                  type="radio"
                  label="Masculino"
                  name="genero"
                  value="0"
                  checked={dadosFormulario.genero === '0'}
                  onChange={handleAlteracao}
                />
                <Form.Check
                  className="ms-3"
                  type="radio"
                  label="Feminino"
                  name="genero"
                  value="1"
                  checked={dadosFormulario.genero === '1'}
                  onChange={handleAlteracao}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="senha">
            <Form.Label>Senha gerada <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaLock fontSize={20} color="#0070fa" /></span>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Senha gerada automaticamente"
                name="senha"
                value={dadosFormulario.senha}
                onChange={handleMudanca}
                disabled
              />

              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </Button>
            </div>
          </Form.Group>
        </Col>
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
                value={dadosFormulario.celular}
                placeholder="Digite o número de celular"
                maxLength="16"
                onChange={handleAlteracao}
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
                value={dadosFormulario.telefoneFixo}
                placeholder="Digite o telefone fixo"
                maxLength="16"
                onChange={handleAlteracao}
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

              <Form.Control
                as="select"
                name="filial"
                value={dadosFormulario.filial}
                onChange={handleAlteracao}
              >
                <option value="1">Filial Principal</option>
              </Form.Control>
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="cargo">
            <Form.Label>Cargo <span className="text-danger">*</span></Form.Label>

            <InputGroup>
              <div className="input-group">
                <span className="input-group-text"><FaSuitcase fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  as="select"
                  name="cargo"
                  value={dadosFormulario.cargo}
                  onChange={handleAlteracao}

                >
                  <option value="">Selecione o cargo</option>
                  {cargos.map((cargo, index) => (
                    <option key={index} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </Form.Control>

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
          <Form.Group controlId="nomeExibicao">
            <Form.Label>Nome Exibido</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaTag fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="nomeExibicao"
                value={dadosFormulario.nomeExibicao}
                placeholder="Nome que será exibido"
                maxLength="25"
                onChange={handleAlteracao}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="dataAdmissao">
            <Form.Label>Data de Admissão <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaRegCalendarAlt fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="date"
                name="dataAdmissao"
                value={dadosFormulario.dataAdmissao}
                onChange={handleAlteracao}
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
              <Form.Control
                as="select"
                name="pais"
                value={dadosFormulario.pais}
                onChange={handleAlteracao}
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
                value={dadosFormulario.estado}
                onChange={handleAlteracao}
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
                value={dadosFormulario.cidade}
                onChange={handleAlteracao}
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
                value={dadosFormulario.endereco}
                onChange={handleAlteracao}
                placeholder="Digite o endereço completo"
                maxLength="100"
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Modal para Adicionar Cargo */}
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
      <Button type="submit" variant="success" className="botaoSubmitFuncionario mt-5 links-acessos w-25 px-5 mx-auto d-block">
        Cadastrar
      </Button>
    </Form>
  );
};






const AddFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Adicionar Funcionarios" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />
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
