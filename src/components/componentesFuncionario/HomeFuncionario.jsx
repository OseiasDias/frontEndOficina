import "../../css/StylesFuncionario/cartaz.css";
import SideBarFuncionario from "./SiderBarFuncionario.jsx";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState, useEffect } from 'react';
import { FaRegClock} from 'react-icons/fa';  // Ícones de Font Awesome

import { BiReset } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const ProgressoBar = ({ progresso }) => {
  let variante = 'success'; // Cor verde
  if (progresso >= 80 ) {
    variante = 'warning'; // Cor laranja
  } else if (progresso >= 100) {
    variante = 'danger'; // Cor vermelha
  }

  return (
    <ProgressBar now={progresso} variant={variante} label={`${Math.round(progresso)}%`} />
  );
};

const Cronometro = ({nomeMecanico,numeroOrdem,estado}) => {
  const tempoLimite = 6000; // 100 minutos = 6000 segundos
  const [segundos, setSegundos] = useState(0); // Contador de segundos
  const [rodando, setRodando] = useState(false); // Estado que define se o cronômetro está rodando
  const [tempoEsgotado, setTempoEsgotado] = useState(false); // Estado para indicar se o tempo esgotou

  // Função para iniciar ou pausar o cronômetro
  const iniciarPausar = () => {
    setRodando(!rodando); // Alterna entre rodando e pausado
  };

  // Função para reiniciar o cronômetro
  const reiniciar = () => {
    setSegundos(0);
    setRodando(false);
    setTempoEsgotado(false); // Reseta o estado de tempo esgotado
    localStorage.removeItem('segundos'); // Limpa o valor do tempo salvo
    localStorage.removeItem('rodando'); // Limpa o estado de "rodando"
    localStorage.removeItem('startTime'); // Limpa o timestamp de início
  };

  // Efeito para carregar o tempo salvo e o estado de "rodando" do localStorage
  useEffect(() => {
    const tempoSalvo = localStorage.getItem('segundos');
    const estadoRodandoSalvo = localStorage.getItem('rodando');
    const startTimeSalvo = localStorage.getItem('startTime');

    if (tempoSalvo) {
      setSegundos(parseInt(tempoSalvo)); // Recupera o tempo salvo
    }
    if (estadoRodandoSalvo === 'true') {
      setRodando(true); // Recupera o estado de "rodando"
    }

    // Se houver um tempo de início salvo e a contagem estiver rodando
    if (startTimeSalvo) {
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000); // Calcular a diferença em segundos
      setSegundos((prevSegundos) => prevSegundos + timeDifference); // Atualiza o tempo com a diferença calculada
    }

  }, []); // Executa apenas uma vez ao montar o componente

  // Efeito para atualizar o estado de "rodando" no localStorage
  useEffect(() => {
    localStorage.setItem('rodando', rodando.toString());
  }, [rodando]);

  // Efeito para garantir que o cronômetro continue funcionando em segundo plano
  useEffect(() => {
    let intervalo;

    // Se o cronômetro estiver rodando, inicie o intervalo
    if (rodando && segundos < tempoLimite) {
      // Salva o timestamp atual
      localStorage.setItem('startTime', new Date().getTime().toString());

      intervalo = setInterval(() => {
        setSegundos(prevSegundos => {
          const novoSegundos = prevSegundos + 1;
          localStorage.setItem('segundos', novoSegundos); // Salva o tempo no localStorage
          return novoSegundos;
        });
      }, 1000);
    } else if (segundos >= tempoLimite) {
      setTempoEsgotado(true); // Define que o tempo esgotou
      clearInterval(intervalo); // Para o cronômetro ao atingir o tempo limite
    }

    return () => clearInterval(intervalo); // Limpa o intervalo ao desmontar o componente
  }, [rodando, segundos]); // Reexecuta sempre que o estado de "rodando" ou "segundos" mudar

  // Função para formatar o tempo no formato mm:ss
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos < 10 ? '0' + minutos : minutos}:${segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes}`;
  };

  // Calculando o progresso da barra (porcentagem)
  const progresso = (segundos / tempoLimite) * 100;

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }} className="p-3 w-100">
      <hr />
     <div className="d-flex justify-content-between">
  
      <div className="estado text-start">
         <h5><b>Nº de OR:</b> {numeroOrdem}</h5>
         <h5><b>Nome Técnico:</b>{nomeMecanico}</h5>
         <h5><b>Estado:</b> {estado}</h5>

      </div>

      <div className="oclock">
      <h3>Cronômetro <FaRegClock size={35} className="fw-bolder" /> </h3>
      {tempoEsgotado ? (
        <p style={{ fontSize: '40px', color: 'red' }}>Tempo Esgotado!</p>
      ) : (
        <p style={{ fontSize: '40px' }}>{formatarTempo(segundos)}</p>
      )}

      </div>
     </div>
     
      {/* Barra de progresso */}
      <ProgressoBar progresso={progresso} />

      <div>
        <button onClick={iniciarPausar} style={{ padding: '10px 20px', margin: '5px' }} disabled={tempoEsgotado}>
          {rodando ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={reiniciar} style={{ padding: '10px 20px', margin: '5px' }}  className="btnReset">
        <BiReset size={40} color="#fff"/>
        </button>
      </div>
    </div>
  );
};



/**Feed */





export default function Funcionario() {
  return (
    <div className="seccao-cartaz">
      <div className="container-fluid">
        <div className="d-flex">
        
          <SideBarFuncionario />
          

          <div className="container-fluid ">
            <div className="row">
              <div className="div-feed borderKing col-lg-12 vh-100 h-100 padingCimaBar">
                <Cronometro nomeMecanico="Felipe Jose" numeroOrdem="OR0012" estado="Repando" />
                <Cronometro nomeMecanico="Paulo Assis , Mario Rosa" numeroOrdem="OR0011" estado="Repando"/>
                <Cronometro nomeMecanico="Emanuel Dias" numeroOrdem="OR0015" estado="Repando"/>
                <Cronometro nomeMecanico="Abel Moreno" numeroOrdem="OR003" estado="Repando"/>
                <Cronometro nomeMecanico="Paulo de Melo" numeroOrdem="OR0022" estado="Repando"/>
                <hr />
              
              </div>
           

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
