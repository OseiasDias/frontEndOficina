import "../../css/StylesFuncionario/cartaz.css";
import LogoMarca from "../../assets/logo- turbo fundo branco.png";
import imgAcesso from "../../assets/funcionario/pngtree-trying-to-log-in-to-a-website-png-image_8919062.png";
import imgBiturbo from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando useNavigate para navegação
import { Button, Form, Alert } from "react-bootstrap"; // Para estilos mais rápidos
import { MdAlternateEmail, MdLogin, MdPassword } from "react-icons/md";



export default function Cartaz() {


    const navigate = useNavigate();

    // Estado para armazenar o email, senha e erros
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validação simples
        if (!email || !password) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        // Exemplo de redirecionamento após login bem-sucedido
        // Aqui você pode adicionar lógica de autenticação
        console.log("Login realizado com:", email, password);
        navigate("/dashboard"); // Redireciona para a página do dashboard ou onde você quiser
    };

    // Função para lidar com o clique no botão "Esqueceu sua senha"
    const handleForgotPassword = () => {
        // Redireciona para a página de recuperação de senha
        navigate("/recuperar-senha");
    };
    const handleLogin = () => {
        // Aqui você pode adicionar a lógica de autenticação se necessário
        navigate('/homeFuncionario'); // Redireciona para a rota desejada
    };

    return (
        <div className="seccao-cartaz ">
            <div className="container">

                <img src={LogoMarca} alt="Logo branco da biturbo" className="d-block mx-auto imagemLogo" />

                <div className="row  min-vh-75 d-flex align-items-center  justify-content-between mx-auto">

                    <div className="col-lg-6  col-md-6">

                        <img src={imgAcesso} alt="..." className="w-100 d-block  imagemLog" />
                    </div>

                    <div className="col-lg-5 col-md-6">

                        <h3 className=" fw-bold sizeTitu">Login <img src={imgBiturbo} alt="..." width="50" /></h3>

                        <div className="login-container">
                            <h2 className="text-center mb-4 opacity-0">Login</h2>

                            {/* Exibindo mensagem de erro, se houver */}
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                {/* Campo de email */}
                                <Form.Group className="mb-3 bordarER" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <div className="input-group ">
                                        <span className="input-group-text fundoIcone"> <MdAlternateEmail fontSize={20} color="#fff" /></span>

                                        <Form.Control
                                            type="email"
                                            placeholder="Digite seu email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bordar paddingEspecial"
                                        />
                                    </div>
                                </Form.Group>

                                {/* Campo de senha */}
                                <Form.Group className="mb-3 bordarER" controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <div className="input-group mb-4">
                                        <span className="input-group-text fundoIcone"><MdPassword fontSize={20} color="#fff" /></span>

                                        <Form.Control
                                            type="password"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="paddingEspecial bordar "
                                        />
                                    </div>
                                </Form.Group>

                                {/* Botão de Login */}
                                <Button
                                    type="submit"
                                    className="w-100 btnAcessoPass"
                                    onClick={handleLogin}
                                >
                                    Acessar <MdLogin />
                                </Button>

                            </Form>

                            {/* Link para recuperação de senha */}
                            <div className="text-center mt-3">
                                <Button
                                    variant="link"
                                    onClick={handleForgotPassword}
                                    className="forgot-password-btn"
                                    disabled
                                >
                                    Esqueceu sua senha?
                                </Button>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}
