// Imports do Menu
import "../../css/StylesFuncionario/cartaz.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Importação do Bootstrap

// eslint-disable-next-line react/prop-types
const ProgressoBar = ({ progresso, segundoFinal }) => {
  // Garantir que progresso esteja entre 0 e segundoFinal
  const progressoCalculado = Math.min(segundoFinal, Math.max(0, progresso));

  // Calcular a porcentagem correta
  const porcentagem = (progressoCalculado / segundoFinal) * 100;

  // Determinar a cor da barra com base na porcentagem
  let variante = "success"; // Verde (padrão)
  if (porcentagem >= 80) {
    variante = "warning"; // Laranja (Alerta)
  }
  if (porcentagem >= 100) {
    variante = "danger"; // Vermelho (Atingiu o limite)
  }

  return (
    <ProgressBar
      now={porcentagem}
      variant={variante}
      label={`${Math.round(porcentagem)}%`}
      style={{
        whiteSpace: "pre-line",
        fontSize: "1rem",
        textAlign: "center",
        color: "black", // Cor do texto sempre preta
      }}
    />
  );
};

export default ProgressoBar;
