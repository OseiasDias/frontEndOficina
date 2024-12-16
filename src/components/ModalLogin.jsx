import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ModalCadastrarCliente from './ModalCadastrarCliente';


// eslint-disable-next-line react/prop-types
export default function ModalLogin({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalShowCadastro, setModalShowCadastro] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para o carregamento

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

  const validateSenha = (senha) => {
    if (!senha) {
      setSenhaError('Senha é obrigatória.');
      return false;
    }
    setSenhaError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isSenhaValid = validateSenha(senha);

    if (!isEmailValid || !isSenhaValid) {
      return;
    }

    setIsLoading(true); // Ativa o spinner ao iniciar o login

    try {
      const response = await fetch('http://localhost:5000/api/clientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        setGeneralError('Verifique as credenciais que inseriste, não está associado a uma conta.');
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);

      const clienteResponse = await fetch(`http://localhost:5000/api/clientes/email/${email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!clienteResponse.ok) {
        setGeneralError('Erro ao obter ID do cliente.');
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      const clienteData = await clienteResponse.json();
      localStorage.setItem('userId', clienteData.id_cliente);

      setTimeout(() => {
        setIsLoading(false); // Desativa o spinner ao concluir o login
       // navigate('/Home999Cliente988777', { state: { id_cliente: clienteData.id_cliente } });
      }, 3000);
  
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setGeneralError('Erro ao conectar ao servidor.');
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <div className="modalBeleza">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Faça seu login</Modal.Title>
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

            <Form.Group controlId="formBasicSenha" className="mt-3">
              <Form.Label>Senha</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  isInvalid={!!senhaError}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ms-2"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{senhaError}</Form.Control.Feedback>
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
        <p className='text-center'><strong className='melhorarStrong'>Esqueceste a sua senha?</strong></p>
        <p className='text-center'>Não tens uma conta? <strong className='melhorarStrong' onClick={() => setModalShowCadastro(true)}>Registar</strong></p>

        <ModalCadastrarCliente show={modalShowCadastro} onHide={() => setModalShowCadastro(false)} />
      </div>
    </Modal>
  );
}
