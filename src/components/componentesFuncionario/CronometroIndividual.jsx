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

import 'bootstrap/dist/css/bootstrap.min.css'; // Não se esqueça de importar o CSS do bootstrap

import { AiOutlineFieldNumber } from 'react-icons/ai'




const CronometroIndividual = ({
  nomeMecanico,
  numeroOrdem,
  estado,
  segundosAtual,
  segundoFinal,
  tempoEsgotado: tempoEsgotadoProp,
  displayF,


}) => {
  const tempoLimite = segundoFinal;
  const [segundos, setSegundos] = useState(segundosAtual); // Inicia o cronômetro com o valor salvo
  const [tempoEsgotado, setTempoEsgotado] = useState(tempoEsgotadoProp === 1);
  const [rodando, setRodando] = useState(true); // Inicialmente, o cronômetro está parado
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opcaoAtiva, setOpcaoAtiva] = useState(null); // Estado para controlar a opção ativa

  //OUtras Variaveis
  const [idTecnico, setIdTecnico] = useState(null);  // Estado para armazenar o idTecnico
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [message, setMessage] = useState('');
  const [ordens, setOrdens] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar a visibilidade da modal de confirmação para "Terminar o Serviço"
  const [showSearchForm, setShowSearchForm] = useState(true); // Controle para alternar entre a tela de busca e a de confirmação
  const [erroMensagem, setErroMensagem] = useState('');
  const [numeroTecnico, setNumeroTecnico] = useState(''); // Estado para armazenar o número do técnico
  const [numeroOrdemL, setNumeroOrdem] = useState(numeroOrdem); // Estado para armazenar o número da ordem


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




  const fetchIdTecnico = async () => {
    setLoading(true);
    setErroMensagem(""); // Limpar mensagens de erro anteriores

    try {
      // Fazendo a requisição para o backend Laravel
      const response = await axios.get(`http://127.0.0.1:8000/api/ordem-de-reparacao-cronometro-tecnicos/ordemNumero/${numeroOrdemL}`);

      // Verificar se a resposta contém dados do idTecnico
      if (response.data && response.data.idTecnico) {
        setIdTecnico(response.data.idTecnico);
        setShowSearchForm(false); // Se encontrado, mudar para a parte de inserção do número do técnico
      } else {
        setErroMensagem("Ordem de Reparação não encontrada.");
      }
    } catch (err) {
      setErroMensagem("Erro ao buscar OR.Tente novamente.");
      console.error("Erro ao buscar dados: ", err);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };
  const handleRefresh = () => {
    window.location.reload();
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

  // Estado para controlar a visibilidade da div
  const [isOptionsVisible, setIsOptionsVisible] = useState(false); // Inicialmente oculta

  // Função para alternar a visibilidade da div
  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev);
  };
  // Efeito para carregar o tempo e o estado de "rodando" do localStorage
  useEffect(() => {
    const tempoSalvo = localStorage.getItem(`segundos-${numeroOrdem}`);
    const estadoRodandoSalvo = localStorage.getItem(`rodando-${numeroOrdem}`);
    const startTimeSalvo = localStorage.getItem(`startTime-${numeroOrdem}`);

    if (tempoSalvo) {
      setSegundos(parseInt(tempoSalvo));
    }

    if (estadoRodandoSalvo === "true") {
      setRodando(true);
    }

    if (startTimeSalvo) {
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000);
      setSegundos((prevSegundos) => prevSegundos + timeDifference);
    }
  }, [numeroOrdem]);

  // Efeito para garantir que o cronômetro continue funcionando
  useEffect(() => {
    let intervalo;
    if (rodando && segundos < tempoLimite) {
      intervalo = setInterval(() => {
        setSegundos((prevSegundos) => {
          const novoSegundos = prevSegundos + 1;
          localStorage.setItem(`segundos-${numeroOrdem}`, novoSegundos);
          return novoSegundos;
        });
      }, 1000);
    } else if (segundos >= tempoLimite) {
      setTempoEsgotado(true);
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [rodando, segundos, tempoLimite, numeroOrdem]);

  useEffect(() => {
    const tempoSalvo = localStorage.getItem(`segundos-${numeroOrdem}`);
    const estadoRodandoSalvo = localStorage.getItem(`rodando-${numeroOrdem}`);
    const startTimeSalvo = localStorage.getItem(`startTime-${numeroOrdem}`);
    
    if (tempoSalvo) {
      setSegundos(parseInt(tempoSalvo));
    }

    // Verifica se o cronômetro estava rodando antes de recarregar
    if (estadoRodandoSalvo === "true") {
      setRodando(true);
    } else if (estadoRodandoSalvo === "false") {
      setRodando(false); // Se estava pausado, não retome a contagem
    }

    // calcule o tempo já passado
    if (startTimeSalvo && estadoRodandoSalvo === "true") {
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000);
      setSegundos((prevSegundos) => prevSegundos + timeDifference);
    }
  }, [numeroOrdem]);

  // Função para formatar o tempo
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos < 10 ? "0" + minutos : minutos}:${segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes}`;
  };

  // Função para buscar o funcionário
  useEffect(() => {
    const fetchFuncionarioData = async () => {
      setLoading(true);
      try {

        const response = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/funcionarios/${nomeMecanico}`));
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


  // Função para alternar o estado "rodando" (iniciar ou pausar)
  const iniciarPausar = (opcao) => {
    if (opcaoAtiva === opcao) {
      setOpcaoAtiva(null); // Se a opção clicada já estiver ativa, desmarque
      setRodando(false);
    } else {
      setOpcaoAtiva(opcao); // Marca a opção clicada
    }
    setRodando((prev) => !prev); ((prev) => !prev);
    if (!rodando) {
      const startTime = new Date().getTime();
      localStorage.setItem(`startTime-${numeroOrdem}`, startTime);
      localStorage.setItem(`rodando-${numeroOrdem}`, "true");
    } else {
      localStorage.removeItem(`startTime-${numeroOrdem}`);
      localStorage.setItem(`rodando-${numeroOrdem}`, "false");
    }
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
      const response = await axios.get(`http://127.0.0.1:8000/api/funcionariosIdReturn/id/${numeroTecnico}`);

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
      "estado": "Terminado",
      "segundos_atual": segundos,
      "rodando": 0
    }
      ;

    try {
      // Realizando a requisição para atualizar o estado
      const response = await fetch(`http://127.0.0.1:8000/api/ordem-de-reparacao-cronometro-tecnicos/update-estado/${idTecnico}/${numeroOrdemL}`, {
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

  // Função para lidar com o envio do número do técnico
  /*const handleSubmitTecnico = (e) => {
    e.preventDefault();
    alert(`Número do técnico: ${numeroTecnico}`);
    fecharModalTecnico(); // Fechar a modal após o envio
  };*/

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
        <button onClick={limparTodosOsCronometros} className='d-none'>limpar</button>
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
                  {loading ? "Carregando... " : (funcionario ? `${funcionario.nome} ${funcionario.sobrenome} ` : "Funcionário não encontrado")}
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
                <p style={{ fontSize: "30px" }}>{formatarTempo(segundos)}</p>
              )}
            </h5>


          </div>
        </div>


        <div className="row pb-3  ">
          <div className="col-11 py-1">
            <ProgressoBar progresso={(segundos / tempoLimite) * 100} numeroOrdem={numeroOrdem} />
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


export default CronometroIndividual;