import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Adicione esta linha
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaBuilding, FaEnvelope, FaMobileAlt, FaPhone,  FaMars, FaGlobe, FaMapMarkerAlt, FaMapPin, FaHome } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Não se esqueça de importar o estilo do Toast
import { FaArrowLeftLong } from 'react-icons/fa6';
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';


export function AddFornecedor  () {
  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    nomeEmpresa: '',
    email: '',
    celular: '',
    telefoneFixo: '',
    imagem: null,
    genero: '',
    pais: '',
    estado: '',
    municipio: '',
    endereco: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Validação dos campos obrigatórios
    if (!formData.primeiroNome || !formData.ultimoNome || !formData.nomeEmpresa || !formData.email || !formData.celular || !formData.endereco) {
      toast.error("Todos os campos obrigatórios devem ser preenchidos.");
      return false;
    }
    

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!formData.ultimoNome) {
      formData.primeiroNome = 'Nome é obrigatório.';
    } else if (!nomeRegex.test(!formData.ultimoNome)) {
      formData.ultimoNome = 'O nome não pode conter números ou caracteres especiais.';
    }


 
    if (!formData.primeiroNome) {
      formData.primeiroNome = 'Nome é obrigatório.';
    } else if (!nomeRegex.test(formData.primeiroNome)) {
      formData.primeiroNome = 'O nome não pode conter números ou caracteres especiais.';
    }
    // Validação do e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return false;
    }

    // Validação do celular (9 dígitos)
    const celularPattern = /^\d{9}$/;
    if (!celularPattern.test(formData.celular)) {
      toast.error("Por favor, insira um número de celular válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const fornecedorData = new FormData();
    fornecedorData.append('primeiro_nome', formData.primeiroNome);
    fornecedorData.append('ultimo_nome', formData.ultimoNome);
    fornecedorData.append('nome_empresa', formData.nomeEmpresa);
    fornecedorData.append('email', formData.email);
    fornecedorData.append('celular', formData.celular);
    fornecedorData.append('telefone_fixo', formData.telefoneFixo);
    fornecedorData.append('genero', formData.genero);
    fornecedorData.append('pais', formData.pais);
    fornecedorData.append('estado', formData.estado);
    fornecedorData.append('municipio', formData.municipio);
    fornecedorData.append('endereco', formData.endereco);

    if (formData.imagem) {
      fornecedorData.append('imagem', formData.imagem);
    }

    setIsLoading(true);

    axios.post('http://127.0.0.1:8000/api/distribuidores/', fornecedorData)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        toast.success("Fornecedor cadastrado com sucesso!");
        setTimeout(() => navigate('/fornecedorPage'), 4000);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`Erro ao cadastrar fornecedor: ${error.response.data.message || "Tente novamente."}`);
        } else {
          toast.error("Erro ao cadastrar fornecedor. Tente novamente.");
        }
        setIsLoading(false);
      })
      //.finally(() => setIsLoading(false));
  };

  return (
    <div className="container-fluid">
      <div className="d-fl">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Informações pessoais */}
          <div className="col-md-12 mt-5">
            <h6>INFORMAÇÕES PESSOAIS</h6>
            <hr />
          </div>

          {/* Nome e Sobrenome */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="primeiroNome">
                <Form.Label className="fw-900">Primeiro nome <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <IoPerson fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="primeiroNome"
                    value={formData.primeiroNome}
                    onChange={handleChange}
                    placeholder="Introduza o primeiro nome"
                    maxLength="50"
                    isInvalid={!formData.primeiroNome && formData.primeiroNome !== ''}
                  />
                  {!formData.primeiroNome && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="ultimoNome">
                <Form.Label className="fw-900">Último nome <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <IoPerson fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="ultimoNome"
                    value={formData.ultimoNome}
                    onChange={handleChange}
                    placeholder="Insira o último nome"
                    maxLength="50"
                    isInvalid={!formData.ultimoNome && formData.ultimoNome !== ''}
                  />
                  {!formData.ultimoNome && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Nome da empresa e e-mail */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="nomeEmpresa">
                <Form.Label className="fw-900">Nome da empresa <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaBuilding fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    placeholder="Digite o nome da empresa"
                    maxLength="100"
                    isInvalid={!formData.nomeEmpresa && formData.nomeEmpresa !== ''}
                  />
                  {!formData.nomeEmpresa && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label className="fw-900">E-mail <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite e-mail"
                    maxLength="50"
                    isInvalid={!formData.email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)}
                  />
                  {!formData.email && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                  {formData.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email) && 
                    <Form.Control.Feedback type="invalid">Por favor, insira um e-mail válido.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Celular e Telefone fixo */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="celular">
                <Form.Label className="fw-900">Celular <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMobileAlt fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    placeholder="Digite o número de celular"
                    maxLength="16"
                    isInvalid={!formData.celular || !/^\d{9}$/.test(formData.celular)}
                  />
                  {!formData.celular && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                  {formData.celular && !/^\d{9}$/.test(formData.celular) && 
                    <Form.Control.Feedback type="invalid">Por favor, insira um número de celular válido.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="telefoneFixo">
                <Form.Label className="fw-900">Telefone fixo</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaPhone fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="telefoneFixo"
                    value={formData.telefoneFixo}
                    onChange={handleChange}
                    placeholder="Digite o número fixo"
                    maxLength="16"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Gênero */}
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-900">Gênero</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMars fontSize={20} color="#0070fa" />
                  </span>
                  <div className="mx-4">
                    <Form.Check
                      type="radio"
                      label="Masculino"
                      name="genero"
                      value="Masculino"
                      onChange={handleChange}
                      checked={formData.genero === 'Masculino'}
                    />
                    <Form.Check
                      type="radio"
                      label="Feminino"
                      name="genero"
                      value="Feminino"
                      onChange={handleChange}
                      checked={formData.genero === 'Feminino'}
                    />
                  </div>
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
                  <span className="input-group-text">
                    <FaGlobe fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="select"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                  >
                    <option value="">Selecione o país</option>
                    <option value="Brasil">Brasil</option>
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="estado">
                <Form.Label className="fw-900">Província/Estado</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMapMarkerAlt fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="Digite o nome da província"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="municipio">
                <Form.Label className="fw-900">Município</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMapPin fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    type="text"
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleChange}
                    placeholder="Digite o nome do município"
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="endereco">
                <Form.Label className="fw-900">Endereço <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaHome fontSize={20} color="#0070fa" />
                  </span>
                  <Form.Control
                    as="textarea"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    placeholder="Digite o endereço"
                    maxLength="100"
                    isInvalid={!formData.endereco}
                  />
                  {!formData.endereco && <Form.Control.Feedback type="invalid">Este campo é obrigatório.</Form.Control.Feedback>}
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Botão de envio */}
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
        <ToastContainer position='top-center' />
      </div>
    </div>
  );
};











const AddDestribuidor = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="  Adicionar Fornecedores" leftSeta={<FaArrowLeftLong />} leftR="/fornecedorPage" />

            <div className="vh-100 alturaPereita">
              <AddFornecedor />
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

export default AddDestribuidor;
