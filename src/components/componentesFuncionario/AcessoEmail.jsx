import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/StylesFuncionario/cartaz.css";
import LogoMarca from "../../assets/logo- turbo fundo branco.png";
import imgAcesso from "../../assets/funcionario/pngtree-trying-to-log-in-to-a-website-png-image_8919062.png";
import imgBiturbo from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";

import "react-toastify/dist/ReactToastify.css"; // Importando o estilo do Toastify


const LoginSenha = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/verificarSenhaLogin/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok && data.sucesso) {
                // Armazena o ID do usuário e um token de autenticação no localStorage
                localStorage.setItem("authToken", "true"); // Simulação de token
                localStorage.setItem("userId", data.id); // Armazena o ID do usuário

                setMessage("Login bem-sucedido!");
                navigate("/homeFuncionario"); // Redireciona para homeFuncionario
            } else {
                setMessage(data.message || "Erro ao verificar senha");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMessage("Erro na conexão com o servidor.");
        }
    };

    return (
      <div className="seccao-cartaz">   
  
      <div className="container">
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
            <form onSubmit={handleLogin}>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
                <button type="submit" style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}>
                    Entrar
                </button>
            </form>
            {message && (
                <div style={{ marginTop: "10px", color: message.includes("sucesso") ? "green" : "red" }}>
                    {message}
                </div>
            )}
         </div>
          </div>
        </div>
      </div>

      {/* Toastify container for displaying notifications */}
    
    </div>
    );
};

export default LoginSenha;
