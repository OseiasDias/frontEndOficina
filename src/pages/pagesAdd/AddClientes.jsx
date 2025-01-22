import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong, FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { FaRegEye, FaUser } from 'react-icons/fa';
import { FaBuilding, FaCamera, FaEnvelope, FaGlobe, FaHome, FaIdCard, FaLock, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaRegAddressCard, FaRegEyeSlash, FaTransgender } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
    compartilhado: false
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

 



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

    // Envia os dados para o backend
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clientes/', formData);
      console.log('Cliente cadastrado com sucesso:', response.data);
      toast.success("Cliente cadastrado com sucesso!");
      setFormData({
        primeiro_nome: '',
        sobrenome: '',
        celular: '',
        email: '',
        senha: generateRandomPassword(), // Nova senha gerada
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
        compartilhado: false
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
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
      <ToastContainer />
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Dados Pessoais */}
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
              <Form.Label className="fw-bold">Bilhete de Identidade</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaRegAddressCard fontSize={20} color="#0070fa" /></span>

                <Form.Control

                  type="text"
                  name="bilhete_identidade"
                  value={formData.bilhete_identidade}
                  onChange={handleChange}



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

                <Form.Control

                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  required
                  as="select"

                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Form.Control>
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
          <Form.Control
            as="select"
            name="pais"  // Adicionei o nome "pais" aqui para garantir que seja tratado corretamente
            value={formData.pais}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o país</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            {/* Adicione mais opções conforme necessário */}
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

        <Button variant="primary" type="submit" className="mx-auto w-25 d-block links-acessos mt-4">Salvar</Button>
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