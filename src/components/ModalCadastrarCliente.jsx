import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../css/modalLogin.css';

export default function ModalCadastrarCliente({ show, onHide }) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmSenha: '',
    dataNascimento: '', 
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Estado de carregamento

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const hoje = new Date().toISOString().split('T')[0];

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!formValues.nome) {
      newErrors.nome = 'Nome é obrigatório.';
    } else if (!nomeRegex.test(formValues.nome)) {
      newErrors.nome = 'O nome não pode conter números ou caracteres especiais.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!formValues.telefone) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (!/^\d{9,}$/.test(formValues.telefone)) {
      newErrors.telefone = 'Telefone deve conter pelo menos 9 dígitos.';
    }

    if (!formValues.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    } else if (formValues.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres.';
    }

    if (formValues.senha !== formValues.confirmSenha) {
      newErrors.confirmSenha = 'As senhas devem ser iguais.';
    }

    if (!formValues.dataNascimento) {
      newErrors.dataNascimento = "Data de nascimento é obrigatória.";
    } else if (formValues.dataNascimento > hoje) {
      newErrors.dataNascimento = "A data de nascimento não pode ser maior que a data atual.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);  // Ativar o spinner

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Cadastro não realizado: ${errorData.message || 'Verifique os dados. Email e telefone já existem.'}`);
        return;
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.id_cliente);
      
      toast.success(`Cadastro realizado com sucesso!`);
      setFormValues({  // Limpar o formulário após o sucesso
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        confirmSenha: '',
        dataNascimento: '',
      });

      setTimeout(() => {
        navigate('/', { state: { id_cliente: data.id_cliente } });
      }, 5000);

      onHide();
    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
    } finally {
      setIsLoading(false);  // Desativar o spinner
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="xl" scrollable aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="modalBeleza">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Cadastro de Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCadastro} className='row'>
              <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formNome">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleInputChange}
                  isInvalid={!!errors.nome}
                />
                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite seu telefone"
                  name="telefone"
                  value={formValues.telefone}
                  onChange={handleInputChange}
                  isInvalid={!!errors.telefone}
                />
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formSenha">
                <Form.Label>Senha</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    name="senha"
                    value={formValues.senha}
                    onChange={handleInputChange}
                    isInvalid={!!errors.senha}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formConfirmSenha">
                <Form.Label>Confirmar Senha</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    name="confirmSenha"
                    value={formValues.confirmSenha}
                    onChange={handleInputChange}
                    isInvalid={!!errors.confirmSenha}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ms-2">
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">{errors.confirmSenha}</Form.Control.Feedback>
              </Form.Group>

              {errors.server && <div className="text-danger mt-2">{errors.server}</div>}

              <div className="row mb-3">
                <Button variant="primary" type="submit" className="links-acessos nnB mt-3 px-5 mx-auto d-block" disabled={isLoading}>
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </div>
              <hr />
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}
