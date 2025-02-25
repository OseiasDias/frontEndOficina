//Imports do Menu

import { useState } from 'react';
import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaBook, FaClipboard } from 'react-icons/fa'; // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiClockCountdownFill, PiSignOutBold } from 'react-icons/pi';
import LogoSmall from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import { MdContentPasteSearch, MdDriveFileRenameOutline, MdMotionPhotosPause, MdOutlineAutoMode, MdOutlineNotStarted, MdPersonSearch } from 'react-icons/md';
import { Modal, Button, Form, Alert } from 'react-bootstrap'; // Importando Modal, Button e Form do react-bootstrap
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6
import { SiCcleaner } from "react-icons/si";
import axios from 'axios';
import { TbNumber, TbPlayerTrackNextFilled } from "react-icons/tb";
import LogoType from "../../assets/lgo.png";

/* eslint-disable react/prop-types */
import "../../css/StylesFuncionario/cartaz.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect } from 'react';
import { BiReset } from "react-icons/bi";

import { GiAutoRepair } from "react-icons/gi";

import logotipo from "../../assets/lgo.png";
import imgErro from "../../assets/error.webp";
import imgN from "../../assets/not-found.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css'; // Não se esqueça de importar o CSS do bootstrap
import { IoMdPerson } from 'react-icons/io';
import { FaCheckDouble } from 'react-icons/fa';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { CgCloseO } from 'react-icons/cg';
import { AiOutlineFieldNumber } from 'react-icons/ai';




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


const Cronometro = ({
  nomeMecanico,
  numeroOrdem,
  estado,
  segundosAtual,
  segundoFinal,
  tempoEsgotado: tempoEsgotadoProp,
}) => {
  const tempoLimite = segundoFinal;
  const [segundos, setSegundos] = useState(segundosAtual); // Inicia o cronômetro com o valor salvo
  const [tempoEsgotado, setTempoEsgotado] = useState(tempoEsgotadoProp === 1);
  const [rodando, setRodando] = useState(true); // Inicialmente, o cronômetro está parado
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para reiniciar o cronômetro
  const reiniciar = () => {
    setSegundos(0);
    setTempoEsgotado(false);
    setRodando(false);
    localStorage.removeItem(`segundos-${numeroOrdem}`);
    localStorage.removeItem(`rodando-${numeroOrdem}`);
    localStorage.removeItem(`startTime-${numeroOrdem}`);
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

    // Caso haja tempo salvo e o cronômetro já estava rodando antes do reload,
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
        const response = await axios.get(`http://127.0.0.1:8000/api/funcionarios/${nomeMecanico}`);
        setFuncionario(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Erro ao carregar dados do funcionário");
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
  const iniciarPausar = () => {
    setRodando((prev) => !prev);
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

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }} className="p-3 w-100">
      <hr />
      <div className="d-flex justify-content-between">
        <div className="estado text-start d-flex flex-column">
          <div className="d-flex align-items-center">
            <AiOutlineFieldNumber fontSize={25} className="me-2" />
            <h6><b>{numeroOrdem}</b></h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="divLeft">
              <h6>
                <MdDriveFileRenameOutline fontSize={20} className="me-2" />
                {loading ? "Carregando..." : (funcionario ? `${funcionario.nome} ${funcionario.sobrenome}` : "Funcionário não encontrado")}
              </h6>            </div>
            <div className='divRight ms-3'>
              <h6> <MdOutlineAutoMode fontSize={20} className="me-2" />{estado}</h6>
            </div>
          </div>
        </div>
        <div className="oclock">
          <h5 className="d-flex">
            <PiClockCountdownFill size={30} className="fw-bolder mt-1 me-2" />
            {tempoEsgotado ? (
              <p style={{ fontSize: "30px", color: "red" }}>Tempo Esgotado!</p>
            ) : (
              <p style={{ fontSize: "30px" }}>{formatarTempo(segundos)}</p>
            )}
          </h5>
        </div>
      </div>
      <ProgressoBar progresso={(segundos / tempoLimite) * 100} numeroOrdem={numeroOrdem} />
      <div className="d-flex justify-content-center mt-3 ">
        <button onClick={iniciarPausar} style={{ padding: "0", margin: "0", backgroundColor: "#00000000", border: "0" }} disabled={tempoEsgotado}>
          {rodando ? <MdMotionPhotosPause size={25} color="#fff" /> : <MdOutlineNotStarted color='#fff' fontSize={25} />}
        </button>
        <button onClick={reiniciar} style={{ padding: "0", margin: "0" }} className="btnReset mx-2">
          <BiReset size={25} color="#fff" />
        </button>

        <SiCcleaner className='ms-auto' onClick={limparTodosOsCronometros} />
      </div>
    </div>
  );
};









