import "../../css/StylesFuncionario/cartaz.css";
import LogoMarca from "../../assets/logo- turbo fundo branco.png";
import ImgLogin from "../../assets/funcionario/CartaRepresentacao (1).png";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6

export default function Cartaz() {
  const navigate = useNavigate(); // Hook para navegação

  // Função para redirecionar ao clicar no botão
  const handleRedirect = () => {
    navigate("/emailFuncionario"); // Redireciona para a página /emailFuncionario
  };

  return (
    <div className="seccao-cartaz">
      <div className="container">
        <img
          src={LogoMarca}
          alt="Logo branco da biturbo"
          className="d-block mx-auto imagemLogo"
        />

        <div className="row min-vh-75 d-flex align-items-center justify-content-center mx-auto">
          <div className="ff">
            <div className="col-12 col-md-12 col-lg-6 mx-auto">
              <h2 className="text-center fw-bold sizeTitulo">Perfil de Funcionário!</h2>
              <h3 className="sizeSubTitulo text-center">Já tem uma conta?</h3>
              <img
                src={ImgLogin}
                alt="..."
                className="d-block img-fluid mx-auto"
              />
              <button
                className="btnAcessoFuncionario d-block mt-3 mx-auto"
                onClick={handleRedirect} // Chama a função para redirecionar
              >
                Entrar <MdLogin />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
