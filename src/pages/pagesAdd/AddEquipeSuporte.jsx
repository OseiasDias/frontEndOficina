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


const FormularioEquipeSuporte = () => {
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
                <option value="5">Andorra</option>
                <option value="8">Antártica</option>
                <option value="9">Antígua e Barbuda</option>
                <option value="10">Argentina</option>
                <option value="11">Armênia</option>
                <option value="12">Aruba</option>
                <option value="13">Austrália</option>
                <option value="14">Áustria</option>
                <option value="15">Azerbaijão</option>
                <option value="16">Bahamas</option>
                <option value="17">Bahrein</option>
                <option value="18">Bangladesh</option>
                <option value="19">Barbados</option>
                <option value="20">Bielorrússia</option>
                <option value="21">Bélgica</option>
                <option value="22">Belize</option>
                <option value="23">Benin</option>
                <option value="24">Bermudas</option>
                <option value="25">Butão</option>
                <option value="26">Bolívia</option>
                <option value="27">Bósnia e Herzegovina</option>
                <option value="28">Botsuana</option>
                <option value="29">Ilha Bouvet</option>
                <option value="30">Brasil</option>
                <option value="31">Território Britânico do Oceano Índico</option>
                <option value="32">Brunei</option>
                <option value="33">Bulgária</option>
                <option value="34">Burquina Faso</option>
                <option value="35">Burundi</option>
                <option value="36">Camboja</option>
                <option value="37">Camarões</option>
                <option value="38">Canadá</option>
                <option value="39">Cabo Verde</option>
                <option value="40">Ilhas Cayman</option>
                <option value="41">República Centro-Africana</option>
                <option value="42">Chade</option>
                <option value="43">Chile</option>
                <option value="44">China</option>
                <option value="45">Ilha Christmas</option>
                <option value="46">Ilhas Cocos (Keeling)</option>
                <option value="47">Colômbia</option>
                <option value="48">Comores</option>
                <option value="49">Congo</option>
                <option value="50">Congo (República Democrática)</option>
                <option value="51">Ilhas Cook</option>
                <option value="52">Costa Rica</option>
                <option value="53">Costa do Marfim</option>
                <option value="54">Croácia</option>
                <option value="55">Cuba</option>
                <option value="56">Chipre</option>
                <option value="57">República Tcheca</option>
                <option value="58">Dinamarca</option>
                <option value="59">Djibuti</option>
                <option value="60">Dominica</option>
                <option value="61">República Dominicana</option>
                <option value="62">Timor-Leste</option>
                <option value="63">Equador</option>
                <option value="64">Egito</option>
                <option value="65">El Salvador</option>
                <option value="66">Guiné Equatorial</option>
                <option value="67">Eritreia</option>
                <option value="68">Estônia</option>
                <option value="69">Etiópia</option>
                <option value="70">Territórios Externos da Austrália</option>
                <option value="71">Ilhas Falkland</option>
                <option value="72">Ilhas Faroé</option>
                <option value="73">Ilhas Fiji</option>
                <option value="74">Finlândia</option>
                <option value="75">França</option>
                <option value="76">Guiana Francesa</option>
                <option value="77">Polinésia Francesa</option>
                <option value="78">Territórios Franceses do Sul</option>
                <option value="79">Gabão</option>
                <option value="80">Gâmbia</option>
                <option value="81">Geórgia</option>
                <option value="82">Alemanha</option>
                <option value="83">Gana</option>
                <option value="84">Gibraltar</option>
                <option value="85">Grécia</option>
                <option value="86">Groenlândia</option>
                <option value="87">Granada</option>
                <option value="88">Guadalupe</option>
                <option value="89">Guam</option>
                <option value="90">Guatemala</option>
                <option value="91">Guernsey e Alderney</option>
                <option value="92">Guiné</option>
                <option value="93">Guiné-Bissau</option>
                <option value="94">Guiana</option>
                <option value="95">Haiti</option>
                <option value="96">Ilhas Heard e McDonald</option>
                <option value="97">Honduras</option>
                <option value="98">Hong Kong</option>
                <option value="99">Hungria</option>
                <option value="100">Islândia</option>
                <option value="101">Índia</option>
                <option value="102">Indonésia</option>
                <option value="103">Irã</option>
                <option value="104">Iraque</option>
                <option value="105">Irlanda</option>
                <option value="106">Israel</option>
                <option value="107">Itália</option>
                <option value="108">Jamaica</option>
                <option value="109">Japão</option>
                <option value="110">Jersey</option>
                <option value="111">Jordânia</option>
                <option value="112">Cazaquistão</option>
                <option value="113">Quênia</option>
                <option value="114">Kiribati</option>
                <option value="115">Coreia do Norte</option>
                <option value="116">Coreia do Sul</option>
                <option value="117">Kuwait</option>
                <option value="118">Quirguistão</option>
                <option value="119">Laos</option>
                <option value="120">Letônia</option>
                <option value="121">Líbano</option>
                <option value="122">Lesoto</option>
                <option value="123">Libéria</option>
                <option value="124">Líbia</option>
                <option value="125">Liechtenstein</option>
                <option value="126">Lituânia</option>
                <option value="127">Luxemburgo</option>
                <option value="128">Macau</option>
                <option value="129">Macedônia</option>
                <option value="130">Madagascar</option>
                <option value="131">Malawi</option>
                <option value="132">Malásia</option>
                <option value="133">Maldivas</option>
                <option value="134">Mali</option>
                <option value="135">Malta</option>
                <option value="136">Ilha de Man</option>
                <option value="137">Ilhas Marshall</option>
                <option value="138">Martinica</option>
                <option value="139">Mauritânia</option>
                <option value="140">Maurício</option>
                <option value="141">Mayotte</option>
                <option value="142">México</option>
                <option value="143">Micronésia</option>
                <option value="144">Moldávia</option>
                <option value="145">Mônaco</option>
                <option value="146">Mongólia</option>
                <option value="147">Montserrat</option>
                <option value="148">Marrocos</option>
                <option value="149">Moçambique</option>
                <option value="150">Myanmar</option>
                <option value="151">Namíbia</option>
                <option value="152">Nauru</option>
                <option value="153">Nepal</option>
                <option value="154">Antilhas Neerlandesas</option>
                <option value="155">Países Baixos</option>
                <option value="156">Nova Caledônia</option>
                <option value="157">Nova Zelândia</option>
                <option value="158">Nicarágua</option>
                <option value="159">Níger</option>
                <option value="160">Nigéria</option>
                <option value="161">Niue</option>
                <option value="162">Ilha Norfolk</option>
                <option value="163">Ilhas Mariana do Norte</option>
                <option value="164">Noruega</option>
                <option value="165">Omã</option>
                <option value="166">Paquistão</option>
                <option value="167">Palau</option>
                <option value="168">Território Palestino Ocupado</option>
                <option value="169">Panamá</option>
                <option value="170">Papua-Nova Guiné</option>
                <option value="171">Paraguai</option>
                <option value="172">Peru</option>
                <option value="173">Filipinas</option>
                <option value="174">Ilha Pitcairn</option>
                <option value="175">Polônia</option>
                <option value="176">Portugal</option>
                <option value="177">Porto Rico</option>
                <option value="178">Catar</option>
                <option value="179">Reunião</option>
                <option value="180">Romênia</option>
                <option value="181">Rússia</option>
                <option value="182">Ruanda</option>
                <option value="183">Santa Helena</option>
                <option value="184">São Cristóvão e Nevis</option>
                <option value="185">Santa Lúcia</option>
                <option value="186">São Pedro e Miquelon</option>
                <option value="187">São Vicente e Granadinas</option>
                <option value="188">Samoa</option>
                <option value="189">San Marino</option>
                <option value="190">São Tomé e Príncipe</option>
                <option value="191">Arábia Saudita</option>
                <option value="192">Senegal</option>
                <option value="193">Sérvia</option>
                <option value="194">Seychelles</option>
                <option value="195">Serra Leoa</option>
                <option value="196">Cingapura</option>
                <option value="197">Eslováquia</option>
                <option value="198">Eslovênia</option>
                <option value="199">Territórios Menores do Reino Unido</option>
                <option value="200">Ilhas Solomon</option>
                <option value="201">Somália</option>
                <option value="202">África do Sul</option>
                <option value="203">Geórgia do Sul</option>
                <option value="204">Sudão do Sul</option>
                <option value="205">Espanha</option>
                <option value="206">Sri Lanka</option>
                <option value="207">Sudão</option>
                <option value="208">Suriname</option>
                <option value="209">Svalbard e Jan Mayen</option>
                <option value="210">Eswatini</option>
                <option value="211">Suécia</option>
                <option value="212">Suíça</option>
                <option value="213">Síria</option>
                <option value="214">Taiwan</option>
                <option value="215">Tajiquistão</option>
                <option value="216">Tanzânia</option>
                <option value="217">Tailândia</option>
                <option value="218">Togo</option>
                <option value="219">Tokelau</option>
                <option value="220">Tonga</option>
                <option value="221">Trinidad e Tobago</option>
                <option value="222">Tunísia</option>
                <option value="223">Turquia</option>
                <option value="224">Turcomenistão</option>
                <option value="225">Ilhas Turks e Caicos</option>
                <option value="226">Tuvalu</option>
                <option value="227">Uganda</option>
                <option value="228">Ucrânia</option>
                <option value="229">Emirados Árabes Unidos</option>
                <option value="230">Reino Unido</option>
                <option value="231">Estados Unidos</option>
                <option value="232">Ilhas Menores dos EUA</option>
                <option value="233">Uruguai</option>
                <option value="234">Uzbequistão</option>
                <option value="235">Vanuatu</option>
                <option value="236">Cidade do Vaticano</option>
                <option value="237">Venezuela</option>
                <option value="238">Vietnã</option>
                <option value="239">Ilhas Virgens (Britânicas)</option>
                <option value="240">Ilhas Virgens (EUA)</option>
                <option value="241">Wallis e Futuna</option>
                <option value="242">Saara Ocidental</option>
                <option value="243">Iémen</option>
                <option value="244">Iugoslávia</option>
                <option value="245">Zâmbia</option>
                <option value="246">Zimbábue</option>

                {/* Outras opções de países */}
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
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
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
      <Button type="submit" variant="success" className="botaoSubmitEquipeSuportemt-5 links-acessos w-25 px-5 mx-auto d-block">
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
            <TopoAdmin entrada="Adicionar Equipe de Suporte" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />
            <div className="vh-100 alturaPereita">
              <FormularioEquipeSuporte />
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
