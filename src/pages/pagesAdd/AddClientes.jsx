import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong, FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";


import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaCamera, FaEnvelope, FaGlobe, FaHome, FaIdCard, FaLock, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaRegEye, FaRegEyeSlash, FaTransgender, FaUser, FaUserCircle } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';


export function FormularioCliente() {
  const [dadosFormulario, setDadosFormulario] = useState({
    primeiroNome: '',
    sobrenome: '',
    genero: '',
    celular: '',
    email: '',
    senha: '',
    dataNascimento: '',
    nomeExibicao: '',
    nomeEmpresa: '',
    telefoneFixo: '',
    nif: '',
    idPais: '',
    idProvincia: '',
    cidade: '',
    endereco: '',
    uploadArquivo: null,
    notas: [{ textoNota: '', arquivoNota: [], interno: false, compartilhado: false }]
  });

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

  const handleMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleMudancaArquivo = (e) => {
    const { name, files } = e.target;
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      [name]: files,
    }));
  };

  const handleEnvio = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log(dadosFormulario);
  };

  const handleNotaChange = (index, e) => {
    const { name, value, type, checked, files } = e.target;
    const newNotas = [...dadosFormulario.notas];
    const nota = { ...newNotas[index] };

    if (type === "checkbox") {
      nota[name] = checked;
    } else if (name === "arquivoNota") {
      nota[name] = files;
    } else {
      nota[name] = value;
    }

    newNotas[index] = nota;
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      notas: newNotas,
    }));
  };

  const handleAddNota = () => {
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      notas: [...prevValues.notas, { textoNota: '', arquivoNota: [], interna: false, compartilhado: false }]
    }));
  };

  const handleRemoveNota = (index) => {
    const newNotas = [...dadosFormulario.notas];
    newNotas.splice(index, 1);
    setDadosFormulario((prevValues) => ({
      ...prevValues,
      notas: newNotas,
    }));
  };





  return (
    <Form onSubmit={handleEnvio} encType="multipart/form-data">

      {/* Seção 1: Dados Pessoais */}

      <div className="col-md-12 mt-5">
        <h6>INFORMAÇÕES PESSOAIS</h6>
        <hr />
      </div>

      {/* Primeiro Nome e Sobrenome */}
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
                required
              />
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
                required
              />
            </div>
          </Form.Group>
        </Col>

      </Row>

      {/* Gênero e Celular */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="dataNascimento">
            <Form.Label>Data de nascimento</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={dadosFormulario.dataNascimento}
                onChange={handleMudanca}
                required
              />
            </div>
          </Form.Group>
        </Col>


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
                required
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* E-mail e Senha */}
      <Row>
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
                required
              />
            </div>
          </Form.Group>
        </Col>

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
          </Form.Group>
        </Col>
      </Row>

      {/* Telefone Fixo e nif */}
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
          </Form.Group>
        </Col>
      </Row>

      {/* Seção 3: Endereço */}
      <Row className="mt-3">
        <Col>
          <h6>ENDEREÇO</h6>
          <hr />
        </Col>
      </Row>

      {/* País, Provincia e Cidade */}
      <Row>
        <Col md={6}>
          <Form.Group controlId="idPais">
            <Form.Label>País <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaGlobe fontSize={20} color="#0070fa" /></span>
              <Form.Control
                as="select"
                name="idPais"
                value={dadosFormulario.idPais}
                onChange={handleMudanca}
                required
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

              </Form.Control>
            </div>
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
          </Form.Group>
        </Col>
      </Row>



      {/* Notas */}
      <div className="die mt-5">
        <div className="itemNota d-flex justify-content-between bordarDiv">
          <h6 className="baixarTexto">ADICIONAR NOTAS</h6>
          <Button className="btn-addCompra links-acessos" size="sm" onClick={handleAddNota}>
            +
          </Button>
        </div>

      </div>
      {dadosFormulario.notas.map((nota, index) => (
        <>
          <div key={index} className="nota">

            <div className="d-flex ">
              <Row>

                <Col md={6}><Form.Group controlId={`nota-texto-${index}`}><Form.Label>Nota</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
                    <Form.Control as="textarea" name="textoNota" value={nota.textoNota} onChange={(e) => handleNotaChange(index, e)} />
                  </div>
                </Form.Group></Col>
                <Col md={6}><Form.Group controlId={`nota-arquivos-${index}`}><Form.Label>Arquivos</Form.Label>
                  <Form.Control type="file" name="arquivoNota" onChange={(e) => handleNotaChange(index, e)} multiple />
                </Form.Group></Col>
              </Row>

              {/* Checkbox */}
              <Row className="m-4"><Col>
                <Form.Check type="checkbox" label="Nota Interna" name="interna" checked={nota.interna} onChange={(e) => handleNotaChange(index, e)} />
                <Form.Check type="checkbox" label="Compartilhado com fornecedor" name="compartilhado" checked={nota.compartilhado} onChange={(e) => handleNotaChange(index, e)} />
              </Col></Row>

              {/* Remover Nota */}
              <Button className="mt-2 btnAddEsp" type="button" onClick={() => handleRemoveNota(index)}>
                <MdDeleteForever className="links-acessos colorirBTN" fontSize={30} />
              </Button>
            </div>
          </div></>
      ))}


      {/* Botão de Enviar */}
      <Button variant="primary" type="submit" className="mx-auto w-25 d-block links-acessos mt-4">Salvar</Button>
    </Form>
  );
};















const AddClientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Clientes" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/clienteList" />

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