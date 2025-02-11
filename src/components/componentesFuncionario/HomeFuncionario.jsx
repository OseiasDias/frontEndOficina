//Imports do Menu

import { useState } from 'react';
import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaBook, FaClipboard } from 'react-icons/fa'; // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiSignOutBold } from 'react-icons/pi';
import LogoSmall from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import { MdContentPasteSearch, MdPersonSearch } from 'react-icons/md';
import { Modal, Button, Form } from 'react-bootstrap'; // Importando Modal, Button e Form do react-bootstrap
import { useNavigate } from "react-router-dom"; // Usando useNavigate no React Router v6

import axios from 'axios';


import LogoType from "../../assets/lgo.png";

/* eslint-disable react/prop-types */
import "../../css/StylesFuncionario/cartaz.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect } from 'react';
import {  BiReset } from "react-icons/bi";



import logotipo from "../../assets/lgo.png";
import imgErro from "../../assets/error.webp";
import imgN from "../../assets/not-found.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css'; // Não se esqueça de importar o CSS do bootstrap
import { IoMdPerson } from 'react-icons/io';
import { FaCheckDouble } from 'react-icons/fa';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { CgCloseO } from 'react-icons/cg';




// eslint-disable-next-line react/prop-types


const ProgressoBar = ({ numeroOrdem, defeito, numeroTecnico, progresso }) => {
  let variante = 'success'; // Cor verde

  if (progresso >= 80) {
    variante = 'warning'; // Cor laranja
  } else if (progresso >= 100) {
    variante = 'danger'; // Cor vermelha
  }

  // Concatenando as informações que queremos exibir dentro da barra
  const label = `
    Ordem: ${numeroOrdem} | 
    Defeito: ${defeito} | 
    Técnico: ${numeroTecnico} | 
    ${Math.round(progresso)}%
  `;

  return (
    <ProgressBar
      now={progresso}
      variant={variante}
      label={label}
      style={{
        whiteSpace: 'pre-line',
        fontSize: '0.9rem',
        textAlign: 'center',
        color: 'black' // Cor do texto sempre preta, independentemente da cor da barra
      }}
    />
  );
};



