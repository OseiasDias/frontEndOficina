import "../../css/StylesFuncionario/cartaz.css";
import SideBarFuncionario from "./SiderBarFuncionario.jsx";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState, useEffect } from 'react';
import { FaRegClock} from 'react-icons/fa';  // Ícones de Font Awesome

import { FaEye, FaRegEdit } from "react-icons/fa";
import { BiReset } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const ProgressoBar = ({ progresso }) => {
  let variante = 'success'; // Cor verde
  if (progresso >= 40 && progresso < 70) {
    variante = 'warning'; // Cor laranja
  } else if (progresso >= 70) {
    variante = 'danger'; // Cor vermelha
  }

  return (
    <ProgressBar now={progresso} variant={variante} label={`${Math.round(progresso)}%`} />
  );
};

const Cronometro = () => {
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
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }} className="p-3">
      <h3>Cronômetro <FaRegClock size={35} className="fw-bolder" /> </h3>
      {tempoEsgotado ? (
        <p style={{ fontSize: '40px', color: 'red' }}>Tempo Esgotado!</p>
      ) : (
        <p style={{ fontSize: '40px' }}>{formatarTempo(segundos)}</p>
      )}

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


const FeedFormulario = () => {
  const [comentario, setComentario] = useState(""); // Armazenar o comentário digitado
  const [feed, setFeed] = useState([]); // Armazenar a lista de comentários no feed

  // Função para lidar com a alteração no campo de texto
  const handleInputChange = (event) => {
    setComentario(event.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (comentario.trim() === "") {
      alert("Por favor, insira um comentário!");
      return;
    }

    // Adiciona o comentário ao feed (você pode também armazenar em um banco de dados)
    setFeed((prevFeed) => [...prevFeed, comentario]);
    setComentario(""); // Limpa o campo de texto após o envio
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between">
        <h3>Avaliação técnica</h3><FaRegEdit size={25} className="editIcone" />
      </div>

      {/* Formulário de Comentário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }} className="formularioLaudo">
        <div>
          <textarea
            value={comentario}
            onChange={handleInputChange}
            rows="4"
            cols="50"
            placeholder="Digite a sua avaliação técnica..."
            style={{ padding: '10px', fontSize: '16px', width: '100%' }}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btnPublicar"
          >
            Publicar
          </button>
        </div>
      </form>

      {/* Feed de Comentários */}
      <div style={{ marginTop: '30px' }} className="mt-5">
        <h4>Comentários</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {feed.length === 0 ? (
            <p>Não há comentários ainda.</p>
          ) : (
            feed.map((comentario, index) => (
              <li key={index} style={{ margin: '10px 0', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                {comentario}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};



export default function Funcionario() {
  return (
    <div className="seccao-cartaz">
      <div className="container-fluid">
        <div className="d-flex">
        
          <SideBarFuncionario />
          

          <div className="contain  ">
            <div className="row ">
              <div className="div-feed borderKing col-lg-8 vh-100  paddingCimaBar">
                <Cronometro />
                <hr />
                <FeedFormulario />
              </div>
              <aside className="div-feed  col-lg-4  ps-4 paddingCimaBar">
                <div className="div-avalicao border p-3">
                  <h5>Avaliação técnica Feita</h5>
                  <p>
                    {`A presente avaliação técnica foi realizada com o objetivo de verificar o estado geral de conservação e funcionamento do veículo Toyota Corolla 2018, a fim de detectar eventuais defeitos ou problemas mecânicos, e garantir sua segurança e adequação ao uso.`.substring(0, 250)}...
                  </p>
                  <div className="iconesAux d-flex borderB justify-content-between">
                    <FaEye size={25} className="editIcone d-block" />
                    <FaRegEdit size={25} className="editIcone d-block" />
                  </div>


                </div>
                <hr />
                <h5>último Serviços</h5>
                <div className="div-avalicao border p-3">
                  <h5>Ordem de Serviço - Toyota Corolla 2018</h5>
                  <p>
                    A presente avaliação técnica foi realizada com o objetivo de verificar o estado geral de conservação e funcionamento do veículo Toyota Corolla 2018, a fim de detectar eventuais defeitos ou problemas mecânicos, e garantir sua segurança e adequação ao uso.
                    Serviço realizado: troca de óleo, verificação dos freios e alinhamento da suspensão.
                  </p>

                  <h6>Detalhes da Ordem de Serviço:</h6>
                  <ul>
                    <li><strong>Cliente:</strong> João da Silva</li>
                    <li><strong>Data:</strong> 27/01/2025</li>
                    <li><strong>Peças trocadas:</strong> Óleo de motor, Filtro de óleo</li>
                    <li><strong>Status:</strong> Finalizado</li>
                    <li><strong>Observações:</strong> O veículo apresenta desgaste nos discos de freio, recomendada substituição em breve.</li>
                  </ul>

                  <h6>Resumo do Diagnóstico:</h6>
                  <ul>
                    <li>Óleo de motor trocado com sucesso.</li>
                    <li>Suspensão e freios testados e alinhados.</li>
                    <li>Não foram detectados problemas maiores no motor.</li>
                  </ul>

                  <div className="iconesAux d-flex borderB justify-content-between">
                    <FaEye size={25} className="editIcone opacity-0 " />
                    <FaEye size={25} className="editIcone " />
                  </div>
                </div>

              </aside>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
