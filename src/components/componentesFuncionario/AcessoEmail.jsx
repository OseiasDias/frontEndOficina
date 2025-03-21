import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../css/StylesFuncionario/cartaz.css";
import LogoMarca from "../../assets/logo- turbo fundo branco.png";
import imgAcesso from "../../assets/funcionario/pngtree-trying-to-log-in-to-a-website-png-image_8919062.png";
import imgBiturbo from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import "react-toastify/dist/ReactToastify.css"; // Importando o estilo do Toastify

const API_URL = import.meta.env.VITE_API_URL;


const LoginSenha = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/verificarSenhaLogin/1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok && data.sucesso) {
                localStorage.setItem("authToken", "true");
                localStorage.setItem("userId", data.id);

                setMessage("Login bem-sucedido!");
                navigate("/homeFuncionario");
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

                            <form onSubmit={handleLogin}>
                                <div style={{ position: "relative", width: "100%" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            paddingRight: "40px",
                                            marginBottom: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "40%",
                                            transform: "translateY(-50%)",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>

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
        </div>
    );
};

export default LoginSenha;