const Cronometro = ({ nomeMecanico, numeroOrdem, estado, rodando, iniciarPausar, numeroHoras }) => {
  const tempoLimite = (6000 * numeroHoras); // 100 minutos = 6000 segundos
  const [segundos, setSegundos] = useState(0); // Contador de segundos
  const [tempoEsgotado, setTempoEsgotado] = useState(false); // Estado para indicar se o tempo esgotou

  // Função para reiniciar o cronômetro
  const reiniciar = () => {
    setSegundos(0);
    setTempoEsgotado(false); // Reseta o estado de tempo esgotado
    localStorage.removeItem(`segundos-${numeroOrdem}`); // Limpa o valor do tempo salvo
    localStorage.removeItem(`rodando-${numeroOrdem}`); // Limpa o estado de "rodando"
    localStorage.removeItem(`startTime-${numeroOrdem}`); // Limpa o timestamp de início
  };

  // Efeito para carregar o tempo salvo e o estado de "rodando" do localStorage
  useEffect(() => {
    const tempoSalvo = localStorage.getItem(`segundos-${numeroOrdem}`);
    const estadoRodandoSalvo = localStorage.getItem(`rodando-${numeroOrdem}`);
    const startTimeSalvo = localStorage.getItem(`startTime-${numeroOrdem}`);

    if (tempoSalvo) {
      setSegundos(parseInt(tempoSalvo)); // Recupera o tempo salvo
    }
    if (estadoRodandoSalvo === 'true') {
      // eslint-disable-next-line no-undef
      setRodando(true); // Recupera o estado de "rodando"
    }

    // Se houver um tempo de início salvo e a contagem estiver rodando
    if (startTimeSalvo) {
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - parseInt(startTimeSalvo)) / 1000); // Calcular a diferença em segundos
      setSegundos((prevSegundos) => prevSegundos + timeDifference); // Atualiza o tempo com a diferença calculada
    }
  }, []); // Executa apenas uma vez ao montar o componente

  // Efeito para garantir que o cronômetro continue funcionando em segundo plano
  useEffect(() => {
    let intervalo;

    // Se o cronômetro estiver rodando, inicie o intervalo
    if (rodando && segundos < tempoLimite) {
      // Salva o timestamp atual
      localStorage.setItem(`startTime-${numeroOrdem}`, new Date().getTime().toString());

      intervalo = setInterval(() => {
        setSegundos((prevSegundos) => {
          const novoSegundos = prevSegundos + 1;
          localStorage.setItem(`segundos-${numeroOrdem}`, novoSegundos); // Salva o tempo no localStorage
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
          <h5><b>Nome Técnico:</b> {nomeMecanico}</h5>
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
      <ProgressoBar progresso={progresso} numeroOrdem={numeroOrdem} />

      <div>
        <button onClick={() => iniciarPausar(numeroOrdem)} style={{ padding: '10px 20px', margin: '5px' }} disabled={tempoEsgotado}>
          {rodando ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={reiniciar} style={{ padding: '10px 20px', margin: '5px' }} className="btnReset">
          <BiReset size={40} color="#fff" />
        </button>
      </div>
    </div>
  );
};























export default function Funcionario({ display, displayF }) {
  // Estado para armazenar as ordens de serviço com o cronômetro iniciando automaticamente
  // Estado para armazenar as ordens de serviço com o cronômetro iniciando automaticamente
  const [nomeM, setNomeM] = useState("");
  const [numeroM, setNumeroM] = useState("");
  const [rodandoM, setRodandoM] = useState(true);
  const [estadoM, setEstadoM] = useState("");

  const [ordens, setOrdens] = useState([
    { nomeMecanico: nomeM, numeroOrdem: numeroM, estado: estadoM, rodando: rodandoM },
  ]);
  const navigate = useNavigate(); // Hook para navegação


  // Função para adicionar uma nova ordem de serviço e cronômetro
  const adicionarOrdem = (numeroOrdem) => {
    const novaOrdem = {
      nomeMecanico: "Novo Técnico", // Nome do técnico pode ser alterado conforme necessário
      numeroOrdem,
      estado: "Reparando",
      rodando: true, // Inicia o cronômetro para essa ordem
    };
    setOrdens([...ordens, novaOrdem]); // Adiciona a nova ordem ao estado
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
      return ordem;
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
  //const fecharModal = () => setShowModal(false);

  const abrirConfirmModal = () => setShowConfirmModal(true);
  const fecharConfirmModal = () => setShowConfirmModal(false);

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



  // Função para confirmar o término do serviço
  const handleConfirmarTerminarServico = () => {
    alert('Serviço terminado!');
    fecharConfirmModal();
  };

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

  // Função para manipular o campo de número da OR
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

  // Função para abrir a modal
  //const abrirModalTecnico = () => setShowModalTecnico(true);

  
  // Função para lidar com o envio do número do técnico
  const handleSubmitTecnico = (e) => {
    e.preventDefault();
    alert(`Número do técnico: ${numeroTecnico}`);
    fecharModalTecnico(); // Fechar a modal após o envio
  };

  // Função para manipular a mudança do número do técnico
  const handleNumeroTecnicoChange = (e) => setNumeroTecnico(e.target.value);

  //~==================================================================================================


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

  useEffect(() => {
    const fetchDadosOrdemDeReparacao = async () => {
      try {
        const ordemDeReparacaoResponse = await axios.get(`http://127.0.0.1:8000/api/ordens-de-reparo/${idOrdemDeReparacao}`);
        setOrdemDeReparacao(ordemDeReparacaoResponse.data);

        const clienteOrdemDeReparacaoResponse = await axios.get(`http://127.0.0.1:8000/api/clientes/${ordemDeReparacaoResponse.data.cliente_id}`);
        setClienteOrdemDeReparacao(clienteOrdemDeReparacaoResponse.data);

        const veiculoOrdemDeReparacaoResponse = await axios.get(`http://127.0.0.1:8000/api/veiculos/${ordemDeReparacaoResponse.data.veiculo_id}`);
        setVeiculoOrdemDeReparacao(veiculoOrdemDeReparacaoResponse.data);

        const empresaOrdemDeReparacaoResponse = await axios.get(`http://127.0.0.1:8000/api/empresas/1`);
        setEmpresaOrdemDeReparacao(empresaOrdemDeReparacaoResponse.data);

        const servicosOrdemDeReparacaoResponse = await axios.get(`http://127.0.0.1:8000/api/ordem-de-reparacao-servicoU/${idOrdemDeReparacao}`);
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
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  if (!ordemDeReparacao || !clienteOrdemDeReparacao || !veiculoOrdemDeReparacao) {
    return (
      <div className="text-center">
        <h3 className="text-danger">Dados não encontrados.</h3>
        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
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
                        <Button variant="primary"  type="submit" className="btn d-block mx-auto">
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
                                onClick={() => {
                                  adicionarOrdem("OR" + (ordens.length + 1), "Manuel Dias");
                                  fecharModalOR(); // Fecha a primeira modal
                                  fecharModalTecnico(); // Fecha a segunda modal
                                  limparDadosModalTecnico(); 
                                  handleModalOrdemDeReparacaoClose(); // Fechar a modal

                                  setNomeM(funcionarioOrdemDeReparacao.nome);
                                  setNumeroM("FN002");
                                  setRodandoM(true);
                                  setEstadoM("ROdando");
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
                  <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Tem certeza que deseja terminar a reparação?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={fecharConfirmModal}>
                    Cancelar
                  </Button>
                  <Button variant="danger" onClick={handleConfirmarTerminarServico}>
                    Terminar Reparação
                  </Button>
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

              <div className="div-feed borderKing col-lg-12 vh-100 h-100 padingCimaBar">
                {/* Renderiza os cronômetros dinamicamente com base nas ordens */}

                <div className="f">
                  {ordens.map((ordem, index) => (
                    <Cronometro
                      key={index}
                      nomeMecanico={`${funcionarioOrdemDeReparacao?.nome} ${funcionarioOrdemDeReparacao?.sobrenome}`}
                      numeroOrdem={ordemDeReparacao?.numero_trabalho}
                      estado={ordem.estado}
                      rodando={ordem.rodando} // Passa o estado "rodando" para o Cronometro
                      iniciarPausar={iniciarPausar} // Passa a função de iniciar/pausar
                      numeroHoras={ordemDeReparacao.horas_reparacao}
                    />
                  ))}
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