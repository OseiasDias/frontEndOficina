//Imports do Menu
import { useState } from 'react';
import { FaToolbox, FaHammer, FaCogs, FaUtensils, FaAngleUp, FaAngleDown } from 'react-icons/fa'; // Ícones de Font Awesome
import "../../css/StylesFuncionario/cartaz.css";
import { PiClockCountdownFill } from 'react-icons/pi';
import { MdDriveFileRenameOutline, MdMotionPhotosPause, MdOutlineAutoMode } from 'react-icons/md';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap'; // Importando Modal, Button e Form do react-bootstrap
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6
import axios from 'axios';
import { TbNumber } from "react-icons/tb";
import LogoType from "../../assets/lgo.png";
import ProgressoBar from "./BarraProgresso"
/* eslint-disable react/prop-types */
import "../../css/StylesFuncionario/cartaz.css";
import { useEffect } from 'react';
import { GiAutoRepair } from "react-icons/gi";
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css'; // Não se esqueça de importar o CSS do bootstrap
import { AiOutlineFieldNumber } from 'react-icons/ai'
import React, { useCallback } from 'react';




const API_URL = import.meta.env.VITE_API_URL;





const CronometroGeral = ({
  nomeMecanico,
  numeroOrdem,
  estado,
  segundosAtual,
  segundoFinal,
  tempoEsgotado: tempoEsgotadoProp,
  displayF,
}) => {

  // 3. Agora declare os estados
  const tempoLimite = segundoFinal;
  const [segundos, setSegundos] = useState(segundosAtual);
  const [tempoEsgotado, setTempoEsgotado] = useState(tempoEsgotadoProp === 1);
  const [rodando, setRodando] = useState(true);
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opcaoAtiva, setOpcaoAtiva] = useState(null);
  const [idTecnico, setIdTecnico] = useState(null);  // Estado para armazenar o idTecnico
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [message, setMessage] = useState('');
  const [ordens, setOrdens] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [erroMensagem, setErroMensagem] = useState('');
  const [numeroTecnico, setNumeroTecnico] = useState('');
  const [numeroOrdemL, setNumeroOrdem] = useState(numeroOrdem); // Estado para armazenar o número da ordem
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [segundosRemotos, setSegundosRemotos] = useState(segundosAtual);
  // eslint-disable-next-line no-unused-vars
  const [ultimaSincronizacao, setUltimaSincronizacao] = useState(null);
  const [segundoFinalRemoto, setSegundoFinalRemoto] = useState(segundoFinal);


  const handleRefresh = () => {
    window.location.reload();
  };

  const buscarSegundosAtuais = async () => {
    if (!idTecnico || !numeroOrdemL) return;
    
    try {
      const response = await axios.get(
        `${API_URL}/cronometroSegundoAtual/${idTecnico}/${numeroOrdemL}`
      );
      if (response.data && response.data.segundos_atual !== undefined) {
        setSegundosRemotos(response.data.segundos_atual);
        setUltimaSincronizacao(new Date());
      }
    } catch (error) {
      console.error("Erro ao buscar segundos atuais:", error);
    }
  };

  const buscarSegundoFinal = async () => {
    if (!idTecnico || !numeroOrdemL) return;
    
    try {
      const response = await axios.get(
        `${API_URL}/cronometroSegundoFinal/${idTecnico}/${numeroOrdemL}`
      );
      if (response.data && response.data.segundo_final !== undefined) {
        setSegundoFinalRemoto(response.data.segundo_final);
      }
    } catch (error) {
      console.error("Erro ao buscar segundo final:", error);
    }
  };

  useEffect(() => {
    // Busca inicial dos dados
    buscarSegundosAtuais();
    buscarSegundoFinal();
    
    // Configura os intervalos para sincronização periódica
    const intervaloAtual = setInterval(buscarSegundosAtuais, 90000);
    const intervaloFinal = setInterval(buscarSegundoFinal, 90000);
    
    return () => {
      clearInterval(intervaloAtual);
      clearInterval(intervaloFinal);
    };
  }, [idTecnico, numeroOrdemL]);

  // Função para salvar o tempo acumulado no banco de dados
  const salvarTempoNoBanco = async (segundosAtual, estaRodando) => {
    if (!idTecnico || !numeroOrdemL) {
      console.warn('Dados insuficientes para salvar');
      return;
    }

    console.log(`Enviando tempo acumulado: ${segundosAtual}s`, `Estado: ${estaRodando ? 'Rodando' : 'Pausado'}`);

    try {
      const data = {
        segundos_atual: segundosAtual,
        rodando: estaRodando ? 1 : 0,
        ultima_atualizacao: new Date().toISOString()
      };

      const response = await axios.put(
        `${API_URL}/cronometro/atualizar/${idTecnico}/${numeroOrdemL}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Tempo acumulado salvo:', response.data);
      localStorage.setItem(`ultimaAtualizacao-${numeroOrdem}`, Date.now());
    } catch (error) {
      console.error('Erro ao salvar tempo acumulado:', error);

      // Fallback: armazena localmente para tentar novamente depois
      const pendentes = JSON.parse(localStorage.getItem('atualizacoesPendentes') || []);
      pendentes.push({
        idTecnico,
        numeroOrdem: numeroOrdemL,
        data: {
          segundos_atual: segundosAtual,
          rodando: estaRodando ? 1 : 0
        },
        timestamp: Date.now()
      });
      localStorage.setItem('atualizacoesPendentes', JSON.stringify(pendentes));
    }
  };
  // Debounce para limitar chamadas da API (1 chamada por segundo no máximo)
  // Alterar de 3000 para 60000 (3 segundos para 60 segundos)
  // Debounce otimizado
  const debouncedSalvarTempo = useCallback(
    debounce((segundos, rodando) => {
      if (idTecnico && numeroOrdemL) {
        salvarTempoNoBanco(segundos, rodando);
      }
    }, 30000), // 30 segundos
    [idTecnico, numeroOrdemL]
  );
  //const debouncedSalvarTempo = debounce(salvarTempoNoBanco, 60000);

  debouncedSalvarTempo(segundos, rodando);

  const cache = {};

  const fetchWithCache = async (url) => {
    if (cache[url] && Date.now() - cache[url].timestamp < 30000) { // 30 segundos de cache
      return cache[url].data;
    }

    const response = await fetch(url);
    const data = await response.json();
    cache[url] = { data, timestamp: Date.now() };
    return data;
  };
  useEffect(() => {
    // Se for um novo cronômetro (sem dados no localStorage)
    if (!localStorage.getItem(`rodando-${numeroOrdem}`)) {
      const startTime = new Date().getTime();
      localStorage.setItem(`startTime-${numeroOrdem}`, startTime);
      localStorage.setItem(`rodando-${numeroOrdem}`, "true");
      setRodando(true);
      salvarTempoNoBanco(segundos, true);
    }
  }, [numeroOrdem]);


  // No useEffect principal:
  useEffect(() => {
    if (!rodando || segundos >= tempoLimite) return;

    const intervalo = setInterval(() => {
      setSegundos(prev => {
        const novoSegundos = prev + 1;

        // Salva no localStorage a cada 1 minuto
        if (novoSegundos % 60 === 0) {
          localStorage.setItem(`segundos-${numeroOrdem}`, novoSegundos);
        }

        debouncedSalvarTempo(novoSegundos, rodando);
        return novoSegundos;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [rodando, tempoLimite, debouncedSalvarTempo]);

  // Em um arquivo service-worker.js
  self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/cronometro/atualizar')) {
      event.respondWith(
        caches.open('cronometro-cache').then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => cache.match(event.request));
        })
      );
    }
  });

  // Use em vez de fetch direto
  useEffect(() => {
    fetchWithCache(`${API_URL}/cronometros/buscar/${numeroOrdemL}`)
      .then(data => setIdTecnico(data.tecnico_id))
      .catch(err => setError(err.message));
  }, [numeroOrdemL]);

  // Substituir os múltiplos useEffect por um único gerenciador
  useEffect(() => {
    let intervalo;

    const atualizarTempo = () => {
      setSegundos(prev => {
        const novoSegundos = prev + 1;

        // Salvar no localStorage a cada segundo
        localStorage.setItem(`segundos-${numeroOrdem}`, novoSegundos);

        // Salvar na API a cada 10 segundos
        if (novoSegundos % 60 === 0 && idTecnico && numeroOrdemL) {
          salvarTempoNoBanco(novoSegundos, rodando);
        }

        return novoSegundos;
      });
    };

    if (rodando && segundos < tempoLimite) {
      intervalo = setInterval(atualizarTempo, 1000);
    } else if (segundos >= tempoLimite) {
      setTempoEsgotado(true);
      salvarTempoNoBanco(segundos, false);
    }

    return () => clearInterval(intervalo);
  }, [rodando, segundos, tempoLimite, numeroOrdem, idTecnico, numeroOrdemL]);

  // No useEffect, substitua a chamada direta por:

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cronometros/buscar/${numeroOrdemL}`)
      .then((response) => {
        if (!response.ok) {
          //throw new Error("Erro ao buscar os dados");
          window.location.reload();
        }
        return response.json();
      })
      .then((data) => setIdTecnico(data.tecnico_id))
      .catch((err) => setError(err.message));
  }, []);


  const fetchIdTecnico = async () => {
    console.log('Iniciando fetchIdTecnico com numeroOrdemL:', numeroOrdemL);
    if (!numeroOrdemL) {
      console.warn('numeroOrdemL não definido');
      setErroMensagem("Por favor, insira um número de ordem válido.");
      return;
    }

    setLoading(true);
    setErroMensagem("");

    try {
      console.log('Fazendo requisição para:', `${API_URL}/cronometros/buscar/${numeroOrdemL}`);
      const response = await axios.get(`${API_URL}/cronometros/buscar/${numeroOrdemL}`);
      console.log('Resposta recebida:', response.data);
      setIdTecnico(12);
      if (response.data?.tecnico_id) {
        console.log('Técnico encontrado, ID:', response.data.tecnico_id);
        setIdTecnico(12);
        setShowSearchForm(false);
      } else {
        console.warn('Nenhum técnico encontrado para esta ordem');
        setErroMensagem("Ordem de Reparação não encontrada.");
      }
    } catch (err) {
      console.error("Erro detalhado:", err);
      setErroMensagem("Erro ao buscar OR. Verifique a conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  // Função para reiniciar o cronômetro
  const reiniciar = () => {
    setSegundos(0);
    setTempoEsgotado(false);
    setRodando(false);
    setOpcaoAtiva(null); // Limpa a opção ativa quando o cronômetro for reiniciado
    localStorage.removeItem(`segundos-${numeroOrdem}`);
    localStorage.removeItem(`rodando-${numeroOrdem}`);
    localStorage.removeItem(`startTime-${numeroOrdem}`);
  };


  // Funções estáveis
  const toggleOptionsVisibility = useCallback(() => {
    setIsOptionsVisible(prev => !prev);
  }, []);

  // Substituir múltiplos useEffect por um único gerenciador de estado
// Substitua TODOS os useEffect relacionados ao carregamento inicial por este único:

useEffect(() => {
  // 1. Inicializar como rodando por padrão
  setRodando(true);
  
  // 2. Carregar estado do localStorage se existir
  const tempoSalvo = localStorage.getItem(`segundos-${numeroOrdem}`);
  const estadoRodandoSalvo = localStorage.getItem(`rodando-${numeroOrdem}`);
  const startTimeSalvo = localStorage.getItem(`startTime-${numeroOrdem}`);

  // 3. Restaurar valores salvos
  if (tempoSalvo) {
    setSegundos(parseInt(tempoSalvo));
  }

  // 4. Se havia um estado salvo, respeitar esse estado
  if (estadoRodandoSalvo !== null) {
    setRodando(estadoRodandoSalvo === "true");
  }

  // 5. Se estava rodando, calcular tempo decorrido
  if (estadoRodandoSalvo === "true" && startTimeSalvo) {
    const currentTime = new Date().getTime();
    const tempoDecorrido = Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000);
    setSegundos(prev => prev + tempoDecorrido);
  }

  // 6. Salvar o estado inicial como rodando se for um novo cronômetro
  if (estadoRodandoSalvo === null) {
    const startTime = new Date().getTime();
    localStorage.setItem(`startTime-${numeroOrdem}`, startTime);
    localStorage.setItem(`rodando-${numeroOrdem}`, "true");
  }

  // 7. Buscar dados do técnico
  const fetchTecnicoData = async () => {
    try {
      const data = await fetchWithCache(`${API_URL}/cronometros/buscar/${numeroOrdemL}`);
      setIdTecnico(data.tecnico_id);
    } catch (err) {
      console.error("Erro ao buscar técnico:", err);
    }
  };
  fetchTecnicoData();
}, [numeroOrdem, numeroOrdemL]);

  // Substituir múltiplos useEffect por um único gerenciador de estado
  useEffect(() => {
    // Carregar estado inicial
    const loadInitialState = () => {
      const tempoSalvo = localStorage.getItem(`segundos-${numeroOrdem}`);
      const estadoRodandoSalvo = localStorage.getItem(`rodando-${numeroOrdem}`);
      const startTimeSalvo = localStorage.getItem(`startTime-${numeroOrdem}`);

      if (tempoSalvo) setSegundos(parseInt(tempoSalvo));
      setRodando(estadoRodandoSalvo === "true");

      if (startTimeSalvo && estadoRodandoSalvo === "true") {
        const currentTime = Date.now();
        setSegundos(prev => prev + Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000));
      }
    };

    // Buscar dados do técnico
    const fetchTecnicoData = async () => {
      try {
        const data = await fetchWithCache(`${API_URL}/cronometros/buscar/${numeroOrdemL}`);
        setIdTecnico(data.tecnico_id);
      } catch (err) {
        console.error("Erro ao buscar técnico:", err);
      }
    };

    loadInitialState();
    fetchTecnicoData();
  }, [numeroOrdem, numeroOrdemL]);
  
  // Função para formatar o tempo
  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    
    return `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes}`;
  };

  // Função para buscar o funcionário
  useEffect(() => {
    const fetchFuncionarioData = async () => {
      setLoading(true);
      try {

        // Requisições com retry


        const response = await retryRequest(() => axios.get(`${API_URL}/funcionarios/${nomeMecanico}`));
        setFuncionario(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Erro ao carregar dados do funcionário");
        handleRefresh();
      } finally {
        setLoading(false);
      }
    };

    if (nomeMecanico) fetchFuncionarioData();
  }, [nomeMecanico]);

  const navigate = useNavigate();

  if (loading) {
    navigate("/homeFuncionario");
  }

  if (error) {
    return <div>{error}</div>;
  }



  const retryRequest = async (requestFn, retries = 3, delay = 1000) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await requestFn();
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Espera antes de tentar novamente (backoff exponencial)
          const retryAfter = error.response.headers['retry-after'] || delay;
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000)); // espera pelo tempo especificado (em segundos)
          attempt += 1;
          delay *= 2; // aumenta o delay a cada tentativa
        } else {
          throw error; // se o erro não for 429, lança o erro original
        }
      }
    }
    throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
  };




  // Função para alternar o estado "rodando" (iniciar ou pausar)
  const iniciarPausar = (opcao) => {
    const novoEstadoRodando = !rodando;
    
    // Atualizar estado imediatamente
    setRodando(novoEstadoRodando);
    
    // Atualizar opção ativa
    setOpcaoAtiva(opcaoAtiva === opcao ? null : opcao);
  
    // Gerenciar localStorage
    if (novoEstadoRodando) {
      const startTime = new Date().getTime();
      localStorage.setItem(`startTime-${numeroOrdem}`, startTime);
      localStorage.setItem(`rodando-${numeroOrdem}`, "true");
    } else {
      localStorage.removeItem(`startTime-${numeroOrdem}`);
      localStorage.setItem(`rodando-${numeroOrdem}`, "false");
    }
  
    // Salvar no banco de dados
    salvarTempoNoBanco(segundos, novoEstadoRodando);
  };


  // Função para limpar todos os dados de todos os cronômetros no localStorage
  const limparTodosOsCronometros = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('segundos-') || key.startsWith('rodando-') || key.startsWith('startTime-')) {
        localStorage.removeItem(key);
      }
    });

    setSegundos(0);
    setRodando(false);
    setTempoEsgotado(false);
  };
  const classNameValor = displayF;


  /**========================== DADOS NOVOS =========================== **/

  const abrirConfirmModal = () => setShowConfirmModal(true);
  // Função para buscar o funcionário pelo número do técnico
  const buscarFuncionarioPorNumero = async () => {
    if (!numeroTecnico) {
      setErroMensagem("Por favor, insira um número de técnico.");
      return;
    }

    setErroMensagem(""); // Limpa qualquer mensagem de erro anterior

    try {
      // Fazendo a requisição para o backend Laravel
      const response = await axios.get(`${API_URL}/funcionariosIdReturn/id/${numeroTecnico}`);

      // Verificar se a resposta contém o id do funcionário
      if (response.data && response.data.id) {
        setFuncionarioId(response.data.id);
      } else {
        setErroMensagem("Funcionário não encontrado.");
      }
    } catch (err) {
      // Se o erro for de rede ou outro erro de comunicação
      if (err.response) {
        // O servidor respondeu com um código de erro
        setErroMensagem(`Erro ao buscar dados do funcionário: ${err.response.statusText}`);
      } else if (err.request) {
        // A requisição foi feita mas não houve resposta
        setErroMensagem("Erro de rede: O servidor não respondeu.");
      } else {
        // Outro tipo de erro
        setErroMensagem("Erro desconhecido.");
      }

      console.error("Erro ao buscar funcionário: ", err);
    }
  };




  // Função para iniciar ou pausar o cronômetro de uma ordem específica
  const iniciarPausarAux = (numeroOrdemL) => {
    const novasOrdens = ordens.map((ordem) => {
      if (ordem.numeroOrdem === numeroOrdemL) {
        return {
          ...ordem,
          rodando: !ordem.rodando, // Alterna o estado "rodando" da ordem
        };
      }
      return 1;
    });
    setOrdens(novasOrdens); // Atualiza o estado com a ordem alterada
  };


  // Método para atualizar o estado, chamando o endpoint
  const atualizarEstado = async () => {
    const data = {
      "estado": "Em andamento",
      "segundos_atual": segundos,
      "rodando": idTecnico
    }
      ;

    try {
      // Realizando a requisição para atualizar o estado
      const response = await fetch(`${API_URL}/ordem-de-reparacao-cronometro-tecnicos/update-estado/${idTecnico}/${numeroOrdemL}`, {
        method: 'PUT', // ou 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Verificando se a resposta foi bem-sucedida
      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const result = await response.json();
        setMessage('Estado atualizado com sucesso!');
      } else {
        const error = await response.json();
        setMessage(error.message || 'Erro ao atualizar estado');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // Tratando erros de comunicação com o servidor
      setMessage('Erro ao se comunicar com o servidor');
    }
  };



  // Método para comparar os IDs
  const compararIds = async () => {
    if (idTecnico === funcionarioId) {
      // Chama o método de atualização se os IDs forem iguais
      await atualizarEstado(); // Chama a função de atualizar estado
      iniciarPausarAux(numeroOrdemL);
      // setMessage(`Os IDs são iguais. Estado será atualizado para ID: ${idTecnico}`);
    } else {
      setMessage(`Os IDs são diferentes. Nenhuma atualização foi realizada.`);
    }
  };



  // Manipulador de clique do botão
  const handleClicker = async () => {
    await buscarFuncionarioPorNumero(); // Chama a função de busca e espera a resposta
    compararIds(); // Só chama compararIds depois da busca
  };


  // Função para fechar o modal e reiniciar os estados
  const fecharModal = () => {

    setShowConfirmModal(false);
    //Reinicia os estados para a primeira parte do modal
    //setNumeroOrdem("");
    //setNumeroTecnico("");
    //setIdTecnico(null);
    //setFuncionarioId(null);
    //setErroMensagem("");
    //setErroMensagem(""); // Limpar mensagens de erro anteriores
    setShowSearchForm(true); // Volta para o formulário da Ordem de Reparação

  };





  /**============================================================== **/
  return (
    <>
      <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }} className="p-0  backFundo w-100">
        <button className='' onClick={limparTodosOsCronometros}>Limpar</button>
        <div className="d-flex pt-2 justify-content-between">
          <div className="estado text-start d-flex flex-column">
            <div className="d-flex align-items-center">
              <AiOutlineFieldNumber fontSize={25} className="me-2" />
              <h6><b>{numeroOrdem}</b></h6>
            </div>
            <div className="d-flex align-items-center mt-2">
              <div className="divLeft">
                <h6 className={classNameValor}>

                  <MdDriveFileRenameOutline fontSize={20} className="me-2" />
                  {loading ? "Carregando... " : (funcionario ? `${funcionario.nome} ${funcionario.sobrenome}` : "Funcionário não encontrado")}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </h6>

              </div>
              <div className='divRight'>
                <h6><MdOutlineAutoMode fontSize={20} className="me-2" />{estado}</h6>

              </div>
            </div>
          </div>
          <div className="oclock">
            {/* Botão para alternar a visibilidade das opções */}

            <h5 className="d-flex">
              <PiClockCountdownFill size={30} className="fw-bolder mt-1 me-2" />
              {tempoEsgotado ? (
                <p style={{ fontSize: "22px", color: "red" }}>Tempo Esgotado!</p>
              ) : (
                <p style={{ fontSize: "30px" }}>{formatarTempo(segundos)}



                </p>
              )}
            </h5>


          </div>
        </div>


        <div className="row pb-3  ">
          <div className="col-11 py-1">
            <ProgressoBar progresso= {segundosRemotos} segundoFinal={segundoFinalRemoto} numeroOrdem={numeroOrdem} />
           

            {/**segundosAtual
             *             <ProgressoBar progresso={(segundos / tempoLimite) * 100} numeroOrdem={numeroOrdem} />

            */}

          </div>
          <button onClick={toggleOptionsVisibility} className='col-1 setasDesign  p-0  text-white d-block ms-auto' style={{ padding: "0", margin: "0", backgroundColor: "#00000000", border: "0" }}>
            {isOptionsVisible ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        
        </div>
        {/* Opções com visibilidade controlada */}


        <div className={`row justify-content-between pb-2 mt-1 ${isOptionsVisible ? "" : "d-none"}`}>
          <div className={`col-6 col-lg-3 col-md-4 ${tempoEsgotado || (opcaoAtiva && opcaoAtiva !== 'almoco') ? 'd-none' : ''}`}>
            <button
              className="d-block"
              onClick={() => iniciarPausar('almoco')}
              style={{ padding: "0", margin: "0", backgroundColor: "#00000000", border: "0" }}
            >
              <span className="text-white">Almoço &nbsp;</span>
              {rodando ? <FaUtensils color="#fff" fontSize={25} /> : <MdMotionPhotosPause size={25} color="#fff" />}
            </button>
          </div>

          <div className={`col-6 col-lg-3 col-md-4 ${tempoEsgotado || (opcaoAtiva && opcaoAtiva !== 'manutencao') ? 'd-none' : ''}`}>
            <button
              className="d-block"
              onClick={() => iniciarPausar('manutencao')}
              style={{ padding: "0", margin: "0", backgroundColor: "#00000000", border: "0" }}
            >
              <span className="text-white">Manutenção e limpeza &nbsp;</span>
              {rodando ? <FaCogs color="#fff" fontSize={25} /> : <MdMotionPhotosPause size={25} color="#fff" />}
            </button>
          </div>


          <div className={`col-6 col-lg-3 col-md-4 ${tempoEsgotado || (opcaoAtiva && opcaoAtiva !== 'aguardar') ? 'd-none' : ''}`}>
            <button
              onClick={reiniciar}
              style={{ padding: "0", margin: "0" }}
              className={`btnReset d-non mx-2 ${opcaoAtiva === 'aguardar' ? 'active' : ''}`}
            >
              <span className="text-white">Aguardar Trabalho &nbsp;</span>
              {rodando ? <FaToolbox color="#fff" fontSize={25} /> : <MdMotionPhotosPause size={25} color="#fff" />}
            </button>
          </div>

          <div className={`col-6 col-lg-3 col-md-4 ${tempoEsgotado || (opcaoAtiva && opcaoAtiva !== 'terminar') ? 'd-none' : ''}`}>
            <button
              className="d-block"
              //onClick={() => iniciarPausar('terminar')}
              onClick={abrirConfirmModal}
              style={{ padding: "0", margin: "0", backgroundColor: "#00000000", border: "0" }}
            >
              <span className="text-white">Terminar o serviço &nbsp;</span>
              {rodando ? <FaHammer color="#fff" fontSize={25} /> : <MdMotionPhotosPause size={25} color="#fff" />}
            </button>
          </div>
        </div>

      </div>


      <div className="modais">
        {/* Modal para solicitar o número identificador do técnico */}
        <Modal scrollable show={showConfirmModal} onHide={fecharModal}>

          <Modal.Header closeButton>
            <Modal.Title>{showSearchForm ? 'Buscar Reparação a Terminar' : 'Insira o número de Técnico'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showSearchForm ? (
              <Form>
                <Form.Group className="mb-3" controlId="formNumeroOrdem">
                  <Form.Label>Número da Ordem de Reparação</Form.Label>
                  {erroMensagem && (
                    <Alert variant="danger my-2">{erroMensagem}</Alert>
                  )}
                  <div className="input-group">
                    <span className="input-group-text">
                      <GiAutoRepair fontSize={20} color="#0070fa" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Digite o número da ordem"
                      value={numeroOrdemL}
                      onChange={(e) => setNumeroOrdem(e.target.value)}
                      disabled
                    />
                    <Button
                      variant="primary"
                      onClick={fetchIdTecnico}
                      className="d-block py-1 ms-auto"
                      disabled={loading || !numeroOrdemL}
                    >
                      {loading ? <Spinner /> : "Avançar"}

                    </Button>
                  </div>
                </Form.Group>
              </Form>
            ) : (
              <div>
                <Form.Group className="mb-3" controlId="formNumeroTecnico">
                  <Form.Label>Número do Técnico</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <TbNumber fontSize={20} color="#0070fa" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Digite o número do técnico"
                      value={numeroTecnico}
                      onChange={(e) => setNumeroTecnico(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={handleClicker}
                      className="btn"

                      disabled={!numeroTecnico}
                    >
                      Buscar
                    </Button>

                  </div>
                </Form.Group>
                {message && <p>{message}</p>}

                <div>
                  <h3>Funcionário encontrado! ID: {idTecnico}</h3>
                </div>
                {funcionarioId && (
                  <div>
                    <h3>Funcionário encontrado! ID: {funcionarioId}</h3>
                  </div>
                )}

              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between align-items-center">
            <img src={LogoType} alt="..." className='d-block mx-auto ' width={250} height={70} />
          </Modal.Footer>
        </Modal>





      </div>
    </>


  );
};


export default React.memo(CronometroGeral);