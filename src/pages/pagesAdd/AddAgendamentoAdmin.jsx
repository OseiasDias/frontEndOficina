import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaCar, FaClipboardList, FaUser } from "react-icons/fa";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const API_URL = import.meta.env.VITE_API_URL;


const FormularioAgendamento = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [filteredServicos, setFilteredServicos] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const navigate = useNavigate(); // Hook de navegação
    const [formData, setFormData] = useState({
        data: '',
        id_cliente: '',
        id_veiculo: '',
        id_servico: '',
        status: 'agendado',
        descricao: ''
    });

    // Função de mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função para pesquisa de cliente
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filtered = clientes.filter(cliente => {
            const clienteInfo = `${cliente.primeiro_nome} ${cliente.sobrenome} ${cliente.celular}`;
            return clienteInfo.toLowerCase().includes(searchTerm);
        });

        setFilteredClientes(filtered);

        // Atualiza o nome do cliente no estado
        setFormData({
            ...formData,
            clienteNome: e.target.value
        });
    };

    // Função para pesquisa de serviço
    const handleServicoSearchServico = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filtered = servicos.filter(servico => {
            return servico.nome_servico.toLowerCase().includes(searchTerm);
        });

        setFilteredServicos(filtered);

        // Atualiza o nome do serviço no estado
        setFormData({
            ...formData,
            servicoNome: e.target.value
        });
    };


    // Função para selecionar um cliente da lista
    const handleClienteSelect = (cliente) => {
        setFormData({
            ...formData,
            id_cliente: cliente.id,
            clienteNome: `${cliente.primeiro_nome} ${cliente.sobrenome}`, // Atualiza o nome do cliente no estado
        });
        setFilteredClientes([]); // Limpar a lista de resultados ao selecionar um cliente

        // Requisição para pegar os veículos do cliente selecionado
        fetch(`${API_URL}/cliente/${cliente.id}`)
            .then((response) => response.json())
            .then((data) => {
                setVeiculos(data);  // Armazena os veículos no estado
            })
            .catch((error) => {
                console.error('Erro ao carregar os veículos:', error);
                setVeiculos([]); // Limpa os veículos em caso de erro
            });
    };


    const handleServicoSelect = (servico) => {
        setFormData({
            ...formData,
            id_servico: servico.id,
            servicoNome: `${servico.nome_servico}`, // Atualiza o nome do serviço no estado
        });
        setFilteredServicos([]); // Limpar a lista de resultados ao selecionar um serviço
    };


    // Função de envio do formulário
    // Função para enviar o formulário (criar o agendamento)
    const handleSubmit = (e) => {
        e.preventDefault();
    
        setLoading(true);
        setError(null);
    
        // Garantir que todos os dados necessários estão presentes
        if (!formData.id_cliente || !formData.id_veiculo || !formData.id_servico || !formData.data || !formData.descricao) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            setLoading(false);
            return;
        }
    
        const agendamento = {
            data: formData.data,
            id_cliente: formData.id_cliente,
            id_veiculo: formData.id_veiculo,
            id_servico: formData.id_servico,
            status: formData.status,
            descricao: formData.descricao
        };
    
        // Enviar o agendamento para a API
        fetch(`${API_URL}/agendamentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agendamento),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao criar o agendamento');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Agendamento criado:', data);
      
    
            // Limpar os dados do formulário
            setFormData({
                data: '',
                id_cliente: '',
                id_veiculo: '',
                id_servico: '',
                status: 'agendado',
                descricao: ''
            });
    
            // Atraso de 4 segundos antes de redirecionar
            setTimeout(() => {
                // Redirecionar para a página de agendamentos
                toast.success('Agendamento criado com sucesso!');
                navigate('/viewAgendamentos');
            }, 4000); // 4000ms = 4 segundos
        })
        .catch((error) => {
            setError(error.message);
            toast.error('Erro ao criar o agendamento!');
        })
        .finally(() => {
            setLoading(false);
        });
    };
    


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 16);
        setFormData(prevState => ({
            ...prevState,
            data: formattedDate
        }));

        fetch(`${API_URL}/clientes`)
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
                setFilteredClientes(data); // Exibe todos os clientes inicialmente
                setLoading(false);
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                setError('Erro ao carregar clientes');
                setLoading(false);
            });

        fetch(`${API_URL}/servicos`)
            .then((response) => response.json())
            .then((data) => {
                setServicos(data);
                setFilteredServicos(data); // Exibe todos os serviços inicialmente
            })
            .catch((error) => {
                console.error('Erro ao carregar serviços:', error);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <h4>Carregando...</h4>
                <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h3 className="text-danger">{error}</h3>
                <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
            </div>
        );
    }

    return (
        <>  
        <ToastContainer position="top-center"/>
        <Form method="post" onSubmit={handleSubmit}>
            <div className="col-md-12 mt-5">
                <h6>DETALHES DE AGENDAMENTO</h6>
                <hr />
            </div>

            <Row className="mt-3">
                <Col md={6}>
                    <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><FaUser fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            type="text"
                            name="clienteSearch"
                            placeholder="Pesquisar Cliente"
                            value={formData.clienteNome} // Exibe o nome do cliente selecionado
                            onChange={handleSearch} // Permite a pesquisa
                        />
                    </div>

                    {/* Exibição da lista de resultados */}
                    {filteredClientes.length > 0 ? (
                        <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {filteredClientes.map(cliente => (
                                <div
                                    key={cliente.id}
                                    className={`list-group-item text-justify list-group-item-action ${formData.id_cliente === cliente.id ? 'list-group-item-primary' : ''}`}
                                    onClick={() => handleClienteSelect(cliente)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {`${cliente.primeiro_nome} ${cliente.sobrenome} - ${cliente.celular}`}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="s"></div>
                    )}
                </Col>
                <Col md={6}>
                    <Form.Label>Veículo <span className="text-danger">*</span></Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><FaCar fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            as="select"
                            name="id_veiculo"
                            value={formData.id_veiculo}
                            onChange={handleChange}
                            required
                            disabled={!formData.id_cliente} // Desabilita o campo se não houver cliente selecionado
                        >
                            <option value="">Selecionar Veículo</option>
                            {/* Verifica se há veículos associados ao cliente */}
                            {formData.id_cliente && veiculos.length > 0 ? (
                                veiculos.map(veiculo => (
                                    <option key={veiculo.id} value={veiculo.id}>
                                        {`${veiculo.marca_veiculo} ${veiculo.modelo_veiculo} - ${veiculo.numero_placa}`}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhum veículo disponível</option>
                            )}
                        </Form.Control>
                    </div>
                </Col>

            </Row>
 
            <Row className="mt-3">
                <Col md={6}>
                    <Form.Label>Serviço <span className="text-danger">*</span></Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><FaClipboardList fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            type="text"
                            name="servicoSearch"
                            placeholder="Pesquisar Serviço"
                            onChange={handleServicoSearchServico} // Função de pesquisa
                            value={formData.servicoNome} // Exibe o nome do serviço selecionado
                        />
                    </div>

                    {/* Exibição da lista de resultados */}
                    {filteredServicos.length > 0 ? (
                        <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {filteredServicos.map(servico => (
                                <div
                                    key={servico.id}
                                    className={`list-group-item list-group-item-action ${formData.id_servico === servico.id ? 'list-group-item-primary' : ''}`}
                                    onClick={() => handleServicoSelect(servico)} // Função para selecionar o serviço
                                    style={{ cursor: 'pointer' }}
                                >
                                    <strong className="text-justify">{servico.nome_servico}  :  </strong>   {servico.descricao.length > 100 ? `${servico.descricao.substring(0, 100)}...` : servico.descricao}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="s"></div>
                    )}
                </Col>


                <Col md={6}>
                    <Form.Label>Data e Hora <span className="text-danger">*</span></Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            type="datetime-local"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={12}>
                    <Form.Label>Descrição</Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><FaClipboardList fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            as="textarea"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Descreva o motivo do agendamento"
                            rows={4}
                        />
                    </div>
                </Col>
            </Row>

            <div className="mt-3 text-center">
                <Button type="submit" variant="success" className="px-5 mt-2 taxratesSubmitButton bordarNONE mt-5 border-radius-zero mx-auto links-acessos d-block w-25">
                    Agendar
                </Button>
            </div>

            <input type="hidden" name="_token" value="3SdpCZa7Aj50aKHh555Fyl67CfET8SQ996mEr2dl" />
        </Form>
        </>
    );
};



export default function AddAgendamento() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />

                    <div className="flexAuto w-100">
                        <TopoAdmin entrada="  Marcar Agendamento" leftSeta={<FaArrowLeftLong />} leftR="/viewAgendamentos" />

                        <div className="vh-100 alturaPereita">
                            <FormularioAgendamento />
                        </div>

                        <div className="div text-center np pt-2 mt-2 ppAr">
                            <hr />
                            <p className="text-center">
                                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
                                <br />
                                Desenvolvido por: <b>Oseias Dias</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
