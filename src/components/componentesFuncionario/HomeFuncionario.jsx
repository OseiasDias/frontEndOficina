//Imports do Menu
import { useState } from 'react';
import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaClipboard, FaUserClock } from 'react-icons/fa'; // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiSignOutBold } from 'react-icons/pi';
import LogoSmall from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import { MdContentPasteSearch, MdPersonSearch } from 'react-icons/md';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap'; // Importando Modal, Button e Form do react-bootstrap
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6
import axios from 'axios';
import { TbNumber, TbPlayerTrackNextFilled } from "react-icons/tb";
import LogoType from "../../assets/lgo.png";
import { toast, ToastContainer } from 'react-toastify';
/* eslint-disable react/prop-types */
import "../../css/StylesFuncionario/cartaz.css";
import { useEffect } from 'react';
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
import CronometroGeral from "./CronometroGeral.jsx";
import CronometroIndividual from "./CronometroIndividual.jsx";

const API_URL = import.meta.env.VITE_API_URL;



export default function Funcionario({ display, displayBlock }) {
  //Estado para armazenar as ordens de serviço com o cronômetro iniciando automaticamente
  const [ordens, setOrdens] = useState([]);
  const [numeroOrdem, setNumeroOrdem] = useState(''); // Estado para armazenar o número da ordem
  const [showSearchForm, setShowSearchForm] = useState(true); // Controle para alternar entre a tela de busca e a de confirmação
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [erroMensagem, setErroMensagem] = useState('');
  const [idTecnico, setIdTecnico] = useState(null);  // Estado para armazenar o idTecnico
  const [loading, setLoading] = useState(false);  // Estado para indicar se a requisição está carregando
  const [error, setError] = useState(null);  // Estado para armazenar erros
  const [showSairModal, setShowSairModal] = useState(false);
  //Função para buscar o idTecnico usando numero_or

  const fetchIdTecnico = async () => {
    setLoading(true);
    setErroMensagem(""); // Limpar mensagens de erro anteriores

    try {
      // Fazendo a requisição para o backend Laravel
      const response = await axios.get(`${API_URL}/ordem-de-reparacao-cronometro-tecnicos/ordemNumero/${numeroOrdem}`);

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

  const [loadingAux, setLoadingAux] = useState(false);
  const [ordensSecundaria, setOrdensSecundaria] = useState([]);
  const [showFormacaoModal, setShowFormacaoModal] = useState(false); // Estado para controlar visibilidade da modal

  // Função para abrir a modal
  const abrirFormacaoModal = () => setShowFormacaoModal(true);
  const fecharFormacaoModal = () => setShowFormacaoModal(false);

  useEffect(() => {
    const fetchCronometros = async () => {
      setLoadingAux(true); // Ativa o carregamento
      try {
        const response = await fetch(`${API_URL}/ordem-de-reparacao-cronometro-tecnicos/ordens/ativas`);
        const data = await response.json();

        // Verifique a resposta da API
        console.log(data); // Depuração para ver como os dados estão chegando

        // Filtrando os cronômetros que não estão com o estado "Rodando"
        const ordensFiltradas = data.filter(cronometro => cronometro.segundos_atual < cronometro.segundo_final)
          .map(cronometro => ({
            idTecnico: cronometro.tecnico_id,
            numeroOrdem: cronometro.numero_or,
            estado: cronometro.estado,
            rodando: cronometro.rodando === 1,
            segundosAtuais: cronometro.segundos_atual,
            segundosFinais: cronometro.segundo_final
          }));

        console.log(ordensFiltradas); // Verifique se o filtro está funcionando corretamente

        // Atualizando o estado com os dados filtrados
        setOrdensSecundaria(ordensFiltradas);
      } catch (error) {
        console.error("Erro ao buscar os cronômetros", error);
      } finally {
        setLoadingAux(false); // Desativa o carregamento
      }
    };

    // Só chama fetchCronometros se a modal for aberta
    if (showFormacaoModal) {
      fetchCronometros();
    }
  }, [showFormacaoModal]); // Executa sempre que a modal for aberta


  useEffect(() => {
    const fetchCronometros = async () => {
      try {
        const response = await fetch(`${API_URL}/cronometros`);
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
        handleRefresh();
      }
    };

    fetchCronometros();
  }, []);  // O array vazio [] garante que a função seja chamada uma vez após o componente ser montado

  const navigate = useNavigate(); // Hook para navegação
  // Função para adicionar uma nova ordem de serviço e cronômetro
  const adicionarOrdem = (numeroOrdem) => {
    const novaOrdem = {
      numeroOrdem,
      estado: "Em Execução",
      rodando: true,
      //Inicia o cronômetro automaticamente
      //segundosAtuais: 0, // Inicia do zero
      //segundosFinais: 3600, // Define um tempo limite padrão
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

  // Função para iniciar ou pausar o cronômetro de uma ordem específica
  const iniciarPausarAux = (numeroOrdem) => {
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
 // const [showSairModal, setShowSairModal] = useState(false); // Modal de "Sair"
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
  const fecharModalTecnico = () => setShowModalTecnico(false);
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
      const response = await axios.get(`${API_URL}/ordens-de-reparo/numero-trabalho/${numeroOR}`);
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
  const [message, setMessage] = useState('');
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
      const response = await axios.get(`${API_URL}/funcionario/numero/${numeroTecnicoOrdemDeReparacao}`);

      if (response.data) {
        setFuncionarioOrdemDeReparacao(response.data); // Se encontrado, armazena os dados do funcionário
        setErroOrdemDeReparacao(""); // Limpa qualquer erro anterior
        // Adiciona a nova ordem com o número da ordem de reparação
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
      const response = await axios.post(`${API_URL}/cronometros`, dados);

      if (response.status === 201) {
        console.log("Cronômetro cadastrado com sucesso:", response.data);
      } else {
        console.log("Erro ao cadastrar cronômetro:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor:", error);
    }
  };

  // Função para cadastrar a ordem de reparação
  const cadastrarOrdemReparacaoCronometroTecnico = async ({
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
    dataHora,
    tempoEsgotado
  }) => {
    // Dados a serem enviados para o endpoint, com valores dinâmicos recebidos como parâmetro
    const dadosAux = {
      tecnico_id: tecnicoId,
      id_cronometro: idCronometro,
      ordem_reparacao_id: ordemReparacaoId,
      numero_or: numeroOr,
      segundos_atual: segundosAtual,
      segundo_final: segundoFinal,
      numero_horas: numeroHoras,
      rodando: rodando,
      estado: estado,
      progresso: progresso,
      acao: acao,
      data_hora: dataHora,
      tempo_esgotado: tempoEsgotado
    };

    try {
      // Enviar os dados via POST
      const response = await axios.post(
        `${API_URL}/ordem-de-reparacao-cronometro-tecnicos`,
        dadosAux
      );

      // Verificar a resposta do servidor
      if (response.status === 201) {
        console.log("Cadastro realizado com sucesso:", response.data);

        toast.success(`Seu Tempo Começou!`);
      } else {
        console.error("Erro ao cadastrar cronômetro:", response.data);
        toast.error("Erro ao cadastrar cronômetro. Tente novamente.");
      }
    } catch (error) {
      // Lidar com erros de requisição
      if (error.response) {
        // Se houver erro na resposta do servidor
        console.error("Erro na resposta do servidor:", error.response.data);
        alert("Erro na resposta do servidor. Tente novamente.");
      } else if (error.request) {
        // Se não houver resposta do servidor
        console.error("Erro na requisição:", error.request);
        alert("Erro na requisição. Tente novamente.");
      } else {
        // Se houver erro ao configurar a requisição
        console.error("Erro ao configurar a requisição:", error.message);
        alert("Erro ao configurar a requisição. Tente novamente.");
      }
    }
  };


  const handleRefresh = () => {
    window.location.reload();
  };
  //CONFIGURAR MODAL TERMINAR
  // Função para fechar o modal e reiniciar os estados
  const fecharModal = () => {

    setShowConfirmModal(false);
    //Reinicia os estados para a primeira parte do modal
    setNumeroOrdem("");
    setNumeroTecnico("");
    setIdTecnico(null);
    setFuncionarioId(null);
    setErroMensagem("");
    setErroMensagem(""); // Limpar mensagens de erro anteriores
    setShowSearchForm(true); // Volta para o formulário da Ordem de Reparação

  };

  // Método para atualizar o estado, chamando o endpoint
  const atualizarEstado = async () => {
    const data = { estado: "Terminado" };

    try {
      // Realizando a requisição para atualizar o estado
      const response = await fetch(`${API_URL}/ordem-de-reparacao-cronometro-tecnicos/update-estado/${idTecnico}/${numeroOrdem}`, {
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
      iniciarPausarAux(numeroOrdem);
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


  //Limpar oLocal estorege ao sair



  // Função para abrir e fechar o modal

  // Função para confirmar logout
  const confirmarLogout = (resposta) => {
      if (resposta === "Sim") {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/emailFuncionario"); // Redireciona para a tela de login
      }
      fecharSairModal();
  };
  return (
    <div className="seccao-cartaz">
      <div className="container-fluid">
        <div className="d-flex">
          <div className="menu-funionario ">

            <div className={`menu-barra ${display}`}>

              <nav className='menuLateral vh-100'>
                <img src={LogoTIpo} alt="logotipo small" className='mb-2 d-block mx-auto logoBig' width="210px" height="90px" />
                <img src={LogoSmall} alt="logotipo small" className='my-3 ms-4 logoSmall' width="40px" height="32px" />

                <ul className="menu-lateral ">

                  <li className='linhasMenu'>
                    <a href="#" title='Iniciar' onClick={abrirModal}>
                      <MdContentPasteSearch className='icone-menu' /> <span className='spanTitle'>Procurar OR</span>
                    </a>
                  </li>


                  <li className='linhasMenu d-none'>
                    <a href="#" title='Terminar o serviço' onClick={abrirConfirmModal}>
                      <FaHammer className='icone-menu' /> <span className='spanTitle'>Terminar o serviço</span>
                    </a>
                  </li>



                  <li className='linhasMenu d-none'>
                    <a href="#" title='Manutenção e limpeza' onClick={abrirLimpezaModal}>
                      <FaCogs className='icone-menu' /> <span className='spanTitle'>Manutenção e limpeza</span>
                    </a>
                  </li>
                  <li className='linhasMenu d-none'>
                    <a href="#" title='Manutenção e limpeza' onClick={abrirLimpezaModal}>
                      <FaCogs className='icone-menu' /> <span className='spanTitle'>Manutenção e limpeza</span>
                    </a>
                  </li>
                  <li className='linhasMenu  d-none'>
                    <a href="#" title='Aguardar Trabalho' onClick={abrirAguardarTrabalhoModal}>
                      <FaToolbox className='icone-menu' /> <span className='spanTitle'>Aguardar Trabalho</span>
                    </a>
                  </li>
                  <li className='linhasMenu d-none'>
                    <a href="#" title='Aguardar Peças' onClick={abrirAguardarPecasModal}>
                      <FaRegClock className='icone-menu' /> <span className='spanTitle'>Aguardar Peças</span>
                    </a>
                  </li>
                  <li className='linhasMenu  d-none'>
                    <a href="#" title='Almoço' onClick={abrirAlmocoModal}>
                      <FaUtensils className='icone-menu' /> <span className='spanTitle'>Almoço </span>
                    </a>
                  </li>
                  <li className='linhasMenu'>
                    <a href="#" title='Tempo Individual' onClick={abrirFormacaoModal}>
                      <FaUserClock className='icone-menu' /> <span className='spanTitle'>Tempo Individual</span>
                    </a>
                  </li>

                  <li className='linhasMenu' onClick={handleRedirect}>
                    <a href="#" title='Projectar' >
                      <BsArrowsFullscreen className='icone-menu' />

                      <span className='spanTitle'>Projectar </span>
                    </a>
                  </li>

                    {/* Botão de Logout agora abre a modal de sair */}
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
                                <h6>Funcionário Encontrado <FaCheckDouble color="green" /></h6>
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
                                    idCronometro: 1, //ordemDeReparacao.id,
                                    segundoFinal: (ordemDeReparacao?.horas_reparacao * 6000),
                                    numeroHoras: ordemDeReparacao?.horas_reparacao,
                                    rodando: 1,
                                    estado: "Em Execução",
                                    progresso: 0,
                                    ordemReparacaoId: ordemDeReparacao.id,
                                    acao: "Troca de óleo",
                                    tempoEsgotado: 0,
                                  };
                                  // Valores a serem passados para a função (normalmente vindo de variáveis de estado ou diretamente)
                                  const tecnicoId = props.tecnicoId;
                                  const idCronometro = props.idCronometro;
                                  const ordemReparacaoId = props.ordemReparacaoId;
                                  const numeroOr = props.numeroOr;
                                  const segundosAtual = 10;
                                  const segundoFinal = props.segundoFinal;
                                  const numeroHoras = props.numeroHoras;
                                  const rodando = 1;
                                  const estado = props.estado;
                                  const progresso = 50;
                                  const acao = "Ação 1";
                                  const dataHora = "2025-02-26 02:24:10";
                                  const tempoEsgotado = 0;
                                  try {
                                    // Executando as funções de forma assíncrona

                                    await cadastrarCronometro(props); // Chama a função com os valores
                                    //e.preventDefault(); // Evita o recarregamento da página

                                    cadastrarOrdemReparacaoCronometroTecnico({
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
                                      dataHora,
                                      tempoEsgotado
                                    });

                                    //await cadastrarOrdemReparacaoCronometroTecnico({idTecnico,idCronometro,idOR,numOR,segundosAtual,segundoFinal,numHoras,rondandoR,estadoE,progressoP,accaoA,dataHora,tempoEsgotado});
                                    await fecharModalOR(); // Fecha a primeira modal
                                    await fecharModalTecnico(); // Fecha a segunda modal
                                    await limparDadosModalTecnico(); // Limpa os dados do modal de técnico
                                    await handleModalOrdemDeReparacaoClose(); // Fecha a modal da ordem de reparação
                                    await iniciarPausar(props.numeroOr); // Inicia o cronômetro
                                    await iniciarPausarAux(props.numeroOr); // Inicia o cronômetro
                                    await adicionarOrdem(ordemDeReparacao?.numero_trabalho); // Adiciona a ordem ao sistema

                                    // Após todas as funções anteriores terminarem, chama o refresh
                                    //await handleRefresh(); // Agora o refresh é chamado por último

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
                            value={numeroOrdem}
                            onChange={(e) => setNumeroOrdem(e.target.value)}
                          />
                          <Button
                            variant="primary"
                            onClick={fetchIdTecnico}
                            className="d-block py-1 ms-auto"
                            disabled={loading || !numeroOrdem}
                          >
                            {loading ? "Carregando..." : "Próximo " + numeroOrdem}
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

              {/* Modal Tempo Individual */}

              <Modal
                scrollable
                show={showFormacaoModal}
                size='xl'
                onHide={fecharFormacaoModal}

                dialogClassName="modal-fullscreen modal-fullscreenAux modal-center"

              >
                <Modal.Header closeButton>
                  <Modal.Title>Tempo Individual</Modal.Title>
                </Modal.Header>

                <Modal.Body className='bg-difinido'>
                  <div className="div-sombra">
                    {loadingAux ? (
                      // Exibe um Spinner ou outra indicação de carregamento até que os dados sejam carregados
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p className='text-white'>Carregando Cronometros Individual...</p>
                      </div>
                    ) : ordensSecundaria.length === 0 ? (
                      // Exibe uma mensagem caso não haja ordens
                      <div className="text-center pt-5">
                        <h3 className="fw-bold my-3">Dados não encontrados</h3>
                        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
                      </div>
                    ) : (
                      <div className="row">
                        {ordensSecundaria.map((ordem, index) => (
                          <div className="col-lg-6" key={index}>
                            <CronometroIndividual
                              nomeMecanico={ordem.idTecnico}
                              numeroOrdem={ordem.numeroOrdem}
                              estado={ordem.estado}
                              rodando={ordem.rodando}
                              segundosAtual={ordem.segundosAtuais || 0}
                              segundoFinal={ordem.segundosFinais || 3600}
                              tempoEsgotado={ordem.tempoEsgotado ? 1 : 0}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <img src={LogoType} alt="..." className="d-block mx-auto" width={250} height={70} />
                  <button className="btn links-acessos px-3" onClick={fecharFormacaoModal}>
                    Fechar
                  </button>
                </Modal.Footer>
              </Modal>


              {/* Modal para Sair */}
           {/* Modal para Sair */}
           <Modal scrollable show={showSairModal} onHide={fecharSairModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sair</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Você deseja sair?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => confirmarLogout("Não")}>
                        Não
                    </Button>
                    <Button variant="danger" onClick={() => confirmarLogout("Sim")}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
          </div>


          <div className="container-fluid">

            <div className="row ">
              <CgCloseO fontSize={30} onClick={handleRedirectRegresso} className={`mEr ${displayBlock}`} />

              <div className="div-feed border-4    min-vh-100 borderKing col-lg-12 vh-100 h-100 padingCimaBar">
                {/* Renderiza os cronômetros dinamicamente com base nas ordens */}
                <h4 className='my-3 ms-2'>Tempo Total de cada OR</h4>
                <div className="row">
                  {ordens.length === 0 ? (
                    // Se o array estiver vazio, exibe a mensagem "Vazio"
                    <div className="text-center vh-100 pt-5">
                      <h3 className='fw-bold my-3'>Dados não encontrados</h3>
                      <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
                    </div>
                  ) : (
                    ordens.map((ordem, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-12 ">
                          <CronometroGeral
                            nomeMecanico={ordem.idTecnico}
                            numeroOrdem={ordem.numeroOrdem}
                            estado={ordem.estado}
                            rodando={ordem.rodando}
                            iniciarPausar={iniciarPausar}
                            segundosAtual={ordem.segundosAtuais || 0} // Usa segundosAtuais da ordem ou 0 como padrão
                            segundoFinal={ordem.segundosFinais || 3600} // Usa segundosFinais da ordem ou 3600 como padrão
                            tempoEsgotado={ordem.tempoEsgotado ? 1 : 0}
                            displayF="d-none"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"  // Centraliza o toast no topo
        autoClose={3000}       // Fecha automaticamente após 3 segundos
        hideProgressBar={false} // Mostra a barra de progresso
        newestOnTop={true}      // Exibe os mais recentes no topo
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
} 