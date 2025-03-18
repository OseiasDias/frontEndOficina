import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ModalCadastrarCliente from './ModalCadastrarCliente';
import { toast, ToastContainer } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export default function ModalLogin({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalShowCadastro, setModalShowCadastro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-mail é obrigatório.');
      return false;
    } else if (!emailRegex.test(email) || !email.endsWith('.com')) {
      setEmailError('Por favor, digite um e-mail válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Senha é obrigatória.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    if (!password || password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/clientes/loginClien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.cliente) {
        throw new Error(data.message || 'Usuário não encontrado. Verifique as credenciais.');
      }

      // Armazenar dados no localStorage
      localStorage.setItem('authToken', data.token || '');
      localStorage.setItem('userId', data.cliente.id);
      localStorage.setItem('userName', `${data.cliente.primeiro_nome} ${data.cliente.sobrenome}`);
      localStorage.setItem('userEmail', data.cliente.email);

      toast.success('Login realizado com sucesso!');
      onHide(); // Fecha o modal antes de navegar

      navigate('/HomeCliente');

      //navigate('/HomeCliente', { state: { id_cliente: data.cliente.id } });


    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setGeneralError(error.message || 'Erro ao conectar ao servidor.');
      toast.error(error.message || 'Erro ao conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <ToastContainer />
      <div className="modalBeleza">
        <Modal.Header closeButton>
          <Modal.Title>Faça seu login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Senha</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!passwordError}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ms-2"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block" disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Entrar"}
            </Button>

            {generalError && (
              <p className="text-danger px-3 text-center mt-3">{generalError}</p>
            )}
          </Form>
        </Modal.Body>
        <hr />
        <p className="text-center"><strong className="melhorarStrong">Esqueceu sua senha?</strong></p>
        <p className="text-center">
          Não tem uma conta? <strong className="melhorarStrong" onClick={() => setModalShowCadastro(true)}>Registrar</strong>
        </p>

        <ModalCadastrarCliente show={modalShowCadastro} onHide={() => setModalShowCadastro(false)} />
      </div>
    </Modal>
  );
}
