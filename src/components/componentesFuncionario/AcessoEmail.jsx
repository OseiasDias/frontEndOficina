import "../../css/StylesFuncionario/cartaz.css";
import LogoMarca from "../../assets/logo- turbo fundo branco.png";
import imgAcesso from "../../assets/funcionario/pngtree-trying-to-log-in-to-a-website-png-image_8919062.png";
import imgBiturbo from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando useNavigate para navegação
import { Button, Form, Alert } from "react-bootstrap"; // Para estilos mais rápidos
import { MdLogin, MdPassword, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Ícones para senha
import { toast, ToastContainer } from "react-toastify"; // Importando Toastify para notificações
import "react-toastify/dist/ReactToastify.css"; // Importando o estilo do Toastify
import { BsArrowsFullscreen } from "react-icons/bs";

export default function Cartaz() {
  const navigate = useNavigate();

  // Estado para armazenar a senha e erros
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controle do estado de visualização da senha
  const [errorMessage, setErrorMessage] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!password) {
      setErrorMessage("Por favor, preencha o campo senha.");
      return;
    }

    try {
      // Exibe a senha antes de enviar, para confirmar que está correta
      console.log("Senha a ser enviada: ", password); // Para verificar no console

      // Enviar a senha para a API para verificação
      const response = await fetch("http://127.0.0.1:8000/api/senhas/1/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }), // Envia a senha no corpo da requisição
      });

      const data = await response.json(); // Para capturar a resposta JSON

      // Exibe a resposta da API para debugging
      console.log("Resposta da API: ", data);

      if (response.ok) {
        //Caso a senha seja válida, redireciona para a página desejada
        toast.success("Senha correta! Acessando...");
        setTimeout(() => navigate("/homeFuncionario"), 1500); // Aguarda 1.5 segundos antes de redirecionar

      } else {
        // Caso a senha esteja errada
        toast.error(data.message || "Erro ao autenticar.");
      }
    } catch (error) {
      toast.error("Erro de conexão. Tente novamente.");
      console.error(error); // Exibe o erro para debugging
    }
  };


  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRedirect = () => {
    navigate("/projectarTela"); // Redireciona para a página /projectarTela
  };


  return (
    <div className="seccao-cartaz">   
  
      <div className="container">
      <BsArrowsFullscreen  onClick={handleRedirect} className="flutuarIcones"/>
        <img src={LogoMarca} alt="Logo branco da biturbo" className="d-block mx-auto imagemLogo" />
     
        <div className="row min-vh-75 d-flex align-items-center justify-content-between mx-auto">
          <div className="col-lg-6 col-md-6">
            <img src={imgAcesso} alt="..." className="w-100 d-block imagemLog" />
          </div>
         


          <div className="col-lg-5 col-md-6">
            <h3 className="fw-bold sizeTitu">
              Login <img src={imgBiturbo} alt="..." width="50" />
            </h3>

            <div className="login-container">
              <h2 className="text-center mb-4 opacity-0">Login</h2>

              {/* Exibindo mensagem de erro, se houver */}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Campo de senha */}
                <Form.Group className="mb-3 bordarER" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <div className="input-group mb-4">
                    <span className="input-group-text fundoIcone">
                      <MdPassword fontSize={20} color="#fff" />
                    </span>

                    <Form.Control
                      type={showPassword ? "text" : "password"} // Exibe ou oculta a senha com base no estado
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="paddingEspecia py-2"
                    />

                    <span className="input-group-text fundoIconeRigth" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                      {showPassword ? <MdVisibilityOff fontSize={20} color="#fff" /> : <MdVisibility fontSize={20} color="#fff" />}
                    </span>
                  </div>
                </Form.Group>

                {/* Botão de Login */}
                <Button
                  type="submit"
                  className="w-75 btnAcessoPass d-block mt-3 mx-auto"
                >
                  Acessar <MdLogin />
                </Button>




              </Form>
             
            
            </div>
          </div>
        </div>
      </div>

      {/* Toastify container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}
