//Imports do Menu
import "../../css/StylesFuncionario/cartaz.css";

/* eslint-disable react/prop-types */
import "../../css/StylesFuncionario/cartaz.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

import 'bootstrap/dist/css/bootstrap.min.css'; // Não se esqueça de importar o CSS do bootstrap



// eslint-disable-next-line react/prop-types
const ProgressoBar = ({ progresso }) => {
    let variante = 'success'; // Cor verde
    if (progresso >= 80) {
      variante = 'warning'; // Cor laranja
    } else if (progresso >= 100) {
      variante = 'danger'; // Cor vermelha
    }
  
    // Concatenando as informações que queremos exibir dentro da barra
    const label = `
      ${Math.round(progresso)}%
    `;
  
    return (
      <ProgressBar
        now={progresso}
        variant={variante}
        label={label}
        style={{
          whiteSpace: 'pre-line',
          fontSize: '1rem',
          textAlign: 'center',
          color: 'black' // Cor do texto sempre preta, independentemente da cor da barra
        }}
      />
    );
  };



  export default ProgressoBar;
  
  