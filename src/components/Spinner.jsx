// Spinner.js
import "../css/spinner.css"; // Adicionar estilos

const SpinnerFill = () => {
  return (
    
      <div className="spinner-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="250"
          viewBox="0 0 100 100"
          className="gear-spinner"
        >
          <g transform="translate(50,50)">
            <g transform="translate(-50,-50)">
              <path
                fill="#ddd"
                d="M50 30a20 20 0 1 0 0 40 20 20 0 1 0 0-40zm-10 35v-2.5h3.9l1.2-3-3-2.2v-2.5h3.9l1.2-3-3-2.2v-2.5h3.9l1.2-3-3-2.2v-2.5h6v2.5l-3 2.2 1.2 3h3.9v2.5l-3 2.2 1.2 3h3.9v2.5l-3 2.2 1.2 3h-6v-2.5l3-2.2-1.2-3H40z"
              />
            </g>
          </g>
        </svg>
      </div>
    
  );
};

export default SpinnerFill;

/*
import './spinner.css'; // Crie um arquivo CSS para o estilo

const Spinner = () => {
  return <div className="loader"></div>;
};

export default Spinner;*/
