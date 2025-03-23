import '../../css/StylesAdmin/loginAdmin.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import logoFoto from "../../assets/img/logo- turbo fundo branco.png";
import { toast } from 'react-toastify'; // Importa o Toastify
import { useNavigate } from 'react-router-dom'; // UseNavigate para navegação no React Router v6

const API_URL = import.meta.env.VITE_API_URL;




export default function AtalhoLoginAdmin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para o spinner

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

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) return;
    
        if (!senha || senha.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
    
        setIsLoading(true); // Ativa o spinner
        try {
            const response = await fetch(`${API_URL}/administradores/loginAdmin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: senha }), // Nome correto do campo 'password'
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login.');
            }
    
            // Armazena os dados do administrador no localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('adminId', data.administrador.id);
            localStorage.setItem('adminNome', data.administrador.nome);
            localStorage.setItem('adminEmail', data.administrador.email);
    
            toast.success('Login realizado com sucesso!');
            navigate('/homeAdministrador');
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            setLoginError(error.message);
            toast.error(error.message || 'Erro ao conectar ao servidor.');
        } finally {
            setIsLoading(false); // Desativa o spinner
        }
    };
    

    return (
        <div className="container-login my-4 LoginAdmistrador ">
            <div className="login-box shadow rounded">
                <div className="row p-2">
                    <img src={logoFoto} alt="logotipo da empresa" className='d-block mx-auto' style={{ width: "220px", height: "100px" }} />
                    <h5 className="text-center my-2">Acesso para Administrador</h5>

                    <div className="col-11 col-md-9 col-lg-10 mx-auto">
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
                                <Form.Control.Feedback type="invalid">
                                    {emailError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicSenha" className="mt-3">
                                <Form.Label>Senha</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ms-2"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </Button>
                                </div>
                            </Form.Group>

                            {loginError && <div className="text-danger mt-2">{loginError}</div>}

                            <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block" disabled={isLoading}>
                                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Entrar"}
                            </Button>
                        </Form>

                        <hr />
                        <p className="text-center">
                            <strong className="melhorarStrong">Esqueceu sua senha?</strong>
                        </p>
                        <hr className='mb-5'/>

                       
                    </div>
                </div>
            </div>
        </div>
    );
}
