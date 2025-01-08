import "../../css/StylesAdmin/homeAdministrador.css";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal, Image, Spinner, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify'; // Importando as funções do react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importando o CSS do react-toastify
import { useNavigate, useParams } from 'react-router-dom'; // Importando useParams
import { FaBuilding, FaCalendarAlt, FaCamera, FaEnvelope, FaGlobe, FaHome, FaLock, FaMapMarkerAlt, FaMapPin, FaMobileAlt, FaPhone, FaRegCalendarAlt, FaRegEye, FaRegEyeSlash, FaSuitcase, FaTag, FaUser, FaVenusMars } from "react-icons/fa";
import "../../css/StylesAdmin/homeAdministrador.css";
import 'react-toastify/dist/ReactToastify.css'; // Importando o CSS do react-toastify
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoPersonAdd } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import SideBar from "../../components/compenentesAdmin/SideBar";
//import { useNavigate } from 'react-router-dom'; // Importando useNavigate1



const FormularioEquipeSuporte = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    sobrenome: '',
    genero: '',
    email: '',
    senha: '',
    celular: '',
    filial: '1',
    dataAdmissao: '2024-11-25',
    cargo: '',
    dataNascimento: '',
    nomeExibicao: '',
    telefoneFixo: '',
    pais: '',
    provincia: '',
    municipio: '',
    endereco: '',
    imagem: null,
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoCargo, setNovoCargo] = useState('');
  const [cargos, setCargos] = useState(['Gerente', 'Assistente', 'Analista', 'Desenvolvedor', 'Coordenador']);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Navegação após sucesso
  //const [dadosFormulario, setDadosFormulario] = useState({});
  const [loading, setLoading] = useState(false);

  // Função para alterar os dados do formulário
  const handleAlteracao = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  // Função para mudar a imagem
  const handleMudancaArquivo = (e) => {
    setDadosFormulario({ ...dadosFormulario, imagem: e.target.files[0] });
  };

  // Função para alterar o novo cargo
  const handleAlteracaoNovoCargo = (e) => {
    setNovoCargo(e.target.value);
  };

  // Adicionar um novo cargo
  const handleAdicionarCargo = () => {
    if (novoCargo) {
      setCargos([...cargos, novoCargo]);
      setNovoCargo('');
      setMostrarModal(false);
      toast.success('Cargo adicionado com sucesso!'); // Notificação de sucesso
    } else {
      toast.error('Por favor, insira um nome para o cargo.'); // Notificação de erro
    }
  };



  // Carregar os dados da equipe ao montar o componente
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true); // Inicia o carregamento
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/equipe-suporte/${id}`);

          if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
          }

          const data = await response.json();

          // Verifica se os dados retornados não são nulos
          if (data) {
            setDadosFormulario({
              ...data,
              dataNascimento: data.data_nascimento ? data.data_nascimento.split('T')[0] : '', // Formatar data
              genero: data.genero === 'masculino' ? '0' : '1', // Converter para 0 ou 1
              senha: '', // Não exibe a senha original
              pais: data.pais || '', // Garantir que o país seja corretamente preenchido
              provincia: data.provincia || '', // Garantir que o estado seja corretamente preenchido
              municipio: data.municipio || '', // Garantir que a cidade seja corretamente preenchida
              cargo: data.cargo || '', // Garantir que o cargo seja corretamente preenchido
              telefoneFixo: data.telefone_fixo || '',
              nomeExibicao: data.nome_exibicao || '',
             // imagem: data.imagem || null,
              dataAdmissao: data.data_admissao ? data.data_admissao.split('T')[0] : '',
            });
          }
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
          toast.error('Erro ao carregar os dados da equipe.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  // Enviar os dados do formulário
  const handleEnvio = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!dadosFormulario.nome || !dadosFormulario.sobrenome || !dadosFormulario.email || !dadosFormulario.genero || !dadosFormulario.celular || !dadosFormulario.endereco) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true); // Ativa o spinner ao iniciar o processo de envio

    const formData = new FormData();
    formData.append('nome', dadosFormulario.nome);
    formData.append('sobrenome', dadosFormulario.sobrenome);
    formData.append('genero', dadosFormulario.genero === '0' ? 'masculino' : 'feminino');
    formData.append('email', dadosFormulario.email);
    formData.append('celular', dadosFormulario.celular);
    formData.append('telefone_fixo', dadosFormulario.telefoneFixo);
    formData.append('filial', String(dadosFormulario.filial));
    formData.append('cargo', dadosFormulario.cargo);
    formData.append('nome_exibicao', dadosFormulario.nomeExibicao);
    formData.append('data_admissao', dadosFormulario.dataAdmissao);
    formData.append('pais', dadosFormulario.pais);
    formData.append('provincia', dadosFormulario.provincia);
    formData.append('municipio', dadosFormulario.municipio);
    formData.append('endereco', dadosFormulario.endereco);
    formData.append('data_nascimento', dadosFormulario.dataNascimento);

    // Verificar se a imagem foi escolhida
    if (dadosFormulario.imagem) {
      formData.append('foto', dadosFormulario.imagem);
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/equipe-suporte/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Edição realizada com sucesso!');
        setTimeout(() => {
          navigate('/equipeSuportePage'); // Redireciona para a lista após 5 segundos
        }, 5000);
      } else {
        const error = await response.json();
        console.error('Erro ao editar:', error);
        toast.error('Ocorreu um erro ao editar. Tente novamente.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro de rede ou outro erro:', error);
      toast.error('Ocorreu um erro. Verifique sua conexão e tente novamente.');
      setIsLoading(false);
    }
  };


  return (
    <div>

      {loading ? (
        <div>Carregando dados...</div> // Exibe uma mensagem de carregamento
      ) : (
        <Form
          id="formulario_adicionar_funcionario"
          method="post"
          encType="multipart/form-data"
          className="form-horizontal upperform employeeAddForm"
          onSubmit={handleEnvio}
        >
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
                    <option value="2">Filial A</option>
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
                      {cargos.map((cargo, index) => (
                        <option key={index} value={cargo}>{cargo}</option>
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
                    value={dadosFormulario.pais || ''} // Garantir que o valor seja o nome do país (ex: "Angola")
                    onChange={handleAlteracao}
                  >          <option value=""><>{dadosFormulario.pais || 'Selecione o pais'} </></option>
                    <option value="1">Andorra</option>
                    <option value="2">Angola</option>
                    <option value="3">Antártica</option>
                    <option value="4">Antígua e Barbuda</option>
                    <option value="5">Argentina</option>
                    <option value="6">Armênia</option>
                    <option value="7">Aruba</option>
                    <option value="8">Austrália</option>
                    <option value="9">Áustria</option>
                    <option value="10">Azerbaijão</option>
                    <option value="11">Bahamas</option>
                    <option value="12">Bahrein</option>
                    <option value="13">Bangladesh</option>
                    <option value="14">Barbados</option>
                    <option value="15">Bielorrússia</option>
                    <option value="16">Bélgica</option>
                    <option value="17">Belize</option>
                    <option value="18">Benin</option>
                    <option value="19">Bermudas</option>
                    <option value="20">Butão</option>
                    <option value="21">Bolívia</option>
                    <option value="22">Bósnia e Herzegovina</option>
                    <option value="23">Botsuana</option>
                    <option value="24">Ilha Bouvet</option>
                    <option value="25">Brasil</option>
                    <option value="26">Território Britânico do Oceano Índico</option>
                    <option value="27">Brunei</option>
                    <option value="28">Bulgária</option>
                    <option value="29">Burquina Faso</option>
                    <option value="30">Burundi</option>
                    <option value="31">Camboja</option>
                    <option value="32">Camarões</option>
                    <option value="33">Canadá</option>
                    <option value="34">Cabo Verde</option>
                    <option value="35">Ilhas Cayman</option>
                    <option value="36">República Centro-Africana</option>
                    <option value="37">Chade</option>
                    <option value="38">Chile</option>
                    <option value="39">China</option>
                    <option value="40">Ilha Christmas</option>
                    <option value="41">Ilhas Cocos (Keeling)</option>
                    <option value="42">Colômbia</option>
                    <option value="43">Comores</option>
                    <option value="44">Congo</option>
                    <option value="45">Congo (República Democrática)</option>
                    <option value="46">Ilhas Cook</option>
                    <option value="47">Costa Rica</option>
                    <option value="48">Costa do Marfim</option>
                    <option value="49">Croácia</option>
                    <option value="50">Cuba</option>
                    <option value="51">Chipre</option>
                    <option value="52">República Tcheca</option>
                    <option value="53">Dinamarca</option>
                    <option value="54">Djibuti</option>
                    <option value="55">Dominica</option>
                    <option value="56">República Dominicana</option>
                    <option value="57">Timor-Leste</option>
                    <option value="58">Equador</option>
                    <option value="59">Egito</option>
                    <option value="60">El Salvador</option>
                    <option value="61">Guiné Equatorial</option>
                    <option value="62">Eritreia</option>
                    <option value="63">Estônia</option>
                    <option value="64">Etiópia</option>
                    <option value="65">Territórios Externos da Austrália</option>
                    <option value="66">Ilhas Falkland</option>
                    <option value="67">Ilhas Faroé</option>
                    <option value="68">Ilhas Fiji</option>
                    <option value="69">Finlândia</option>
                    <option value="70">França</option>
                    <option value="71">Guiana Francesa</option>
                    <option value="72">Polinésia Francesa</option>
                    <option value="73">Territórios Franceses do Sul</option>
                    <option value="74">Gabão</option>
                    <option value="75">Gâmbia</option>
                    <option value="76">Geórgia</option>
                    <option value="77">Alemanha</option>
                    <option value="78">Gana</option>
                    <option value="79">Gibraltar</option>
                    <option value="80">Grécia</option>
                    <option value="81">Groenlândia</option>
                    <option value="82">Granada</option>
                    <option value="83">Guadalupe</option>
                    <option value="84">Guam</option>
                    <option value="85">Guatemala</option>
                    <option value="86">Guernsey e Alderney</option>
                    <option value="87">Guiné</option>
                    <option value="88">Guiné-Bissau</option>
                    <option value="89">Guiana</option>
                    <option value="90">Haiti</option>
                    <option value="91">Ilhas Heard e McDonald</option>
                    <option value="92">Honduras</option>
                    <option value="93">Hong Kong</option>
                    <option value="94">Hungria</option>
                    <option value="95">Islândia</option>
                    <option value="96">Índia</option>
                    <option value="97">Indonésia</option>
                    <option value="98">Irã</option>
                    <option value="99">Iraque</option>
                    <option value="100">Irlanda</option>
                    <option value="101">Israel</option>
                    <option value="102">Itália</option>
                    <option value="103">Jamaica</option>
                    <option value="104">Japão</option>
                    <option value="105">Jersey</option>
                    <option value="106">Jordânia</option>
                    <option value="107">Cazaquistão</option>
                    <option value="108">Quênia</option>
                    <option value="109">Kiribati</option>
                    <option value="110">Coreia do Norte</option>
                    <option value="111">Coreia do Sul</option>
                    <option value="112">Kuwait</option>
                    <option value="113">Quirguistão</option>
                    <option value="114">Laos</option>
                    <option value="115">Letônia</option>
                    <option value="116">Líbano</option>
                    <option value="117">Lesoto</option>
                    <option value="118">Libéria</option>
                    <option value="119">Líbia</option>
                    <option value="120">Liechtenstein</option>
                    <option value="121">Lituânia</option>
                    <option value="122">Luxemburgo</option>
                    <option value="123">Macau</option>
                    <option value="124">Macedônia</option>
                    <option value="125">Madagascar</option>
                    <option value="126">Malawi</option>
                    <option value="127">Malásia</option>
                    <option value="128">Maldivas</option>
                    <option value="129">Mali</option>
                    <option value="130">Malta</option>
                    <option value="131">Ilha de Man</option>
                    <option value="132">Ilhas Marshall</option>
                    <option value="133">Martinica</option>
                    <option value="134">Mauritânia</option>
                    <option value="135">Maurício</option>
                    <option value="136">Mayotte</option>
                    <option value="137">México</option>
                    <option value="138">Micronésia</option>
                    <option value="139">Moldávia</option>
                    <option value="140">Mônaco</option>
                    <option value="141">Mongólia</option>
                    <option value="142">Montserrat</option>
                    <option value="143">Marrocos</option>
                    <option value="144">Moçambique</option>
                    <option value="145">Myanmar</option>
                    <option value="146">Namíbia</option>
                    <option value="147">Nauru</option>
                    <option value="148">Nepal</option>
                    <option value="149">Antilhas Neerlandesas</option>
                    <option value="150">Países Baixos</option>
                    <option value="151">Nova Caledônia</option>
                    <option value="152">Nova Zelândia</option>
                    <option value="153">Nicarágua</option>
                    <option value="154">Níger</option>
                    <option value="155">Nigéria</option>
                    <option value="156">Niue</option>
                    <option value="157">Ilha Norfolk</option>
                    <option value="158">Ilhas Mariana do Norte</option>
                    <option value="159">Noruega</option>
                    <option value="160">Omã</option>
                    <option value="161">Paquistão</option>
                    <option value="162">Palau</option>
                    <option value="163">Território Palestino Ocupado</option>
                    <option value="164">Panamá</option>
                    <option value="165">Papua-Nova Guiné</option>
                    <option value="166">Paraguai</option>
                    <option value="167">Peru</option>
                    <option value="168">Filipinas</option>
                    <option value="169">Ilha Pitcairn</option>
                    <option value="170">Polônia</option>
                    <option value="171">Portugal</option>
                    <option value="172">Porto Rico</option>
                    <option value="173">Catar</option>
                    <option value="174">Reunião</option>
                    <option value="175">Romênia</option>
                    <option value="176">Rússia</option>
                    <option value="177">Ruanda</option>
                    <option value="178">Santa Helena</option>
                    <option value="179">São Cristóvão e Nevis</option>
                    <option value="180">Santa Lúcia</option>
                    <option value="181">São Pedro e Miquelon</option>
                    <option value="182">São Vicente e Granadinas</option>
                    <option value="183">Samoa</option>
                    <option value="184">San Marino</option>
                    <option value="185">São Tomé e Príncipe</option>
                    <option value="186">Arábia Saudita</option>
                    <option value="187">Senegal</option>
                    <option value="188">Sérvia</option>
                    <option value="189">Seychelles</option>
                    <option value="190">Serra Leoa</option>
                    <option value="191">Cingapura</option>
                    <option value="192">Eslováquia</option>
                    <option value="193">Eslovênia</option>
                    <option value="194">Territórios Menores do Reino Unido</option>
                    <option value="195">Ilhas Solomon</option>
                    <option value="196">Somália</option>
                    <option value="197">África do Sul</option>
                    <option value="198">Geórgia do Sul</option>
                    <option value="199">Sudão do Sul</option>
                    <option value="200">Espanha</option>
                    <option value="201">Sri Lanka</option>
                    <option value="202">Sudão</option>
                    <option value="203">Suriname</option>
                    <option value="204">Svalbard e Jan Mayen</option>
                    <option value="205">Eswatini</option>
                    <option value="206">Suécia</option>
                    <option value="207">Suíça</option>
                    <option value="208">Síria</option>
                    <option value="209">Taiwan</option>
                    <option value="210">Tajiquistão</option>
                    <option value="211">Tanzânia</option>
                    <option value="212">Tailândia</option>
                    <option value="213">Togo</option>
                    <option value="214">Tokelau</option>
                    <option value="215">Tonga</option>
                    <option value="216">Trinidad e Tobago</option>
                    <option value="217">Tunísia</option>
                    <option value="218">Turquia</option>
                    <option value="219">Turcomenistão</option>
                    <option value="220">Ilhas Turks e Caicos</option>
                    <option value="221">Tuvalu</option>
                    <option value="222">Uganda</option>
                    <option value="223">Ucrânia</option>
                    <option value="224">Emirados Árabes Unidos</option>
                    <option value="225">Reino Unido</option>
                    <option value="226">Estados Unidos</option>
                    <option value="227">Ilhas Menores dos EUA</option>
                    <option value="228">Uruguai</option>
                    <option value="229">Uzbequistão</option>
                    <option value="230">Vanuatu</option>
                    <option value="231">Cidade do Vaticano</option>
                    <option value="232">Venezuela</option>
                    <option value="233">Vietnã</option>
                    <option value="234">Ilhas Virgens (Britânicas)</option>
                    <option value="235">Ilhas Virgens (EUA)</option>
                    <option value="236">Wallis e Futuna</option>
                    <option value="237">Saara Ocidental</option>
                    <option value="238">Iémen</option>
                    <option value="239">Iugoslávia</option>
                    <option value="240">Zâmbia</option>
                    <option value="241">Zimbábue</option>

                    {/* Outras opções de países */}
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="provincia">
                <Form.Label className="fw-900">Província</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    name="provincia"
                    value={dadosFormulario.provincia} // O valor será o nome do estado
                    onChange={handleAlteracao}
                    placeholder="Digite a província"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="municipio">
                <Form.Label className="fw-900">municipio</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaMapPin fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    type="text"
                    name="municipio"
                    value={dadosFormulario.municipio}
                    onChange={handleAlteracao}
                    placeholder="Digite a municipio"
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



          <Button variant="primary" type="submit" className="mt-5 w-25 d-block mx-auto links-acessos px-5" disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Actualizar"
            )}
          </Button>
        </Form>
      )}
      <ToastContainer position="top-center" />


    </div>
  );
};






const EditarEquipe = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="  Editar Equipe de Suporte" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/clienteList" />

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

export default EditarEquipe;
