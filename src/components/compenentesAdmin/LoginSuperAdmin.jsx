//import '../../css/StylesAdmin/modalAcessoSuperAdmin.css';
import  '../../css/StylesAdmin/loginSuperAdmin.css';
import Logo from './Logo';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginSuperAdmin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    // Validação de e-mail
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('E-mail é obrigatório.');
            return false;
        } else if (!emailRegex.test(email) || !email.endsWith('.com')) {
            setEmailError('Por favor, digite um e-mail válido que contenha "@" e termine com ".com".');
            return false;
        }
        setEmailError('');
        return true;
    };

    // Função de login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/clientes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setLoginError(errorMessage || 'Erro ao fazer login. Verifique suas credenciais.');
                setLoginSuccess('');
                return;
            }

            const data = await response.json();
            setLoginSuccess('Login realizado com sucesso!');
            setLoginError('');
            console.log('Login bem-sucedido:', data);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoginError('Erro ao conectar ao servidor.');
            setLoginSuccess('');
        }
    };

    return (
        <div className="container  text-white">
            <div className="row">
                <div className="col-lg-12 col-md-10 col-12 ">
                    <div className="TabAcessoOs">
                        <Logo />
                        <h5 className="text-center my-2">Super Administrador</h5>
                        <div className="col-11 col-md-10 col-lg-10 mx-auto">
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
                                        >
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </Button>
                                    </div>
                                </Form.Group>

                                {/* Mensagens de erro ou sucesso no login */}
                                {loginError && <div className="text-danger mt-2">{loginError}</div>}
                                {loginSuccess && <div className="text-success mt-2">{loginSuccess}</div>}

                                <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block">
                                    Entrar
                                </Button>
                            </Form>

                            <hr />
                            <p className="text-center">
                                <strong className="melhorarStron">Esqueceste a sua senha?</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