export default function Funcionario({ display, displayF }) {
  // Estado para armazenar as ordens de serviço com o cronômetro iniciando automaticamente

  const [ordens, setOrdens] = useState([]);
  const [numeroOrdem, setNumeroOrdem] = useState(''); // Estado para armazenar o número da ordem
  const [showSearchForm, setShowSearchForm] = useState(true); // Controle para alternar entre a tela de busca e a de confirmação
  //const [cronometroData, setCronometroData] = useState(null);
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [erroMensagem, setErroMensagem] = useState('');
  // Função para buscar os dados da API
  useEffect(() => {
    const fetchCronometros = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/cronometros");
        const data = await response.json();

        // Filtrando os cronômetros que não terminaram (segundos_atual < segundos_final)
        const ordensFiltradas = data.filter(cronometro => cronometro.segundos_atual < cronometro.segundo_final)
          .map(cronometro => ({
            idTecnico: cronometro.tecnico_id,  // Ou nome real, se disponível
            numeroOrdem: cronometro.numero_or,
            estado: cronometro.estado,
            rodando: cronometro.rodando === 1, // Se "rodando" for 1, consideramos como verdadeiro
            segundosAtuais: cronometro.segundos_atual, // segundos atuais
            segundosFinais: cronometro.segundo_final // segundos finais
          }));

        // Atualizando o estado com os dados filtrados
        setOrdens(ordensFiltradas);
      } catch (error) {
        console.error("Erro ao buscar os cronômetros", error);
      }
    };

    fetchCronometros();
  }, []);  // O array vazio [] garante que a função seja chamada uma vez após o componente ser montado

  const navigate = useNavigate(); // Hook para navegação


  // Função para adicionar uma nova ordem de serviço e cronômetro
  const adicionarOrdem = (numeroOrdem) => {
    const novaOrdem = {
      numeroOrdem,
      estado: "Reparando",
      rodando: true, // Inicia o cronômetro automaticamente
      segundosAtuais: 0, // Inicia do zero
      segundosFinais: 3600, // Define um tempo limite padrão
    };
    setOrdens([...ordens, novaOrdem]);
  };

  // Função para iniciar ou pausar o cronômetro de uma ordem específica
  const iniciarPausar = (numeroOrdem) => {
    const novasOrdens = ordens.map((ordem) => {
      if (ordem.numeroOrdem === numeroOrdem) {
        return {
          ...ordem,
          rodando: !ordem.rodando, // Alterna o estado "rodando" da ordem
        };
      }
      return 1;
    });
    setOrdens(novasOrdens); // Atualiza o estado com a ordem alterada
  };

  //========================================|CONFIGURACOES DO MENU ASIDE|===================================================

  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal de OR
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar a visibilidade da modal de confirmação para "Terminar o Serviço"
  const [showLimpezaModal, setShowLimpezaModal] = useState(false); // Estado para controlar a visibilidade da modal de limpeza
  const [showAguardarTrabalhoModal, setShowAguardarTrabalhoModal] = useState(false); // Modal de "Aguardar Trabalho"
  const [showAguardarPecasModal, setShowAguardarPecasModal] = useState(false); // Modal de "Aguardar Peças"
  const [showAlmocoModal, setShowAlmocoModal] = useState(false); // Modal de "Almoço"
  const [showFormacaoModal, setShowFormacaoModal] = useState(false); // Modal de "Formação"
  const [showSairModal, setShowSairModal] = useState(false); // Modal de "Sair"
  const [numeroOR, setNumeroOR] = useState(''); // Estado para armazenar o número da OR

  // Funções para abrir e fechar as modais
  const abrirModal = () => setShowModal(true);
  const abrirConfirmModal = () => setShowConfirmModal(true);
  const abrirLimpezaModal = () => setShowLimpezaModal(true);
  const fecharLimpezaModal = () => setShowLimpezaModal(false);
  const abrirAguardarTrabalhoModal = () => setShowAguardarTrabalhoModal(true);
  const fecharAguardarTrabalhoModal = () => setShowAguardarTrabalhoModal(false);
  const abrirAguardarPecasModal = () => setShowAguardarPecasModal(true);
  const fecharAguardarPecasModal = () => setShowAguardarPecasModal(false);
  const abrirAlmocoModal = () => setShowAlmocoModal(true);
  const fecharAlmocoModal = () => setShowAlmocoModal(false);
  const abrirFormacaoModal = () => setShowFormacaoModal(true);
  const fecharFormacaoModal = () => setShowFormacaoModal(false);
  const abrirSairModal = () => setShowSairModal(true);
  const fecharSairModal = () => setShowSairModal(false);
  // Função para lidar com a mudança no campo de número de OR
  const handleNumeroORChange = (e) => setNumeroOR(e.target.value);
  // Função para confirmar a limpeza
  const handleConfirmarLimpeza = (resposta) => {
    if (resposta === "sim") {
      alert("Hora da limpeza confirmada!");
    } else {
      alert("Limpeza adiada.");
    }
    fecharLimpezaModal(); // Fechar a modal após a ação
  };
  // Funções para confirmação em outras modais
  const handleConfirmacao = (acao) => {
    if (acao === "Sim") {
      alert(`Você escolheu ${acao}`);
    } else {
      alert(`Você escolheu ${acao}`);
    }
    // Fechar a modal de acordo com a ação
    fecharAguardarTrabalhoModal(); // Exemplo para a modal de "Aguardar Trabalho"
    fecharAguardarPecasModal();    // Exemplo para a modal de "Aguardar Peças"
    fecharAlmocoModal();           // Exemplo para a modal de "Almoço"
    fecharFormacaoModal();         // Exemplo para a modal de "Formação"
    fecharSairModal();             // Exemplo para a modal de "Sair"
  };
  //===============================|CONFIGIURAR AS MODAIS |==============================
  const [ordem, setOrdem] = useState(null);  // Dados da ordem encontrada
  const [error, setError] = useState("");  // Mensagem de erro se não encontrar a ordem
  const [loading, setLoading] = useState(false);  // Indicador de carregamento
  // Função para fechar a modal
  const fecharModalTecnico = () => setShowModalTecnico(false);
  // Função para fechar o modal
  const fecharModalOR = () => {
    setShowModal(false);
    setNumeroOR("");  // Limpar campo de pesquisa
    setError("");  // Limpar erro
    setOrdem(null);  // Limpar resultado
    fecharModalTecnico();
  };
  //const handleNumeroORChange = (e) => setNumeroOR(e.target.value);
  const [idOrdemDeReparacao, setIdOrdemDeReparacao] = useState(1);
  // Função para enviar a busca e procurar pela OR
  const handleSubmitORSend = async (e) => {
    e.preventDefault();
    setLoading(true);  // Iniciar carregamento

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ordens-de-reparo/numero-trabalho/${numeroOR}`);
      if (response.data) {
        setOrdem(response.data);  // Atualiza os dados da ordem
        setIdOrdemDeReparacao(response.data.id);
        setError("");  // Limpar erro se a OR for encontrada
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Ordem de reparação não encontrada.");  // Exibe mensagem de erro
      setOrdem(null);  // Limpar dados da ordem caso erro
    } finally {
      setLoading(false);  // Finalizar carregamento
    }


  };
  //==============================================================
  // Função para lidar com o envio do número do técnico
  const [showModalTecnico, setShowModalTecnico] = useState(false);
  const [numeroTecnico, setNumeroTecnico] = useState(''); // Estado para armazenar o número do técnico
  // eslint-disable-next-line no-unused-vars
  const [isFormValid, setIsFormValid] = useState(false);
  //const [showSearchForm, setShowSearchForm] = useState(true);
  const [tecnicoId, setTecnicoId] = useState(null); // Armazena o ID do técnico
  // Função para comparar os IDs do técnico e do funcionário
  const verificarIdTecnico = () => {
    if (funcionarioId === tecnicoId) {
      console.log('O ID do funcionário é igual ao ID do técnico.');
      setErroMensagem('O ID do funcionário corresponde ao técnico da ordem de reparação!');
    } else {
      console.log('O ID do funcionário não corresponde ao ID do técnico.');
      setErroMensagem('O número do técnico não corresponde ao técnico associado à ordem de reparação.');
    }
  };
  // Função para buscar o funcionário pelo número do técnico
  const buscarFuncionarioPorNumero = async () => {
    try {
      if (!numeroTecnico) {
        setErroMensagem('Por favor, insira o número do técnico.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/funcionariosIdReturn/id/${numeroTecnico}`);
      const data = await response.json();

      if (response.ok) {
        if (data.id) {
          setFuncionarioId(data.id); // Armazena o ID do funcionário
          verificarIdTecnico(); // Verifica se o ID do funcionário corresponde ao ID do técnico
        } else {
          setErroMensagem('Nenhum funcionário encontrado com esse número.');
        }
      } else {
        setErroMensagem(data.message || 'Erro ao buscar o funcionário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar o funcionário:', error);
      setErroMensagem('Ocorreu um erro ao buscar o funcionário. Tente novamente.');
    }
  };

  // Função para buscar os dados da ordem de reparação

  // Função para buscar dados da ordem de reparação
  // Função para buscar dados da ordem de reparação
  const buscarDados = async () => {
    if (!numeroOrdem) {
      setErroMensagem('Por favor, insira o número da ordem de reparação.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cronometros/buscar/${numeroOrdem}`);
      const data = await response.json();

      if (!response.ok) {
        const mensagemErro = data.message || 'Erro ao buscar os dados. Tente novamente.';
        setErroMensagem(mensagemErro);
        return;
      }

      // Verifica se o ID do técnico foi encontrado
      if (data.tecnico_id) {
        setTecnicoId(data.tecnico_id);
        setShowSearchForm(false); // Esconde o formulário de busca e exibe a próxima etapa
      } else {
        setErroMensagem('Técnico não encontrado para a ordem informada.');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErroMensagem('Ocorreu um erro ao buscar os dados. Tente novamente.');
    }
  };

  // Função para fechar a modal de confirmação
  const fecharConfirmModal = () => {
    setShowConfirmModal(false);
    setShowSearchForm(true); // Voltar ao formulário inicial
  };
  // Função para lidar com o envio do número do técnico
  const handleSubmitTecnico = (e) => {
    e.preventDefault();
    alert(`Número do técnico: ${numeroTecnico}`);
    fecharModalTecnico(); // Fechar a modal após o envio
  };
  // Função para manipular a mudança do número do técnico
  const handleNumeroTecnicoChange = (e) => setNumeroTecnico(e.target.value);

  //==========================================|CONFIGURACOES PARA VER ORDEM DE REPARCAO|====================================================

  const [ordemDeReparacao, setOrdemDeReparacao] = useState(null);
  const [clienteOrdemDeReparacao, setClienteOrdemDeReparacao] = useState(null);
  const [veiculoOrdemDeReparacao, setVeiculoOrdemDeReparacao] = useState(null);
  const [empresaOrdemDeReparacao, setEmpresaOrdemDeReparacao] = useState(null);
  const [loadingOrdemDeReparacao, setLoadingOrdemDeReparacao] = useState(true);
  const [servicosOrdemDeReparacao, setServicosOrdemDeReparacao] = useState([]);
  const [loadingServicosOrdemDeReparacao, setLoadingServicosOrdemDeReparacao] = useState(true);
  const [isModalOrdemDeReparacaoOpen, setIsModalOrdemDeReparacaoOpen] = useState(false); // Controle da visibilidade da modal
  const [numeroTecnicoOrdemDeReparacao, setNumeroTecnicoOrdemDeReparacao] = useState(""); // Valor do número do técnico
  const [funcionarioOrdemDeReparacao, setFuncionarioOrdemDeReparacao] = useState(null); // Para armazenar os dados do funcionário
  const [erroOrdemDeReparacao, setErroOrdemDeReparacao] = useState(""); // Para exibir mensagem de erro caso não encontre o funcionário


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

  useEffect(() => {
    const fetchDadosOrdemDeReparacao = async () => {
      try {
        // Requisições com retry
        const ordemDeReparacaoResponse = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/ordens-de-reparo/${idOrdemDeReparacao}`));
        setOrdemDeReparacao(ordemDeReparacaoResponse.data);

        const clienteOrdemDeReparacaoResponse = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/clientes/${ordemDeReparacaoResponse.data.cliente_id}`));
        setClienteOrdemDeReparacao(clienteOrdemDeReparacaoResponse.data);

        const veiculoOrdemDeReparacaoResponse = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/veiculos/${ordemDeReparacaoResponse.data.veiculo_id}`));
        setVeiculoOrdemDeReparacao(veiculoOrdemDeReparacaoResponse.data);

        const empresaOrdemDeReparacaoResponse = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/empresas/1`));
        setEmpresaOrdemDeReparacao(empresaOrdemDeReparacaoResponse.data);

        const servicosOrdemDeReparacaoResponse = await retryRequest(() => axios.get(`http://127.0.0.1:8000/api/ordem-de-reparacao-servicoU/${idOrdemDeReparacao}`));
        setServicosOrdemDeReparacao(servicosOrdemDeReparacaoResponse.data);

      } catch (error) {
        console.error("Erro ao buscar dados da ordem de reparação:", error);
      } finally {
        setLoadingOrdemDeReparacao(false);
        setLoadingServicosOrdemDeReparacao(false);
      }
    };

    fetchDadosOrdemDeReparacao();
  }, [idOrdemDeReparacao]);

  const handleModalOrdemDeReparacaoClose = () => {
    setIsModalOrdemDeReparacaoOpen(false); // Fecha a modal
  };

  const handleModalOrdemDeReparacaoOpen = () => {
    setIsModalOrdemDeReparacaoOpen(true); // Abre a modal
  };

  const handleNumeroTecnicoOrdemDeReparacaoChange = (e) => {
    setNumeroTecnicoOrdemDeReparacao(e.target.value); // Atualiza o número do técnico
  };

  const handleSubmitTecnicoOrdemDeReparacao = async () => {
    try {
      // Realiza a busca do funcionário
      const response = await axios.get(`http://127.0.0.1:8000/api/funcionario/numero/${numeroTecnicoOrdemDeReparacao}`);

      if (response.data) {
        setFuncionarioOrdemDeReparacao(response.data); // Se encontrado, armazena os dados do funcionário
        setErroOrdemDeReparacao(""); // Limpa qualquer erro anterior

        // Adiciona a nova ordem com o número da ordem de reparação
        //adicionarOrdem(ordemDeReparacao.numero_trabalho);
      } else {
        setFuncionarioOrdemDeReparacao(null); // Limpa os dados do funcionário
        setErroOrdemDeReparacao("Funcionário não encontrado"); // Exibe erro
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setFuncionarioOrdemDeReparacao(null); // Limpa os dados do funcionário
      setErroOrdemDeReparacao("Funcionário não encontrado"); // Exibe erro de requisição
    }
  };

  if (loadingOrdemDeReparacao) {
    return (
      <div className="centered-div">
        <div className="text-center pt-5">
          <h3 className='fw-bold my-3'>Aguarde esta,Carregando...</h3>
          <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
        </div>
      </div>

    );
  }

  if (!ordemDeReparacao || !clienteOrdemDeReparacao || !veiculoOrdemDeReparacao) {
    return (

      <div className="centered-div">
        <div className="text-center pt-5">
          <h3 className='fw-bold my-3'>Dados não encontrados</h3>
          <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
        </div>
      </div>
    );
  }
  // Função para limpar os dados
  const limparDadosModalTecnico = () => {
    setNumeroTecnicoOrdemDeReparacao("");  // Limpa o valor do input
    setFuncionarioOrdemDeReparacao(null);  // Limpa os dados do funcionário (caso existam)
    setErroOrdemDeReparacao(null);  // Limpa qualquer erro (caso exista)
  };

  //========================================================================================
  const handleRedirect = () => {
    navigate("/projectarTela"); // Redireciona para a página /projectarTela

  };

  const handleRedirectRegresso = () => {
    navigate("/homeFuncionario"); // Redireciona para a página /projectarTela

  };


  //CADASTRAR O CRONOMETRO

  const cadastrarCronometro = async (props) => {
    const {
      numeroOr,
      tecnicoId,
      segundosAtual,
      segundoFinal,
      numeroHoras,
      rodando,
      estado,
      progresso,
      ordemReparacaoId,
      acao,
      tempoEsgotado,
    } = props;

    try {
      // Dados a serem enviados
      const dados = {
        numero_or: numeroOr,
        tecnico_id: tecnicoId, // ID do técnico (recebido por props)
        segundos_atual: segundosAtual, // Recebido por props
        segundo_final: segundoFinal, // Recebido por props
        numero_horas: numeroHoras, // Recebido por props
        rodando: rodando, // Recebido por props
        estado: estado, // Recebido por props
        progresso: progresso, // Recebido por props
        ordem_reparacao_id: ordemReparacaoId, // Recebido por props
        acao: acao, // Recebido por props
        data_hora: new Date().toISOString(), // Data e hora atual
        tempo_esgotado: tempoEsgotado, // Recebido por props
      };

      // Enviar dados via POST
      const response = await axios.post("http://127.0.0.1:8000/api/cronometros", dados);

      if (response.status === 201) {
        console.log("Cronômetro cadastrado com sucesso:", response.data);
      } else {
        console.log("Erro ao cadastrar cronômetro:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor:", error);
    }
  };


  //CADASTRAR CRONOMETRO AUXILIAR
  const cadastrarOrdemReparacaoCronometroTecnico = async (props) => {
    const {
      tecnicoId,
      idCronometro,
      ordemReparacaoId,
      numeroOr,
      segundosAtual,
      segundoFinal,
      numeroHoras,
      rodando,
      estado,
      progresso,
      acao,
      tempoEsgotado,
    } = props;
  
    try {
      // Dados a serem enviados
      const dados = {
        tecnico_id: tecnicoId, // ID do técnico (recebido por props)
        id_cronometro: idCronometro, // ID do cronômetro (recebido por props)
        ordem_reparacao_id: ordemReparacaoId, // ID da ordem de reparação (recebido por props)
        numero_or: numeroOr, // Número da ordem de reparação (recebido por props)
        segundos_atual: segundosAtual, // Recebido por props
        segundo_final: segundoFinal, // Recebido por props
        numero_horas: numeroHoras, // Recebido por props
        rodando: rodando, // Recebido por props
        estado: estado, // Recebido por props
        progresso: progresso, // Recebido por props
        acao: acao, // Recebido por props
        data_hora: new Date().toISOString(), // Data e hora atual
        tempo_esgotado: tempoEsgotado, // Recebido por props
      };
  
      // Enviar dados via POST
      const response = await axios.post("http://127.0.0.1:8000/api/ordem-de-reparacao-cronometro-tecnicos/", dados);
  
      if (response.status === 201) {
        console.log("Ordem de reparação, cronômetro e técnico cadastrados com sucesso:", response.data);
      } else {
        console.log("Erro ao cadastrar:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor:", error);
    }
  };


  const handleRefresh = () => {
    window.location.reload();
  };
  //CONFIGURAR MODAL TERMINAR

  const ordensSecundaria = [
    // Exemplo de dados. Cada item aqui seria uma ordem.
    {
      idTecnico: 1,
      numeroOrdem: 'OR001',
      estado: 'iniciado',
      rodando: 0,
      segundosAtuais: 120,
      segundosFinais: 3600,
      tempoEsgotado: false,
    },
      // Exemplo de dados. Cada item aqui seria uma ordem.
      {
        idTecnico: 1,
        numeroOrdem: 'OR001',
        estado: 'iniciado',
        rodando: 0,
        segundosAtuais: 120,
        segundosFinais: 3600,
        tempoEsgotado: false,
      },
    {
      idTecnico: 2,
      numeroOrdem: 'OR002',
      estado: 'em progresso',
      rodando: 1,
      segundosAtuais: 300,
      segundosFinais: 3600,
      tempoEsgotado: false,
    },
    // Adicione quantas ordens precisar
  ];


  return (
    <div className="seccao-cartaz">
      <div className="container-fluid">
        <div className="d-flex">
          <div className="menu-funionario">

            <div className={`menu-barra ${display}`}>
              <nav className='menuLateral vh-100'>
                <img src={LogoTIpo} alt="logotipo small" className='mb-2 d-block mx-auto logoBig' width="280px" height="100px" />
                <img src={LogoSmall} alt="logotipo small" className='my-3 ms-4 logoSmall' width="45px" height="37px" />

                <ul className="menu-lateral ">
                  <li className='linhasMenu'>
                    <a href="#" title='Iniciar' onClick={abrirModal}>
                      <MdContentPasteSearch className='icone-menu' /> <span className='spanTitle'>Procurar OR</span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Terminar o serviço' onClick={abrirConfirmModal}>
                      <FaHammer className='icone-menu' /> <span className='spanTitle'>Terminar o serviço</span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Manutenção e limpeza' onClick={abrirLimpezaModal}>
                      <FaCogs className='icone-menu' /> <span className='spanTitle'>Manutenção e limpeza</span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Aguardar Trabalho' onClick={abrirAguardarTrabalhoModal}>
                      <FaToolbox className='icone-menu' /> <span className='spanTitle'>Aguardar Trabalho</span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Aguardar Peças' onClick={abrirAguardarPecasModal}>
                      <FaRegClock className='icone-menu' /> <span className='spanTitle'>Aguardar Peças</span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Almoço' onClick={abrirAlmocoModal}>
                      <FaUtensils className='icone-menu' /> <span className='spanTitle'>Almoço </span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Formação' onClick={abrirFormacaoModal}>
                      <FaBook className='icone-menu' /> <span className='spanTitle'>Formação</span>
                    </a>
                  </li>

                  <li className='linhasMenu' onClick={handleRedirect}>
                    <a href="#" title='Projectar' >
                      <BsArrowsFullscreen className='icone-menu' />

                      <span className='spanTitle'>Projectar </span>
                    </a>
                  </li>

                  <li className='linhasMenu'>
                    <a href="#" title='Sair' onClick={abrirSairModal}>
                      <PiSignOutBold className='icone-menu' /> <span className='spanTitle'>Sair</span>
                    </a>
                  </li>


                </ul>
              </nav>
            </div>


            <div className="modais">

              {/* Modal de Busca da Ordem de Reparação */}
              <Modal size={ordem ? "xl" : "md"} scrollable show={showModal} onHide={fecharModalOR}>
                <Modal.Header closeButton>
                  <Modal.Title>Procurar Ordem de Reparação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitORSend}>
                    <Form.Group className="mb-3" controlId="formNumeroOR">
                      <Form.Label>Número da OR</Form.Label>

                      <div className="input-group col-lg-6 ">
                        <span className="input-group-text">
                          <FaClipboard fontSize={22} color="#0070fa" />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="Digite o número da OR"
                          value={numeroOR}
                          onChange={handleNumeroORChange}
                          required
                        />
                        <Button variant="primary" type="submit" className="btn d-block mx-auto">
                          {loading ? "Pesquisando..." : "Pesquisar"}
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>

                  {error && <p className="text-danger mt-3">{error}</p>}

                  {ordem && (


                    <>
                      <div className="container-fl">
                        <div className="d-flex">
                          <div className="flexAuto w-100">
                            <div className="vh-100 alturaPereita">
                              <div className="container-fluid">
                                {/* Informações da Ordem de Reparação */}
                                <h6 className="h5 fw-900">DADOS DA ORDEM DE REPARAÇÃO</h6>
                                <hr />
                                <div className="row pb-3">
                                  <div className="col-12 col-md-4 col-lg-3">
                                    <img src={logotipo} alt="Logotipo" className="w-100" />
                                  </div>
                                  <div className="col-12 col-md-4 col-lg-6">
                                    <h5 className="fw-bold">{empresaOrdemDeReparacao?.nome_empresa}</h5>
                                    <span className="d-block">{empresaOrdemDeReparacao?.nif_empresa}</span>
                                    <span className="d-block">{empresaOrdemDeReparacao?.rua}, {empresaOrdemDeReparacao?.bairro}, {empresaOrdemDeReparacao?.municipio}</span>
                                    <span className="d-block">Email: {ordemDeReparacao?.id} {empresaOrdemDeReparacao?.email} - Fone: {empresaOrdemDeReparacao?.telefone}</span>
                                    <span className="d-block">
                                      <b>Site:</b>
                                      <a href={empresaOrdemDeReparacao?.site_empresa} className="text-black" target="_blank" rel="noopener noreferrer">
                                        {empresaOrdemDeReparacao?.site_empresa}
                                      </a>
                                    </span>
                                  </div>
                                  <div className="col-12 col-md-4 col-lg-3">
                                    <span className="d-block"><b>Nº OR:</b> {ordemDeReparacao?.numero_trabalho}</span>
                                    <span className="d-block"><b>Emissão:</b> {new Date().toLocaleString()}</span>
                                  </div>
                                </div>
                                <hr />

                                {/* Dados da Ordem */}
                                <h6 className="h5emGe text-uppercase fw-bold">Informações da Ordem de Reparação</h6>
                                <table className="table table-bordered mt-4">
                                  <thead>
                                    <tr>
                                      <th>Campo</th>
                                      <th>Detalhes</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ordemDeReparacao?.numero_trabalho && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Número da Ordem</td>
                                        <td className="sizelinha">{ordemDeReparacao.numero_trabalho}</td>
                                      </tr>
                                    )}

                                    {ordemDeReparacao?.km_entrada && (
                                      <tr>
                                        <td className="fw-bold sizelinha">KM de Entrada</td>
                                        <td className="sizelinha">{ordemDeReparacao.km_entrada} KM</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.cobrar_reparo && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Valor Cobrado pelo Reparo</td>
                                        <td className="sizelinha">{ordemDeReparacao.cobrar_reparo} kz</td>
                                      </tr>
                                    )}

                                    {ordemDeReparacao?.status && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Status</td>
                                        <td className="sizelinha">{ordemDeReparacao.status}</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.garantia_dias && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Garantia (dias)</td>
                                        <td className="sizelinha">{ordemDeReparacao.garantia_dias} dias</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.data_final_saida && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Data Final de Saída</td>
                                        <td className="sizelinha">{new Date(ordemDeReparacao.data_final_saida).toLocaleDateString()}</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.detalhes && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Detalhes</td>
                                        <td className="sizelinha text-justify">{ordemDeReparacao.detalhes}</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.defeito_ou_servico && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Defeito ou Serviço</td>
                                        <td className="sizelinha  text-justify">{ordemDeReparacao.defeito_ou_servico}</td>
                                      </tr>
                                    )}
                                    {ordemDeReparacao?.observacoes && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Observações</td>
                                        <td className="sizelinha  text-justify">{ordemDeReparacao.observacoes}</td>
                                      </tr>
                                    )}



                                    {ordemDeReparacao?.horas_reparacao && (
                                      <tr>
                                        <td className="fw-bold sizelinha">Horas de Reparação</td>
                                        <td className="sizelinha">{ordemDeReparacao.horas_reparacao} horas</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>


                                {/* Dados do Cliente */}
                                <h6 className="h5emGe text-uppercase fw-bold">Informações do Cliente</h6>
                                <div className="border p-2">
                                  <p><strong>Nome:</strong> {clienteOrdemDeReparacao?.primeiro_nome} {clienteOrdemDeReparacao?.sobrenome}</p>
                                  <p><strong>Celular:</strong> {clienteOrdemDeReparacao?.celular}</p>
                                  <p><strong>Email:</strong> {clienteOrdemDeReparacao?.email}</p>
                                  <p><strong>Endereço:</strong> {clienteOrdemDeReparacao?.endereco}</p>
                                </div>

                                {/* Dados do Veículo */}
                                <h6 className="h5emG text-uppercase fw-bold my-3">Informações do Veículo</h6>
                                <div className="p-0 col-lg-12">
                                  {/* Seção 1: Informações Básicas */}
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="border p-2">
                                        <h5 className='mb-3'>Informações Básicas</h5>
                                        <p><strong>Marca e Modelo:</strong> {veiculoOrdemDeReparacao?.marca_veiculo ?? "Sem Informação"} {veiculoOrdemDeReparacao?.modelo_veiculo ?? "Sem Informação"}</p>
                                        <p><strong>Ano Modelo:</strong> {veiculoOrdemDeReparacao?.ano_modelo ?? "Sem Informação"}</p>
                                        <p><strong>Tipo de Combustível:</strong> {veiculoOrdemDeReparacao?.combustivel ?? "Sem Informação"}</p>
                                        <p><strong>Leitura do Odômetro:</strong> {veiculoOrdemDeReparacao?.leitura_odometro ? `${veiculoOrdemDeReparacao.leitura_odometro} km` : "Sem Informação"}</p>
                                        <p><strong>Preço:</strong> {veiculoOrdemDeReparacao?.preco ? `${veiculoOrdemDeReparacao.preco} kz` : "Sem Informação"}</p>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="border p-2">
                                        <h5 className='mb-3'>Identificação do Veículo</h5>
                                        <p><strong>Número do Chassi:</strong> {veiculoOrdemDeReparacao?.numero_chassi ?? "Sem Informação"}</p>
                                        <p><strong>Número da Placa:</strong> {veiculoOrdemDeReparacao?.numero_placa ?? "Sem Informação"}</p>
                                        <p><strong>Equipamento:</strong> {veiculoOrdemDeReparacao?.numero_equipamento ?? "Sem Informação"}</p>
                                        <p><strong>Número do Motor:</strong> {veiculoOrdemDeReparacao?.numero_motor ?? "Sem Informação"}</p>
                                        <p><strong>Número da Caixa:</strong> {veiculoOrdemDeReparacao?.numero_caixa ?? "Sem Informação"}</p>

                                      </div>
                                    </div>
                                  </div>

                                  {/* Seção 2: Detalhes Técnicos */}
                                  <div className="row mt-3">
                                    <div className="col-md-6">
                                      <div className="border p-2">
                                        <h5 className='mb-3'>Detalhes Técnicos</h5>
                                        <p><strong>Data de Fabricação:</strong> {veiculoOrdemDeReparacao?.data_fabricacao ? new Date(veiculoOrdemDeReparacao.data_fabricacao).toLocaleDateString() : "Sem Informação"}</p>
                                        <p><strong>Caixa de Velocidade:</strong> {veiculoOrdemDeReparacao?.caixa_velocidade ?? "Sem Informação"}</p>
                                        <p><strong>Cor:</strong> {veiculoOrdemDeReparacao?.cor ?? "Sem Informação"}</p>
                                        <p><strong>Motor:</strong> {veiculoOrdemDeReparacao?.motor ?? "Sem Informação"} ({veiculoOrdemDeReparacao?.tamanho_motor ?? "Sem Informação"})</p>

                                      </div>
                                    </div>
                                  </div>

                                  {/* Exibir Serviços */}
                                  <div className="">
                                    <h6 className="text-uppercase fw-bold my-4">Serviços da Ordem de Reparação</h6>

                                    {loadingServicosOrdemDeReparacao ? (
                                      <p>Carregando serviços...</p>
                                    ) : (
                                      <div className="row">
                                        {servicosOrdemDeReparacao.length > 0 ? (
                                          servicosOrdemDeReparacao.map((servicoOrdemDeReparacao) => (
                                            <div className="col-12 col-md-6 my-2 col-lg-4" key={servicoOrdemDeReparacao.id}>
                                              <div className="card mb-3 h-100">
                                                <div className="card-body h-100 justify-content-between">
                                                  <h6 className="card-title">{servicoOrdemDeReparacao.servico.nome_servico}</h6>
                                                  <Button
                                                    variant="primary"
                                                    onClick={handleModalOrdemDeReparacaoOpen}
                                                    className="d-block ms-auto links-acessos  float-right btn-sizer"
                                                  >
                                                    <HiArrowNarrowRight />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                        ) : (
                                          <p>Nenhum serviço encontrado para esta ordem de reparação.</p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>



                              </div>
                            </div>
                          </div>
                        </div>



                        <Modal
                          show={isModalOrdemDeReparacaoOpen}
                          onHide={() => {
                            handleModalOrdemDeReparacaoClose(); // Fechar a modal
                            limparDadosModalTecnico(); // Limpar os dados
                          }}
                          backdrop="static"
                          keyboard={false}
                          scrollable
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title><h5>Informe o Número do Técnico</h5></Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group controlId="formNumeroTecnicoOrdemDeReparacao">
                                <Form.Label>Número do Técnico</Form.Label>
                                <div className="input-group">
                                  <span className="input-group-text"><IoMdPerson fontSize={20} color="#0070fa" /></span>
                                  <Form.Control
                                    type="text"
                                    placeholder="Digite o número do técnico"
                                    value={numeroTecnicoOrdemDeReparacao}
                                    onChange={handleNumeroTecnicoOrdemDeReparacaoChange}
                                  />
                                  <Button variant="primary" onClick={handleSubmitTecnicoOrdemDeReparacao} className="links-ass">
                                    <MdPersonSearch fontSize={22} />
                                  </Button>
                                </div>
                              </Form.Group>
                            </Form>

                            {/* Exibição do resultado da busca */}
                            {erroOrdemDeReparacao && <div className="text-danger">{erroOrdemDeReparacao}</div>}

                            {funcionarioOrdemDeReparacao && (
                              <div className="mt-3">
                                <h6>Funcionário Encontrado <FaCheckDouble color='green' /></h6>
                                <p><strong>Nome:</strong> {funcionarioOrdemDeReparacao.nome} {funcionarioOrdemDeReparacao.sobrenome}</p>
                                <p><strong>Cargo:</strong> {funcionarioOrdemDeReparacao.cargo}</p>
                              </div>
                            )}
                          </Modal.Body>
                          <Modal.Footer>
                            <img src={LogoType} alt="..." className='d-block me-auto ' width={150} height={50} />

                            {/* Exibe o botão "Começar" somente se o funcionário for encontrado */}
                            {funcionarioOrdemDeReparacao && (
                              <button
                                onClick={async () => {
                                  const props = {
                                    numeroOr: ordemDeReparacao?.numero_trabalho,
                                    tecnicoId: funcionarioOrdemDeReparacao.id, // Exemplo de ID do técnico
                                    segundosAtual: 0,
                                    segundoFinal: (ordemDeReparacao?.horas_reparacao * 6000),
                                    numeroHoras: ordemDeReparacao?.horas_reparacao,
                                    rodando: 1,
                                    estado: "rodandoA",
                                    progresso: 0,
                                    ordemReparacaoId: ordemDeReparacao.id,
                                    acao: "Troca de óleo",
                                    tempoEsgotado: 0,
                                  };

                                  try {
                                    // Executando as funções de forma assíncrona
                                    await cadastrarCronometro(props); // Chama a função com os valores
                                    await cadastrarOrdemReparacaoCronometroTecnico(props);
                                    await fecharModalOR(); // Fecha a primeira modal
                                    await fecharModalTecnico(); // Fecha a segunda modal
                                    await limparDadosModalTecnico(); // Limpa os dados do modal de técnico
                                    await handleModalOrdemDeReparacaoClose(); // Fecha a modal da ordem de reparação
                                    await iniciarPausar(props.numeroOr); // Inicia o cronômetro
                                    await adicionarOrdem(ordemDeReparacao?.numero_trabalho); // Adiciona a ordem ao sistema

                                    // Após todas as funções anteriores terminarem, chama o refresh
                                    handleRefresh(); // Agora o refresh é chamado por último

                                  } catch (error) {
                                    console.error("Erro ao executar as funções:", error);
                                  }
                                }}
                                className="btn btn-primary"
                              >
                                Começar
                              </button>
                            )}

                          </Modal.Footer>
                        </Modal>


                      </div>
                    </>

                  )}
                </Modal.Body>
                <Modal.Footer>

                  <img src={LogoType} alt="..." className='d-block mx-auto ' width={250} height={70} />

                </Modal.Footer>
              </Modal>

              {/* Modal para solicitar o número identificador do técnico */}
              <Modal show={showModalTecnico} centered onHide={fecharModalTecnico}>
                <Modal.Header closeButton>
                  <Modal.Title>Número do Técnico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitTecnico}>
                    <Form.Group className="mb-3" controlId="formNumeroTecnico">

                      <Form.Label>Número do Técnico</Form.Label>
                      <div className="input-group col-lg-6 ">

                        <span className="input-group-text">
                          <FaClipboard fontSize={22} color="#0070fa" />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="Digite o número do técnico"
                          value={numeroTecnico}
                          onChange={handleNumeroTecnicoChange}
                          required
                        />
                      </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="d-block mx-auto links-acessos">
                      Confirmar
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>

              {/* Modal de Confirmação para Terminar o Serviço */}
              <Modal scrollable show={showConfirmModal} onHide={fecharConfirmModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{showSearchForm ? 'Buscar Reparação a Terminar' : 'Insira o teu número de Técnico'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                  {showSearchForm ? (
                    <Form>
                      <Form.Group className="mb-3" controlId="formNumeroOrdem">
                        <Form.Label>Número da Ordem de Reparação</Form.Label>
                        {erroMensagem && (
                          <Alert variant="danger my-2">
                            {erroMensagem}
                          </Alert>
                        )}
                        <div className="input-group">
                          <span className="input-group-text">
                            <GiAutoRepair fontSize={20} color="#0070fa" />
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Digite o número da ordem"
                            value={numeroOrdem}
                            onChange={(e) => setNumeroOrdem(e.target.value)}
                          />

                          <Button variant="primary" onClick={buscarDados} className="d-block py-1 ms-auto">
                            Próximo {numeroOrdem}&nbsp;
                            <TbPlayerTrackNextFilled fontSize={16} />
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
                            onClick={buscarFuncionarioPorNumero}
                            className="btn"
                          >
                            Buscar
                          </Button>
                        </div>
                      </Form.Group>

                      {funcionarioId && (
                        <div>
                          <p>Funcionário encontrado! ID: {funcionarioId}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                  <img src={LogoType} alt="Logo" className="d-block mx-auto" width={230} height={60} />
                </Modal.Footer>
              </Modal>
              {/* Modal de Confirmação para Manutenção e Limpeza */}
              <Modal scrollable show={showLimpezaModal} onHide={fecharLimpezaModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Manutenção e Limpeza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Está na hora da limpeza?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmarLimpeza("não")}>
                    Não
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirmarLimpeza("sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal para Aguardar Trabalho */}
              <Modal scrollable show={showAguardarTrabalhoModal} onHide={fecharAguardarTrabalhoModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Aguardar Trabalho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Está aguardando trabalho?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmacao("Não")}>
                    Não
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirmacao("Sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal para Aguardar Peças */}
              <Modal scrollable show={showAguardarPecasModal} onHide={fecharAguardarPecasModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Aguardar Peças</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Está aguardando peças?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmacao("Não")}>
                    Não
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirmacao("Sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal para Almoço */}
              <Modal scrollable show={showAlmocoModal} onHide={fecharAlmocoModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Almoço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Hora do almoço?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmacao("Não")}>
                    Não
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirmacao("Sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Modal para Formação */}
              <Modal scrollable show={showFormacaoModal} onHide={fecharFormacaoModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Formação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Está em formação?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmacao("Não")}>
                    Não
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirmacao("Sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Modal para Sair */}
              <Modal scrollable show={showSairModal} onHide={fecharSairModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Sair</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Você deseja sair?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleConfirmacao("Não")}>
                    Não
                  </Button>
                  <Button variant="danger" onClick={() => handleConfirmacao("Sim")}>
                    Sim
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>




          <div className="container-fluid">

            <div className="row">
              <CgCloseO fontSize={30} onClick={handleRedirectRegresso} className={`mEr ${displayF}`} />

              <div className="div-feed border-4   min-vh-100 borderKing col-lg-12 vh-100 h-100 padingCimaBar">
                {/* Renderiza os cronômetros dinamicamente com base nas ordens */}

                <div className="row">
             
                  {ordens.map((ordem, index) => (

                    <>
                      <div className="row">

                        <div className="col-lg-12">
                          <Cronometro
                            key={index}

                            nomeMecanico={ordem.idTecnico}
                            numeroOrdem={ordem.numeroOrdem}
                            estado={ordem.estado}
                            rodando={ordem.rodando}
                            iniciarPausar={iniciarPausar}
                            segundosAtual={ordem.segundosAtuais || 0} // Usa segundosAtuais da ordem ou 0 como padrão
                            segundoFinal={ordem.segundosFinais || 3600} // Usa segundosFinais da ordem ou 3600 como padrão
                            tempoEsgotado={ordem.tempoEsgotado ? 1 : 0}
                          />
                        </div>

                      </div></>

                  ))}

                  <>
                    <div className="row ">
                      <h4 className='ps-4'>
                        Tempo Individual
                      </h4>
                   
                      {ordensSecundaria.map((ordem, index) => (
                        <div className="col-lg-6" key={index}>
                          <Cronometro
                            nomeMecanico={ordem.idTecnico}
                            numeroOrdem={ordem.numeroOrdem}
                            estado={ordem.estado}
                            rodando={ordem.rodando}
                            iniciarPausar={iniciarPausar}
                            segundosAtual={ordem.segundosAtuais || 0} // Usa segundosAtuais da ordem ou 0 como padrão
                            segundoFinal={ordem.segundosFinais || 3600} // Usa segundosFinais da ordem ou 3600 como padrão
                            tempoEsgotado={ordem.tempoEsgotado ? 1 : 0}
                          />
                        </div>
                      ))}
                      </div>
                    
                  </>

                </div>


                <hr />

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}