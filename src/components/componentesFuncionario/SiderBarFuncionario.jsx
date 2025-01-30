import { useState } from 'react';
import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaBook, FaUserAlt, FaClipboard } from 'react-icons/fa'; // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiSignOutBold } from 'react-icons/pi';
import LogoSmall from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import { MdContentPasteSearch } from 'react-icons/md';
import { Modal, Button, Form } from 'react-bootstrap'; // Importando Modal, Button e Form do react-bootstrap
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import VerORSeg from '../../pages/pageVer/VerORSeg';

const Sidebar = () => {
    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal de OR
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar a visibilidade da modal de confirmação para "Terminar o Serviço"
    const [showLimpezaModal, setShowLimpezaModal] = useState(false); // Estado para controlar a visibilidade da modal de limpeza
    const [showAguardarTrabalhoModal, setShowAguardarTrabalhoModal] = useState(false); // Modal de "Aguardar Trabalho"
    const [showAguardarPecasModal, setShowAguardarPecasModal] = useState(false); // Modal de "Aguardar Peças"
    const [showAlmocoModal, setShowAlmocoModal] = useState(false); // Modal de "Almoço"
    const [showFormacaoModal, setShowFormacaoModal] = useState(false); // Modal de "Formação"
    const [showPerfilModal, setShowPerfilModal] = useState(false); // Modal de "Perfil"
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

    const abrirPerfilModal = () => setShowPerfilModal(true);
    const fecharPerfilModal = () => setShowPerfilModal(false);

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
        fecharPerfilModal();           // Exemplo para a modal de "Perfil"
        fecharSairModal();             // Exemplo para a modal de "Sair"
    };



    //===============================|CONFIGIURAR AS MODAIS |==============================

    const [ordem, setOrdem] = useState(null);  // Dados da ordem encontrada
    const [error, setError] = useState("");  // Mensagem de erro se não encontrar a ordem
    const [loading, setLoading] = useState(false);  // Indicador de carregamento

    // Função para fechar o modal
    const fecharModalOR = () => {
        setShowModal(false);
        setNumeroOR("");  // Limpar campo de pesquisa
        setError("");  // Limpar erro
        setOrdem(null);  // Limpar resultado
    };

    // Função para manipular o campo de número da OR
    //const handleNumeroORChange = (e) => setNumeroOR(e.target.value);

    // Função para enviar a busca e procurar pela OR
    const handleSubmitORSend  = async (e) => {
        e.preventDefault();
        setLoading(true);  // Iniciar carregamento

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/ordens-de-reparo/numero-trabalho/${numeroOR}`);
            if (response.data) {
                setOrdem(response.data);  // Atualiza os dados da ordem
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

    return (
        <>
        
        <div className="menu-barra">
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
                            <FaUtensils className='icone-menu' /> <span className='spanTitle'>Almoço</span>
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#" title='Formação' onClick={abrirFormacaoModal}>
                            <FaBook className='icone-menu' /> <span className='spanTitle'>Formação</span>
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#" title='Perfil' onClick={abrirPerfilModal}>
                            <FaUserAlt className='icone-menu' /> <span className='spanTitle'>Perfil</span>
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
                            <div className="input-group">
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
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="d-block mx-auto">
                            {loading ? "Pesquisando..." : "Pesquisar"}
                        </Button>
                    </Form>

                    {error && <p className="text-danger mt-3">{error}</p>}
                  
                    {ordem && (
                        <VerORSeg idUnico={ordem.id}/>
                       
                    )}
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

            {/* Modal para Perfil */}
            <Modal scrollable show={showPerfilModal} onHide={fecharPerfilModal} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Dados">
                            Tab content for Home
                        </Tab>
                        <Tab eventKey="profile" title="Editar">
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Mudar Senha">
                            Tab content for Contact
                        </Tab>
                    </Tabs>
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
        </>
    );
};

export default Sidebar;
